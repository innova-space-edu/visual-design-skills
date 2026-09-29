---
name: science-illustration
description: Create scientific illustrations with explicit distinction between anatomically/physically accurate structure and illustrative simplification.
---

# science-illustration

## Category
education/science

## Default render strategy
hybrid

## Activate when
Create scientific illustrations with explicit distinction between anatomically/physically accurate structure and illustrative simplification.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Identify which structures must be accurate.
- Use callouts/labels deterministically.
- Do not fabricate unsupported internal structures.
- State when the result is schematic.

## QA focus
- structural accuracy
- labels
- scale relationships
- schematic disclosure

## Related references
- references/render-strategies.md
- references/model-router.md
