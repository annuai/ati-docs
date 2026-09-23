---
id: v5-waypoint-routing
title: How a V5 (Dynamic Routing) map is built
summary: Nodes, lanes, on-lane/off-lane stations, and the park/unpark maneuvers that connect them — the vocabulary and configuration behind a Dynamic Routing map.
simple: A Dynamic Routing map is a network of drawn lanes with stations attached to them. Getting a robot in and out of a station cleanly is a small, configurable manoeuvre — and this page is the full vocabulary for it.
aliases:
  - V5 map
  - terminal line
  - node
  - lane
  - park and unpark
  - maneuver
status: current
author: Annuai
added: '2026-09-23'
sources:
  - 'Ati team — "V5 Waypoints Deployment Walkthrough" internal Deployment Manager guide, supplied September 2026'
related:
  - v-waypoint-version
  - v-on-lane-off-lane
  - v-deployment-manager
  - map-annotation
  - v-sherpa-tug
  - v-sherpa-pallet-mover
order: 22
---

## What a V5 map is made of

A V5 map is a set of **nodes** connected by **lanes**. A node is a single point on the map — the junction where lanes start, end, or cross, and the attachment point every station gets. A lane is a path a robot may drive along, drawn between two nodes; Deployment Manager itself calls this a **terminal line**. Each lane carries three properties:

| Property | What it does |
| --- | --- |
| Moving direction / lane direction | Whether robots can travel both ways on the lane, or one-way only. Default is one-way. |
| Heading direction | Which way the robot faces while moving on the lane — forward, reverse, or both. Default is both. |
| Weight | How costly the lane is to travel; the planner always picks the lowest-total-weight path. Defaults to the lane's length. |

Splitting a lane at a point drops a new node there and produces two lanes in its place (e.g. splitting `lane_3` gives `lane_3_1` and `lane_3_2` either side of the new node) — this is how a junction gets created.

## On-lane vs off-lane stations

Every station is set to one of two orientations, and it is described as the most important configuration choice when placing a station, because all of the parking/unparking behaviour below depends on it:

- **On-lane** — the station sits directly on the lane. The robot drives straight onto it; there is nothing to configure for parking or unparking.
- **Off-lane** — the station sits away from the lane, reached through a node. The robot leaves the lane (a parking manoeuvre) to enter the station, and mirrors that manoeuvre to unpark and rejoin the lane.

:::callout title="Off-lane only"
Payload detection and docking only happen on off-lane stations.
:::

## Parking and unparking

**Parking** is the robot entering a station from a lane. **Unparking** is the robot exiting a station and rejoining a lane. Both only exist for off-lane stations — an on-lane station has no separate parking step, the robot simply drives up and stops.

## Core route

The core route connects the start station's node to the end station's node through the lane graph, always choosing the lowest-weight path. An on-lane station's route is just the core route; an off-lane station's route is unparking → core route → parking.

## Configuring a node: PARK and UNPARK

Every node placed on the map can be toggled independently for two roles — **PARK** (arriving at the station) and **UNPARK** (leaving it) — and a node can carry both. A station can also have separate nodes dedicated to park and unpark.

- **PARK** splits into **Pick** (the robot is arriving to lift a load) and **Drop** (arriving for any other reason — no task, or dropping a load).
- **UNPARK** splits into **Laden** (the robot is already carrying a load as it leaves) and **Unladen** (leaving empty).

Each of the four — Pick, Drop, Laden, Unladen — gets its own **maneuver**, **maneuver direction**, and tuning **parameters**, so a station can be approached or departed differently depending on what the robot is doing.

## Maneuver types

:::defs
items:
  - term: one_shot_turn (default)
    text: The robot moves along a smooth curve to enter or exit the station — no separate stop-and-rotate step.
  - term: inplace
    text: A stop-and-rotate manoeuvre. The robot reaches the node, rotates on the spot until aligned with the station, then drives straight in (or straight out, if unparking). There is no turn involved.
  - term: lanechange / reverse_lanechange
    text: Manoeuvre variants for changing lane to reach or leave a station.
  - term: three_point_turn / three_point_lanechange
    text: Three-point-turn variants of the plain turn and lane-change manoeuvres.
  - term: None
    text: No manoeuvre — the parameters below don't apply.
:::

## Maneuver parameters

Up to four parameters tune a manoeuvre; only two are explained in the source walkthrough:

- **inlane_dist** — how far along the lane, measured from the station's node, the manoeuvre's curve starts. A larger value starts the curve earlier for a wider turn; a smaller value gives a tighter turn. Defaults to 1m.
- **perpendicular_dist** — how far from the lane, perpendicular to it, the manoeuvre ends (when parking) or starts (when unparking) — for example, the distance at which a robot stops to run payload detection before finishing the approach.
- **Inlane extension** and **Perpendicular extension** are also configurable, but what each one adjusts is not explained in the source.

Both `inlane_dist` and `perpendicular_dist` accept **negative** values, which flips the manoeuvre to the opposite side of the station — approaching or leaving from behind instead of from the front. This is how a station that must be approached from two different sides (see below) is configured.

:::gap
What "Inlane extension" and "Perpendicular extension" adjust is not documented in the source walkthrough.
:::

## Multi-node stations

A station is not limited to one node. Any number of nodes can be added, one per lane, each acting as its own entry/exit point with its own park/unpark tags and maneuver configuration. This is how a station that has to be approached from two different sides is built — for example, a trolley station where the robot picks up the trolley from the front (entering through one lane, PARK only) but has to back the trolley in from behind when dropping it off (leaving through a different lane, UNPARK only).

## Upgrading a V4 map to V5

An existing V4 map does not need to be rebuilt from scratch. In Deployment Manager, V4 maps are listed tagged **Dynamic Routing (Deprecated)**; choosing **Upgrade to Dynamic Routing** from the map's menu creates a separate, named V5 copy — carrying over the layout, lanes and stations — while leaving the original V4 map untouched.

## Configuration required to run V5

- `control_module.route_application` must be set to `v5_wps` (rather than `v2_wps`) so the robot plans trips with the V5 router instead of the older V2 planner.
- The router reads the map from `graph_object_v5.json`, the file Deployment Manager exports when a V5 map is saved. If a site reports "map not found" errors after switching to V5, check this file exists and was exported from a V5 map rather than an older format.
- Which Sherpa application a robot runs decides which router(s) it can use:

| Sherpa application | Vehicles | What it does | Compatible routers |
| --- | --- | --- | --- |
| `trolley_ops` | Tug-V.x, XTLite, XT, 5tonner, Lifter, Pivot / Flextug, Lifter500 | Load is manually hitched; no auto-pick required | v2_wps, v5_wps |
| `auto_unhitch_trolley_ops` | XT / XTLite / Tugs | Tugging with auto-unhitching at a station | v2_wps, v5_wps |
| `pallet_ops` | Monofork / Flexfork, PalletMover Lifter-500 | Detecting and picking the payload is required | v5_wps |
| `auto_hitch_ops` | 5tonner_autohitch | Detecting the payload and its accessories (e.g. a QR code), then picking it | v5_wps |

A few further settings are configured on the robot itself rather than in Deployment Manager (under `control.dynamic_router` / `control.common`):

- `max_turn_radius` / `min_turn_radius` — the robot fits a turn to `max_turn_radius` where possible, otherwise a value between the two.
- `default_parking_maneuver` / `default_unparking_maneuver` — which manoeuvre an off-lane station uses when none is set in Deployment Manager.
- `station_dist_thresh` / `station_theta_thresh` — how close the robot has to be to a station, in distance and orientation, to be considered "recovered" onto it.

## Deployment checklist

- `control_module.route_application` is set to `v5_wps`.
- Map files include `graph_object_v5.json`, present on the robot.
- Each station's orientation (on-lane / off-lane) matches where it physically sits.
- Off-lane stations have at least one node tagged for park and one tagged for unpark.
- Every pair of stations that will be used in production has been previewed with **Simulate Route**.
- The robot has been run once in simulation for the trips it will actually make.
