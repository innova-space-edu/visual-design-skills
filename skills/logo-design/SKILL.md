---
name: logo-design
description: Design simple, scalable marks and wordmarks intended for editable vector output and multi-size use.
---

# logo-design

## Category
design

## Default render strategy
deterministic

## Activate when
Design simple, scalable marks and wordmarks intended for editable vector output and multi-size use.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Prefer vector-first construction.
- Avoid fine detail that collapses at small sizes.
- Test monochrome, inverse, and icon-only states.
- Do not rely on diffusion-generated lettering for final wordmarks.

## QA focus
- silhouette
- scalability
- wordmark accuracy
- monochrome behavior

## Related references
- references/backends/svg.md
- references/backends/recraft.md
