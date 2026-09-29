import { createVisualDesign } from "../sdk/index.js";
import { createCacheKey } from "../core/index.js";

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers:{ "content-type":"application/json; charset=utf-8", ...headers }
  });
}

function corsHeaders(request, cors) {
  if (!cors) return {};
  const origin = request.headers.get("origin") ?? "";
  const allowed = cors === "*" || cors === true || (Array.isArray(cors) && cors.includes(origin));
  if (!allowed) return {};
  return {
    "access-control-allow-origin": cors === "*" || cors === true ? "*" : origin,
    "access-control-allow-methods":"POST, OPTIONS",
    "access-control-allow-headers":"content-type, authorization"
  };
}

function executionRequests(plan, backend) {
  const requests = plan?.requests ?? [];
  return backend ? requests.filter(x => x.backend === backend) : requests;
}

function cacheable(plan) {
  const brief = plan?.visual_brief;
  if (!brief) return false;
  if (brief.identity?.authoritative) return false;
  if ((brief.references ?? []).length) return false;
  return true;
}

export function createVisualGateway({
  executors = {},
  authorize,
  rateLimit,
  cache,
  cors,
  maxBodyChars = 250000,
  visualConfig = {}
} = {}) {
  const visual = createVisualDesign(visualConfig);

  async function handleRequest(request, context = {}) {
    const corsH = corsHeaders(request, cors);
    if (request.method === "OPTIONS") return new Response(null, { status:204, headers:corsH });
    if (request.method !== "POST") return json({ error:"method_not_allowed" }, 405, corsH);

    if (authorize) {
      const auth = await authorize({ request, context });
      if (auth instanceof Response) return auth;
      if (auth === false) return json({ error:"unauthorized" }, 401, corsH);
    }
    if (rateLimit) {
      const limited = await rateLimit({ request, context });
      if (limited instanceof Response) return limited;
      if (limited === false) return json({ error:"rate_limited" }, 429, corsH);
    }

    const text = await request.text();
    if (text.length > maxBodyChars) return json({ error:"payload_too_large" }, 413, corsH);
    let body;
    try { body = JSON.parse(text || "{}"); }
    catch { return json({ error:"invalid_json" }, 400, corsH); }

    if (body.action === "plan") {
      const plan = await visual.planAsync(body.input ?? "", body.options ?? {});
      return json({ ok:true, plan }, 200, corsH);
    }

    if (body.action !== "execute") return json({ error:"invalid_action", allowed:["plan","execute"] }, 400, corsH);
    const plan = body.plan ?? await visual.planAsync(body.input ?? "", body.options ?? {});
    if (!plan.validation?.valid) return json({ error:"invalid_plan", plan }, 422, corsH);

    const key = createCacheKey({ prompt:plan.prompt, backend:body.backend ?? null, brief:plan.visual_brief }, "result");
    if (cache && body.cache !== false && cacheable(plan)) {
      const hit = await cache.get(key);
      if (hit) return json({ ok:true, cache_hit:true, ...hit }, 200, corsH);
    }

    const outputs = [];
    const pending = [];
    for (const req of executionRequests(plan, body.backend)) {
      const executor = executors[req.backend];
      if (!executor) { pending.push(req); continue; }
      const fn = typeof executor === "function" ? executor : executor.execute;
      if (typeof fn !== "function") { pending.push(req); continue; }
      const result = await fn({ request:req, plan, context, signal:request.signal });
      outputs.push({ backend:req.backend, result });
    }

    const payload = { plan, outputs, pending };
    if (cache && body.cache !== false && cacheable(plan) && pending.length === 0) await cache.set(key, payload);
    return json({ ok:true, cache_hit:false, ...payload }, 200, corsH);
  }

  return { visual, handleRequest };
}
