---
id: ui-robots
slug: robots
kind: screen
title: Robots
summary: Robot setup — add, edit, delete, name, assign to zone.
simple: The list of physical machines, and the place you register a new one.
status: current
author: Annuai
added: '2026-09-16'
sources:
  - old/amr-software-ia-roles.html
purpose: 'Answer: what physical robots exist, and how are they set up?'
users:
  - '**Operator** — view own zone: status and location, nothing to edit'
  - '**Fleet Supervisor** — manage own zone: mark for maintenance, reassign'
  - '**Head of Operations** — manage all: add, rename, reassign zone'
  - '**Configurator** — full setup, including low-level parameters'
see:
  - Robots, their status and their location
  - Zone assignment
do:
  - Add, edit, delete and name a robot
  - Assign a robot to a zone
  - Mark a robot for maintenance
  - Configure low-level parameters (Configurator only)
states:
  - '[[v-maintenance|Maintenance]] is the one robot condition the role model explicitly acts on here.'
related:
  - robot
  - zone
  - users
  - v-maintenance
order: 2
---

The Robots page was added to the information architecture as a distinct surface, separate from the live view — setup rather than operation.

:::gap
No field list, form or layout is documented.
:::
