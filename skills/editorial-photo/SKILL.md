---
name: editorial-photo
description: "Create fashion/editorial photography with art direction, styling, set design, controlled pose, and magazine-grade composition. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "photography"
  default-render-strategy: "generative"
---


# editorial-photo

## Category
photography

## Default render strategy
generative

## Activate when
Create fashion/editorial photography with art direction, styling, set design, controlled pose, and magazine-grade composition.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Define editorial concept before styling.
- Coordinate wardrobe, background, palette, and lighting.
- Reserve negative space when copy will be overlaid.
- Preserve garment/product details when they are the subject.

## QA focus
- art direction
- wardrobe integrity
- pose
- copy safe area

## Related references
- references/render-strategies.md
- references/model-router.md
