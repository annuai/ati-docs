---
id: gs-what-is-ati-flow
slug: what-is-ati-flow
step: 2
title: What is Ati Flow?
summary: The software layer between a factory’s material needs and the robots that meet them.
simple: Ati Flow sits in the middle. The factory tells it what needs moving; it works out which robot goes, and keeps all the robots out of each other’s way.
status: current
author: Annuai
added: '2026-09-16'
sources:
  - old/index.html
  - old/ati-flow-architecture.html
related:
  - ati-flow
  - architecture
  - orchestration
order: 2
---

The definition used across the existing documentation: **Ati Flow is Ati Robotics’ software layer for automated material orchestration.** It sits between a factory’s material movement requirements and the robot fleet that executes those movements.

## The chain to remember

:::chain
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

If you remember one thing from this documentation, make it this chain. Almost every concept sits somewhere along it.

Next: [[gs-what-is-a-robot|what a robot is]]. Or read the full [[ati-flow|Ati Flow overview]] page now.
