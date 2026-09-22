---
id: wf-robot-dispatch
slug: robot-dispatch
title: Robot dispatch
summary: How an incoming request becomes a specific robot moving.
simple: Dispatch is the moment a job stops being a request and becomes a robot’s problem.
aliases:
  - task allocation
  - assignment
status: draft
author: Annuai
added: '2026-09-16'
sources:
  - old/amr-deployment-workflow.html
  - old/amr-software-ia-roles.html
related:
  - fleet
  - trip
  - v-dispatch
  - users
order: 2
---

## The sequence

:::flow
steps:
  - title: A task enters the queue
    note: From an integration, a configured schedule, or a person.
  - title: Is a robot available?
    kind: decision
    note: Robots in maintenance are removed from normal dispatch. Robots locked into a user-defined workflow are not interrupted by automatic fleet behaviour.
  - title: Allocation picks a robot
    note: An idle or nearby robot is selected.
  - title: Traffic arbitration applies
    kind: decision
    note: Where the route crosses gates or exclusion zones, access is arbitrated before the robot proceeds.
  - title: The robot runs the workflow
    kind: outcome
    note: Progress becomes visible in the live view as a trip with a next station.
:::

## Manual intervention

An Operator can raise a manual priority request, and the interface shows the trade-off before they confirm. A Fleet Supervisor can reassign work within their zones. Neither is a Configurator activity — day-to-day dispatch is explicitly operational.

:::gap
Whether an operator can dispatch a robot directly, and which robot actions each role may take, is listed as an open question in the source material.
:::
