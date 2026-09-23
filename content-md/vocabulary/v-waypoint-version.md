---
id: v-waypoint-version
term: Waypoint version
kind: jargon
simple: The underlying map format a robot's routes are built on — P2P Routing or Dynamic Routing today, with a third format planned. A robot can only run on a map built in a format it supports, and different robot types support different formats.
technical: Internally referred to by version — "V2" and "V5" today, with "V6" planned. V2 is **P2P Routing**, short for point-to-point — every route between two stations is drawn by hand, one-way, and does not imply its reverse, so going back the other way needs its own separately-drawn route. V5 is **Dynamic Routing** — the deployment team draws broad paths through the site rather than a route for every station pair, and Ati's routing engine works out how to get from one point to another over that path network at run time, including the way back, without a separate reverse route. This scales far better on a large grid, where drawing every point-to-point path by hand becomes impractical. V3 and V4 existed as intermediate attempts and were superseded; V3 was judged unnecessary and V4 had unresolved limitations. V4 maps still exist in Deployment Manager today, listed with a **Dynamic Routing (Deprecated)** tag, and can be upgraded in place to a V5 map — see [[v5-waypoint-routing]].
note: 'Robot-type compatibility is fixed: a tugger runs on V2 only, a pallet mover runs on V5 only, and a lifter or Flex Tug runs on either. Since a fleet is locked to one map in one format, a site with incompatible robot types cannot combine them into a single fleet — Ati runs them as separate fleets over the same physical area instead, which the source engineer described as adding real operational overhead.'
aliases:
  - P2P Routing
  - Dynamic Routing
  - V2
  - V5
  - V6
usedIn:
  - Deployment Manager map creation
  - Fleet composition
related:
  - v-waypoint
  - v-on-lane-off-lane
  - v5-waypoint-routing
  - frenet-frame-path-planning
  - v-fleet-manager
  - v-deployment-manager
  - v-sherpa-tug
  - v-sherpa-pallet-mover
  - v-sherpa-lifter-500
status: current
author: Annuai
added: '2026-09-22'
revisions:
  - date: '2026-09-23'
    author: Annuai
    note: Rewritten with the product-facing names for each format — P2P Routing (V2) and Dynamic Routing (V5) — and a clearer plain-language explanation of the practical difference between them. Added V6 as a planned, not-yet-built format, and linked to the new [[v-on-lane-off-lane]] and [[frenet-frame-path-planning]] entries.
  - date: '2026-09-23'
    author: Annuai
    note: Confirmed, from an internal Deployment Manager walkthrough, that V4 maps still exist today (tagged Dynamic Routing (Deprecated)) and can be upgraded in place to V5 without rebuilding. Linked to the new [[v5-waypoint-routing]] entry, which documents the full V5 node/lane vocabulary and configuration.
sources:
  - 'Ati support engineer — Deployment Manager/Fleet Manager walkthrough, transcript supplied in conversation, September 2026'
  - Ati team — noted September 2026
  - 'Ati team — "V5 Waypoints Deployment Walkthrough" internal Deployment Manager guide, supplied September 2026'
order: 56
---

## P2P Routing (V2) vs Dynamic Routing (V5)

The practical difference between the two formats is how much of the route the deployment team has to draw by hand, versus how much the routing engine works out on its own.

:::figure
src: /assets/waypoint-p2p-vs-dynamic.svg
alt: 'Two diagrams side by side. On the left, P2P Routing (V2): five stations connected by individually drawn arrows, each one-way, with a separate arrow needed for the return trip. On the right, Dynamic Routing (V5): the same five stations sitting on or beside a small number of broad drawn lanes, with a dashed line showing the routing engine finding its own way between two stations that share no direct arrow.'
caption: P2P Routing (V2) needs an explicit, one-way arrow between every pair of stations a robot travels between. Dynamic Routing (V5) needs only the broad lanes drawn — the routing engine finds its own way between any two points on them, in either direction.
:::

- **P2P Routing (V2)** — every trip a robot can make has to exist as its own drawn arrow. Five stations that all need to reach each other can mean dozens of arrows, and a route left undrawn in one direction means a robot simply cannot make that trip.
- **Dynamic Routing (V5)** — the deployment team only draws the broad lanes robots are allowed to travel on. The routing engine finds a path across that lane network between any two points, in either direction, without a separately drawn route for the reverse trip. On a large grid-shaped site, this avoids having to specify by hand which nodes connect to which and which routes need a return leg.

## V6 — planned, not yet built

A third format, V6, is planned. It is intended to combine V2's node-based, editable route control — closer to drawing a bezier curve by hand — with V5's automatic routing, so the deployment team gets more fine-grained control over the route map than Dynamic Routing alone allows, without going back to drawing every route by hand.

:::gap title="V6 is a work in progress"
What V6 looks like in the product, and when it ships, is not yet documented — only that it is planned and combines ideas from both existing formats.
:::

:::gap title="Possibly confusable with Deployment Manager's own version number"
[[v-deployment-manager|Deployment Manager]] has a separate software version, 5.4, already noted elsewhere in this documentation as having increased the number of steps needed for some tasks. Nothing in the source for this entry connects that to "V5" waypoints — they describe two different things, a tool version and a map-format version — but the similar naming is flagged here as a naming clash to avoid, not evidence that the two are related.
:::
