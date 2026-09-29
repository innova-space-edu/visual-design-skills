import assert from "node:assert/strict";
import { createOpenAIImageExecutor, createBFLImageExecutor, createSvgExecutor } from "../packages/providers/index.js";

const brief={purpose:"Logo test",visual_type:"logo-design",render_strategy:"deterministic",selected_skills:["logo-design"],composition:{},output:{format:"svg",width:512,height:512},text_blocks:[{text:"TEST",exact:true}],constraints:[],preserve:[]};
const svg=await createSvgExecutor()({request:{backend:"svg",visual_brief:brief},plan:{visual_brief:brief}});
assert.equal(svg.kind,"svg");assert.ok(svg.svg.includes("<svg"));assert.ok(svg.data_url.startsWith("data:image/svg+xml"));

let openaiBody;
const openaiFetch=async(url,init)=>{openaiBody=JSON.parse(init.body);return new Response(JSON.stringify({data:[{b64_json:"QUJD"}],output_format:"webp",quality:"low",size:"1024x1024"}),{status:200,headers:{"content-type":"application/json"}});};
const openai=createOpenAIImageExecutor({apiKey:"test",fetchImpl:openaiFetch});
const o=await openai({request:{prompt:"A clean logo"},plan:{visual_brief:{...brief,render_strategy:"generative",output:{format:"webp"}}}});
assert.equal(openaiBody.model,"gpt-image-2.5-flare");assert.equal(openaiBody.output_format,"webp");assert.ok(o.data_url.includes("QUJD"));

let polls=0;
const bflFetch=async(url,init={})=>{
  if(String(url).includes("/flux-2-pro")) return new Response(JSON.stringify({id:"1",polling_url:"https://poll.test/1"}),{status:200,headers:{"content-type":"application/json"}});
  polls++;return new Response(JSON.stringify(polls>1?{status:"Ready",result:{sample:"https://img.test/a.webp"}}:{status:"Pending"}),{status:200,headers:{"content-type":"application/json"}});
};
const bfl=createBFLImageExecutor({apiKey:"test",fetchImpl:bflFetch,pollIntervalMs:1,maxWaitMs:100});
const b=await bfl({request:{prompt:"Landscape"},plan:{visual_brief:{...brief,render_strategy:"generative",output:{width:1024,height:1024}}}});
assert.equal(b.provider,"bfl");assert.equal(b.url,"https://img.test/a.webp");
console.log("Provider tests OK");
