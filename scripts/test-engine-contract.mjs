import assert from "node:assert/strict";
import { compileBriefToScene, ENGINE_CAPABILITIES } from "../packages/engine/index.js";

const math=compileBriefToScene({
  purpose:"Homothety k=-2",
  visual_type:"math-diagram",
  render_strategy:"deterministic",
  selected_skills:["math-diagram"],
  composition:{},
  data:{formulas:["P'=O+k(P-O)"]},
  output:{format:"svg",width:1200,height:800}
});
assert.equal(math.version,"1.0");
assert.ok(math.nodes.some(function(n){return n.type==="math";}));

const chem=compileBriefToScene({
  purpose:"Water molecule",
  visual_type:"chemistry-diagram",
  render_strategy:"deterministic",
  selected_skills:["chemistry-diagram"],
  composition:{},
  data:{equation:"2H_2+O_2\\rightarrow2H_2O"},
  output:{format:"svg",width:1200,height:800}
});
assert.ok(chem.nodes.some(function(n){return n.id==="equation";}));
assert.equal(ENGINE_CAPABILITIES.external_calls,0);
console.log("visual-engine contract ok");

const dataScene=compileBriefToScene({
  purpose:"Datos",
  visual_type:"data-visualization",
  render_strategy:"deterministic",
  selected_skills:["data-visualization"],
  composition:{},
  data:{values:[3,7,5],labels:["A","B","C"]},
  output:{format:"svg",width:1200,height:800}
});
assert.ok(dataScene.nodes.some(function(n){return n.id==="bar-1";}));

const technical=compileBriefToScene({
  purpose:"Plano técnico",
  visual_type:"technical-floorplan",
  render_strategy:"deterministic",
  selected_skills:["technical-floorplan"],
  composition:{},
  data:{width:620,height:380},
  output:{format:"svg",width:1200,height:800}
});
assert.ok(technical.nodes.some(function(n){return n.id==="plan";}));
assert.ok(ENGINE_CAPABILITIES.initial_compilers.length>=10);
