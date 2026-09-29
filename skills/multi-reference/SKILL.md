---
name: multi-reference
description: "Assign explicit semantic roles to multiple reference images and prevent cross-contamination between identity, pose, clothing, product, style, and background references. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "core"
  default-render-strategy: "generative"
---


# Multi Reference

Assign each reference a role before prompting:
- identity
- pose
- clothing
- product
- style
- palette
- composition
- background
- material

Never say only "use these references". Refer to them by stable index or ID and explain exactly what to borrow and what not to borrow.

When references conflict, identity and exact user constraints take precedence over style.
