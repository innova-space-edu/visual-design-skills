# Model routing

Choose by capability, not brand preference.

- General photo/illustration: OpenAI image or FLUX class backend.
- Semantic editing: OpenAI image, FLUX editing, or Qwen Image Edit class backend.
- Identity: reference-aware backend plus identity adapter/control when permitted.
- Typography-forward raster: Ideogram/FLUX/text-capable image backend.
- Editable vector/logo/icon: SVG/Recraft class backend.
- Chart: Vega-Lite.
- Real map: MapLibre/GeoJSON.
- Geometry/diagram: SVG/canvas.
- Technical plan: vector/CAD-like primitives.
- Reproducible local pipelines: ComfyUI.

Always define a fallback backend and list feature loss when falling back.
