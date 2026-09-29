---
name: technical-drawing
description: Create precise schematics, sections, elevations, exploded views, dimensioned drawings, or engineering-style diagrams.
---

# technical-drawing

## Category
technical

## Default render strategy
deterministic

## Activate when
Create precise schematics, sections, elevations, exploded views, dimensioned drawings, or engineering-style diagrams.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Use vector primitives and explicit dimensions.
- Separate visible/hidden/center lines when relevant.
- Use standard-ish conventions consistently within the artifact.
- Mark conceptual drawings as non-fabrication-ready when tolerances/specs are missing.

## QA focus
- dimensions
- line conventions
- labels
- view consistency

## Related references
- references/backends/svg.md
