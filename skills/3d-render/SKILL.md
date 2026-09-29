---
name: 3d-render
description: Create 3D-render-like visuals with coherent camera, materials, geometry, lighting, environment, and physically plausible reflections.
---

# 3d-render

## Category
3d

## Default render strategy
generative

## Activate when
Create 3D-render-like visuals with coherent camera, materials, geometry, lighting, environment, and physically plausible reflections.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Define render intent: product, architecture, stylized, clay, technical.
- Keep material response coherent.
- Specify camera and world lighting.
- Use reference geometry controls when exact shape matters.

## QA focus
- geometry
- materials
- reflections
- camera
- lighting

## Related references
- references/render-strategies.md
- references/model-router.md
