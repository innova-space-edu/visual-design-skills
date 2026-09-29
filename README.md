# Visual Design Skills

General-purpose visual intelligence skills, local-first Web SDK, provider executors, and a standalone integration demo.

## v1.5

The runtime compiles compact guidance from only the selected specialist skills. The package builds this index from the SKILL.md files during installation, so prompts get domain-specific rules without injecting all skills.\n\nThe repo can now test the complete path before EDUAI:

```text
prompt
 -> local route/plan ($0)
 -> VisualBrief
 -> backend selection
 -> secure server executor
 -> SVG / OpenAI Images / FLUX
 -> result
```

### Built-in executors
- SVG deterministic preview — no API key / no provider cost
- OpenAI Images generation — server-side key
- Black Forest Labs FLUX.2 — server-side key with async polling

### Demo
Open `/` after deploying to Vercel. Planning runs locally in the browser; generation calls `/api/visual`.

### Install
```bash
npm install github:innova-space-edu/visual-design-skills
```

### General SDK
```js
import { visual } from "@innova-space/visual-design";
const plan = visual.plan('Diseña un logo editable para "Innova Lab"');
```

See `docs/web-sdk.md`, `docs/providers-and-demo.md`, and `.env.example`.
