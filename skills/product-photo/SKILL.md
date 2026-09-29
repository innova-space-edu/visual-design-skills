---
name: product-photo
description: Create product imagery that preserves product identity, proportions, labels, materials, and commercially useful lighting.
---

# product-photo

## Category
photography

## Default render strategy
generative

## Activate when
Create product imagery that preserves product identity, proportions, labels, materials, and commercially useful lighting.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Treat product geometry and label as invariants.
- Specify hero, packshot, lifestyle, macro, or exploded presentation.
- Use reflections/shadows consistent with material.
- For exact label text, composite deterministically if needed.

## QA focus
- product identity
- label accuracy
- edge geometry
- materials
- shadow/reflection

## Related references
- references/render-strategies.md
- references/model-router.md
