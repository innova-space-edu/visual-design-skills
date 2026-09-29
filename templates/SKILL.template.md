---
name: your-skill-name
description: Describe what the skill does and explicitly when it should trigger. Use whenever the user's request matches this visual domain, even if they do not say the skill name.
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.0.0"
---

# your-skill-name

## Default strategy
deterministic | hybrid | generative

## Activate for
- Trigger or task family.
- Another trigger phrase/domain.

## Workflow
1. Read the normalized VisualBrief.
2. Identify authoritative and editable elements.
3. Apply domain rules.
4. Produce render/edit plan and acceptance criteria.
5. Run visual-quality-control.

## Specialist rules
- Rule.

## QA focus
- Criterion.

## References
- references/render-strategies.md
- references/model-router.md
