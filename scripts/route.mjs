import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const catalog = JSON.parse(fs.readFileSync(path.join(here, "../routing/routing-catalog.json"), "utf8"));

const input = process.argv.slice(2).join(" ").trim();
if (!input) {
  console.error('Usage: npm run route -- "user request"');
  process.exit(2);
}

const norm = (s) => s
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

const q = ` ${norm(input)} `;
const scored = [];
for (const entry of catalog.entries) {
  let score = 0;
  const matches = [];
  for (const raw of entry.terms) {
    const term = norm(raw);
    if (q.includes(` ${term} `) || q.includes(term)) {
      score += entry.weight;
      matches.push(raw);
    }
  }
  if (score > 0) scored.push({ skill: entry.skill, score, matches });
}

scored.sort((a,b) => b.score - a.score || a.skill.localeCompare(b.skill));
console.log(JSON.stringify({
  query: input,
  candidates: scored.slice(0, 8),
  note: "Candidate prefilter only; visual-design-router is authoritative."
}, null, 2));
