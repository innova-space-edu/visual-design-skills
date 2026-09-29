---
name: photo-restoration
description: Restore damaged, faded, scratched, noisy, low-resolution, or aged photographs while preserving identity, era, composition, and documentary content. Use whenever the user asks to restore, repair, clean, denoise, deblur, recolor, or recover an old photo.
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.1.0"
---

# photo-restoration

## Default strategy
hybrid

## Activate for
- old/damaged photos
- scratches, dust, fading, blur, noise
- optional colorization

## Workflow
1. Read the normalized VisualBrief.
2. Identify authoritative elements and editable elements.
3. Apply the specialist rules.
4. Produce a render/edit plan with acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Preserve faces, clothing, objects, framing, and historically relevant content.
- Repair defects locally before global restyling.
- Colorization must be presented as interpretive unless reliable color references exist.
- Do not invent missing facial detail when uncertainty is high.

## QA focus
- identity preservation
- artifact removal
- hallucinated detail
- era consistency

## References
- references/render-strategies.md
- references/model-router.md
