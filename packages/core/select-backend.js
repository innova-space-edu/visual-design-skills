import { CAPABILITY_MATRIX, GENERATIVE_BACKENDS } from "./data.js";

function requiredCapabilities(brief, imageLayer = false) {
  const req = new Map();
  const text = (String(brief.visual_type ?? "") + " " + String(brief.purpose ?? "")).toLowerCase();
  if (/photo|selfie|portrait|retrato|fotograf/.test(text)) req.set("photo", 3);
  else req.set("illustration", 2);
  if (brief.identity?.authoritative) req.set("multi_reference", 3);
  if ((brief.text_blocks ?? []).some(x => x?.exact)) req.set("typography", 3);
  if (!imageLayer && brief.geometry?.authoritative) req.set("exact_geometry", 3);
  if (!imageLayer && brief.data && Object.keys(brief.data).some(k => brief.data[k])) req.set("exact_data", 3);
  if (/edit|restore|background|composite/.test(text)) req.set("editing", 3);
  if ((brief.selected_skills ?? []).some(s => ["logo-design","icon-design","vector-illustration"].includes(s))) req.set("vector", 3);
  return req;
}

function structuralBackend(brief) {
  const skills = brief.selected_skills ?? [];
  const vt = String(brief.visual_type ?? "").toLowerCase();
  if (skills.includes("map-design") || /map/.test(vt)) return "maplibre";
  if (skills.includes("data-visualization") || /chart|data|graf|visualization/.test(vt)) return "vega-lite";
  return "svg";
}

function rankGenerative(brief, policy = {}, imageLayer = false) {
  const req = requiredCapabilities(brief, imageLayer);
  const allowed = policy.allowedBackends ?? GENERATIVE_BACKENDS;
  const preferred = policy.preferredGenerative ?? [];
  return allowed
    .filter(name => GENERATIVE_BACKENDS.includes(name))
    .map(name => {
      const caps = CAPABILITY_MATRIX[name] ?? {};
      let score = 0;
      let disqualified = false;
      for (const [cap, importance] of req) {
        const value = caps[cap] ?? 0;
        if (importance >= 3 && value === 0) disqualified = true;
        score += value * importance;
      }
      const idx = preferred.indexOf(name);
      if (idx >= 0) score += Math.max(1, preferred.length - idx) * 2;
      return { name, score, disqualified };
    })
    .filter(x => !x.disqualified)
    .sort((a,b) => b.score - a.score || a.name.localeCompare(b.name));
}

export function selectBackend(brief, policy = {}) {
  if (brief.render_strategy === "deterministic") {
    const primary = structuralBackend(brief);
    return { strategy:"deterministic", primary, secondary: primary === "svg" ? [] : ["svg"], external_calls:0 };
  }

  const ranked = rankGenerative(brief, policy, brief.render_strategy === "hybrid");
  const fallback = policy.fallbackGenerative ?? "openai";
  const image = ranked[0]?.name ?? fallback;

  if (brief.render_strategy === "generative") {
    return {
      strategy:"generative",
      primary:image,
      alternatives:ranked.slice(1,4),
      required_capabilities:Object.fromEntries(requiredCapabilities(brief)),
      external_calls:1
    };
  }

  return {
    strategy:"hybrid",
    structure_backend:structuralBackend(brief),
    image_backend:image,
    image_alternatives:ranked.slice(1,4),
    required_capabilities:Object.fromEntries(requiredCapabilities(brief, true)),
    external_calls:1
  };
}
