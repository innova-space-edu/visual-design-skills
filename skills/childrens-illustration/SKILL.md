---
name: childrens-illustration
description: "Create child-friendly illustrations with clear silhouettes, age-appropriate visual complexity, expressive poses, and safe readable composition. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "illustration"
  default-render-strategy: "generative"
---


# childrens-illustration

## Category
illustration

## Default render strategy
generative

## Activate when
Create child-friendly illustrations with clear silhouettes, age-appropriate visual complexity, expressive poses, and safe readable composition.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Match complexity to age band.
- Use clear focal point and friendly shape language.
- Avoid clutter behind instructional text.
- Maintain character continuity in story sequences.

## QA focus
- age appropriateness
- clarity
- expression
- continuity

## Related references
- references/render-strategies.md
- references/model-router.md
