---
name: anime-general
description: "Create anime-inspired visuals by describing line work, cel shading, proportions, color treatment, era/medium, and camera language without requiring a named living artist. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "illustration"
  default-render-strategy: "generative"
---


# anime-general

## Category
illustration

## Default render strategy
generative

## Activate when
Create anime-inspired visuals by describing line work, cel shading, proportions, color treatment, era/medium, and camera language without requiring a named living artist.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Specify cel/soft/painted shading.
- Define eye/face/body proportion intentionally.
- Use consistent character sheet across sequences.
- Describe era/medium traits rather than a living artist imitation.

## QA focus
- character drift
- line/shading consistency
- anatomy
- palette

## Related references
- references/render-strategies.md
- references/model-router.md
