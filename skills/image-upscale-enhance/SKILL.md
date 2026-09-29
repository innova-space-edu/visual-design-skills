---
name: image-upscale-enhance
description: Increase usable image resolution and perceived detail without changing subject identity, text, geometry, branding, or composition. Use for upscale, sharpen, enhance, super-resolution, denoise, or print-preparation requests.
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.1.0"
---

# image-upscale-enhance

## Default strategy
hybrid

## Activate for
- upscaling
- print preparation
- noise reduction
- detail enhancement

## Workflow
1. Read the normalized VisualBrief.
2. Identify authoritative elements and editable elements.
3. Apply the specialist rules.
4. Produce a render/edit plan with acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Preserve exact text and logos.
- Prefer conservative enhancement for documentary/scientific images.
- Avoid fabricated microdetail that changes factual content.
- Report target dimensions or scale factor.

## QA focus
- identity
- text/logo fidelity
- edge artifacts
- oversharpening

## References
- references/render-strategies.md
- references/model-router.md
