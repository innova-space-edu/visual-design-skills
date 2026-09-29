---
name: social-media-design
description: "Design platform-ready visual posts, stories, thumbnails, and promotional cards with safe zones and mobile readability. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "design"
  default-render-strategy: "hybrid"
---


# social-media-design

## Category
design

## Default render strategy
hybrid

## Activate when
Design platform-ready visual posts, stories, thumbnails, and promotional cards with safe zones and mobile readability.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Optimize for small-screen reading.
- Keep CTA and logos away from UI-obscured edges.
- Create format variants from one design system.
- Avoid dense body copy.

## QA focus
- mobile readability
- safe zones
- brand consistency
- CTA visibility

## Related references
- references/render-strategies.md
- references/model-router.md
