# Contributing

## Add a specialist skill

1. Create `skills/<skill-name>/SKILL.md`.
2. Use YAML frontmatter with `name` and `description`.
3. Define activation criteria, render strategy, specialist rules, QA focus, and references.
4. Add the skill to `registry.json`.
5. Add at least one routing/evaluation example when introducing a new visual domain.
6. Run `npm run validate`.

## Design rules

- Prefer deterministic rendering for exact data, text, geometry, measurements, maps, and formulas.
- Prefer hybrid rendering when deterministic structure needs generated visual assets.
- Keep provider-specific behavior in `references/backends/`.
- Avoid duplicating generic prompt advice across specialist skills.
- Every skill must state what is authoritative and what may be approximate.
