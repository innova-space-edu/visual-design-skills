# Skill authoring V2

Visual Skills are executable, versioned and testable.

A deterministic skill should separate five concerns:

1. **semantic compiler** — converts domain data into scene intent;
2. **layout policy** — chooses boxes, grids, hierarchy and constraints;
3. **visual tokens** — spacing, type scale, radii and strokes;
4. **asset references** — semantic IDs from visual-assets;
5. **quality expectations** — thresholds evaluated by visual-engine.

## Required invariants

- exact user text is never silently rewritten by deterministic compilers;
- mathematical/scientific values remain structured data;
- every node has a stable ID;
- layout must be reproducible for the same input;
- no network access is required;
- provider-generated imagery is an optional fallback, never the only path.

## Planned specialist families

education, mathematics, statistics, chemistry, physics, biology, diagrams,
technical drawing, architecture, maps, timelines, presentations, worksheets,
infographics, UI mockups, procedural illustration and scientific visualization.
