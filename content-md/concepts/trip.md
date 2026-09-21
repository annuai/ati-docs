---
id: trip
title: Trip
summary: The in-product name for a journey a robot is making — a robot, a load, and a job, from here to there.
simple: 'A trip is one journey: this robot, this load, from here to there. The live view shows its identifier and where the robot is heading next. "Task" is sometimes used for the same thing, but Ati uses Trip — there is no conceptual difference between the two, they are all trips.'
aliases:
  - AMR trip
  - trip ID
  - task
  - task queue
status: current
author: Annuai
added: '2026-09-16'
revisions:
  - date: '2026-09-18'
    author: Annuai
    note: 'Resolved: Task and Trip name the same thing, with no conceptual difference — Ati currently uses Trip. Merged the separate Task page into this one rather than leaving them as two unreconciled names for the same idea.'
sources:
  - old/prototype/
  - old/ati-flow-faq.html
  - old/amr-deployment-workflow.html
  - old/amr-software-ia-roles.html
  - old/ati-flow-glossary.html
related:
  - robot
  - material-flow
  - fleet
  - orchestration
  - ui-fleet-monitor
order: 10
---

## What the sources show

- The prototype navigation includes an **AMR Trips** page.
- The robot detail panel has a **Trip Details** section containing a *Trip ID* and a *Next Station*.
- Trip identifiers follow the shape `TRP-20487`; stations follow `S100` to `S105`.
- The activity timeline records events such as *Trip TRP-20487 assigned*, which implies a trip is assigned to a robot rather than owned by it.
- Fleet management includes **task allocation logic** — how an incoming trip gets assigned to a specific idle or nearby robot.
- [[ui-fleet-monitor|Fleet Monitor]] is described as a live, zone-based view of robots, trips and traffic.
- An Operator sees robot status and the trip queue for their own zone.
- Day-to-day trip queues and manual dispatch are explicitly *not* a Configurator concern — they are operational.

See [[ui-fleet-monitor]] for where a trip is displayed.
