import { ROUTING_CATALOG, SKILL_META } from "./data.js";
import { normalizeText } from "./normalize.js";

const re = {
  edit: /\b(edit|editar|modificar|cambiar|quitar|eliminar|reemplazar|remove|replace|restore|restaurar|upscale|mejorar)\b/i,
  identity: /\b(mismo rostro|misma cara|mantener identidad|preservar identidad|same face|preserve identity|same person)\b/i,
  exactText: /\b(texto exacto|exact text|exact headline|sin cambiar el texto|mantener texto)\b/i,
  education: /\b(estudiante|curso|colegio|clase|guia|guía|oa\b|mineduc|educativ|worksheet|school|student)\b/i,
  coordinates: /\b(coordenadas?|geojson|latitud|longitud|latitude|longitude)\b/i,
  dimensions: /\b\d+(?:[.,]\d+)?\s*(?:mm|cm|m|km|px|in|ft)\b/i,
  data: /\b(datos|porcentaje|promedio|grafico|gráfico|chart|dataset|table|tabla|estadistic)\b/i,
  formula: /\b(formula|fórmula|ecuacion|ecuación|latex|stoichi|estequiometr|homotecia|vector)\b/i,
  references: /\b(referencia|reference|imagen adjunta|foto adjunta|source image)\b/i
};

export function detectSignals(prompt = "") {
  const text = String(prompt);
  return {
    is_edit: re.edit.test(text),
    identity_required: re.identity.test(text),
    exact_text: re.exactText.test(text) || /["“”][^"“”]{2,}["“”]/.test(text),
    educational: re.education.test(text),
    coordinates_authoritative: re.coordinates.test(text),
    has_dimensions: re.dimensions.test(text),
    quantitative_data: re.data.test(text),
    formula_or_geometry: re.formula.test(text),
    has_references: re.references.test(text)
  };
}

function confidenceFor(top, second) {
  if (!top) return 0.15;
  let c = top.score >= 20 ? 0.94 : top.score >= 10 ? 0.78 : top.score >= 5 ? 0.58 : 0.4;
  if (second && second.score >= top.score * 0.85) c -= 0.12;
  else if (!second) c += 0.06;
  return Math.max(0.1, Math.min(0.99, c));
}

function pushUnique(list, value) {
  if (value && SKILL_META[value] && !list.includes(value)) list.push(value);
}

function inferStrategy(primary, selected, signals) {
  const defaultStrategy = SKILL_META[primary]?.strategy;
  if (signals.coordinates_authoritative && selected.includes("map-design")) return "deterministic";
  if (signals.has_dimensions && selected.some(s => ["technical-floorplan","technical-drawing","architectural-elevation"].includes(s))) return "deterministic";
  if (signals.quantitative_data && selected.includes("data-visualization")) return "deterministic";
  if (signals.formula_or_geometry && selected.some(s => ["math-diagram","physics-diagram","chemistry-diagram"].includes(s))) return "deterministic";
  if (signals.exact_text && defaultStrategy === "generative") return "hybrid";
  if (["deterministic","hybrid","generative"].includes(defaultStrategy)) return defaultStrategy;
  return "hybrid";
}

export function routeVisual(input, options = {}) {
  const prompt = typeof input === "string" ? input : input?.prompt ?? "";
  const normalized = " " + normalizeText(prompt) + " ";
  const scored = [];

  for (const entry of ROUTING_CATALOG) {
    let score = 0;
    const matches = [];
    for (const rawTerm of entry.terms ?? []) {
      const term = normalizeText(rawTerm);
      if (!term) continue;
      if (normalized.includes(" " + term + " ") || normalized.includes(term)) {
        score += entry.weight ?? 1;
        matches.push(rawTerm);
      }
    }
    if (score > 0) scored.push({ skill: entry.skill, score, matches });
  }

  scored.sort((a,b) => b.score - a.score || a.skill.localeCompare(b.skill));
  const top = scored[0];
  const second = scored[1];
  const confidence = confidenceFor(top, second);
  const selected = [];

  if (top) {
    const floor = Math.max(4, top.score * 0.5);
    for (const candidate of scored.slice(0, options.maxCandidates ?? 8)) {
      if (candidate.score >= floor) pushUnique(selected, candidate.skill);
      if (selected.length >= (options.maxSkills ?? 4)) break;
    }
  }

  const signals = detectSignals(prompt);
  if (signals.is_edit) pushUnique(selected, "image-edit");
  if (signals.identity_required) {
    pushUnique(selected, "face-identity");
    pushUnique(selected, "multi-reference");
  }
  if (signals.educational) pushUnique(selected, "educational-image");

  const primary = top?.skill ?? "visual-design-router";
  if (!selected.length) selected.push(primary);

  const threshold = options.semanticThreshold ?? 0.6;
  return {
    primary_intent: "visual-design",
    primary_skill: primary,
    selected_skills: selected,
    candidates: scored.slice(0, options.maxCandidates ?? 8),
    confidence,
    needs_semantic_router: primary === "visual-design-router" || confidence < threshold,
    inferred_strategy: inferStrategy(primary, selected, signals),
    signals
  };
}
