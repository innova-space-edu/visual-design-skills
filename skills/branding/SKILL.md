---
name: branding
description: "Create or extend a visual identity system: palette, typography roles, shapes, icon style, image language, spacing, and usage rules. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "design"
  default-render-strategy: "hybrid"
---


# branding

## Category
design

## Default render strategy
hybrid

## Activate when
Create or extend a visual identity system: palette, typography roles, shapes, icon style, image language, spacing, and usage rules.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Produce system rules, not just one image.
- Separate core identity from campaign variations.
- Check monochrome and light/dark contexts.
- Record reusable design tokens.

## QA focus
- system consistency
- color roles
- typography roles
- cross-format behavior

## Related references
- references/render-strategies.md
- references/model-router.md
