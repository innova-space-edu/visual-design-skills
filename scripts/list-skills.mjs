import registry from "../registry.json" with { type: "json" };
const rows = registry.skills.map(x => ({
  name:x.name, category:x.category, strategy:x.default_render_strategy, path:x.path
}));
console.table(rows);
console.log(`${rows.length} skills | suite ${registry.version}`);
