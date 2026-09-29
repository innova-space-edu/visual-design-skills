import fs from "node:fs";
const p=process.argv[2];
if(!p){console.error("Usage: npm run validate:brief -- <brief-or-example.json>");process.exit(2);}
const raw=JSON.parse(fs.readFileSync(p,"utf8"));const b=raw.visual_brief??raw;const e=[];
if(!b||typeof b!=="object")e.push("brief must be an object");
if(!b.purpose||typeof b.purpose!=="string")e.push("purpose is required");
if(!b.visual_type||typeof b.visual_type!=="string")e.push("visual_type is required");
if(!["deterministic","hybrid","generative"].includes(b.render_strategy))e.push("invalid render_strategy");
if(!b.composition||typeof b.composition!=="object")e.push("composition object is required");
if(!b.output?.format)e.push("output.format is required");
for(const x of b.text_blocks??[])if(x?.exact===true&&typeof x.text!=="string")e.push("exact text block requires string text");
if(b.geometry?.authoritative===true&&b.render_strategy==="generative")e.push("authoritative geometry cannot be generative-only");
if(b.data?.coordinates_authoritative===true&&b.render_strategy==="generative")e.push("authoritative coordinates cannot be generative-only");
if(e.length){console.error(JSON.stringify({valid:false,errors:e},null,2));process.exit(1);}
console.log(JSON.stringify({valid:true,visual_type:b.visual_type,render_strategy:b.render_strategy},null,2));
