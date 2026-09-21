---
id: wf-exceptions
slug: exceptions
title: Exceptions
summary: The situations that do not go to plan, and where each one is handled.
simple: Most of running a fleet is handling the cases where something is in the way, occupied, or contested.
aliases:
  - blocked
  - edge cases
  - failures
status: draft
author: Annuai
added: '2026-09-16'
revisions:
  - date: '2026-09-21'
    author: Annuai
    note: Added the L0–L3 hardware support escalation path, confirmed identically across three Sherpa user manuals. Narrowed the closing gap to the parts still undocumented — taxonomy, alert model and severity scale.
sources:
  - old/amr-deployment-workflow.html
  - old/prototype/
  - old/ati-flow-screens.html
  - 'UM Sherpa Pivot.pdf, UM_Sherpa_Tug.pdf and UM_Sherpa_Flexfork_.pdf, supplied September 2026'
related:
  - robot-states
  - traffic-control
  - ui-patterns
  - wf-deployment
  - v-blocked
order: 4
---

## Exceptions the sources name

| Situation | Where it shows up | Where it is addressed |
| --- | --- | --- |
| A robot is blocked | Red status pill and a pulsing halo in the live view; automated blocked-robot alerts after go-live | Operationally first, then by correcting the map or zone |
| Two robots reach the same gate at once | Deliberately tested during validation | [[traffic-control\|Traffic arbitration]] in the fleet layer |
| A station is occupied on arrival | Deliberately tested during validation | Mission and fleet logic |
| A manual priority escalation mid-cycle | Deliberately tested during validation | Priority and interrupt behaviour designed into the mission |
| Localization failure | Surfaces after go-live rather than in testing | Map correction, robot diagnostics |
| Priority misuse | Surfaces after go-live rather than in testing | Priority rules and operator training |

:::callout title="Why several of these only appear later"
Recovery and edge cases tend to surface during real operation rather than during testing, simply because weeks of real operation cannot be fully simulated.
:::

## How to respond

The documented reading order for an operational problem:

:::flow
steps:
  - title: Start with system state
    note: Is the fleet operating normally?
  - title: Look for exceptions
    note: Which robots, tasks or zones need attention?
  - title: Understand impact
    kind: decision
    note: Is the issue isolated, or is it affecting material flow?
  - title: Act at the right layer
    kind: outcome
    note: Operational intervention belongs in Fleet Monitor and Robots. Configuration belongs in Maps, Workflows and Setup. Low-level diagnosis belongs in Debug.
:::

## Escalation path

When a robot itself has a problem the site can't resolve, the same four-level path appears identically across the Sherpa Tug, Pivot and Flex Fork manuals:

| Level | Who | Response time |
| --- | --- | --- |
| L0 | Support Desk (24×7) | Immediately |
| L1 | A named Service Manager | 30 to 60 minutes |
| L2 | Head of Service and Support | N + 3 days (longer if spares are needed) |
| L3 | Chief Technical Officer | — |

:::gap
There is no documented exception taxonomy, alert model or severity scale.
:::
