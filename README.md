# Visual Design Skills

Modular visual-intelligence skills for EDUAI and compatible AI agents.

## v1.2

The suite contains 66 skills with standardized frontmatter, progressive disclosure, low-cost routing, deterministic/hybrid/generative execution rules, backend capability selection, runtime brief validation, backend request compilation, CI and evals.

```text
request
 -> candidate prefilter
 -> visual-design-router
 -> RoutingResult + VisualBrief
 -> load selected specialist skills only
 -> validate brief
 -> select backend(s)
 -> compile BackendRequest / deterministic plan
 -> execute
 -> visual-quality-control
 -> targeted repair
```

Exact text, data, formulas, coordinates, measurements, and mathematical/technical geometry are deterministic by default.

## Commands
```bash
npm run validate
npm run list
npm run route -- "haz un mapa real con coordenadas"
npm run validate:brief -- examples/poster.json
npm run select:backend -- examples/selfie-identity.json
npm run compile -- flux examples/selfie-identity.json
```

See `docs/architecture.md`, `docs/eduai-integration.md`, `docs/authoring-guide.md`, and `docs/runtime-api.md`.
