---
name: face-identity
description: Preserve the visible identity of a person from authorized references while changing scene, pose, styling, or lighting.
---

# face-identity

## Category
identity

## Default render strategy
generative

## Activate when
Preserve the visible identity of a person from authorized references while changing scene, pose, styling, or lighting.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Separate immutable facial traits from editable styling.
- Use identity/reference adapters when available.
- Do not let style references overwrite identity.
- Prefer targeted edits over full regeneration when preserving identity is critical.

## QA focus
- visible identity consistency
- face geometry
- hair/age drift
- reference contamination

## Related references
- references/identity.md
- references/controlnet.md
