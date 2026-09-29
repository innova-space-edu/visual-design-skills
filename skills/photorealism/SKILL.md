---
name: photorealism
description: "Produce physically plausible photographic appearance using coherent camera, optics, lighting, materials, texture, and depth cues. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "photography"
  default-render-strategy: "generative"
---


# photorealism

## Category
photography

## Default render strategy
generative

## Activate when
Produce physically plausible photographic appearance using coherent camera, optics, lighting, materials, texture, and depth cues.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Specify plausible lens/focal behavior rather than generic '8K'.
- Keep light direction and shadows consistent.
- Retain surface microtexture.
- Avoid contradictory depth-of-field instructions.

## QA focus
- physical plausibility
- materials
- depth of field
- lighting
- texture

## Related references
- references/render-strategies.md
- references/model-router.md
