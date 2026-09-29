---
name: cover-design
description: "Design book, notebook, report, album, or digital covers with title hierarchy and strong thumbnail recognition. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "design"
  default-render-strategy: "hybrid"
---


# cover-design

## Category
design

## Default render strategy
hybrid

## Activate when
Design book, notebook, report, album, or digital covers with title hierarchy and strong thumbnail recognition.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Prioritize title readability.
- Reserve author/subtitle/edition zones.
- Use imagery that remains legible under title overlay.
- Support spine/back-cover extension when requested.

## QA focus
- title accuracy
- thumbnail recognition
- layout balance
- edge safety

## Related references
- references/render-strategies.md
- references/model-router.md
