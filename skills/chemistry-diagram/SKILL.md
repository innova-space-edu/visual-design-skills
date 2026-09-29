---
name: chemistry-diagram
description: "Create chemistry visuals with exact formulas, equations, molecular/particle representations, apparatus schematics, and labels. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "education/chemistry"
  default-render-strategy: "deterministic"
---


# chemistry-diagram

## Category
education/chemistry

## Default render strategy
deterministic

## Activate when
Create chemistry visuals with exact formulas, equations, molecular/particle representations, apparatus schematics, and labels.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Render chemical notation deterministically.
- Preserve stoichiometric coefficients/subscripts/charges.
- For apparatus, use schematic geometry unless a photo is explicitly requested.
- Do not let image generation rewrite equations.

## QA focus
- formula accuracy
- charges/subscripts
- apparatus labels
- equation balance

## Related references
- references/backends/svg.md
- references/typography.md
