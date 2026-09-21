---
id: robot
title: Robot
summary: One autonomous machine that drives itself around the factory and moves material.
simple: A robot is a single machine on the floor. It finds its own way around, carries material from one place to another, and reports where it is and what it is doing.
aliases:
  - AMR
  - bot
  - autonomous mobile robot
status: current
author: Annuai
added: '2026-09-16'
sources:
  - old/ati-flow-glossary.html
  - old/amr-software-ia-roles.html
  - old/amr-deployment-workflow.html
  - old/ati-flow-architecture.html
  - old/prototype/
  - public/assets/ati-sherpa.png
related:
  - fleet
  - robot-states
  - trip
  - zone
  - v-amr
  - v-mule
order: 1
---

## Why it matters

**Robot** is the product-facing word. The technical term is [[v-amr|AMR]] — autonomous mobile robot — and it still appears in engineering and deployment conversations, but the interface says *Robot*. Getting this right keeps the product readable for an operator who has never met the acronym.

A robot is also the smallest unit of capacity in the system. Everything above it — [[fleet|fleets]], [[orchestration]], [[trip|trips]] — exists to decide which robot should do what, and when.

:::figure
src: /assets/ati-sherpa.png
alt: 'An Ati Sherpa XT Lite autonomous mobile robot: a yellow four-wheeled vehicle with a sensor mast, a safety beacon and a side access panel.'
caption: The robot pictured in the Ati Flow prototype. The chassis is labelled Ati Sherpa XT Lite — the only hardware naming that appears anywhere in the source material.
:::

## How it works

The robot handles its own movement. Navigation, perception, localization, safety and drive systems all run on the machine — Ati Flow tells it *what* to do, not how to steer. The software running on the robot itself is called [[v-mule|Mule]].

Configuration that belongs to an individual robot, set during infrastructure setup:

- Network credentials and robot ID
- Safety parameters — maximum speed, footprint, sensor calibration
- Payload profile and drive parameters

:::callout title="Robot configuration is not map configuration"
These per-robot settings are deliberately kept separate from [[map]] and [[missions-and-actions|mission]] configuration, which come later in the deployment and describe the environment and the work rather than the machine.
:::

## What you see about a robot

In the live view, a robot is presented through a small, fixed set of facts:

- An identifier and a current [[robot-states|state]], for example *Moving* or *Blocked*
- Battery level, shown as a percentage and a bar
- The [[trip]] it is on and its next station
- A short recent-activity timeline

:::gap
No source in this folder documents robot hardware specifications — payload capacity, battery capacity, dimensions, speed ranges or the available robot variants. `Sherpa XT Lite` is known only because it is printed on the robot in the product render.
:::
