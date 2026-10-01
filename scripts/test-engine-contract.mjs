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
