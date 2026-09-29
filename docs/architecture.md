# Architecture

The suite has four layers.

## 1. Discovery
`registry.json` exposes skill names, categories, paths and default rendering strategy. `routing/routing-catalog.json` is a cheap lexical prefilter.

## 2. Reasoning
`visual-design-router` is authoritative. It creates a `RoutingResult` and normalized `VisualBrief`.

## 3. Execution
Specialist skills define domain rules. The prompt compiler converts the brief into model-specific instructions or a deterministic render plan.

## 4. Verification
`visual-quality-control` evaluates hard invariants and soft visual criteria. Hard failures trigger a targeted repair.

### Authority classes

- **Hard authoritative:** numbers, formulas, dates, coordinates, dimensions, exact copy, identity constraints.
- **Structural authoritative:** topology, node/edge relations, panel order, room adjacency.
- **Aesthetic:** mood, texture, atmosphere, illustrative style.

Aesthetic generation must never silently override hard authoritative information.
