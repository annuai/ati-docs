---
id: map-annotation
title: Map annotation
summary: The operational meaning layered on top of a raw map.
simple: 'Annotation is where the map stops being a picture and starts being instructions: this is a pickup point, slow down here, only one robot at a time through there.'
aliases:
  - annotation
  - positions and zones
status: current
author: Annuai
added: '2026-09-16'
sources:
  - old/ati-flow-glossary.html
  - old/amr-deployment-workflow.html
related:
  - map
  - zone
  - traffic-control
  - ui-maps
order: 6
---

## Why it matters

A raw [[map]] tells a robot where it is. Annotation tells it what the place means. Without it there is nowhere to pick up, nowhere to drop off, and no rule about how to behave on a ramp or in a narrow aisle.

## What gets added

:::defs
items:
  - term: Positions and stations
    text: Exact pickup, drop-off, docking and charging points, each with an entry-point orientation.
  - term: Behavioural zones
    text: Speed-limited zones, ramp zones and docking zones. Always active based on location, like a school zone.
  - term: Traffic control — gates and exclusion zones
    text: Separate from behavioural zones. These govern multi-robot access at single-lane or alternating-direction sections. See [[traffic-control]].
  - term: Forbidden and preferred zones
    text: Areas to avoid entirely, versus areas to bias routing toward.
:::

Where a deployment runs mixed robot types, this is also where zone access is differentiated by type.

:::callout title="Where this lives in the product"
Annotation is done on the [[ui-maps|Maps]] surface, which the role model gives to the Solutions Architect (Configurator) to edit and to everyone else to view.
:::
