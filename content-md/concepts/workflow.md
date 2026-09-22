---
id: workflow
title: Workflow
summary: The configured logic for transport behaviour — what should happen, expressed as workflows and actions.
simple: A workflow is the recipe. It says which steps make up a job, in what order, and how important that job is.
aliases:
  - workflows
  - transport behaviour
  - mission
status: current
author: Annuai
added: '2026-09-16'
sources:
  - old/ati-flow-glossary.html
  - old/amr-software-ia-roles.html
  - old/ati-flow-architecture.html
  - old/ati-flow-screens.html
  - Ati team — terminology directive, supplied in conversation, September 2026
revisions:
  - date: '2026-09-18'
    author: Annuai
    note: Added the workflow’s minimum requirement (material, pick station, drop station, movement rules) and flagged the open question of whether the current Machine dependency in workflow creation is required, from the Ati Flow system-understanding meeting.
  - date: '2026-09-18'
    author: Annuai
    note: Added that "Workflow" and "Mission" are the same concept — Mission is the wider industry term, Workflow is Ati Flow's current product term, chosen because it is an orchestration product. See [[d-workflow-over-mission]].
related:
  - missions-and-actions
  - map
  - ui-workflows
  - users
  - v-machine
  - information-vs-execution-layer
  - open-questions
  - d-workflow-over-mission
  - v-mission
order: 8
---

:::gap title="One word, two meanings"
In the product, a **workflow** is configured transport logic — it lives on the [[ui-workflows|Workflows]] surface next to Maps and Robots. In deployment conversations, *workflow* also means a human process, as in the [[wf-deployment|Site deployment workflow]]. This documentation keeps the two in different sections and says which is meant.
:::

:::callout title="Workflow and Mission are the same thing"
**Mission** is the standard word for this used across the wider robotics/AMR industry. Ati Flow, being an orchestration product, currently calls it **Workflow** instead — there is no conceptual difference. This is a current terminology call, not a permanent one; it may be worth revisiting later. See [[d-workflow-over-mission]].
:::

## Why it matters

Of the four product primitives, the workflow answers: *what sequence of actions should happen?* The [[map]] answers where, the [[fleet]] answers who, the workflow answers what.

## What it contains

- [[missions-and-actions|Action and sub-workflow design]] — the steps composed into the workflow itself
- Workflow patterns — taxi, milk run, bus
- Priority rules — how urgent a job is and whether it can be interrupted

## Who touches it

Editing workflows is Configurator work. A Head of Operations can view and approve them, a Fleet Supervisor can view them to understand what is configured, and an Operator does not see them at all. See [[users]].

## The minimum a workflow needs

At its simplest, a workflow is: **material + a start/pick station + an end/drop station + movement rules**. That minimum is then used by the execution side — the [[v-fleet-manager|Fleet Manager]]/fleet layer — to coordinate robot movement. See [[information-vs-execution-layer]].

:::gap title="Machine dependency under review"
Workflow creation currently depends on [[v-machine|Machine]] — a physical unit tagged Production Unit or Consumption Unit. Whether that dependency is technically required, or can be removed from the user-facing workflow configuration entirely, is unresolved. See [[open-questions]].
:::
