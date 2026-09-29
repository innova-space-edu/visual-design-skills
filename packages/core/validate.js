export function validateVisualBrief(brief) {
  const errors = [];
  const warnings = [];
  if (!brief || typeof brief !== "object") return { valid:false, errors:["brief must be an object"], warnings };
  if (!brief.purpose || typeof brief.purpose !== "string") errors.push("purpose is required");
  if (!brief.visual_type || typeof brief.visual_type !== "string") errors.push("visual_type is required");
  if (!["deterministic","hybrid","generative"].includes(brief.render_strategy)) errors.push("invalid render_strategy");
  if (!brief.composition || typeof brief.composition !== "object") errors.push("composition object is required");
  if (!brief.output?.format) errors.push("output.format is required");

  for (const block of brief.text_blocks ?? []) {
    if (block?.exact === true && typeof block.text !== "string") errors.push("exact text block requires string text");
  }
  if (brief.geometry?.authoritative && brief.render_strategy === "generative") {
    errors.push("authoritative geometry cannot use generative-only strategy");
  }
  if (brief.data?.coordinates_authoritative && brief.render_strategy === "generative") {
    errors.push("authoritative coordinates cannot use generative-only strategy");
  }
  if ((brief.text_blocks ?? []).some(x => x?.exact) && brief.render_strategy === "generative") {
    warnings.push("Exact text is safer with hybrid/deterministic typesetting.");
  }
  return { valid: errors.length === 0, errors, warnings };
}
