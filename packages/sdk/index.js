import {
  SUITE_VERSION,
  routeVisual,
  createVisualBrief,
  validateVisualBrief,
  selectBackend,
  compileBackendRequest,
  planVisual,
  planVisualAsync,
  createCacheKey
} from "../core/index.js";

export function createVisualDesign(config = {}) {
  const defaultContext = config.defaultContext ?? {};
  const backendPolicy = config.backendPolicy ?? {};

  const mergeOptions = (options = {}) => ({
    ...options,
    context:{ ...defaultContext, ...(options.context ?? {}) },
    backendPolicy:{ ...backendPolicy, ...(options.backendPolicy ?? {}) }
  });

  return {
    version:SUITE_VERSION,
    route(input, options = {}) {
      const prompt = typeof input === "string" ? input : input?.prompt ?? "";
      return routeVisual(prompt, options);
    },
    createBrief(input, routing, options = {}) {
      return createVisualBrief(input, routing, { ...options, context:{ ...defaultContext, ...(options.context ?? {}) } });
    },
    validateBrief:validateVisualBrief,
    selectBackend(brief, policy = {}) {
      return selectBackend(brief, { ...backendPolicy, ...policy });
    },
    compile:compileBackendRequest,
    plan(input, options = {}) {
      return planVisual(input, mergeOptions(options));
    },
    async planAsync(input, options = {}) {
      let context = { ...defaultContext, ...(options.context ?? {}) };
      if (typeof config.contextProvider === "function") {
        const extra = await config.contextProvider({ input, context });
        if (extra) context = { ...context, ...extra };
      }
      return planVisualAsync(input, {
        ...mergeOptions(options),
        context,
        semanticRouter: options.semanticRouter ?? config.semanticRouter,
        enrichBrief: options.enrichBrief ?? config.enrichBrief
      });
    },
    cacheKey:createCacheKey
  };
}

export const visual = createVisualDesign();
export * from "../core/index.js";
