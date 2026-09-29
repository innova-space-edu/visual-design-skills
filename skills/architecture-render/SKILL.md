---
name: architecture-render
description: "Create architectural visualization while preserving supplied massing, openings, perspective, and material intent. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "architecture"
  default-render-strategy: "hybrid"
---


# architecture-render

## Category
architecture

## Default render strategy
hybrid

## Activate when
Create architectural visualization while preserving supplied massing, openings, perspective, and material intent.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Treat source geometry as authoritative when supplied.
- Use depth/edge controls when available.
- Separate design visualization from construction documentation.
- Keep materials and sun direction coherent.

## QA focus
- massing
- window/door placement
- perspective
- materials
- shadow

## Related references
- references/render-strategies.md
- references/model-router.md
