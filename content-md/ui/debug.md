---
id: ui-debug
slug: debug
kind: screen
title: Debug
summary: Low-level configuration and diagnostics. Configurator only.
simple: The technical screen for answering "why is this robot behaving like this?" — and it is deliberately not for everyone.
status: current
author: Annuai
added: '2026-09-16'
sources:
  - old/amr-software-ia-roles.html
  - old/ati-flow-glossary.html
  - old/ati-flow-architecture.html
purpose: 'Answer the diagnostic question: why is the robot behaving this way?'
users:
  - '**Configurator** — exclusive. Hidden from every other role, including the Head of Operations.'
see:
  - Raw robot state
  - Calibration
  - Diagnostic logs
do:
  - Apply overrides
  - Inspect and calibrate low-level robot parameters
states:
  - Not documented.
related:
  - d-debug-is-configurator-only
  - robot-states
  - users
  - v-debug
order: 8
---

:::callout title="Why it is walled off"
The architecture is explicit: expose the operational decision a user needs rather than reproducing every internal robot state. Debug is where that internal state is allowed to live. See [[d-debug-is-configurator-only]].
:::
