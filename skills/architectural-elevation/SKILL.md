---
name: architectural-elevation
description: Create elevation/section-style architectural visuals from supplied geometry with controlled orthographic projection, openings, levels, and annotations. Use for conceptual architectural presentation; exact construction documentation requires verified source dimensions.
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.1.0"
---

# architectural-elevation

## Default strategy
deterministic

## Activate for
- building elevations
- sections
- facade studies
- orthographic architecture

## Workflow
1. Read the normalized VisualBrief.
2. Identify authoritative elements and editable elements.
3. Apply the specialist rules.
4. Produce a render/edit plan with acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Use orthographic/vector geometry.
- Treat supplied dimensions and levels as authoritative.
- Differentiate conceptual facade styling from measured documentation.
- Keep openings aligned across views.

## QA focus
- orthographic consistency
- dimension/level accuracy
- opening alignment
- annotation clarity

## References
- references/backends/svg.md
