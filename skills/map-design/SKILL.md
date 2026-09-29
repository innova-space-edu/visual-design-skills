---
name: map-design
description: "Create geographically accurate maps from real coordinates and geospatial data using deterministic map layers. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "geospatial"
  default-render-strategy: "deterministic"
---


# map-design

## Category
geospatial

## Default render strategy
deterministic

## Activate when
Create geographically accurate maps from real coordinates and geospatial data using deterministic map layers.

## Required workflow
1. Read the VisualBrief and preserve explicit user constraints.
2. Apply the specialist rules below.
3. Use the router-selected backend and relevant references.
4. Return generation/render instructions plus acceptance criteria.
5. Run visual-quality-control after rendering.

## Specialist rules
- Use GeoJSON/coordinates from reliable sources or user input.
- Do not invent roads or marker positions.
- Specify projection/viewport appropriate to scope.
- Include legend/scale/north when useful.

## QA focus
- location accuracy
- label placement
- projection
- legend
- scale

## Related references
- references/backends/maplibre.md
