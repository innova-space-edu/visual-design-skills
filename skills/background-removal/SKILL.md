---
name: background-removal
description: "Remove or replace image backgrounds while preserving foreground edges, hair, transparency, shadows, and product/person identity. Use for cutouts, transparent PNGs, subject isolation, or background swaps. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "image editing"
  default-render-strategy: "hybrid"
---


# background-removal

## Default strategy
hybrid

## Activate for
- transparent background
- product cutout
- portrait cutout
- background replacement

## Workflow
1. Read the normalized VisualBrief.
2. Identify authoritative elements and editable elements.
3. Apply the specialist rules.
4. Produce a render/edit plan with acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Treat alpha matte as authoritative output when transparency is requested.
- Preserve fine hair/fur/translucent edges.
- Keep contact shadow separately when useful.
- Do not crop the foreground unintentionally.

## QA focus
- edge halos
- missing hair/fur
- alpha quality
- foreground completeness

## References
- references/render-strategies.md
- references/model-router.md
