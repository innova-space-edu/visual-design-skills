function compact(value) {
  return value && Object.keys(value).length ? JSON.stringify(value) : "";
}

function promptParts(brief) {
  const exact = (brief.text_blocks ?? []).filter(x => x?.text).map(x =>
    x.exact ? 'EXACT TEXT: "' + x.text + '"' : 'Text: "' + x.text + '"'
  );
  return [
    brief.purpose && "Purpose: " + brief.purpose,
    compact(brief.subject) && "Subject: " + compact(brief.subject),
    compact(brief.scene) && "Scene: " + compact(brief.scene),
    compact(brief.composition) && "Composition: " + compact(brief.composition),
    compact(brief.camera) && "Camera: " + compact(brief.camera),
    compact(brief.lighting) && "Lighting: " + compact(brief.lighting),
    brief.palette?.length && "Palette: " + brief.palette.join(", "),
    ...exact,
    brief.constraints?.length && "Constraints: " + brief.constraints.join("; "),
    brief.preserve?.length && "PRESERVE: " + brief.preserve.join("; ")
  ].filter(Boolean);
}

export function compileBackendRequest(brief, backend) {
  if (!backend) throw new Error("backend is required");
  const prompt = promptParts(brief).join(". ");

  if (["svg","maplibre","vega-lite"].includes(backend)) {
    return {
      backend,
      mode:"deterministic",
      instruction:"Preserve authoritative values, geometry, coordinates, formulas, and exact text. Do not replace them with free-form image generation.",
      visual_brief:brief
    };
  }

  const base = {
    backend,
    mode: backend === "comfyui" ? "workflow" : backend === "recraft" ? "vector-or-generative" : "generative",
    prompt,
    preserve:brief.preserve ?? [],
    references:brief.references ?? []
  };

  if (backend === "flux") base.rules = [
    "Use positive natural-language descriptions.",
    "Front-load the primary subject.",
    "Preserve exact constraints and reference roles.",
    "Do not rely on classic negative prompts."
  ];
  else if (backend === "ideogram") base.rules = [
    "Prioritize quoted exact text and hierarchy.",
    "Use deterministic typesetting for dense copy."
  ];
  else if (backend === "qwen-image") base.rules = [
    "State edit target and preservation set explicitly.",
    "Use structural controls when geometry must remain stable."
  ];
  else if (backend === "recraft") base.rules = [
    "Prefer editable vector output for logo, icon, and flat illustration tasks.",
    "Validate silhouette and scalability."
  ];
  else if (backend === "comfyui") base.workflow_requirements = [
    "select checkpoint",
    "attach structural control when required",
    "attach identity/reference adapter when required",
    "save workflow metadata"
  ];
  else base.edit_contract = { change:brief.change ?? [], preserve:brief.preserve ?? [] };

  return base;
}
