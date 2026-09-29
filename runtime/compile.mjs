import fs from "node:fs";
const backend=process.argv[2],p=process.argv[3];if(!backend||!p){console.error("Usage: npm run compile -- <backend> <brief-or-example.json>");process.exit(2);}
const raw=JSON.parse(fs.readFileSync(p,"utf8"));const b=raw.visual_brief??raw;const compact=x=>x&&Object.keys(x).length?JSON.stringify(x):"";
const text=(b.text_blocks??[]).filter(x=>x?.text).map(x=>x.exact?`EXACT TEXT: "${x.text}"`:`Text: "${x.text}"`);
const parts=[b.purpose&&`Purpose: ${b.purpose}`,b.subject&&`Subject: ${compact(b.subject)}`,b.scene&&`Scene: ${compact(b.scene)}`,b.composition&&`Composition: ${compact(b.composition)}`,b.camera&&`Camera: ${compact(b.camera)}`,b.lighting&&`Lighting: ${compact(b.lighting)}`,b.palette?.length&&`Palette: ${b.palette.join(", ")}`,...text,b.constraints?.length&&`Constraints: ${b.constraints.join("; ")}`,b.preserve?.length&&`PRESERVE: ${b.preserve.join("; ")}`].filter(Boolean);
const prompt=parts.join(". ");let out;
if(["svg","maplibre","vega-lite"].includes(backend))out={mode:"deterministic",backend,instruction:"Preserve authoritative values, geometry, coordinates, formulas, and exact text; do not replace them with free-form image generation.",visual_brief:b};
else if(backend==="flux")out={mode:"generative",backend,prompt,rules:["Use positive natural-language descriptions.","Front-load the primary subject.","Preserve exact constraints and references.","Do not rely on classic negative prompts."]};
else if(backend==="ideogram")out={mode:"generative",backend,prompt,rules:["Prioritize quoted exact text and hierarchy.","Use deterministic composition for dense copy."]};
else if(backend==="qwen-image")out={mode:"generative",backend,prompt,rules:["State edit target and preservation set explicitly.","Use structural controls when geometry must remain stable."]};
else if(backend==="recraft")out={mode:"vector-or-generative",backend,prompt,rules:["Prefer editable vector output for logo/icon/flat-illustration tasks.","Validate silhouette and scalability."]};
else if(backend==="comfyui")out={mode:"workflow",backend,prompt,workflow_requirements:["select checkpoint","attach ControlNet when structural control is required","attach identity/reference adapter when required","save workflow metadata"]};
else out={mode:"generative",backend,prompt,edit_contract:{change:b.change??[],preserve:b.preserve??[]}};
console.log(JSON.stringify(out,null,2));
