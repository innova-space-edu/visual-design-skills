import { createVisualGateway } from "../../../packages/server/index.js";
import { createNextRouteHandlers } from "../../../adapters/nextjs/index.js";

const gateway = createVisualGateway({
  executors:{
    // openai: async ({request}) => providerCall(request)
  },
  authorize: async ({request}) => Boolean(request.headers.get("authorization"))
});

export const { POST, OPTIONS } = createNextRouteHandlers(gateway);
