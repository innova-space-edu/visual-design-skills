import fs from "node:fs";
const p = new URL("../skills/visual-design-router/evals/evals.json", import.meta.url);
const data = JSON.parse(fs.readFileSync(p,"utf8"));
let fail = 0;
const ids = new Set();
for (const e of data.evals || []) {
  if (!Number.isInteger(e.id)) { console.error("Eval id must be integer:", e.id); fail++; }
  if (ids.has(e.id)) { console.error("Duplicate eval id:", e.id); fail++; }
  ids.add(e.id);
  if (!e.prompt || !e.expected_output || !Array.isArray(e.expectations) || !e.expectations.length) {
    console.error("Malformed eval:", e.id); fail++;
  }
}
if (fail) process.exit(1);
console.log(`Evals OK: ${data.evals.length} cases.`);
