---
id: fleet
title: Fleet
summary: A coordinated group of robots operating within a deployment.
simple: A fleet is all the robots working together at a site. Instead of driving each robot yourself, you manage them as one group and let the system decide which robot takes which job.
aliases:
  - fleet layer
  - fleet management
status: current
author: Annuai
added: '2026-09-16'
sources:
  - old/ati-flow-glossary.html
  - old/amr-deployment-workflow.html
  - old/ati-flow-architecture.html
  - old/amr-software-ia-roles.html
  - Internal design/architecture review meeting, transcript supplied in conversation, September 2026
revisions:
  - date: '2026-09-18'
    author: Annuai
    note: Added the simplest framing of fleet configuration — group of robots assigned to a map — and flagged the open question of whether Fleet needs frontend prominence at all, from the Ati Flow system-understanding meeting.
  - date: '2026-09-18'
    author: Annuai
    note: 'Replaced the vague "different robot types, maps, or operational requirements" with three concrete reasons multiple fleets/maps exist, from an internal design/architecture review: robot-type-specific maps, large maps being technically painful to stitch together today, and simpler configuration and operations.'
related:
  - robot
  - orchestration
  - traffic-control
  - zone
  - ui-fleet-monitor
  - map
  - open-questions
order: 2
---

## Why it matters

One robot following one route is a machine. Several robots sharing corridors, stations and charging docks is a traffic problem. The fleet layer is where that problem is solved: it turns individual [[missions-and-actions|workflows]] into a working group.

## How it works

Fleet management covers four kinds of decision:

- **Task allocation** — how an incoming request gets assigned to a specific idle or nearby robot
- **Traffic arbitration** at shared resources such as gates and exclusion zones — this is where contention and deadlock actually get tested
- **Charging and idle behaviour** — idle robots are typically sent to charging stations and staging positions automatically, without touching robots locked into a user-defined workflow
- **Priority and aging rules**, where manual escalation needs to be supported

:::callout title="A fleet is one of four primitives"
The architecture names four product primitives: [[map|Map]], [[workflow|Workflow]], Fleet and [[robot|Robot]]. The question a fleet answers is *how are multiple robots coordinated?*
:::

## Where a fleet appears in the product

Fleet coordination is configured during deployment and observed afterwards in [[ui-fleet-monitor|Fleet Monitor]], which presents robots, tasks and traffic organised around [[zone|zones]].

## Fleet configuration, in the simplest terms

At its core, configuring a fleet is a group-of-robots-to-map assignment: a group of [[robot|Robots]] gets assigned to a [[map|Map]]. Multiple fleets and maps typically exist for three concrete reasons:

- Different robot types need different maps
- Stitching very large maps together is technically painful today
- It keeps configuration and day-to-day operations simpler to manage

:::gap title="Is Fleet a frontend concept at all?"
After the robot-to-map assignment is made, Fleet appears to carry more weight in the backend/execution architecture than in the configuration experience a user sees. Whether Fleet needs to be exposed as a major frontend concept at all, or whether the same outcome is better represented directly as a Robot → Map assignment, is unresolved. See [[open-questions]].
:::

:::gap
How a fleet relates as a record to a [[zone]], a [[processing-zone|Processing Area]] or a site is not defined in the source material. Whether one site has one fleet or several is an open question.
:::
