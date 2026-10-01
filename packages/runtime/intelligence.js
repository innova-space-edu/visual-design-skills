function clamp(value,min=0,max=1){return Math.max(min,Math.min(max,value));}

export function optimizerReadiness(input={}){
  const samples=Math.max(0,Number(input.samples||0));
  const consistency=clamp(Number(input.consistency||0));
  const qualityGain=Number(input.qualityGain||0);
  const acceptance=clamp(Number(input.acceptance||0));
  const evidence=(1-Math.exp(-samples/25))*(.4*consistency+.3*acceptance+.3*clamp((qualityGain+5)/10));
  return {
    samples,
    evidence,
    ready:samples>=Number(input.minSamples||20)&&evidence>=Number(input.minEvidence||.6)
  };
}

export function regressionDecision(input={}){
  const failures=Math.max(0,Number(input.failedCases||0));
  const qualityDelta=Number(input.qualityDelta||0);
  const semanticDelta=Number(input.semanticDelta||0);
  const overflowDelta=Number(input.overflowDelta||0);
  const reasons=[];
  if(failures>0)reasons.push("failed regression cases");
  if(qualityDelta<-.5)reasons.push("quality decreased");
  if(semanticDelta<-.5)reasons.push("semantic quality decreased");
  if(overflowDelta>0)reasons.push("overflow increased");
  return {approved:reasons.length===0,reasons};
}

export function experimentReward(input={}){
  const accepted=input.accepted===true?1:input.accepted===false?0:.5;
  const exported=input.exported?1:0;
  const quality=clamp(Number(input.quality||0)/100);
  const edits=1/(1+Math.max(0,Number(input.edits||0))*.15);
  return clamp(.4*accepted+.2*exported+.25*quality+.15*edits);
}

export function candidateLifecycle(candidate,status){
  const allowed={
    learning:["candidate"],
    candidate:["recommended","rejected"],
    recommended:["approved","rejected"],
    approved:["released","rejected"],
    rejected:[],
    released:[]
  };
  const current=String(candidate?.status||"learning");
  const next=String(status);
  if(!(allowed[current]||[]).includes(next))throw new Error("Invalid candidate transition: "+current+" -> "+next);
  return {...candidate,status:next,updatedAt:Date.now()};
}
