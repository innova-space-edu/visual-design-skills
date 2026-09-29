---
name: infographic
description: "Build information-dense visuals from structured facts using hierarchy, sections, icons, diagrams, and data graphics without inventing values. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "structured visual"
  default-render-strategy: "hybrid"
---


# infographic

## Category
structured visual

## Default render strategy
hybrid

## Activate when
Build information-dense visuals from structured facts using hierarchy, sections, icons, diagrams, and data graphics without inventing values.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Create content architecture before visual styling.
- Use deterministic text and charts.
- Separate facts from decorative illustrations.
- Limit simultaneous visual encodings.

## QA focus
- factual accuracy
- text accuracy
- reading order
- chart accuracy
- legend clarity

## Related references
- references/backends/vega-lite.md
- references/backends/svg.md
- references/layout.md
