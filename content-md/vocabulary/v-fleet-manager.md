---
id: v-fleet-manager
term: Fleet Manager
kind: term
simple: Ati’s software running in real warehouses today. It controls the fleet — where robots go, which trips they run — but it does not decide what ought to happen.
technical: 'The software that actually runs the fleet on site. It is deliberately **not an intelligent system**: it executes fleet control rather than deciding what the factory needs. The thinking sits above it, in the orchestration layer that [[ati-flow|Ati Flow]] adds.'
aliases:
  - fleet manager
  - FM
usedIn:
  - Live sites today
  - Any conversation about what physically commands the robots
note: Three similar names, three different things. See [[ati-flow|the disambiguation table on the Ati Flow page]].
related:
  - ati-flow
  - v-deployment-manager
  - v-route-ops
  - v-visa
  - v-fleet-monitor
  - fleet
  - v-fleet-controller
  - v-fleet-management-system
  - workflow
  - trip
  - information-vs-execution-layer
status: current
author: Annuai
added: '2026-09-16'
revisions:
  - date: '2026-09-16'
    author: Annuai
    note: 'Expanded with what Fleet Manager actually does, and corrected: Ati Flow combines it with Deployment Manager and an orchestration layer rather than simply replacing it.'
  - date: '2026-09-18'
    author: Annuai
    note: Added the concrete dispatch mechanism — taking a workflow’s start/end/material and dispatching a nearby robot to run the trip — from an internal design/architecture review.
sources:
  - Ati team — noted September 2026
  - Internal design/architecture review meeting, transcript supplied in conversation, September 2026
order: 15
---

## What it does

- Manages the fleet
- Tells robots where to go
- Books a trip for a robot, and manages trips once they are running
- Analytics
- Surfaces traffic problems, including [[v-visa|VISA]] contention
- [[v-route-ops|Route Ops]] — route changes such as excluding a station from the map

## The mechanism, concretely

Fleet Manager takes a [[workflow|workflow]]’s start station, end station and material, and dispatches an available, nearby robot to execute the resulting [[trip|trip]]. That is the bridge between the information/booking layer and the execution layer — see [[information-vs-execution-layer]].

## How it relates to Ati Flow

Fleet Manager is one of the three parts [[ati-flow|Ati Flow]] brings together, alongside [[v-deployment-manager|Deployment Manager]] and an orchestration layer. Today they are separate tools; Ati Flow is the product that combines them.

:::gap
How much of Fleet Manager has already been absorbed into Ati Flow, and on what timeline, is not documented. [[v-route-ops|Route Ops]] is one capability known to still live only in Fleet Manager.
:::
