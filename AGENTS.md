# AGENTS.md

This repository is a modular visual-skill library.

When editing:
- keep the router provider-neutral;
- add provider behavior only under references/backends;
- keep specialist SKILL.md files focused;
- treat exact text, data, geometry, coordinates, and measurements as deterministic by default;
- update registry.json for every skill addition/removal;
- add or update evals for routing changes;
- avoid a single monolithic prompt that loads every skill at once.

Before completing changes, run or logically satisfy `npm run validate`.
