import { routeVisual } from "./route.js";
import { createVisualBrief, mergeBrief } from "./brief.js";
import { validateVisualBrief } from "./validate.js";
import { selectBackend } from "./select-backend.js";
import { compileBackendRequest } from "./compile.js";
import { SUITE_VERSION } from "./data.js";

function backendNames(selection) {
  if (selection.strategy === "deterministic") return [selection.primary];
  if (selection.strategy === "generative") return [selection.primary];
  return [selection.structure_backend, selection.image_backend];
}

function makePlan(input, options = {}, routingOverride, briefPatch) {
  const prompt = typeof input === "string" ? input : input?.prompt ?? "";
  const localRouting = routeVisual(prompt, options.router);
  const routing = routingOverride ? { ...localRouting, ...routingOverride } : localRouting;
  let brief = createVisualBrief(prompt, routing, {
    ...(options.brief ?? {}),
    context:{ ...(options.context ?? {}), ...(options.brief?.context ?? {}) }
  });
  if (briefPatch) brief = mergeBrief(brief, briefPatch);

  const validation = validateVisualBrief(brief);
  const backend = validation.valid ? selectBackend(brief, options.backendPolicy) : null;
  const requests = backend ? backendNames(backend).map(name => compileBackendRequest(brief, name)) : [];

  return {
    suite_version:SUITE_VERSION,
    prompt,
    routing,
    visual_brief:brief,
    validation,
    backend,
    requests,
    cost:{
      planning_external_calls:0,
      generation_external_calls:backend?.external_calls ?? 0,
      local_first:true
    }
  };
}

export function planVisual(input, options = {}) {
  return makePlan(input, options);
}

export async function planVisualAsync(input, options = {}) {
  let plan = makePlan(input, options);
  let semanticCalls = 0;
  let routingOverride;
  let briefPatch;

  if (plan.routing.needs_semantic_router && typeof options.semanticRouter === "function") {
    const semantic = await options.semanticRouter({
      prompt:plan.prompt,
      localRouting:plan.routing,
      context:options.context ?? {}
    });
    semanticCalls++;
    if (semantic?.routing) routingOverride = semantic.routing;
    if (semantic?.brief) briefPatch = semantic.brief;
    plan = makePlan(input, options, routingOverride, briefPatch);
  }

  if (typeof options.enrichBrief === "function") {
    const patch = await options.enrichBrief({
      prompt:plan.prompt,
      routing:plan.routing,
      brief:plan.visual_brief,
      context:options.context ?? {}
    });
    if (patch) plan = makePlan(input, options, plan.routing, patch);
  }

  plan.cost.planning_external_calls = semanticCalls;
  return plan;
}
