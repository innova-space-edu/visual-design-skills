---
name: image-compositing
description: Combine multiple source images into one coherent composition with explicit layer roles, perspective, scale, lighting, occlusion, and color matching. Use for montage, photomontage, scene assembly, or multi-source composition.
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.1.0"
---

# image-compositing

## Default strategy
hybrid

## Activate for
- photomontage
- multi-source scene
- layered composition
- subject insertion

## Workflow
1. Read the normalized VisualBrief.
2. Identify authoritative elements and editable elements.
3. Apply the specialist rules.
4. Produce a render/edit plan with acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Assign a role to every source image.
- Match perspective and scale before color grading.
- Preserve source identities/products.
- Resolve shadows and occlusion after placement.

## QA focus
- perspective
- scale
- lighting match
- edge integration
- identity

## References
- references/render-strategies.md
- references/model-router.md
