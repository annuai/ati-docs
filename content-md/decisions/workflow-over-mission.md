---
id: d-workflow-over-mission
slug: workflow-over-mission
kind: decision
order: 2
title: 'Say "Workflow", not "Mission"'
summary: 'Mission and Workflow name the same thing. Ati Flow currently calls it Workflow — worth revisiting later.'
aliases: ['terminology', 'naming', 'mission']
status: current
category: 'Terminology'
author: Annuai
added: '2026-09-18'
sources:
  - 'Ati team — terminology directive, supplied in conversation, September 2026'
context: |
  **Mission** is the standard word used across the robotics and AMR industry for a composed
  sequence of robot actions that gets a job done. Ati Flow is an orchestration product, and its
  Workflows surface uses **Workflow** for that same idea.
decision: |
  Use **Workflow** as the product-facing term. Mission and Workflow are the same concept, with no
  meaning difference — this is not a distinction to preserve in new content.
why: |
  Ati Flow is orchestration software, and "Workflow" fits that framing better than the more
  industry/robotics-flavoured "Mission". This is a current call, not a permanent one: it may be
  worth revisiting as the product and its terminology mature.
alternatives:
  - 'Use **Mission** throughout, matching general industry usage — rejected for now since it reads as less native to an orchestration product.'
  - 'Use both interchangeably — rejected: this is exactly the kind of split naming that has caused confusion elsewhere in this documentation (see [[d-robot-over-amr]], [[d-processing-area-terminology]]).'
related: ['workflow', 'missions-and-actions', 'v-mission', 'd-robot-over-amr']
---

:::callout title="How to apply it"
Write *Workflow* in interface labels and documentation headings. Mention *Mission* once, to name it as the industry-standard term, and link to [[v-mission]] or [[missions-and-actions]].
:::

This may need revisiting: if Ati Flow’s positioning shifts, or if "Mission" turns out to communicate better to a new audience, this call should be reopened rather than treated as settled forever.
