---
name: ui-visual-design
description: "Design static UI screens, dashboards, app mockups, component visuals, and interface concepts with layout hierarchy, spacing, accessibility, and state clarity. Use for visual UI concepts rather than executable frontend code. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "design/ui"
  default-render-strategy: "deterministic"
---


# ui-visual-design

## Default strategy
deterministic

## Activate for
- app screens
- dashboard mockups
- web UI concepts
- component visual systems

## Workflow
1. Read the normalized VisualBrief.
2. Identify authoritative elements and editable elements.
3. Apply the specialist rules.
4. Produce a render/edit plan with acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Use grid, spacing scale, typography roles, and component states.
- Keep controls recognizable and accessible.
- Use deterministic text.
- Deliver editable structured layout when possible.

## QA focus
- alignment
- contrast
- component consistency
- text accuracy
- state clarity

## References
- references/layout.md
- references/accessibility.md
