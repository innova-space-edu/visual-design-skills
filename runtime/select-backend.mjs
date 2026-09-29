import fs from "node:fs";import path from "node:path";import{fileURLToPath}from"node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");const p=process.argv[2];
if(!p){console.error("Usage: npm run select:backend -- <brief-or-example.json>");process.exit(2);}
const raw=JSON.parse(fs.readFileSync(p,"utf8"));const b=raw.visual_brief??raw;
const matrix=JSON.parse(fs.readFileSync(path.join(root,"references/capability-matrix.json"),"utf8")).backends;
const exact=(b.text_blocks??[]).some(x=>x?.exact===true)||(b.constraints??[]).some(x=>/exact text|exact headline|texto exacto/i.test(x));
const req=new Map();const s=(String(b.visual_type??"")+" "+String(b.purpose??"")).toLowerCase();
if(/photo|selfie|portrait|retrato|fotograf/.test(s))req.set("photo",3);else req.set("illustration",2);
if(b.identity?.authoritative)req.set("multi_reference",3);if(exact)req.set("typography",3);
if(b.geometry?.authoritative)req.set("exact_geometry",3);if(b.data&&Object.keys(b.data).length)req.set("exact_data",3);
if(/edit|restore|background|composite/.test(s))req.set("editing",3);
const score=n=>{const c=matrix[n]??{};let score=0,disqualified=false;for(const[k,w]of req){const v=c[k]??0;if(w>=3&&v===0)disqualified=true;score+=v*w;}return{name:n,score,disqualified};};
let out;const vt=String(b.visual_type??"").toLowerCase();
if(b.render_strategy==="deterministic"){
  if(/map/.test(vt))out={strategy:"deterministic",primary:"maplibre",secondary:["svg"]};
  else if(/chart|data|graf|visualization/.test(vt)||b.data?.values)out={strategy:"deterministic",primary:"vega-lite",secondary:["svg"]};
  else out={strategy:"deterministic",primary:"svg",secondary:[]};
}else{
  const ranked=["openai","flux","qwen-image","ideogram","recraft","comfyui"].map(score).filter(x=>!x.disqualified).sort((a,b)=>b.score-a.score||a.name.localeCompare(b.name));
  if(b.render_strategy==="generative")out={strategy:"generative",primary:ranked[0]?.name??"openai",alternatives:ranked.slice(1,4),required_capabilities:Object.fromEntries(req)};
  else{let structure="svg";if(/map/.test(vt))structure="maplibre";else if(/chart|data|graf|visualization/.test(vt)||b.data?.values)structure="vega-lite";out={strategy:"hybrid",structure_backend:structure,image_backend:ranked[0]?.name??"openai",image_alternatives:ranked.slice(1,4),required_capabilities:Object.fromEntries(req)};}
}
console.log(JSON.stringify(out,null,2));
