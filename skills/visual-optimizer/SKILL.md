---
name: visual-optimizer
description: Deterministic learning skill that converts repeated visual edits and outcomes into evidence-backed parameter candidates without requiring an AI model.
---
# Visual Optimizer

Use this skill after enough structured learning observations exist for one visual skill or template.

## Responsibilities
- Aggregate repeated numeric edits.
- Measure direction consistency, acceptance, exports and quality gain.
- Reject weak or contradictory evidence.
- Produce candidate parameter changes with sample counts and confidence.
- Never modify production parameters directly.

## Inputs
- skill or template identifier
- parameter observations
- quality before/after
- accepted/rejected outcome
- export outcome
- minimum evidence thresholds

## Output
A versioned candidate containing proposed values, deltas, confidence and supporting evidence.

## Guardrails
- Require a minimum sample count.
- Preserve current production values until approval.
- Do not infer personal traits from content.
- Prefer structured telemetry over raw educational text.
- Every proposal must be regression-tested before recommendation.
