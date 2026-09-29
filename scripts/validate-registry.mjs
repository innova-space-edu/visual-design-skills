import fs from "node:fs";
const registry = JSON.parse(fs.readFileSync(new URL("../registry.json", import.meta.url), "utf8"));
let failed = false;
const names = new Set();
for (const skill of registry.skills) {
  if (names.has(skill.name)) {
    console.error("Duplicate skill:", skill.name); failed = true;
  }
  names.add(skill.name);
  if (!fs.existsSync(new URL("../" + skill.path, import.meta.url))) {
    console.error("Missing skill file:", skill.path); failed = true;
  }
}
if (!registry.core.every((name) => names.has(name))) {
  console.error("Core skill missing from registry"); failed = true;
}
if (failed) process.exit(1);
console.log(`Validated ${registry.skills.length} skills.`);
