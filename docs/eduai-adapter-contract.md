# EDUAI adapter contract

EDUAI should extend the general SDK rather than fork its routing logic.

Use the extension hooks:

```js
const visual = createVisualDesign({
  defaultContext:{ product:"eduai" },

  contextProvider: async ({ input, context }) => ({
    // course, level, subject, OA, planning context, approved visual style
  }),

  semanticRouter: async ({ prompt, localRouting, context }) => {
    // Optional cheap model only for low-confidence requests.
  },

  enrichBrief: async ({ brief, context }) => ({
    // MINEDUC/OA constraints, age-appropriate language,
    // institutional style, document context, etc.
  }),

  backendPolicy:{
    preferredGenerative:["openai","flux"]
  }
});
```

Recommended EDUAI-only layers:
- curriculum/OA context;
- Supabase visual memory and feedback;
- per-course visual presets;
- provider budget policy;
- approved/reusable educational asset cache;
- quality metrics by skill/backend;
- user/tenant authorization.

These belong in `eduai-platform`, not in the generic core.
