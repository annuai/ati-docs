---
id: orchestration
title: Orchestration
summary: Turning a factory’s material demand into coordinated robot work.
simple: Ati coordinates where material needs to go, which robot should move it, and when the movement should happen.
aliases:
  - material orchestration
  - orchestration layer
status: current
author: Annuai
added: '2026-09-16'
sources:
  - old/index.html
  - old/ati-flow-architecture.html
  - old/ati-flow-glossary.html
related:
  - material-flow
  - fleet
  - workflow
  - integrations
  - ati-flow
order: 11
---

## Why it matters

Orchestration is the reason the product exists. Ati Flow is described as the software layer for **automated material orchestration**, sitting between a factory’s material movement requirements and the robot fleet that executes those movements.

## More detail

The orchestration layer translates configured [[workflow|workflows]] and incoming requests into executable work. [[map|Maps]], workflows, [[fleet|fleets]], [[robot|robots]] and operational monitoring all meet here.

:::chain
caption: 'The core chain, as stated in the overview: factory need becomes a movement request, a configured workflow, fleet coordination, and finally robot execution on the floor.'
steps:
  - title: Factory demand
    note: Production and material needs
  - title: Integrations
    note: ERP / MES signals
  - title: Workflows
    note: What should happen
  - title: Maps
    note: Where and how to move
  - title: Fleet
    note: Who executes it
  - title: Robot
    note: Physical execution
:::

## How the pieces relate

:::relationship
nodes:
  - label: Robot
    to: robot
    note: belongs to
  - label: Fleet
    to: fleet
    note: coordinated by
  - label: Orchestration
    to: orchestration
    note: turns demand into
  - label: Trips
    to: trip
    note: which move
  - label: Material
    to: material-flow
:::

:::callout title="Orchestration is not autonomy"
The sources separate orchestration from the robot’s own navigation, perception and safety stack. Ati Flow decides what should happen; the robot decides how to drive.
:::
