---
name: selfie
description: "Generate or edit smartphone-style selfies with believable arm-length perspective, lens distortion, casual framing, and ambient exposure. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "photography"
  default-render-strategy: "generative"
---


# selfie

## Category
photography

## Default render strategy
generative

## Activate when
Generate or edit smartphone-style selfies with believable arm-length perspective, lens distortion, casual framing, and ambient exposure.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Use smartphone/wide-lens perspective when appropriate.
- Allow mild framing imperfection and realistic background exposure.
- Avoid studio-lighting aesthetics unless requested.
- Mirror-selfie mode must account for reflection composition.

## QA focus
- lens perspective
- arm/hand anatomy
- casual framing
- background consistency

## Related references
- references/render-strategies.md
- references/model-router.md
