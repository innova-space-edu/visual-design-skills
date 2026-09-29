---
name: visual-prompt-compiler
description: "Compile a normalized VisualBrief into backend-specific generation or editing instructions without losing constraints. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "core"
  default-render-strategy: "compiler"
---


# Visual Prompt Compiler

Input must be a validated VisualBrief. Do not invent requirements that contradict the brief.

## Compilation pipeline

1. Separate semantic content from backend syntax.
2. Extract invariants: identity, geometry, text, palette, object count, framing, brand rules.
3. Build positive scene description.
4. Build edit operations if source images exist.
5. Translate constraints to the target backend profile in `references/backends/`.
6. Return both the compiled prompt and a machine-readable constraint block.

## Canonical visual order

- purpose
- primary subject
- action or state
- environment
- composition
- camera/perspective
- lighting
- material/texture
- palette
- style/medium
- typography
- exact constraints
- preserve list
- output properties

## Editing contract

Always express:
`CHANGE`: only requested modifications.
`PRESERVE`: identity, unmentioned objects, geometry, framing, lighting, text, colors, or other invariants required by the brief.

## Avoid

- meaningless quality-token spam
- contradictory lighting/camera instructions
- copying one backend's unsupported syntax into another
- asking diffusion to guarantee numerical or geometric correctness
- negative prompts when the backend profile states they are unsupported or counterproductive
