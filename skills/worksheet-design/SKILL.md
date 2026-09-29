---
name: worksheet-design
description: Design printable student worksheets or guides with exact instructions, exercises, hierarchy, spacing, and optional illustrations.
---

# worksheet-design

## Category
education/editorial

## Default render strategy
deterministic

## Activate when
Design printable student worksheets or guides with exact instructions, exercises, hierarchy, spacing, and optional illustrations.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Typeset all instructional text deterministically.
- Follow target paper size and print margins.
- Make answer-space behavior explicit: none, compact, or extended.
- Use illustrations as separate assets.

## QA focus
- instruction accuracy
- print margins
- question numbering
- readability

## Related references
- references/render-strategies.md
- references/model-router.md
