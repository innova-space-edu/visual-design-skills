import { createVisualDesign } from "../sdk/index.js";
import { createMemoryCache, createLocalStorageCache } from "./cache.js";
import { createVisualClient } from "./client.js";

export function createBrowserVisual({
  gatewayUrl,
  fetchImpl,
  cache = createMemoryCache(),
  ...sdkConfig
} = {}) {
  const local = createVisualDesign(sdkConfig);
  const client = gatewayUrl ? createVisualClient({ url:gatewayUrl, fetchImpl }) : null;

  return {
    ...local,
    async planCached(input, options = {}) {
      const key = local.cacheKey({ input, options }, "plan");
      const hit = await cache.get(key);
      if (hit) return { ...hit, cache_hit:true };
      const plan = await local.planAsync(input, options);
      await cache.set(key, plan);
      return { ...plan, cache_hit:false };
    },
    async execute(input, options = {}) {
      if (!client) throw new Error("gatewayUrl is required for server-side execution");
      const plan = options.plan ?? await local.planAsync(input, options);
      return client.execute({ input, plan, backend:options.backend, options:options.executeOptions, cache:options.cache !== false });
    },
    gateway:client,
    cache
  };
}

export { createMemoryCache, createLocalStorageCache, createVisualClient };
export * from "../sdk/index.js";
