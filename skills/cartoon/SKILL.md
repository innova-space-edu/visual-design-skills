---
name: cartoon
description: "Create stylized cartoon illustrations using explicit line, proportion, shading, palette, and medium characteristics. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "illustration"
  default-render-strategy: "generative"
---


# cartoon

## Category
illustration

## Default render strategy
generative

## Activate when
Create stylized cartoon illustrations using explicit line, proportion, shading, palette, and medium characteristics.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Describe visual properties rather than relying only on artist names.
- Keep character proportions consistent across a set.
- Define line weight and shading model.
- Keep background complexity appropriate to subject.

## QA focus
- character consistency
- line quality
- silhouette
- palette

## Related references
- references/render-strategies.md
- references/model-router.md
