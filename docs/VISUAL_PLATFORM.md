# Visual Skills inside the Visual Platform

This repository is the evolving **Visual Skills** layer even though the GitHub repository name remains `visual-design-skills`.

Skills are not prompts. A deterministic skill is executable code plus a versioned manifest, tests, examples and quality expectations.

## Contract

```
user intent / structured brief
        |
        v
 skill routing + compiler
        |
        v
  VisualScene 1.x
        |
        v
    visual-engine
```

The default goal is zero provider calls. Generative providers are optional fallbacks for content that cannot be constructed from deterministic primitives and local assets.

## Skill evolution

A skill may improve frequently without requiring a visual-engine release. Engine changes should be reserved for reusable primitives, rendering, text, layout, geometry, export and quality infrastructure.

Every new deterministic skill should include:
- manifest under `manifests/`;
- compiler or adapter;
- at least one example;
- validation/eval coverage;
- offline behavior;
- expected assets/capabilities;
- quality thresholds.

Visual Studio is the primary laboratory for interactive testing and benchmarking.
