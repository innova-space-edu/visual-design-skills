---
name: physics-diagram
description: Create physics diagrams with explicit vectors, forces, rays, fields, trajectories, circuits, units, and reference frames.
---

# physics-diagram

## Category
education/physics

## Default render strategy
deterministic

## Activate when
Create physics diagrams with explicit vectors, forces, rays, fields, trajectories, circuits, units, and reference frames.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Define coordinate/reference frame.
- Use vector arrow direction and magnitude conventions consistently.
- Typeset units/formulas deterministically.
- Separate conceptual not-to-scale drawings from scaled diagrams.

## QA focus
- vector direction
- units
- labels
- reference frame
- scale claims

## Related references
- references/backends/svg.md
