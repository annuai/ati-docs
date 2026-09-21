---
id: d-maps-and-workflows-are-separate
slug: maps-and-workflows-are-separate
kind: decision
order: 8
title: 'Maps and Workflows are separate surfaces'
summary: 'Where a robot can go and what a robot should do are configured in different places.'
status: current
category: 'Product principle'
author: Annuai
added: '2026-09-16'
sources:
  - old/ati-flow-faq.html
  - old/amr-software-ia-roles.html
  - old/ati-flow-architecture.html
context: |
  Both maps and workflows are configuration, both are edited by the same role, and both feed the
  same missions. A reasonable product could merge them.
decision: 'Keep them apart. **Maps** describe the spatial environment and movement rules; **Workflows** describe actions and transport behaviour.'
why: |
  They answer two of the four product primitives — *where can the robot move* versus *what
  sequence of actions should happen* — and they change at different rates. Map and zone
  corrections are the first thing adjusted after go-live; mission logic is refined on a
  different rhythm.
alternatives:
  - 'Not recorded in the source material.'
related: ['map', 'workflow', 'configuration-layers', 'ui-maps', 'ui-workflows']
---

This question is common enough that the source FAQ answers it directly. See [[map]], [[workflow]] and [[configuration-layers]].
