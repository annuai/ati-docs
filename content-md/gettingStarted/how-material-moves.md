---
id: gs-how-material-moves
slug: how-material-moves
step: 5
title: How does material move?
summary: A need becomes a request, a request becomes a robot journey, and material arrives.
simple: Something in the factory needs material. That need becomes a job. A robot is chosen, it collects the material and delivers it.
status: draft
author: Annuai
added: '2026-09-16'
sources:
  - old/index.html
  - old/ati-flow-architecture.html
  - old/amr-deployment-workflow.html
related:
  - material-flow
  - wf-material-movement
  - trip
order: 5
---

:::relationship
nodes:
  - label: Demand
    note: a line needs material, or work is finished and needs clearing
  - label: Request
    note: raised by a business system through an integration, or by a person
  - label: Trip
    to: trip
    note: allocated to
  - label: Robot
    to: robot
    note: which executes it, and so material moves
:::

The fuller version, with what decides each step, is on [[wf-material-movement]].

:::gap
Material itself is not modelled anywhere in the source material — there is no definition of a material, a load or a container. This step describes the movement, not the thing being moved.
:::

Next: [[gs-what-is-orchestration|what orchestration means]].
