---
id: wf-charging
slug: charging
title: Charging and idle behaviour
summary: What robots do when they are not carrying anything.
simple: When a robot has nothing to do, the fleet sends it somewhere useful — usually a charger, sometimes a waiting spot.
aliases:
  - docking
  - battery
  - idle
status: current
author: Annuai
added: '2026-09-16'
sources:
  - old/amr-deployment-workflow.html
  - old/prototype/
related:
  - fleet
  - robot
  - v-dock
  - v-staging-area
  - wf-deployment
order: 3
---

## Before anything runs: infrastructure

- Charging docks are placed during infrastructure setup — **ideally distributed rather than centralized**
- Dock count is sized against peak-hour demand versus charge time
- Docking and charging points are then annotated onto the map as positions, each with an entry-point orientation

## At runtime

:::flow
steps:
  - title: A robot becomes idle
    note: It has finished its work and nothing is queued for it.
  - title: Is it locked into a user-defined workflow?
    kind: decision
    note: Fleet management does not touch robots that are. Automatic idle behaviour applies only to robots that are free.
  - title: The fleet sends it to a charger or a staging position
    note: This happens automatically, without an operator asking.
  - title: The robot docks and charges
    kind: outcome
    note: Battery level is visible per robot in the live view.
:::

:::callout title="Battery as an early-warning signal"
Battery consumption is one of the three baselines captured right after go-live, alongside normal cycle times and blocked-robot frequency, so that later drift can be told apart from normal variance.
:::

:::gap
No charging thresholds, charge-time figures or battery capacities appear in any source.
:::
