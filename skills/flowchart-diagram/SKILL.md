---
name: flowchart-diagram
description: "Create precise flowcharts, process diagrams, decision trees, system diagrams, and relationship graphs using deterministic nodes, connectors, labels, and hierarchy. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "diagram"
  default-render-strategy: "deterministic"
---


# flowchart-diagram

## Default strategy
deterministic

## Activate for
- flowcharts
- decision trees
- process maps
- architecture diagrams

## Workflow
1. Read the normalized VisualBrief.
2. Identify authoritative elements and editable elements.
3. Apply the specialist rules.
4. Produce a render/edit plan with acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Define nodes and edges before layout.
- Use stable connector routing and arrow direction.
- Typeset labels deterministically.
- Avoid edge crossings when a clearer layout exists.

## QA focus
- node/edge completeness
- arrow direction
- label accuracy
- crossings

## References
- references/backends/svg.md
