import { SKILL_META } from "./data.js";
import { extractQuotedText } from "./normalize.js";

function dimensionsFrom(prompt) {
  return [...String(prompt).matchAll(/\b\d+(?:[.,]\d+)?\s*(?:mm|cm|m|km|px|in|ft)\b/gi)].map(m => m[0]);
}

export function createVisualBrief(input, routing, options = {}) {
  const prompt = typeof input === "string" ? input : input?.prompt ?? "";
  const primary = routing?.primary_skill ?? "visual-design-router";
  const meta = SKILL_META[primary] ?? {};
  const quoted = options.exactText ?? extractQuotedText(prompt);
  const dimensions = dimensionsFrom(prompt);
  const constraints = [...(options.constraints ?? [])];

  if (quoted.length) constraints.push("Preserve exact quoted text.");
  if (routing?.signals?.coordinates_authoritative) constraints.push("Coordinates are authoritative.");
  if (dimensions.length) constraints.push("Supplied dimensions are authoritative where relevant.");
  if (routing?.signals?.formula_or_geometry) constraints.push("Formulas or geometry must be validated deterministically.");

  const format = options.output?.format ??
    (routing?.inferred_strategy === "deterministic" ? "svg" : "png");

  return {
    purpose: options.purpose ?? prompt,
    source_request: prompt,
    visual_type: options.visualType ?? primary,
    domain: options.domain ?? meta.category ?? null,
    audience: options.audience ?? null,
    language: options.language ?? "auto",
    render_strategy: routing?.inferred_strategy ?? "hybrid",
    selected_skills: routing?.selected_skills ?? [primary],
    composition: options.composition ?? {},
    subject: options.subject ?? {},
    scene: options.scene ?? {},
    camera: options.camera ?? {},
    lighting: options.lighting ?? {},
    palette: options.palette ?? [],
    text_blocks: quoted.map(text => ({ text, exact: true })),
    identity: {
      authoritative: Boolean(routing?.signals?.identity_required),
      ...(options.identity ?? {})
    },
    geometry: {
      authoritative: Boolean(
        routing?.signals?.has_dimensions ||
        (routing?.signals?.formula_or_geometry && routing?.inferred_strategy === "deterministic")
      ),
      supplied_dimensions: dimensions,
      ...(options.geometry ?? {})
    },
    data: {
      coordinates_authoritative: Boolean(routing?.signals?.coordinates_authoritative),
      quantitative: Boolean(routing?.signals?.quantitative_data),
      ...(options.data ?? {})
    },
    references: options.references ?? [],
    constraints: [...new Set(constraints)],
    preserve: options.preserve ?? [],
    context: options.context ?? {},
    output: {
      format,
      editable: options.output?.editable ?? routing?.inferred_strategy !== "generative",
      ...options.output
    }
  };
}

export function mergeBrief(base, patch = {}) {
  const nested = ["composition","subject","scene","camera","lighting","identity","geometry","data","context","output"];
  const out = { ...base, ...patch };
  for (const key of nested) if (patch[key]) out[key] = { ...(base[key] ?? {}), ...patch[key] };
  for (const key of ["selected_skills","palette","text_blocks","references","constraints","preserve"]) {
    if (patch[key]) out[key] = patch[key];
  }
  return out;
}
