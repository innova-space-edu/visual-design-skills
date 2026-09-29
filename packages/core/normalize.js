export function normalizeText(value = "") {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function extractQuotedText(value = "") {
  const out = [];
  const re = /["“”]([^"“”]{1,240})["“”]/g;
  let match;
  while ((match = re.exec(String(value)))) out.push(match[1].trim());
  return [...new Set(out.filter(Boolean))];
}

export function stableStringify(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return "[" + value.map(stableStringify).join(",") + "]";
  const keys = Object.keys(value).sort();
  return "{" + keys.map(k => JSON.stringify(k) + ":" + stableStringify(value[k])).join(",") + "}";
}

export function hashString(value = "") {
  let hash = 0x811c9dc5;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(36);
}

export function createCacheKey(value, prefix = "vds") {
  return prefix + ":" + hashString(stableStringify(value));
}
