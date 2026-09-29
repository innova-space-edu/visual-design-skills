function sleep(ms, signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    if (signal) {
      if (signal.aborted) { clearTimeout(timer); reject(signal.reason ?? new Error("Aborted")); return; }
      signal.addEventListener("abort", () => { clearTimeout(timer); reject(signal.reason ?? new Error("Aborted")); }, { once:true });
    }
  });
}

function clamp16(value, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(64, Math.min(2048, Math.round(n / 16) * 16));
}

function dimensions(brief) {
  let width = clamp16(brief?.output?.width, 1024);
  let height = clamp16(brief?.output?.height, 1024);
  const maxPixels = 2_000_000;
  if (width * height > maxPixels) {
    const scale = Math.sqrt(maxPixels / (width * height));
    width = clamp16(width * scale, 1024);
    height = clamp16(height * scale, 1024);
  }
  return { width, height };
}

export function createBFLImageExecutor({
  apiKey,
  fetchImpl = globalThis.fetch,
  model = "flux-2-pro",
  baseUrl = "https://api.bfl.ai/v1",
  pollIntervalMs = 800,
  maxWaitMs = 120000
} = {}) {
  if (!apiKey) throw new Error("BFL_API_KEY is required");
  if (typeof fetchImpl !== "function") throw new Error("fetch is unavailable");

  return async function executeBFL({ request, plan, signal }) {
    const { width, height } = dimensions(plan?.visual_brief ?? {});
    const response = await fetchImpl(baseUrl + "/" + model, {
      method:"POST",
      headers:{
        "accept":"application/json",
        "content-type":"application/json",
        "x-key":apiKey
      },
      body:JSON.stringify({ prompt:request.prompt, width, height }),
      signal
    });
    const submitted = await response.json();
    if (!response.ok) throw new Error("bfl: " + (submitted?.detail ?? submitted?.message ?? response.statusText));
    if (!submitted?.polling_url) throw new Error("BFL returned no polling_url");

    const started = Date.now();
    let last;
    while (Date.now() - started < maxWaitMs) {
      const poll = await fetchImpl(submitted.polling_url, { headers:{accept:"application/json"}, signal });
      last = await poll.json();
      if (!poll.ok) throw new Error("bfl polling: " + (last?.detail ?? poll.statusText));
      if (last?.status === "Ready") {
        const url = last?.result?.sample;
        if (!url) throw new Error("BFL result is Ready but no image URL was returned");
        return {
          kind:"image",
          provider:"bfl",
          model,
          url,
          width,
          height,
          task_id:submitted.id ?? null,
          note:"BFL result URLs are temporary; persist the image in your own storage for production use."
        };
      }
      if (["Error","Failed","Request Moderated","Content Moderated"].includes(last?.status)) {
        throw new Error("BFL generation failed: " + last.status);
      }
      await sleep(pollIntervalMs, signal);
    }
    const error = new Error("BFL generation timed out before Ready");
    error.details = last;
    throw error;
  };
}
