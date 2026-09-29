---
name: storyboard
description: "Create shot-by-shot storyboards with continuity, shot size, camera angle, action, dialogue/caption placeholders, and scene progression. Use for video, film, animation, advertising, or lesson-sequence planning. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "illustration/planning"
  default-render-strategy: "hybrid"
---


# storyboard

## Default strategy
hybrid

## Activate for
- video planning
- film shots
- animation sequence
- ad storyboard

## Workflow
1. Read the normalized VisualBrief.
2. Identify authoritative elements and editable elements.
3. Apply the specialist rules.
4. Produce a render/edit plan with acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Define shot list before rendering panels.
- Track character, prop, and spatial continuity.
- Record shot type and camera movement.
- Typeset shot notes/dialogue outside generated artwork.

## QA focus
- continuity
- shot order
- character state
- camera logic

## References
- references/render-strategies.md
- references/model-router.md
