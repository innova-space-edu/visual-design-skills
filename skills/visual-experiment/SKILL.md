---
name: visual-experiment
description: Deterministic experimentation skill for comparing multiple layout or parameter variants using real acceptance, export, quality and edit outcomes.
---
# Visual Experiment

Use this skill when two or more plausible visual strategies need evidence from real usage.

## Responsibilities
- Define experiment arms.
- Allocate trials with deterministic exploration/exploitation.
- Convert acceptance, exports, quality and edit count into bounded rewards.
- Track samples and confidence.
- Declare a winner only after minimum evidence is reached.

## Examples
- formula-right vs formula-bottom
- dense-card vs spacious-card
- label-inside vs label-outside
- template A vs template B

## Guardrails
Experiments must not expose personal student information. Only structured outcome signals are required.
