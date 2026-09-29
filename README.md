# Visual Design Skills

Modular visual-intelligence skill suite for AI agents.

This repository provides a router, prompt compiler, specialist visual skills, deterministic rendering guidance, backend profiles, quality-control rules, and evaluation cases for image generation, image editing, graphic design, educational visuals, diagrams, maps, plans, vector graphics, photography, portraits, selfies, infographics, notebooks, worksheets, cartoons, and related visual workflows.

## Core principle

Do not solve every visual task with a single image-generation prompt.

The suite separates:
- semantic intent and visual brief creation;
- specialist domain rules;
- deterministic geometry/data/text rendering;
- model/backend-specific prompt compilation;
- reference and identity control;
- post-generation visual QA and repair.

## Planned architecture

```text
user request
  -> visual-design-router
  -> VisualBrief
  -> specialist skills
  -> backend selection
  -> visual-prompt-compiler
  -> generation / SVG / map / chart / diagram
  -> visual-quality-control
  -> repair if required
```

See `skills/`, `schemas/`, `references/`, and `evals/` for the full implementation.
