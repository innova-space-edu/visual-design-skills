---
name: vector-illustration
description: "Create editable vector illustrations with clean paths, controlled layers, flat/gradient color systems, and scalable composition. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "design"
  default-render-strategy: "deterministic"
---


# vector-illustration

## Category
design

## Default render strategy
deterministic

## Activate when
Create editable vector illustrations with clean paths, controlled layers, flat/gradient color systems, and scalable composition.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Prefer semantic groups/layers.
- Minimize unnecessary path complexity.
- Use consistent stroke joins/caps.
- Keep text as editable text when possible.

## QA focus
- path cleanliness
- scalability
- layer semantics
- color consistency

## Related references
- references/backends/svg.md
- references/backends/recraft.md
