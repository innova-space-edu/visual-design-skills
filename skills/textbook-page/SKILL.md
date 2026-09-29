---
name: textbook-page
description: Design textbook-like instructional pages combining explanatory text, examples, diagrams, formulas, captions, and visual hierarchy.
---

# textbook-page

## Category
education/editorial

## Default render strategy
hybrid

## Activate when
Design textbook-like instructional pages combining explanatory text, examples, diagrams, formulas, captions, and visual hierarchy.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Create semantic content blocks first.
- Use deterministic text/LaTeX.
- Maintain consistent heading/caption/example styles.
- Generated images must not contain authoritative text.

## QA focus
- reading order
- text accuracy
- caption association
- formula accuracy
- page rhythm

## Related references
- references/render-strategies.md
- references/model-router.md
