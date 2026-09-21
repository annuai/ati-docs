---
id: d-expose-the-decision
slug: expose-the-decision
kind: decision
order: 5
title: 'Expose the decision, not the internal state'
summary: 'Show the user what they need in order to decide, rather than everything the robot knows.'
status: current
category: 'UX decision'
author: Annuai
added: '2026-09-16'
sources:
  - old/ati-flow-architecture.html
  - old/ati-flow-screens.html
context: |
  A robot produces a great deal of internal state — localization confidence, calibration values,
  sensor health, drive parameters. All of it is real, and almost none of it helps an operator
  decide what to do next.
decision: |
  Expose the operational decision a user needs rather than reproducing every internal robot
  state. Low-level diagnostics remain in [[ui-debug|Debug]].
why: |
  Surfacing internal state as though it were operational information makes the operator
  responsible for interpreting it. The product should have already done that interpretation.
alternatives:
  - 'Not recorded in the source material.'
related: ['ui-patterns', 'robot-states', 'ui-debug', 'd-keep-the-layers-clear']
---

This is also the framework used to describe any screen: the user’s decision first, then the information needed to make it, then the available action. See [[ui-patterns]].

:::callout title="Where it shows up"
The live view reduces a robot to a state, a battery level, a trip and a next station. That is a decision-shaped summary, not a state dump.
:::
