---
name: group-photo
description: Generate or edit multi-person photographs while preserving person count, identity assignment, pose separation, and occlusion logic.
---

# group-photo

## Category
photography

## Default render strategy
generative

## Activate when
Generate or edit multi-person photographs while preserving person count, identity assignment, pose separation, and occlusion logic.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Lock subject count.
- Assign identity references per person.
- Avoid face swapping between subjects.
- Plan overlap and hand visibility deliberately.

## QA focus
- person count
- identity mapping
- occlusion
- hands/faces

## Related references
- references/render-strategies.md
- references/model-router.md
