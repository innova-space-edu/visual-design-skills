---
name: coloring-page
description: Create clean printable coloring pages with closed contours, controlled line weight, minimal shading, and age-appropriate complexity.
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.1.0"
---

# coloring-page

## Default strategy
deterministic

## Activate for
- coloring sheets
- line-art worksheets
- children's printable art

## Workflow
1. Read the normalized VisualBrief.
2. Identify authoritative elements and editable elements.
3. Apply the specialist rules.
4. Produce a render/edit plan with acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Use high-contrast line art on white.
- Avoid gray shading unless requested.
- Keep closed regions colorable.
- Match detail density to age group and print size.

## QA focus
- closed contours
- line clarity
- print margins
- age complexity

## References
- references/render-strategies.md
- references/model-router.md
