import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registry = JSON.parse(fs.readFileSync(path.join(root, "registry.json"), "utf8"));
const skillNames = new Set(registry.skills.map(x => x.name));
const dir = path.join(root, "examples");
let failures = 0;

for (const file of fs.readdirSync(dir).filter(x => x.endsWith(".json"))) {
  const p = path.join(dir,file);
  let data;
  try { data = JSON.parse(fs.readFileSync(p,"utf8")); }
  catch (e) { console.error("Invalid JSON:", file, e.message); failures++; continue; }
  if (!data.request || !data.routing || !data.visual_brief) {
    console.error("Missing required example sections:", file); failures++; continue;
  }
  for (const s of data.routing.selected_skills || []) {
    if (!skillNames.has(s)) { console.error(`${file}: unknown skill ${s}`); failures++; }
  }
}

if (failures) process.exit(1);
console.log("Examples OK.");
