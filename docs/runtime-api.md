# Runtime API

The suite includes dependency-free Node.js helpers for EDUAI.

## Validate VisualBrief
```bash
npm run validate:brief -- examples/poster.json
```

## Select backend
```bash
npm run select:backend -- examples/selfie-identity.json
```

The selector uses rendering strategy, visual type, authoritative identity/geometry/data, exact text, and the capability matrix. It is a routing aid rather than a model-quality benchmark.

## Compile backend request
```bash
npm run compile -- flux examples/selfie-identity.json
npm run compile -- svg examples/technical-floorplan.json
```

Generative backends receive normalized prompts and backend-specific rules. Deterministic backends receive the authoritative VisualBrief.

Recommended production contract:
`RoutingResult -> VisualBrief -> validation -> backend selection -> BackendRequest -> execution -> VisualQualityReport`.
