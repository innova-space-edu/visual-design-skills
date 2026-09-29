export function createCloudflareWorker(gatewayOrFactory) {
  return {
    async fetch(request, env, ctx) {
      const gateway = typeof gatewayOrFactory === "function"
        ? await gatewayOrFactory({ env, ctx, request })
        : gatewayOrFactory;
      if (!gateway?.handleRequest) return new Response(JSON.stringify({ error:"gateway_unavailable" }), { status:500, headers:{ "content-type":"application/json" } });
      return gateway.handleRequest(request, { env, ctx });
    }
  };
}
