---
name: comic
description: "Create comic panels/pages with panel grammar, speech areas, sequential continuity, camera changes, and character consistency. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "illustration"
  default-render-strategy: "hybrid"
---


# comic

## Category
illustration

## Default render strategy
hybrid

## Activate when
Create comic panels/pages with panel grammar, speech areas, sequential continuity, camera changes, and character consistency.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Script panel beats before generation.
- Reserve speech/caption areas; typeset text deterministically.
- Maintain left-to-right or requested reading order.
- Track character state across panels.

## QA focus
- panel continuity
- character consistency
- speech text
- reading order

## Related references
- references/render-strategies.md
- references/model-router.md
