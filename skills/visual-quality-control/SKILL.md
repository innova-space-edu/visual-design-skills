---
name: visual-quality-control
description: Inspect visual outputs against the VisualBrief, score failures by severity, and generate targeted repair instructions.
---

# Visual Quality Control

Validate the output, not merely aesthetic appeal.

## Mandatory dimensions

Score 0-1:
- prompt_adherence
- subject_integrity
- composition
- text_accuracy
- geometry_accuracy
- data_accuracy
- identity_consistency
- anatomy
- perspective
- lighting_consistency
- brand_accuracy
- accessibility
- crop_and_safe_area
- technical_output

Use `schemas/quality-report.schema.json`.

## Hard failures

Set `repair_required=true` when any required invariant fails, including:
- wrong exact text
- wrong numerical value
- map point materially misplaced
- mathematical construction invalid
- floor-plan dimension changed
- reference identity lost
- required object missing
- requested format/aspect ratio incorrect

## Repair

Prefer targeted edit over full regeneration.
Generate a repair instruction containing:
- observed_failure
- required_correction
- preserve
- region/object to modify
- validation test after repair

Do not repair unrelated visual details unless they directly cause a hard failure.
