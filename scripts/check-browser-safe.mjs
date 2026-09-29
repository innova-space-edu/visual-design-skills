import fs from "node:fs";
import path from "node:path";

const roots = ["packages/core","packages/sdk","packages/browser","packages/server","adapters"];
let failures = 0;
function walk(p) {
  for (const entry of fs.readdirSync(p,{withFileTypes:true})) {
    const full = path.join(p,entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.js$/.test(entry.name)) {
      const text = fs.readFileSync(full,"utf8");
      if (/from\s+["']node:|require\(["']node:/.test(text)) {
        console.error("Node builtin import in web-safe runtime:", full);
        failures++;
      }
    }
  }
}
for (const root of roots) walk(root);
if (failures) process.exit(1);
console.log("Browser/edge safety check OK");
