---
name: technical-floorplan
description: "Render dimensioned floor plans from supplied measurements using vector/CAD-like primitives and explicit scale. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "architecture/technical"
  default-render-strategy: "deterministic"
---


# technical-floorplan

## Category
architecture/technical

## Default render strategy
deterministic

## Activate when
Render dimensioned floor plans from supplied measurements using vector/CAD-like primitives and explicit scale.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Measurements are authoritative.
- Use consistent wall thickness/opening symbols.
- Show dimensions, units, scale, and labels.
- Reject impossible geometry rather than silently adjusting dimensions.

## QA focus
- dimension accuracy
- scale
- wall/opening geometry
- labels
- unit consistency

## Related references
- references/backends/svg.md
