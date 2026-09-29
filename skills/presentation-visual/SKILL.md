---
name: presentation-visual
description: Create slide-ready visual assets such as hero illustrations, process diagrams, section dividers, data graphics, and branded backgrounds. Use for visuals intended for presentations, not for authoring the whole slide deck.
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.1.0"
---

# presentation-visual

## Default strategy
hybrid

## Activate for
- presentation hero images
- slide diagrams
- section graphics
- slide backgrounds

## Workflow
1. Read the normalized VisualBrief.
2. Identify authoritative elements and editable elements.
3. Apply the specialist rules.
4. Produce a render/edit plan with acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Respect slide aspect ratio and safe regions.
- Provide negative space for slide text when requested.
- Avoid embedding dense copy into generated pixels.
- Keep brand system consistent across a deck.

## QA focus
- safe area
- brand consistency
- text-free regions
- aspect ratio

## References
- references/render-strategies.md
- references/model-router.md
