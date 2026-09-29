---
name: visual-design-router
description: Classify visual requests, build a structured VisualBrief, select specialist skills, choose deterministic/hybrid/generative rendering, and route to the correct backend.
---

# Visual Design Router

Use this skill for every request whose primary deliverable is a visual artifact, image, diagram, map, plan, infographic, page design, illustration, photo, render, poster, logo, or image edit.

## Mission

Convert the user's request into a machine-readable `VisualBrief`, select the minimum set of specialist skills, choose a rendering strategy, and define validation requirements before generation.

## Routing principles

1. **Truth before aesthetics.** If coordinates, measurements, geometry, formulas, data values, labels, or exact text matter, prefer deterministic rendering.
2. **Structure before diffusion.** Maps, charts, technical plans, diagrams, worksheets, and dense infographics should be constructed as SVG/HTML/canvas/GeoJSON/Vega-Lite first. Generative models may add decorative or illustrative layers.
3. **Identity needs references.** When the user expects the same person/product/character, activate identity or consistency skills and preserve source features explicitly.
4. **Edits are constrained transformations.** State what changes and what must remain invariant.
5. **Load only relevant specialists.** Do not activate the whole suite for one request.

## Output

Produce a RoutingResult containing:
- primary_intent
- visual_type
- domain and subdomain
- audience
- fidelity requirements
- text requirements
- identity requirements
- geometry/data requirements
- selected_skills
- render_strategy: deterministic | hybrid | generative
- preferred_backends
- fallback_backends
- validation_profile
- requested outputs

Then produce a `VisualBrief` conforming to `schemas/visual-brief.schema.json`.

## Deterministic triggers

Choose deterministic or hybrid mode when any of these are central:
- mathematical constructions or transformations
- charts and quantitative comparisons
- real maps or geospatial positions
- dimensions, scale, floor plans, technical drawing
- chemical equations, formulas, labels, tables, worksheets
- exact long-form text or typography-heavy documents
- brand marks that must be editable vectors

## Generative triggers

Choose generative mode when the task is primarily:
- portrait, selfie, product photography, landscape, editorial photography
- illustration, cartoon, comic, concept art, atmospheric rendering
- stylized maps without geographic accuracy
- decorative educational artwork where geometry/data are not authoritative

## Hybrid triggers

Use hybrid mode when exact structure and generative appearance must coexist:
- educational infographic with illustrations
- architecture/floor-plan presentation render
- science diagram with realistic organs/materials
- poster with exact typography plus generated hero image
- map with illustrated overlays

## Multi-skill examples

"Homotecia del ojo humano para 1° medio"
-> educational-image + math-diagram + science-illustration
-> deterministic SVG geometry + optional generated eye illustration

"Selfie nocturna manteniendo exactamente el rostro"
-> selfie + photorealism + face-identity + multi-reference
-> generative with identity constraints

"Mapa de Antofagasta con ubicaciones reales"
-> map-design + graphic-design
-> MapLibre/GeoJSON deterministic rendering

"Plano conceptual de una sala de música"
-> floorplan-concept + interior-design
-> hybrid; no claim of construction-grade dimensional accuracy unless supplied and validated
