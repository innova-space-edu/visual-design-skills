# Visual Design Skills

Modular visual-intelligence skills for EDUAI and compatible AI agents.

## v1.1

The suite now includes 66 specialist/core skills, low-cost routing prefiltering, backend capability metadata, CI validation, standardized evals, reusable examples, and EDUAI integration guidance.

## Runtime

```text
request
  -> cheap candidate prefilter
  -> visual-design-router
  -> RoutingResult + VisualBrief
  -> load selected specialist skills only
  -> backend selection
  -> prompt compiler / deterministic renderer
  -> visual-quality-control
  -> targeted repair
```

Exact text, data, formulas, coordinates, measurements, and mathematical/technical geometry are deterministic by default. Generative image models are used for appearance-centric tasks or as layers in hybrid workflows.

## Commands

```bash
npm run validate
npm run list
npm run route -- "haz un mapa real con coordenadas"
```

See:
- `docs/architecture.md`
- `docs/eduai-integration.md`
- `docs/authoring-guide.md`
- `registry.json`
- `references/capability-matrix.json`
