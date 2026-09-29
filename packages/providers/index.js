export { createOpenAIImageExecutor } from "./openai.js";
export { createBFLImageExecutor } from "./bfl.js";
export { createSvgExecutor, renderSvgPreview } from "./svg.js";

export function providerStatus(env = {}) {
  return {
    openai:Boolean(env.OPENAI_API_KEY),
    bfl:Boolean(env.BFL_API_KEY),
    svg:true,
    public_generation:Boolean(env.ALLOW_PUBLIC_GENERATION === "true"),
    access_token_required:Boolean(env.DEMO_ACCESS_TOKEN)
  };
}
