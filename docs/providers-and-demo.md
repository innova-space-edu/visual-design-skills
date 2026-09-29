# Real providers and demo

## OpenAI Images

The built-in executor uses the Image API generation endpoint and defaults to `gpt-image-2.5-flare` with low quality for inexpensive demos. Configure:

```
OPENAI_API_KEY=...
OPENAI_IMAGE_MODEL=gpt-image-2.5-flare
OPENAI_IMAGE_QUALITY=low
```

The executor is text-to-image only in v1.4. Image edits require a dedicated edit executor.

## FLUX / Black Forest Labs

The BFL executor defaults to `flux-2-pro`. It submits the job, uses the returned `polling_url`, and waits until the task is Ready.

```
BFL_API_KEY=...
BFL_IMAGE_MODEL=flux-2-pro
```

For cost/speed, the executor caps requested output to roughly 2MP by default.

## SVG

SVG needs no external API, key, or provider call. The v1.4 renderer is intentionally a deterministic preview renderer for integration testing, not yet a full domain renderer for every specialized skill.

## Public demo safety

If provider keys are configured, set:

```
DEMO_ACCESS_TOKEN=<random-secret>
```

The browser may send this token only for the demo. Provider API keys remain server-side.

Generative execution is disabled when there is no demo token unless `ALLOW_PUBLIC_GENERATION=true` is explicitly set.

## Vercel

The repo includes:
- `demo/index.html`
- `demo/app.js`
- `api/visual.js`
- `vercel.json`

The root URL rewrites to the demo. `GET /api/visual` exposes provider availability without exposing secrets.
