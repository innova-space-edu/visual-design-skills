---
name: data-visualization
description: Render trustworthy charts and quantitative graphics from source data with declarative encodings and validated scales.
---

# data-visualization

## Category
data

## Default render strategy
deterministic

## Activate when
Render trustworthy charts and quantitative graphics from source data with declarative encodings and validated scales.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Use source data directly.
- Choose chart type based on analytical task.
- Avoid truncated/deceptive scales unless explicitly justified.
- Add units, legends, and source notes when required.

## QA focus
- value accuracy
- scale
- units
- legend
- data-source correspondence

## Related references
- references/backends/vega-lite.md
