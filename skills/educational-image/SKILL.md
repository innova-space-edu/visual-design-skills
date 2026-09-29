---
name: educational-image
description: "Create age-appropriate instructional visuals that prioritize conceptual clarity, curriculum-relevant labels, and low cognitive clutter. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "education"
  default-render-strategy: "hybrid"
---


# educational-image

## Category
education

## Default render strategy
hybrid

## Activate when
Create age-appropriate instructional visuals that prioritize conceptual clarity, curriculum-relevant labels, and low cognitive clutter.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Define learning objective and learner level.
- Represent the concept before decoration.
- Use labels and examples that match the intended curriculum context.
- Do not imply scientific/mathematical accuracy from decorative art.

## QA focus
- concept accuracy
- age appropriateness
- label clarity
- cognitive load

## Related references
- references/render-strategies.md
- references/model-router.md
