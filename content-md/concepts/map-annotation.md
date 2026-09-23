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
  - 'Ati support engineer — Deployment Manager/Fleet Manager walkthrough, transcript supplied in conversation, September 2026'
  - 'Ati team — internal "Zones" reference document (map zone types and parameters), supplied September 2026'
  - 'Ati team — Deployment Manager zone-type selector, screenshot supplied September 2026'
revisions:
  - date: '2026-09-22'
    author: Annuai
    note: Added how a station and a route actually get placed and configured — customer walkthrough plus test-driving, the fixed dispatch/in-place/orientation tags a station carries, and that routes are one-way and hand-drawn rather than automatically bidirectional. Also flagged that the full list of zone types is undocumented even inside Ati.
  - date: '2026-09-23'
    author: Annuai
    note: Clarified that the one-way, hand-drawn route description above only applies to P2P Routing (V2) maps — a Dynamic Routing (V5) map routes stations automatically over hand-drawn lanes instead. See [[v-waypoint-version]].
  - date: '2026-09-23'
    author: Annuai
    note: Linked to the new [[zone-types]] entry, which documents nine specific named zone types and narrows — without fully closing — the open question of whether the full list of map zone types is known.
  - date: '2026-09-23'
    author: Annuai
    note: Updated with the map editor's own zone-type selector (17 zone types) — the full current list is now confirmed, even though 8 of the 17 still have no documented behaviour. See [[zone-types]].
related:
  - map
  - zone
  - zone-types
  - traffic-control
  - ui-maps
  - v-dispatch
  - v-deployment-manager
  - v-waypoint-version
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
    text: Speed-limited zones, ramp zones and docking zones. Always active based on location, like a school zone. See [[zone-types]] for the specific, named zone types the map editor supports.
  - term: Traffic control — gates and exclusion zones
    text: Separate from behavioural zones. These govern multi-robot access at single-lane or alternating-direction sections. See [[traffic-control]].
  - term: Forbidden and preferred zones
    text: Areas to avoid entirely, versus areas to bias routing toward.
:::

Where a deployment runs mixed robot types, this is also where zone access is differentiated by type.

:::callout title="Where this lives in the product"
Annotation is done on the [[ui-maps|Maps]] surface, which the role model gives to the Solutions Architect (Configurator) to edit and to everyone else to view.
:::

## How a station and a route actually get placed

A customer walks the site with the deployment team and points out where each stop should be — the exact coordinates are then set relative to the manual run already recorded for [[v-map-creation|mapping]], and fine-tuned by test-driving between stations to check clearance and turning space.

Each station also carries a fixed set of tags, set once at this stage:

- **[[v-dispatch|Dispatch]]** — not required, optional (with a timeout), or required. See [[v-dispatch]] for the station-versus-trip limitation this creates.
- **In-place turn** — whether the robot rotates on the spot at that station, and clockwise or anticlockwise.
- **Orientation** — which way the robot faces on arrival, forward or reverse; relevant wherever a pallet or trolley has to be approached from a specific side.
- Naming tags such as charging or parking station, which identify the station's purpose but carry no behaviour of their own beyond that.

On a [[v-waypoint-version|P2P Routing (V2)]] map, routes are one-way and drawn explicitly between two stations. A route from A to B does not imply a route from B to A — the reverse direction has to be added separately, and a [[v-fleet-manager|Fleet Manager]] trip request fails outright if no route exists in the direction requested. A [[v-waypoint-version|Dynamic Routing (V5)]] map works differently: broad lanes are drawn instead, and the routing engine finds its own way between stations in either direction.

:::gap title="The full list of zone types is now confirmed — what most of them do is not"
The map editor's own zone-type selector lists 17 zone types, all now named at [[zone-types]]. Only 9 have a documented behaviour; the other 8 — including a "wheel pose zone", likely the "wheel zone" an Ati support engineer mentioned when asked directly about undocumented zone types — are confirmed to exist but have no written description of what they do. That engineer's broader caution still stands: new zone types get added whenever a feature needs one, so even this confirmed list can grow.
:::
