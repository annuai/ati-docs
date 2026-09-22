---
id: d-keep-the-layers-clear
slug: keep-the-layers-clear
kind: decision
order: 4
title: 'Keep operations, configuration and diagnostics separate'
summary: 'Three different questions, three different places to answer them.'
status: current
category: 'Product principle'
author: Annuai
added: '2026-09-16'
sources:
  - old/index.html
  - old/ati-flow-screens.html
  - old/ati-flow-architecture.html
context: |
  A fleet product can easily become one screen that shows everything: live robots, the map
  editor, workflow logic and raw diagnostics side by side. Each of those serves a different
  question and a different person.
decision: |
  Organise the product around three layers — **operations** (what is happening now),
  **configuration** (what should happen) and **diagnostics** (why is the robot behaving this
  way) — and keep each on its own surfaces.
why: |
  It keeps each surface answerable. An operator handling a blocked robot should not be reading
  workflow logic, and a configurator verifying a route should not be triaging a queue.
alternatives:
  - 'Not recorded in the source material.'
related: ['ati-flow', 'ui-patterns', 'configuration-layers', 'd-debug-is-configurator-only']
---

| Layer | Question | Surfaces |
| --- | --- | --- |
| Operations | What is happening now? | Fleet Monitor, Robots |
| Configuration | What should happen? | Maps, Workflows, Setup & Config |
| Diagnostics | Why is the robot behaving this way? | Debug |

This principle also drives the fourth step of the documented dashboard reading order: *act at the right layer*. See [[ui-patterns]].
