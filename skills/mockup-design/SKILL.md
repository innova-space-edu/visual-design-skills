---
name: mockup-design
description: "Create presentation mockups for packaging, posters, screens, devices, apparel, books, signage, or branded objects while preserving artwork proportions and placement. Use for realistic product/application previews. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "design"
  default-render-strategy: "hybrid"
---


# mockup-design

## Default strategy
hybrid

## Activate for
- device mockups
- packaging mockups
- poster/signage previews
- book/apparel previews

## Workflow
1. Read the normalized VisualBrief.
2. Identify authoritative elements and editable elements.
3. Apply the specialist rules.
4. Produce a render/edit plan with acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Keep source artwork unwarped except for intentional perspective mapping.
- Separate print artwork from scene render.
- Respect bleed/safe areas where relevant.
- Use physically plausible folds/reflections.

## QA focus
- artwork fidelity
- perspective mapping
- material realism
- edge clipping

## References
- references/render-strategies.md
- references/model-router.md
