---
name: stylized-map
description: "Create illustrative, fantasy, tourism, game, or child-oriented maps where geographic exactness is not the primary requirement. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "geospatial/art"
  default-render-strategy: "generative"
---


# stylized-map

## Category
geospatial/art

## Default render strategy
generative

## Activate when
Create illustrative, fantasy, tourism, game, or child-oriented maps where geographic exactness is not the primary requirement.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- State whether geography is symbolic or approximate.
- Preserve key requested landmarks/routes.
- Use a coherent legend/icon language.
- Do not present fictional geography as survey-accurate.

## QA focus
- landmark presence
- route readability
- legend consistency
- style coherence

## Related references
- references/render-strategies.md
- references/model-router.md
