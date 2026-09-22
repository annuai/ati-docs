---
id: missions-and-actions
title: Actions and workflow design
summary: How transport behaviour is composed, from single actions up to a repeatable workflow pattern.
simple: An action is one thing a robot can do, like go to a position or dock. A workflow is a sequence of those actions that gets a real job done.
aliases:
  - mission
  - mission design
  - action
  - sub-mission
  - sub-workflow
status: current
author: Annuai
added: '2026-09-16'
revisions:
  - date: '2026-09-18'
    author: Annuai
    note: Added that "Mission" is the standard industry term for what Ati Flow, as an orchestration product, currently calls a Workflow — the same concept, not two different ones. See [[d-workflow-over-mission]].
  - date: '2026-09-22'
    author: Annuai
    note: 'Reworded the page to use "workflow" and "sub-workflow" throughout, in line with [[d-workflow-over-mission]] — previously the body used "mission" as if it were Ati Flow''s own term, with only one disclaimer callout. Renamed the title from "Missions and actions"; the id and aliases are unchanged so existing links and searches for "mission" still resolve here.'
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

Workflows are where the annotated [[map]] becomes actual transport behaviour. A workflow is the unit a [[fleet]] allocates and a [[robot]] executes.

## How it is composed

Build the smallest pieces first, then compose upwards:

:::relationship
nodes:
  - label: Action
    note: go to position · dock · undock · wait · trigger I/O · request access to a resource
  - label: Sub-workflow
    note: a reusable pattern such as "go to charging station", built once instead of duplicated
  - label: Workflow
    note: an executable transport behaviour composed from actions and sub-workflows
:::

## Workflow patterns

Three named patterns appear in the source material. Choose one per use case:

| Pattern | Shape | When it fits |
| --- | --- | --- |
| Taxi | On-demand, point-to-point | A request arrives and one robot answers it |
| Milk run | Fixed loop, multiple stops | Regular collection or delivery across several points |
| Bus | Scheduled, repeating route | Movement that happens on a timetable rather than on demand |

:::gap title="\"Taxi\" is a workflow pattern, not a robot mode"
The glossary is explicit: *taxi mode* is not established as an industry term in this material, and should not be assumed to mean maintenance, teleoperation or manual driving. See [[v-taxi-mode]].
:::

## Priority and interrupts

Priority and interrupt behaviour is designed into the workflow: whether it can be preempted, and where in its route preemption is safe. Real request patterns after go-live often show that a workflow built for average conditions does not hold at peak load.
