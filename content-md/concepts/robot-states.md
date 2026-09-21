---
id: robot-states
title: Robot states
summary: What a robot can be doing, as far as the source material establishes it.
simple: A robot is always in some state — moving, stopped and stuck, or out of service. The state is the first thing an operator reads.
aliases:
  - status
  - moving
  - blocked
  - maintenance
  - idle
status: needs-confirmation
author: Annuai
added: '2026-09-16'
sources:
  - old/prototype/
  - old/ati-flow-glossary.html
  - old/amr-deployment-workflow.html
  - old/ati-flow-faq.html
related:
  - robot
  - ui-fleet-monitor
  - wf-exceptions
  - open-questions
  - indicator-lights
order: 14
---

:::gap title="This is not a complete state machine"
Only some states appear in the sources, and they come from different places. The real state list is an open question that the source material itself raises.
:::

## States that appear in the sources

| State | Where it comes from | What it means |
| --- | --- | --- |
| Moving | Prototype status pill and map legend | The robot is executing a trip. Shown in yellow on the map. |
| Blocked | Prototype status pill and map legend | The robot has stopped because something is in the way. Shown in red, with a pulsing halo on the map. |
| Maintenance | Glossary | Used to remove a robot from normal dispatch while it is being serviced. The exact implementation and permissions should be confirmed. |
| Idle | Deployment stage 6 | Not shown as a state in the UI, but referred to in prose: idle robots are sent to charging stations and staging positions automatically. |

## Open questions the sources raise themselves

- What exact robot states exist in the production system?
- Is Maintenance a fleet-visible state, a robot-local state, or both?
- Does a robot under maintenance still count as available capacity?
- What is the authoritative source for robot availability?

One design principle is relevant here: expose the operational decision a user needs rather than reproducing every internal robot state. Low-level state belongs in [[ui-debug|Debug]]. See [[d-expose-the-decision]].

Before any dashboard is involved, a robot reports a version of its own state directly — see [[indicator-lights|indicator lights and sounds]].
