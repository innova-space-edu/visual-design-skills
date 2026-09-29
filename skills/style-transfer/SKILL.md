---
name: style-transfer
description: "Apply a requested visual language to an image while preserving selected content, identity, geometry, or layout. Use whenever the user asks to restyle an existing image or transfer visual style from a reference. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "image editing"
  default-render-strategy: "generative"
---


# style-transfer

## Default strategy
generative

## Activate for
- restyle existing image
- reference style transfer
- medium conversion

## Workflow
1. Read the normalized VisualBrief.
2. Identify authoritative elements and editable elements.
3. Apply the specialist rules.
4. Produce a render/edit plan with acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Separate content invariants from style attributes.
- Prefer descriptive style features: palette, line, texture, shading, medium, contrast.
- Do not let style references overwrite protected identity or text.
- Use structure controls when geometry must remain stable.

## QA focus
- content preservation
- style consistency
- identity
- geometry drift

## References
- references/controlnet.md
