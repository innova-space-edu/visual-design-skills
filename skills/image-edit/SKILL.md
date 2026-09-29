---
name: image-edit
description: Perform constrained image edits such as add, remove, replace, move, recolor, relight, extend, crop, background change, text edit, or restyle while preserving required invariants.
---

# Image Edit

Represent edits as explicit operations.

Supported semantic operations:
- add
- remove
- replace
- move
- resize
- recolor
- relight
- restyle
- extend/outpaint
- crop/reframe
- background_replace
- text_edit
- identity_preserve

For each operation record target, change, preserve, and acceptance criteria.
When the user supplied an image, default to preserving everything not explicitly requested to change.
For text edits, preserve font role, alignment, hierarchy, and surrounding design unless the user requests a redesign.
