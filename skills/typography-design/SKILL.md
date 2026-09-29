---
name: typography-design
description: "Create typography-led compositions, title cards, word art, and text-integrated imagery while preserving exact wording and hierarchy. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "design"
  default-render-strategy: "hybrid"
---


# typography-design

## Category
design

## Default render strategy
hybrid

## Activate when
Create typography-led compositions, title cards, word art, and text-integrated imagery while preserving exact wording and hierarchy.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Quote exact text.
- Specify hierarchy, placement, alignment, case, and relative size.
- For dense text, typeset deterministically.
- Validate every required character.

## QA focus
- spelling
- line breaks
- hierarchy
- alignment
- readability

## Related references
- references/typography.md
