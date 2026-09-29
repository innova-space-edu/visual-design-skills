---
name: pattern-texture
description: Create seamless repeating patterns or material textures for backgrounds, textiles, packaging, UI, or 3D use. Use when seamless tiling or repeatability matters.
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.1.0"
---

# pattern-texture

## Default strategy
hybrid

## Activate for
- seamless patterns
- surface textures
- wallpaper
- textile repeats

## Workflow
1. Read the normalized VisualBrief.
2. Identify authoritative elements and editable elements.
3. Apply the specialist rules.
4. Produce a render/edit plan with acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Define tile dimensions and repeat type.
- Validate opposing edges for seamlessness.
- Keep motif scale consistent.
- For PBR-like textures, separate appearance from technical material maps unless generated deterministically.

## QA focus
- seam continuity
- repeat artifacts
- motif consistency
- resolution

## References
- references/render-strategies.md
- references/model-router.md
