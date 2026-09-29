import assert from "node:assert/strict";
import { visual, getSkillGuidance } from "../packages/sdk/index.js";

const info=visual.plan("Infografía educativa del sistema solar para estudiantes");
const selected=getSkillGuidance(info.routing.selected_skills);
assert.ok(selected.some(item=>item.skill==="infographic"));
const req=visual.compile(info.visual_brief,"openai");
assert.ok(req.skill_guidance.some(item=>item.skill==="infographic"));
assert.ok(String(req.prompt).includes("SPECIALIST GUIDANCE"));
assert.ok(!String(req.prompt).includes("[portrait]"));

const portrait=visual.plan("Retrato editorial fotorealista de una persona");
const pReq=visual.compile(portrait.visual_brief,"openai");
assert.ok(pReq.skill_guidance.length>=1);
console.log("Runtime skill guidance OK");
