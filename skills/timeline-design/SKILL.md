---
name: timeline-design
description: Create chronological timelines with exact dates, intervals, milestones, labels, and optional illustrative assets. Use for historical, project, educational, or roadmap timelines.
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.1.0"
---

# timeline-design

## Default strategy
deterministic

## Activate for
- historical timelines
- project roadmaps
- milestone timelines
- chronologies

## Workflow
1. Read the normalized VisualBrief.
2. Identify authoritative elements and editable elements.
3. Apply the specialist rules.
4. Produce a render/edit plan with acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Sort events from authoritative dates.
- Represent intervals distinctly from point events.
- Typeset dates/text deterministically.
- Use generated imagery only as non-authoritative decoration.

## QA focus
- date accuracy
- chronological order
- label association
- interval scaling

## References
- references/render-strategies.md
- references/model-router.md
