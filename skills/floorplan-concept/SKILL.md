---
name: floorplan-concept
description: "Create conceptual room/floor layouts emphasizing zoning, adjacency, circulation, and furniture planning. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "architecture"
  default-render-strategy: "hybrid"
---


# floorplan-concept

## Category
architecture

## Default render strategy
hybrid

## Activate when
Create conceptual room/floor layouts emphasizing zoning, adjacency, circulation, and furniture planning.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Treat as concept unless exact dimensions are supplied and deterministically rendered.
- Represent room adjacency and circulation first.
- Use vector geometry for walls/openings when possible.
- Never imply permitting/construction accuracy without verified dimensions.

## QA focus
- adjacency
- circulation
- door conflicts
- furniture scale
- dimension status

## Related references
- references/render-strategies.md
- references/model-router.md
