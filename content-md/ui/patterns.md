---
id: ui-patterns
slug: patterns
kind: reference
title: Patterns
summary: How Ati explains and organises a screen — the reading order and the layer rule.
simple: 'There is a repeatable way to describe any Ati Flow screen: say what decision the user is making, then what they need to see, then what they can do.'
aliases:
  - how to read the dashboard
  - screen framework
status: current
author: Annuai
added: '2026-09-16'
sources:
  - old/ati-flow-screens.html
  - old/ati-flow-architecture.html
related:
  - ui-components
  - wf-exceptions
  - d-keep-the-layers-clear
  - architecture
order: 10
---

## Explaining a screen

The documented framework, in order:

- The user’s decision
- The information needed to make it
- The action available

Every screen entry in this section follows that order.

## Reading the dashboard

- **Start with system state:** is the fleet operating normally?
- **Look for exceptions:** which robots, tasks or zones need attention?
- **Understand impact:** is the issue isolated or affecting material flow?
- **Act at the right layer:** operational intervention belongs in Fleet Monitor and Robots; configuration belongs in Maps, Workflows and Setup; low-level diagnosis belongs in Debug.

## The layer rule

| Question | Layer | Where it is answered |
| --- | --- | --- |
| What is happening now? | Operations | Fleet Monitor |
| What should happen? | Configuration | Maps, Workflows, Setup & Config |
| Why is the robot behaving this way? | Diagnostics | Debug |

See [[d-keep-the-layers-clear]] and [[d-expose-the-decision]].
