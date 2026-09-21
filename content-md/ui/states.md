---
id: ui-states
slug: states
kind: reference
title: States
summary: The states the interface actually shows, and where they come from.
simple: What a screen can look like when things are normal, when something is wrong, and when there is nothing to show.
status: draft
author: Annuai
added: '2026-09-16'
sources:
  - old/prototype/
  - old/ati-flow-glossary.html
  - old/amr-software-ia-roles.html
related:
  - robot-states
  - ui-components
  - ui-fleet-monitor
  - d-role-based-visibility
order: 11
---

## Robot states in the interface

| State | How it is shown | Source |
| --- | --- | --- |
| Moving | Teal status pill; yellow robot on the map | Prototype |
| Blocked | Red status pill; red pulsing halo on the map | Prototype |
| Maintenance | Not shown in any prototype screen; described in the glossary and actionable from Robots | Glossary, IA |
| Idle | Not shown as a state; referred to in prose about fleet behaviour | Deployment stage 6 |

## Interface states

:::defs
items:
  - term: Paused
    text: The detail panel action switches from Pause to Resume, and robot motion stops.
  - term: Selected / not selected
    text: The map shows a selection readout; the detail panel can be closed.
  - term: Layers on / off
    text: A toggle in the content head, highlighted teal when active.
  - term: Hidden by role
    text: Whole surfaces are absent, not disabled, for roles that should not see them. See [[d-role-based-visibility]].
:::

:::gap
Loading, empty, error and offline states are not designed or described anywhere in the source material. Neither is the complete robot state machine — see [[robot-states]].
:::
