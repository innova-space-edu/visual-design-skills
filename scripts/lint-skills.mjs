import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registry = JSON.parse(fs.readFileSync(path.join(root, "registry.json"), "utf8"));
let failures = 0;

function fail(msg) { console.error("ERROR:", msg); failures++; }

const seen = new Set();
for (const item of registry.skills) {
  if (seen.has(item.name)) fail(`duplicate registry skill: ${item.name}`);
  seen.add(item.name);
  const full = path.join(root, item.path);
  if (!fs.existsSync(full)) { fail(`missing ${item.path}`); continue; }
  const text = fs.readFileSync(full, "utf8");
  const lines = text.split(/\r?\n/);
  if (lines.length > 500) fail(`${item.name}: SKILL.md exceeds 500 lines (${lines.length})`);
  if (!text.startsWith("---\n")) fail(`${item.name}: missing YAML frontmatter`);
  const end = text.indexOf("\n---\n", 4);
  if (end < 0) { fail(`${item.name}: malformed YAML frontmatter`); continue; }
  const front = text.slice(4, end);
  const n = front.match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const d = front.match(/^description:\s*(.+)$/m)?.[1]?.trim();
  if (n !== item.name) fail(`${item.name}: frontmatter name mismatch: ${n}`);
  if (!d || d.length < 40) fail(`${item.name}: description too short for reliable triggering`);
}

for (const core of registry.core) if (!seen.has(core)) fail(`missing core skill ${core}`);

for (const p of ["schemas/visual-brief.schema.json","schemas/routing-result.schema.json","schemas/render-plan.schema.json","schemas/quality-report.schema.json","routing/routing-catalog.json","routing/precedence.json"]) {
  try { JSON.parse(fs.readFileSync(path.join(root,p),"utf8")); }
  catch (e) { fail(`invalid JSON ${p}: ${e.message}`); }
}

if (failures) process.exit(1);
console.log(`Skill lint OK: ${registry.skills.length} registered skills.`);
