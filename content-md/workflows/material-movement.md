---
id: wf-material-movement
slug: material-movement
title: Material movement
summary: How a need somewhere in the factory becomes material arriving somewhere else.
simple: Something needs moving. The system picks a robot, tells it where to go, and the robot goes and does it.
aliases:
  - material flow workflow
  - request to delivery
status: draft
author: Annuai
added: '2026-09-16'
sources:
  - old/index.html
  - old/ati-flow-architecture.html
  - old/amr-deployment-workflow.html
related:
  - material-flow
  - orchestration
  - wf-robot-dispatch
  - integrations
order: 1
---

## The sequence

:::flow
steps:
  - title: Demand appears
    note: Production demand, material availability, a line schedule or an inventory condition creates the reason for movement.
    tag: Business layer
  - title: A request arrives
    note: An external system triggers a mission through an API hook, or a person raises the request directly.
    tag: Integration layer
  - title: Orchestration turns it into work
    note: The configured workflow and the incoming request become executable work.
    tag: Orchestration layer
  - title: The fleet picks a robot
    kind: decision
    note: Task allocation assigns the work to a specific idle or nearby robot. Priority decides what happens first.
    tag: Fleet layer
  - title: The robot executes
    note: Navigate to the pickup position, take the load, transport it, drop it off — using the robot’s own navigation and safety systems.
    tag: Robot layer
  - title: Material has moved
    kind: outcome
    note: Status and completion updates flow back to the requesting system.
    tag: Factory
:::

## What decides which robot goes

- Task allocation logic — which robot is idle or nearby
- Priority, which can be designed into the mission, applied by fleet aging rules, computed from business data, or raised manually by an operator
- Traffic arbitration, once more than one robot wants the same route

:::gap
The specific allocation algorithm, the priority scale and the request payload are not documented anywhere in this folder. The sequence above is assembled from the architecture chain and the fleet-management stage of deployment.
:::
