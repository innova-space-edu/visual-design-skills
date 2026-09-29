export function createVisualClient({
  url = "/api/visual",
  fetchImpl = globalThis.fetch,
  headers = {}
} = {}) {
  if (typeof fetchImpl !== "function") throw new Error("fetch is unavailable");

  async function request(action, payload = {}) {
    const response = await fetchImpl(url, {
      method:"POST",
      headers:{ "content-type":"application/json", ...headers },
      body:JSON.stringify({ action, ...payload })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(data.error ?? "Visual gateway request failed");
      error.status = response.status;
      error.data = data;
      throw error;
    }
    return data;
  }

  return {
    plan(input, options) { return request("plan", { input, options }); },
    execute({ input, plan, backend, options, cache = true } = {}) {
      return request("execute", { input, plan, backend, options, cache });
    }
  };
}
