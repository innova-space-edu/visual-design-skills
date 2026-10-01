# visual-engine backend

Visual Engine is the preferred local deterministic execution target for structured visual skills.

It consumes VisualScene 1.0 and renders through bundled code or WASM. The baseline renderer is SVG. Optional local adapters add resvg PNG rasterization, CanvasKit/Skia browser acceleration, Yoga layout, MathJax math rendering, Rough.js styles, and Three.js WebGPU for experimental 3D.

No network image provider is required.

Use Visual Engine whenever authoritative text, formulas, dimensions, topology, coordinates, or editable structure are more important than unconstrained photorealism.
