---
name: isometric-illustration
description: "Create isometric scenes, diagrams, rooms, cities, devices, or educational illustrations with consistent isometric projection and scale. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "illustration/technical"
  default-render-strategy: "hybrid"
---


# isometric-illustration

## Default strategy
hybrid

## Activate for
- isometric rooms
- isometric maps
- isometric process diagrams
- isometric product scenes

## Workflow
1. Read the normalized VisualBrief.
2. Identify authoritative elements and editable elements.
3. Apply the specialist rules.
4. Produce a render/edit plan with acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Maintain one projection convention across the scene.
- Keep parallel axes consistent.
- Use deterministic labels when present.
- Avoid mixing perspective vanishing points with isometric projection.

## QA focus
- axis consistency
- scale
- occlusion
- label placement

## References
- references/render-strategies.md
- references/model-router.md
