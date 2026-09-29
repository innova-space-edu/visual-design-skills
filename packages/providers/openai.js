function apiError(provider, response, body) {
  const message = body?.error?.message || body?.message || response.statusText || "Provider request failed";
  const error = new Error(provider + ": " + message);
  error.provider = provider;
  error.status = response.status;
  error.details = body;
  return error;
}

function mimeFor(format) {
  if (format === "jpeg") return "image/jpeg";
  if (format === "png") return "image/png";
  return "image/webp";
}

export function createOpenAIImageExecutor({
  apiKey,
  fetchImpl = globalThis.fetch,
  model = "gpt-image-2.5-flare",
  quality = "low",
  size = "1024x1024",
  outputFormat = "webp",
  baseUrl = "https://api.openai.com/v1"
} = {}) {
  if (!apiKey) throw new Error("OPENAI_API_KEY is required");
  if (typeof fetchImpl !== "function") throw new Error("fetch is unavailable");

  return async function executeOpenAI({ request, plan, signal }) {
    if ((plan?.visual_brief?.references ?? []).length) {
      throw new Error("OpenAI demo executor currently supports text-to-image only; image-edit references require an edit executor.");
    }

    const brief = plan?.visual_brief ?? {};
    const requested = brief.output ?? {};
    const format = ["png","jpeg","webp"].includes(requested.format) ? requested.format : outputFormat;
    const requestedSize = requested.width && requested.height
      ? String(requested.width) + "x" + String(requested.height)
      : size;

    const body = {
      model,
      prompt:request.prompt,
      n:1,
      size:requestedSize,
      quality,
      output_format:format
    };
    if (requested.background === "transparent") body.background = "transparent";

    const response = await fetchImpl(baseUrl + "/images/generations", {
      method:"POST",
      headers:{
        "authorization":"Bearer " + apiKey,
        "content-type":"application/json"
      },
      body:JSON.stringify(body),
      signal
    });

    let data;
    try { data = await response.json(); }
    catch { data = { message:await response.text().catch(()=>"") }; }
    if (!response.ok) throw apiError("openai", response, data);

    const item = data?.data?.[0];
    if (!item?.b64_json && !item?.url) throw new Error("OpenAI returned no image payload");
    const mime = mimeFor(data.output_format ?? format);

    return {
      kind:"image",
      provider:"openai",
      model,
      mime_type:mime,
      data_url:item.b64_json ? "data:" + mime + ";base64," + item.b64_json : undefined,
      url:item.url,
      revised_prompt:item.revised_prompt,
      size:data.size ?? requestedSize,
      quality:data.quality ?? quality,
      output_format:data.output_format ?? format,
      usage:data.usage ?? null
    };
  };
}
