---
name: math-diagram
description: Construct mathematically correct diagrams using coordinates, primitives, transformations, labels, and formulas as deterministic geometry.
---

# math-diagram

## Category
education/math

## Default render strategy
deterministic

## Activate when
Construct mathematically correct diagrams using coordinates, primitives, transformations, labels, and formulas as deterministic geometry.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Compute geometry before rendering.
- Store coordinates and transformation parameters.
- Use LaTeX/SVG text for formulas.
- Never accept a visually plausible but mathematically invalid construction.

## QA focus
- coordinate correctness
- transformation correctness
- labels
- formula accuracy

## Related references
- references/backends/svg.md
