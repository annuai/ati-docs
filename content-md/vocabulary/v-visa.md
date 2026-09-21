---
id: v-visa
term: VISA
kind: jargon
simple: First come, first served for robots. In a VISA-controlled zone the first robot in gets to go; the next one waits until it is clear.
technical: A first-in-first-out approval mechanism. When several robots want to enter a zone that is VISA controlled, the first to arrive is granted the visa. The others hold. When the first robot clears the area it entered, the next robot receives its clearance. It is used particularly at intersections where traffic can arrive from more than one direction at once.
aliases:
  - visa
  - visa control
  - visa clearance
  - FIFO
usedIn:
  - Traffic control at intersections
  - Fleet Manager, when a traffic problem needs explaining
note: The name is a metaphor, not an acronym — a robot is granted entry the way a traveller is granted a visa.
related:
  - traffic-control
  - v-gate
  - v-exclusion-zone
  - v-deadlock
  - v-fleet-manager
  - zone
status: current
author: Annuai
added: '2026-09-16'
sources:
  - Ati team — noted September 2026
order: 6
---

## How it plays out

:::flow
steps:
  - title: Two robots approach a VISA-controlled zone
    note: Typically an intersection, with oncoming traffic possible from several directions.
  - title: Which one arrived first?
    kind: decision
    note: Entry is granted in arrival order — first in, first served.
  - title: The first robot is granted the visa
    note: It proceeds through the zone.
  - title: The second robot waits
    note: It holds outside the zone rather than entering behind.
  - title: The first robot clears the area
    note: Clearance is tied to leaving the zone it entered, not to finishing its trip.
  - title: The second robot gets its clearance
    kind: outcome
    note: The queue advances by one.
:::

## Why it exists

An intersection is where a fleet is most likely to jam. Without an ordering rule, two robots arriving from different directions can each wait for the other — see [[v-deadlock|deadlock]]. First-in-first-out gives a plain answer to who goes, and it is an answer a person can predict and explain.

:::gap
How VISA relates to the **gates** and **exclusion zones** described in the deployment material is not documented. All three govern multi-robot access, but whether VISA is the implementation of gates, or a separate mechanism alongside them, has not been established. See [[traffic-control]].
:::
