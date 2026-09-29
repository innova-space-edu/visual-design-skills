---
name: notebook-page
description: "Design notebook or study-note pages with ruled/grid paper, headings, formulas, callouts, annotations, and optional handwritten aesthetic. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "editorial/education"
  default-render-strategy: "hybrid"
---


# notebook-page

## Category
editorial/education

## Default render strategy
hybrid

## Activate when
Design notebook or study-note pages with ruled/grid paper, headings, formulas, callouts, annotations, and optional handwritten aesthetic.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Generate paper/grid as deterministic layout.
- Typeset exact academic content; simulated handwriting may be decorative.
- Maintain margins and baseline rhythm.
- Avoid generating unreadable pseudo-writing.

## QA focus
- text accuracy
- baseline alignment
- margin consistency
- formula accuracy

## Related references
- references/render-strategies.md
- references/model-router.md
