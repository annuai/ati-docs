---
id: material-flow
title: Material flow
summary: The movement of material through the factory — the thing the whole system exists to coordinate.
simple: 'Material flow is stuff getting where it needs to be: parts to a line, finished work away from it, at the right time.'
aliases:
  - material movement
  - WIP flow
status: draft
author: Annuai
added: '2026-09-16'
sources:
  - old/index.html
  - old/amr-deployment-workflow.html
  - old/ati-flow-architecture.html
  - old/ati-flow-screens.html
  - old/prototype/
  - Suryajit (Product Manager) — Ati Flow system-understanding meeting, 18 September 2026
  - Internal design/architecture review meeting, transcript supplied in conversation, September 2026
revisions:
  - date: '2026-09-18'
    author: Annuai
    note: 'Added what the Ati team confirmed about containers — point-to-point movement identified by a Container ID, without necessarily tracking detailed contents — partially closing this page’s material-model gap. Source: Ati Flow system-understanding meeting.'
  - date: '2026-09-18'
    author: Annuai
    note: Added that containers are also identified by MHE codes, and that the absence of container-type-to-material mapping and empty-container/inventory tracking is a deliberate, temporary scope gap rather than an oversight — from an internal design/architecture review.
related:
  - orchestration
  - wf-material-movement
  - v-wip
  - processing-zone
  - v-mhe
order: 12
---

## Why it matters

Material flow is the outcome the product is measured against. The architecture puts it at the end of the chain as the physical result in the factory, and the operational reading framework asks, when something goes wrong, whether the issue is isolated or **affecting material flow**.

## What the sources establish

- Site assessment begins by asking what material moves where, how often, and under what deadline pressure. That answer becomes the basis for workflow and priority logic later.
- Payload types and the handling method — top-load, tugger/cart, lift, or conveyor interface — are established at the same stage.
- Demand can come from business data: due dates, line schedules and stock levels can compute priority implicitly rather than relying on manual escalation.
- The prototype navigation includes **Staging Area** and **WIP Inventory**, and its content head offers a *Search Material* control.

## Containers, so far

Containers currently support basic point-to-point material movement, identified by a Container ID — or [[v-mhe|MHE code]] — used for operational pick-and-drop matching. The system does not necessarily track a container’s exact contents in detail — a Container ID resolves *how a container is moved and matched*, not *what it is a record of*.

:::callout title="A deliberate scope gap, for now"
There is no container-type-to-material mapping and no empty-container or inventory tracking yet. This is acknowledged as a deliberate scope gap rather than an oversight — the system is meant to scale, and both are expected to be added later.
:::

:::gap
There is still no model of material itself in any source: no definition of a material, a material type, a load or a unit, and no detailed inventory model of what is inside a container. `WIP Inventory` and `Staging Area` remain navigation labels with no documented content behind them.
:::
