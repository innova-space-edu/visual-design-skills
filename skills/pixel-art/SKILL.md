---
name: pixel-art
description: "Create grid-aligned pixel art with explicit sprite/canvas size, palette limits, cluster discipline, and no unintended anti-aliasing. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "illustration"
  default-render-strategy: "deterministic"
---


# pixel-art

## Category
illustration

## Default render strategy
deterministic

## Activate when
Create grid-aligned pixel art with explicit sprite/canvas size, palette limits, cluster discipline, and no unintended anti-aliasing.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Specify native pixel dimensions.
- Limit palette intentionally.
- Keep edges on pixel grid.
- Disable smoothing when scaling.

## QA focus
- pixel grid
- palette
- silhouette
- no anti-aliasing

## Related references
- references/render-strategies.md
- references/model-router.md
