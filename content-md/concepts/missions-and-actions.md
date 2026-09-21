---
id: missions-and-actions
title: Missions and actions
summary: How transport behaviour is composed, from single actions up to repeatable mission patterns.
simple: An action is one thing a robot can do, like go to a position or dock. A mission is a sequence of those actions that gets a real job done.
aliases:
  - mission
  - mission design
  - action
  - sub-mission
status: current
author: Annuai
added: '2026-09-16'
revisions:
  - date: '2026-09-18'
    author: Annuai
    note: Added that "Mission" is the standard industry term for what Ati Flow, as an orchestration product, currently calls a Workflow — the same concept, not two different ones. See [[d-workflow-over-mission]].
sources:
  - old/ati-flow-glossary.html
  - old/amr-deployment-workflow.html
  - Ati team — terminology directive, supplied in conversation, September 2026
related:
  - workflow
  - fleet
  - map-annotation
  - v-taxi
  - v-milk-run
  - v-bus
  - d-workflow-over-mission
  - v-mission
order: 7
---

:::callout title="Mission is the industry word; Ati Flow says Workflow"
A **mission**, in the wider robotics/AMR industry, is exactly what this page describes: a composed sequence of actions that gets a job done. Ati Flow, being an orchestration product, currently calls this a **Workflow**. There is no meaning difference — this may be revisited as the product matures. See [[d-workflow-over-mission]].
:::

## Why it matters

Missions are where the annotated [[map]] becomes actual transport behaviour. They are the unit a [[fleet]] allocates and a [[robot]] executes.

## How it is composed

Build the smallest pieces first, then compose upwards:

:::relationship
nodes:
  - label: Action
    note: go to position · dock · undock · wait · trigger I/O · request access to a resource
  - label: Sub-mission
    note: a reusable pattern such as "go to charging station", built once instead of duplicated
  - label: Mission
    note: an executable transport behaviour composed from actions and sub-missions
:::

## Mission patterns

Three named patterns appear in the source material. Choose one per use case:

| Pattern | Shape | When it fits |
| --- | --- | --- |
| Taxi | On-demand, point-to-point | A request arrives and one robot answers it |
| Milk run | Fixed loop, multiple stops | Regular collection or delivery across several points |
| Bus | Scheduled, repeating route | Movement that happens on a timetable rather than on demand |

:::gap title="\"Taxi\" is a mission pattern, not a robot mode"
The glossary is explicit: *taxi mode* is not established as an industry term in this material, and should not be assumed to mean maintenance, teleoperation or manual driving. See [[v-taxi-mode]].
:::

## Priority and interrupts

Priority and interrupt behaviour is designed into the mission: whether it can be preempted, and where in its route preemption is safe. Real request patterns after go-live often show that a mission built for average conditions does not hold at peak load.
