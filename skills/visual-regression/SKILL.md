---
name: visual-regression
description: Deterministic regression skill that compares current and candidate visual behavior across golden cases before any learned change can be promoted.
---
# Visual Regression

Use this skill to validate every optimizer candidate.

## Responsibilities
- Run current and candidate configurations against the same golden corpus.
- Compare quality, semantic score, overflow, failures, render latency and expected edit burden.
- Block candidates that improve one metric while creating unacceptable regressions.
- Emit per-case diagnostics and aggregate results.

## Default gates
- no meaningful quality decrease
- no semantic quality decrease
- no new overflow
- no new failures
- bounded render slowdown

## Output
A regression report with current/candidate metrics, deltas, pass/fail status and reasons.

## Guardrails
A failed regression report can never be promoted automatically.
