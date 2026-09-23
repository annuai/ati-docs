---
id: zone
title: Zone
summary: A geographical operating area, used to organise access and operational responsibility.
simple: A zone is a part of the factory floor. It decides which robots work where, and which people are responsible for what.
aliases:
  - geographical zone
  - operating area
status: current
author: Annuai
added: '2026-09-16'
sources:
  - old/ati-flow-glossary.html
  - old/amr-software-ia-roles.html
  - old/amr-deployment-workflow.html
  - old/prototype/
  - 'Ati team — internal "Zones" reference document (map zone types and parameters), supplied September 2026'
revisions:
  - date: '2026-09-23'
    author: Annuai
    note: Linked the behavioural-zone definition to the new [[zone-types]] entry, which documents the specific zone types the map editor supports.
related:
  - processing-zone
  - map-annotation
  - zone-types
  - traffic-control
  - users
order: 3
---

## Why it matters

Zones are how the product divides a large floor into something a person can be responsible for. An [[users|Operator]] sees their own zone. A Fleet Supervisor owns one or more zones. A Head of Operations sees all of them. [[ui-fleet-monitor|Fleet Monitor]] is described as a live, zone-based view of robots, tasks and traffic.

## The word is used in more than one way

In the information architecture, *zone* means a geographical area. During [[map-annotation|map annotation]], several other things are also called zones. They are worth keeping apart:

:::defs
items:
  - term: Zone (geographical)
    text: An operating area used to organise robot access and human responsibility. This is the meaning used by Fleet Monitor and the role model.
  - term: Behavioural zone
    text: An area that changes how a robot behaves whenever it is inside — a speed-limited zone, a ramp zone, a docking zone. Always active based on location, like a school zone. See [[zone-types]] for the specific, named zone types the map editor supports.
  - term: Exclusion zone
    text: A traffic-control construct governing multi-robot access to a single-lane or alternating-direction section. Deliberately separate from behavioural zones.
  - term: Forbidden and preferred zone
    text: Areas to avoid entirely, versus areas to bias routing toward.
:::

:::callout title="Mixed fleets"
Where a deployment runs more than one robot type, map annotation is also where zone access is differentiated by robot type.
:::

See also [[processing-zone|Processing Area]] — a material-grouping concept, now confirmed distinct from this geographical meaning of zone. See [[d-processing-area-terminology]].
