---
id: information-vs-execution-layer
title: Information layer vs execution layer
summary: 'Two layers inside Ati Flow: one defines what needs to move and where; the other defines how the physical movement actually happens.'
simple: One half of Ati Flow decides what should move, from where, to where. The other half makes a robot actually go and do it. Keeping the two separate stops workflow configuration from getting mixed up with fleet and map detail a user should not need to know about.
aliases:
  - configuration layer
  - execution layer
  - booking layer
  - information layer
status: current
author: Annuai
added: '2026-09-18'
sources:
  - Suryajit (Product Manager) — Ati Flow system-understanding meeting, 18 September 2026
  - Internal design/architecture review meeting, transcript supplied in conversation, September 2026
revisions:
  - date: '2026-09-18'
    author: Annuai
    note: 'Added "Booking Layer" as an alias for the information layer, and named the specific decoupling point an internal design/architecture review kept circling back to: a workflow does not need to know about fleets, and a fleet does not need to know about Processing Areas.'
related:
  - architecture
  - processing-zone
  - fleet
  - workflow
  - open-questions
  - d-keep-the-layers-clear
order: 9
---

## The two layers

| Layer | What it contains | Purpose |
| --- | --- | --- |
| Information / Configuration (Booking) | Master Data, [[processing-zone\|Processing Area]], material grouping, [[v-material-station-mapping\|material station mapping]], [[workflow\|workflow]] definition | Defines what needs to move, from where, and to where |
| Execution | [[map\|Map]], [[fleet\|Fleet]], [[robot\|Robot]], actual movement execution | Defines how the physical movement is carried out |

This maps onto the five-layer [[architecture]] already documented: the information/configuration layer corresponds to the configuration side of the orchestration layer, and the execution layer corresponds to the fleet and robot/autonomy layers.

:::callout title="The two layers are only loosely coupled"
A [[workflow|Workflow]] does not need to know about [[fleet|Fleet]], and a Fleet does not need to know about [[processing-zone|Processing Area]]. An internal design/architecture review identified forcing one hierarchy onto the other as the main source of confusion when discussing this split — the two are deliberately decoupled.
:::

:::callout title="Design direction"
The redesigned configuration experience should avoid unnecessarily mixing these two layers — for example, a user configuring a workflow should not need to understand Machine dependency or Fleet assignment to do it. See [[d-keep-the-layers-clear]] for the related, earlier decision to keep operations, configuration and diagnostics apart.
:::

:::gap
The exact technical boundary between the two layers is not settled — how much of the current Machine, Station and Fleet dependency is technically required versus only historically exposed in the UI. See [[open-questions]].
:::
