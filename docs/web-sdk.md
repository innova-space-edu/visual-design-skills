# Web SDK v1.3

The SDK is local-first. Routing, brief creation, validation, backend selection and prompt compilation run without an AI API call.

## Immediate use from GitHub

```bash
npm install github:innova-space-edu/visual-design-skills
```

```js
import { visual } from "@innova-space/visual-design";

const plan = visual.plan("Crea una infografía del sistema solar");
console.log(plan.routing.selected_skills);
console.log(plan.backend);
console.log(plan.cost);
```

## Browser/CDN

The source modules are browser-safe and use relative imports. A page can load the SDK from a static CDN:

```html
<script type="module">
  import { visual } from "https://cdn.jsdelivr.net/gh/innova-space-edu/visual-design-skills@main/packages/sdk/index.js";
  const plan = visual.plan("mapa real con coordenadas");
  console.log(plan);
</script>
```

For production, pin a release/tag instead of `main`.

## Zero-provider-call planning

`visual.plan()` performs:
- intent prefiltering;
- skill selection;
- VisualBrief construction;
- deterministic/hybrid/generative strategy selection;
- backend selection;
- compilation.

It reports `cost.planning_external_calls = 0`.

## Ambiguous requests

Use `planAsync()` with an optional semantic fallback. The fallback is called only when local confidence is below the configured threshold:

```js
const visual = createVisualDesign({
  semanticRouter: async ({ prompt, localRouting }) => {
    // Call your cheapest semantic model here only when needed.
    return { routing: { /* override */ } };
  }
});
```

## Browser + secure gateway

Never put image-provider API keys in the browser.

```js
import { createBrowserVisual } from "@innova-space/visual-design/browser";
const visual = createBrowserVisual({ gatewayUrl:"/api/visual" });

const plan = await visual.planCached("retrato editorial");
const result = await visual.execute("retrato editorial", { plan });
```

The gateway is provider-agnostic. See `docs/provider-contract.md`.
