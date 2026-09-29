---
name: landscape
description: "Create landscape, nature, urban, aerial, panoramic, weather, or nightscape imagery with deliberate depth and atmospheric composition. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "photography"
  default-render-strategy: "generative"
---


# landscape

## Category
photography

## Default render strategy
generative

## Activate when
Create landscape, nature, urban, aerial, panoramic, weather, or nightscape imagery with deliberate depth and atmospheric composition.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Define foreground/midground/background.
- Set horizon and leading-line strategy.
- Use atmospheric perspective consistently.
- For real named places, avoid fabricated landmark claims unless reference-grounded.

## QA focus
- depth layers
- horizon
- atmosphere
- landmark fidelity

## Related references
- references/render-strategies.md
- references/model-router.md
