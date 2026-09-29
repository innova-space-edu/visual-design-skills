import { createVisualGateway } from "../../../packages/server/index.js";
import { createCloudflareWorker } from "../../../adapters/cloudflare/index.js";

export default createCloudflareWorker(({ env }) => createVisualGateway({
  executors:{
    // flux: ({request, signal}) => callFluxWithSecret(env.FLUX_KEY, request, signal)
  },
  cors:["https://example.com"]
}));
