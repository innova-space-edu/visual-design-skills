---
name: packaging-design
description: "Create packaging concepts with panel hierarchy, dieline awareness, label zones, legal-copy placeholders, and product-focused branding. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "design"
  default-render-strategy: "hybrid"
---


# packaging-design

## Category
design

## Default render strategy
hybrid

## Activate when
Create packaging concepts with panel hierarchy, dieline awareness, label zones, legal-copy placeholders, and product-focused branding.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Treat dieline as authoritative if supplied.
- Keep mandatory copy outside folds/cuts.
- Separate mockup render from print artwork.
- Preserve barcode/legal zones when present.

## QA focus
- dieline fit
- panel hierarchy
- copy zones
- mockup vs artwork separation

## Related references
- references/render-strategies.md
- references/model-router.md
