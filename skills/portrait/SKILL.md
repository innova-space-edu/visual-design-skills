---
name: portrait
description: "Create intentional portrait photography with controlled framing, lens language, lighting, expression, and background separation. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "photography"
  default-render-strategy: "generative"
---


# portrait

## Category
photography

## Default render strategy
generative

## Activate when
Create intentional portrait photography with controlled framing, lens language, lighting, expression, and background separation.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Define headshot/half-body/full-body framing.
- Specify camera height and lens perspective.
- Use realistic skin/material texture and intentional catchlights.
- Do not over-smooth skin unless requested.

## QA focus
- facial anatomy
- eye direction
- skin texture
- crop
- lighting

## Related references
- references/render-strategies.md
- references/model-router.md
