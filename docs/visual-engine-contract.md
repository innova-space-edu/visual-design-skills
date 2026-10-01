# Visual Engine contract

visual-design-skills owns routing and specialist knowledge. visual-engine owns deterministic rendering.

The handoff is:

prompt -> VisualPlan -> VisualBrief -> compileBriefToScene -> VisualScene 1.0 -> visual-engine -> SVG/PNG/CanvasKit/WebGPU

The skill repository must not depend on the renderer implementation. It emits stable Scene JSON.

The engine repository must not contain curricular prompt logic. It renders the scene it receives.

visual-assets provides semantic assets referenced by stable IDs.

visual-studio is the integration and debugging environment.

EDUAI remains outside this contract until the standalone platform has passed visual and regression tests.
