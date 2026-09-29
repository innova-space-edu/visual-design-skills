---
name: icon-design
description: "Create consistent icon families with controlled stroke, corner, optical weight, grid, and semantic clarity. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "design"
  default-render-strategy: "deterministic"
---


# icon-design

## Category
design

## Default render strategy
deterministic

## Activate when
Create consistent icon families with controlled stroke, corner, optical weight, grid, and semantic clarity.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Use a shared icon grid.
- Keep stroke/filled style consistent.
- Align optical rather than only geometric centers.
- Test at target pixel sizes.

## QA focus
- pixel clarity
- stroke consistency
- semantic recognition
- family consistency

## Related references
- references/backends/svg.md
