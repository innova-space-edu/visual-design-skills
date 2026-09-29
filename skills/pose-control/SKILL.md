---
name: pose-control
description: "Control human or character posture, limb placement, gesture, camera-relative orientation, and body silhouette using pose/keypoint references when available. Use this skill whenever the user's visual request belongs to this domain, even when the skill name is not explicitly mentioned."
license: MIT
compatibility: Works with AI agents that can load Agent Skills-style SKILL.md files; backend tools are selected separately.
metadata:
  author: Innova Space Education
  version: "1.2.0"
  category: "core"
  default-render-strategy: "generative"
---


# Pose Control

Prefer keypoint/OpenPose/control references when exact pose matters.
Describe torso orientation, head direction, hand state, leg placement, weight distribution, and camera relation.
Treat anatomy failures as quality-control failures, not style variation.
