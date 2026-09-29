# Provider / executor contract

The repository does not force a provider SDK. A server registers executors by backend name.

```js
import { createVisualGateway } from "@innova-space/visual-design/server";

const gateway = createVisualGateway({
  executors:{
    openai: async ({ request, plan, signal }) => {
      // Use your server-side provider client here.
      // request.prompt already contains the compiled visual instructions.
      return { url:"https://your-storage/result.png" };
    },
    svg: async ({ request }) => {
      // Render request.visual_brief deterministically.
      return { svg:"<svg>...</svg>" };
    }
  }
});
```

An executor receives:
- the compiled backend request;
- the complete plan;
- request abort signal;
- adapter context.

Secrets stay in the server environment. The browser only sees the gateway.

## Cache policy

Result caching is opt-in. The generic gateway refuses to cache jobs with authoritative identity or image references. This prevents the default cache from reusing personalized visual material.

## Cost policy

- local route/plan/compile: zero provider calls;
- deterministic SVG/MapLibre/Vega-Lite: can remain zero provider calls;
- generative: normally one provider call;
- semantic fallback: zero by default, one only when configured and local routing is uncertain.
