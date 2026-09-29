# Visual Design Skills

General-purpose visual intelligence skills and a local-first Web SDK.

## v1.3

The project now has two layers:

1. **General Visual Design SDK** — reusable from any website/app.
2. **EDUAI adapter contract** — EDUAI can add curriculum, memory, provider policy and educational context without modifying the generic core.

## Lowest-cost path

```text
web request
  -> local router            $0 provider calls
  -> VisualBrief             $0
  -> validation              $0
  -> backend selection       $0
  -> compile                 $0
  -> deterministic render    can remain $0
  -> image provider          only when the job actually needs generation
```

The optional semantic router is invoked only for low-confidence requests.

## Install now

```bash
npm install github:innova-space-edu/visual-design-skills
```

```js
import { visual } from "@innova-space/visual-design";
const plan = visual.plan("Haz una infografía educativa");
```

## Entry points

- `@innova-space/visual-design` — unified SDK
- `@innova-space/visual-design/core` — pure browser-safe primitives
- `@innova-space/visual-design/browser` — cache + gateway client
- `@innova-space/visual-design/server` — secure generic gateway
- `@innova-space/visual-design/nextjs` — Route Handler adapter
- `@innova-space/visual-design/cloudflare` — Worker adapter

The runtime has no external package dependencies.

See `docs/web-sdk.md`, `docs/provider-contract.md`, and `docs/eduai-adapter-contract.md`.
