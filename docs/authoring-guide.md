# Skill authoring guide

Current Agent Skills guidance treats `name` and `description` as the primary discovery metadata and recommends progressive disclosure: metadata first, then SKILL.md, then bundled references/scripts as needed.

For this repository:
- keep `SKILL.md` below 500 lines;
- make descriptions explicit about trigger contexts;
- do not duplicate backend-specific details in every skill;
- identify authoritative vs approximate information;
- add routing keywords only as a prefilter, never as the final router;
- add at least one eval when introducing a materially new routing domain;
- add a capability-matrix change when introducing a new backend;
- run `npm run validate`.

Use `templates/SKILL.template.md` as the starting point.
