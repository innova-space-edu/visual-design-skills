import assert from "node:assert/strict";
import { visual, createVisualDesign } from "../packages/sdk/index.js";
import { createBrowserVisual } from "../packages/browser/index.js";
import { createVisualGateway } from "../packages/server/index.js";
import { createNextRouteHandlers } from "../adapters/nextjs/index.js";
import { createCloudflareWorker } from "../adapters/cloudflare/index.js";

const math = visual.plan("Crea una imagen educativa de homotecia de un triángulo para estudiantes");
assert.equal(math.validation.valid, true);
assert.ok(math.routing.selected_skills.includes("math-diagram"));
assert.equal(math.visual_brief.render_strategy, "deterministic");
assert.equal(math.backend.primary, "svg");
assert.equal(math.cost.planning_external_calls, 0);
assert.equal(math.cost.generation_external_calls, 0);

const map = visual.plan("Mapa real con coordenadas de cinco ubicaciones");
assert.equal(map.backend.primary, "maplibre");
assert.equal(map.cost.generation_external_calls, 0);

const selfie = visual.plan("Editar esta foto como selfie manteniendo el mismo rostro");
assert.ok(selfie.routing.selected_skills.includes("face-identity"));
assert.ok(selfie.cost.generation_external_calls >= 1);

let semanticCalls = 0;
const custom = createVisualDesign({
  semanticRouter: async () => {
    semanticCalls++;
    return { routing:{ primary_skill:"poster-design", selected_skills:["poster-design","graphic-design"], confidence:0.9, needs_semantic_router:false, inferred_strategy:"hybrid" } };
  }
});
const ambiguous = await custom.planAsync("haz algo visual impactante");
assert.equal(semanticCalls, 1);
assert.equal(ambiguous.routing.primary_skill, "poster-design");
assert.equal(ambiguous.cost.planning_external_calls, 1);

const browser = createBrowserVisual();
const cached1 = await browser.planCached("mapa real con coordenadas");
const cached2 = await browser.planCached("mapa real con coordenadas");
assert.equal(cached1.cache_hit, false);
assert.equal(cached2.cache_hit, true);

const calls = [];
const gateway = createVisualGateway({
  executors:{
    openai: async ({request}) => { calls.push(request); return {kind:"image",provider:"test-openai"}; }
  }
});
const planForOverride = visual.plan('Diseña un logo editable para "TEST"');
assert.equal(planForOverride.backend.primary, "svg");
const response = await gateway.handleRequest(new Request("https://example.test/api/visual", {
  method:"POST",
  headers:{"content-type":"application/json"},
  body:JSON.stringify({action:"execute", plan:planForOverride, backend:"openai"})
}));
assert.equal(response.status, 200);
const body = await response.json();
assert.equal(body.ok, true);
assert.equal(body.outputs[0].backend, "openai");
assert.equal(calls[0].backend, "openai");
assert.ok(calls[0].prompt.includes("TEST"));

const handlers = createNextRouteHandlers(gateway);
assert.equal(typeof handlers.POST, "function");
const worker = createCloudflareWorker(gateway);
assert.equal(typeof worker.fetch, "function");

console.log("Web SDK tests OK");
