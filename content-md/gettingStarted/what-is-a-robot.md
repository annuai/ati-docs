---
id: gs-what-is-a-robot
slug: what-is-a-robot
step: 3
title: What is a robot?
summary: One self-driving machine that carries material from one place to another.
simple: A robot is a single machine on the floor. It knows where it is, finds its own route, and reports its state as it goes.
status: current
author: Annuai
added: '2026-09-16'
sources:
  - old/ati-flow-glossary.html
  - old/amr-software-ia-roles.html
  - old/prototype/
related:
  - robot
  - robot-states
  - v-amr
order: 3
---

## The word matters

The technical term is **AMR** — autonomous mobile robot. The product says **Robot**, deliberately, so that nobody needs an acronym to read a screen. See [[d-robot-over-amr]].

## What you know about a robot

- Its identifier
- Its [[robot-states|state]] — for example *Moving* or *Blocked*
- Its battery level
- The [[trip]] it is on and its next station

:::callout title="The robot steers itself"
Navigation, perception, localization and safety all run on the machine. Ati Flow decides what should happen, not how to drive.
:::

Next: [[gs-what-is-a-fleet|what a fleet is]]. Or read the full [[robot]] page.
