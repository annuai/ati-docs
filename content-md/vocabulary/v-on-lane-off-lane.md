---
id: v-on-lane-off-lane
term: On-lane / off-lane station
kind: jargon
simple: Whether a station sits directly on a drawn route (on-lane) or just off to the side of one (off-lane).
technical: Applies to [[v-waypoint-version|Dynamic Routing (V5)]] maps, where the deployment team draws broad lanes rather than a route to every station. A station is **on-lane** when it sits directly on one of those drawn lanes — the robot drives straight onto it, with no parking or unparking to configure. A station is **off-lane** when it sits away from a lane, reached through a node — the robot leaves the lane (a parking manoeuvre) to enter the station, and mirrors that manoeuvre to unpark and rejoin the lane. Payload detection and docking only happen on off-lane stations. Which one applies is set per station in Deployment Manager as a **Station Orientation** setting (Off Lane / On Lane).
aliases:
  - on-lane
  - off-lane
  - station orientation
usedIn:
  - Deployment Manager map creation
related:
  - v-waypoint-version
  - v5-waypoint-routing
  - v-station
  - v-deployment-manager
status: current
author: Annuai
added: '2026-09-23'
revisions:
  - date: '2026-09-23'
    author: Annuai
    note: Corrected the UI description from a checkbox to Deployment Manager's actual Station Orientation setting, and added that payload detection and docking only happen on off-lane stations — from an internal Deployment Manager walkthrough. See [[v5-waypoint-routing]] for the full node/lane vocabulary this setting is part of.
sources:
  - Ati team — noted September 2026
  - 'Ati team — "V5 Waypoints Deployment Walkthrough" internal Deployment Manager guide, supplied September 2026'
order: 159
---

:::callout title="The wording is not user-friendly"
"On-lane" and "off-lane" don't explain themselves — a deployment engineer setting Station Orientation has to already know what the terms mean, rather than being told. A short inline explanation, or a tooltip spelling out the difference (a station on-lane sits on the drawn lane; a station off-lane sits beside it, and the robot detours briefly to reach it), would fix this without changing how the setting behaves.
:::
