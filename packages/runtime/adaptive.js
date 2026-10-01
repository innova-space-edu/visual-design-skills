const stats=new Map();

function initial(id){
  return {id,samples:0,accepted:0,rejected:0,exports:0,meanQuality:0,meanEdits:0,score:.5,lastUsed:0};
}
function mean(previous,count,value){
  return count<=1?value:previous+(value-previous)/count;
}

export function recordSkillOutcome(input){
  if(!input||!input.skill)throw new Error("skill is required");
  const id=String(input.skill);
  const prev=stats.get(id)||initial(id);
  const samples=prev.samples+1;
  const accepted=prev.accepted+(input.accepted?1:0);
  const rejected=prev.rejected+(input.accepted===false?1:0);
  const exports=prev.exports+(input.exported?1:0);
  const meanQuality=mean(prev.meanQuality,samples,Number.isFinite(input.quality)?Math.max(0,Math.min(100,input.quality)):prev.meanQuality);
  const meanEdits=mean(prev.meanEdits,samples,Number.isFinite(input.edits)?Math.max(0,input.edits):prev.meanEdits);
  const acceptance=(accepted+1)/(samples+2);
  const exportRate=(exports+1)/(samples+2);
  const editPenalty=1/(1+meanEdits*.12);
  const quality=meanQuality/100;
  const confidence=1-Math.exp(-samples/10);
  const raw=.45*acceptance+.25*quality+.15*exportRate+.15*editPenalty;
  const score=.5*(1-confidence)+raw*confidence;
  const next={id,samples,accepted,rejected,exports,meanQuality,meanEdits,score,lastUsed:Date.now()};
  stats.set(id,next);
  return structuredClone(next);
}

export function getSkillStat(id){
  return structuredClone(stats.get(id)||initial(id));
}

export function rankSkills(ids){
  return ids.map(getSkillStat).sort((a,b)=>b.score-a.score||b.samples-a.samples||a.id.localeCompare(b.id));
}

export function chooseAdaptiveSkill(ids){
  return rankSkills(ids)[0]?.id||null;
}

export function exportAdaptiveSnapshot(){
  return {version:"1.0",updatedAt:Date.now(),stats:Object.fromEntries(stats)};
}

export function importAdaptiveSnapshot(snapshot){
  if(!snapshot||snapshot.version!=="1.0")throw new Error("Unsupported adaptive snapshot");
  stats.clear();
  Object.entries(snapshot.stats||{}).forEach(([id,value])=>stats.set(id,structuredClone(value)));
}

export function adaptiveRoutingBias(ids,maxBoost=3){
  const ranked=rankSkills(ids);
  const best=ranked[0]?.score??.5;
  return Object.fromEntries(ranked.map(stat=>{
    const normalized=best<=0?0:Math.max(0,(stat.score-.5)/Math.max(.001,best-.5));
    return [stat.id,normalized*maxBoost*Math.min(1,stat.samples/10)];
  }));
}
