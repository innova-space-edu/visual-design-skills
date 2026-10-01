const registry=new Map();

function key(id,version){ return version ? id+"@"+version : id; }

export function registerSkillManifest(manifest,compiler){
  if(!manifest||!manifest.id||!manifest.version)throw new Error("Skill manifest requires id and version");
  const record={manifest:structuredClone(manifest),compiler};
  registry.set(key(manifest.id,manifest.version),record);
  registry.set(manifest.id,record);
  return record;
}

export function getSkillRuntime(id,version){
  return registry.get(key(id,version))||null;
}

export function listSkillRuntimes(){
  return Array.from(new Set(Array.from(registry.values()).map(function(record){
    return record.manifest.id+"@"+record.manifest.version;
  }))).sort();
}

export async function executeSkill(id,input,options={}){
  const record=getSkillRuntime(id,options.version);
  if(!record)throw new Error("Visual skill not registered: "+id);
  if(typeof record.compiler!=="function")throw new Error("Visual skill has no compiler: "+id);
  const scene=await record.compiler(input,options);
  return {
    skill:record.manifest.id,
    version:record.manifest.version,
    scene,
    deterministic:!!record.manifest.deterministic,
    offline:!!record.manifest.offline
  };
}

export * from "./adaptive.js";
