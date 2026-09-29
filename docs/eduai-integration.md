# EDUAI integration

## Goal

Use the repository as a shared visual-intelligence layer without loading every skill into every request.

## Recommended runtime

1. Normalize the user request.
2. Run the low-cost prefilter (`scripts/route.mjs` or equivalent server-side implementation).
3. Always load `visual-design-router`.
4. Give the router only the top candidate skill metadata plus core metadata.
5. Router emits `RoutingResult` and `VisualBrief`.
6. Load the selected specialist `SKILL.md` files.
7. Choose backend using `references/capability-matrix.json` and `references/model-router.md`.
8. Compile the prompt/render plan.
9. Execute the backend(s).
10. Run `visual-quality-control`.
11. If a hard invariant failed, perform targeted repair rather than full regeneration.

## Token-efficiency rule

Do not inject all skill bodies into the model context. Metadata is cheap; full instructions are loaded only after routing. This follows progressive-disclosure patterns used by current Agent Skills authoring guidance.

## Suggested EDUAI object

```ts
type VisualJob = {
  id: string;
  userRequest: string;
  routing: RoutingResult;
  brief: VisualBrief;
  selectedSkillFiles: string[];
  renderPlan: RenderPlan;
  artifacts: Array<{ kind: string; uri: string; backend: string }>;
  quality?: VisualQualityReport;
};
```

## Cost control

- cache skill metadata and shared references;
- route locally before LLM expansion;
- avoid vision-model QA when deterministic validators can check values/text/coordinates;
- use low-cost preview models first, then production-quality backend for the approved composition;
- edit failed regions instead of regenerating the entire image.

## Security/data handling

Reference images may contain personal data. Keep access scoped to the current job, avoid embedding private image URLs in logs, and retain only what the application policy requires.
