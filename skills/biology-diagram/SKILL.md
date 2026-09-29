---
name: biology-diagram
description: "Create biological and anatomical diagrams with labeled structures, process arrows, hierarchy, and age-appropriate scientific fidelity. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "education/biology"
  default-render-strategy: "hybrid"
---


# biology-diagram

## Category
education/biology

## Default render strategy
hybrid

## Activate when
Create biological and anatomical diagrams with labeled structures, process arrows, hierarchy, and age-appropriate scientific fidelity.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Define structural fidelity required.
- Use deterministic labels/callouts.
- Use generated anatomical texture only as a layer behind authoritative labels/geometry.
- Avoid misleading scale when not to scale.

## QA focus
- anatomy
- label placement
- process direction
- scale disclosure

## Related references
- references/render-strategies.md
- references/model-router.md
