# Visual Design Skills

A modular visual-intelligence skill suite for AI agents and EDUAI.

It routes visual requests to specialist skills instead of treating every task as generic text-to-image generation.

## What it covers

Photography and identity; portrait/selfie/product/landscape; graphic design, posters, branding, logos, icons and vector work; infographics and data visualization; educational images for mathematics, physics, chemistry and biology; real and stylized maps; conceptual and technical floor plans; technical drawings; notebooks, worksheets and textbook pages; cartoons, comics, anime-general, children's illustration, pixel art and 3D-render style; editing, multi-reference, pose, style and character consistency.

## Architecture

```text
User request
   ↓
visual-design-router
   ↓
RoutingResult + VisualBrief
   ↓
specialist skills
   ↓
render strategy
   ├─ deterministic → SVG / HTML / LaTeX / Vega-Lite / MapLibre / vector primitives
   ├─ hybrid        → deterministic structure + generated visual assets
   └─ generative    → image backend
   ↓
visual-prompt-compiler / render plan
   ↓
visual-quality-control
   ↓
targeted repair when required
```

## Core skills

- `visual-design-router`: classification and skill selection.
- `visual-prompt-compiler`: converts a normalized brief into backend-specific instructions.
- `visual-quality-control`: validates the result against measurable requirements.
- `image-edit`: constrained add/remove/replace/move/recolor/relight/restyle/crop/outpaint/text-edit operations.
- `multi-reference`, `face-identity`, `pose-control`, `style-consistency`, and `character-consistency`: reference-aware controls.

## Design rule

**Do not ask an image model to be the authority for information that can be rendered deterministically.**

Use deterministic rendering for:
- mathematical geometry and formulas;
- quantitative charts;
- real map coordinates;
- technical dimensions and floor plans;
- dense exact text;
- editable logos/icons/vectors;
- chemistry equations and educational labels.

Use image generation for appearance-centric work and use hybrid workflows when exact structure and generated aesthetics must coexist.

## Repository layout

```text
skills/       specialist Agent Skills
references/   shared rules and backend capability profiles
schemas/      VisualBrief, routing, render-plan and QA contracts
evals/        routing/behavior evaluation cases
scripts/      repository validation
registry.json machine-readable skill catalog
```

## Machine-readable registry

`registry.json` is the discovery entrypoint for EDUAI or another agent runtime. Load `visual-design-router` first, then only the selected specialist skills.

## Validation

```bash
npm run validate
```

## Example

Request:
`Haz una imagen del ojo humano para explicar homotecia en 1° medio.`

Expected route:
`educational-image + biology-diagram/science-illustration + math-diagram`

Expected strategy:
deterministic homothety geometry and labels, with an optional generated eye illustration used as a non-authoritative visual layer.
