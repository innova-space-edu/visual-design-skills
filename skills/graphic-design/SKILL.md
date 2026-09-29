---
name: graphic-design
description: "Create general-purpose graphic layouts using hierarchy, grid, spacing, palette, typography, imagery, and brand constraints. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "design"
  default-render-strategy: "hybrid"
---


# graphic-design

## Category
design

## Default render strategy
hybrid

## Activate when
Create general-purpose graphic layouts using hierarchy, grid, spacing, palette, typography, imagery, and brand constraints.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Build layout before decorative generation.
- Use a grid and safe area.
- Keep hierarchy obvious at thumbnail size.
- Typeset dense copy deterministically.

## QA focus
- hierarchy
- alignment
- contrast
- text accuracy
- safe area

## Related references
- references/layout.md
- references/typography.md
