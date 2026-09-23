---
id: frenet-frame-path-planning
title: Frenet frame path planning
summary: A way of planning a robot's path by measuring position along and sideways from a reference line, instead of in raw map coordinates.
simple: Instead of tracking "where exactly on the map is the robot," this splits the question in two simpler ones — "how far along the planned route is it" and "how far off to the side of it." Planning a path gets much easier once movement along the route and movement across it are worked out separately.
aliases:
  - Frenet algorithm
  - Frenet-Serret frame
  - Frenet coordinates
  - Frenet planner
status: current
author: Annuai
added: '2026-09-23'
sources:
  - Public robotics reference — Frenet frame trajectory planning, general autonomy/path-planning literature (see Robotics Knowledgebase, roboticsknowledgebase.com/wiki/planning/frenet-frame-planning)
  - Ati team — noted September 2026
related:
  - v-waypoint-version
  - v-path-planning
  - v-trajectory
  - v-obstacle-avoidance
order: 21
---

## Why measure this way at all

A robot's raw position is an (x, y) point on the map. That's accurate, but not very useful for planning: to know whether the robot is drifting off its intended route, or whether it's about to reach the next turn, the raw coordinates have to be compared against the whole shape of the route every time. The Frenet frame sidesteps this by picking a reference line — the intended path — and describing everything relative to it instead of to the map's fixed grid.

## The two numbers that replace (x, y)

:::defs
items:
  - term: s — longitudinal position
    text: How far along the reference line the robot has travelled, measured as arc length from the start of the route.
  - term: d — lateral offset
    text: How far the robot sits to the side of the reference line at that point, positive to one side and negative to the other.
:::

Together, (s, d) locate the robot exactly as well as (x, y) does — but they decouple the two things a path planner actually needs to reason about separately: progress along the route, and drift across it. Staying centred on the route is just "keep d close to zero," regardless of how much the route itself curves on the underlying map.

## Why this helps path planning

- **Curvature stops being a complication.** Following a curving corridor in raw (x, y) coordinates means constantly accounting for the corridor's shape. In Frenet coordinates the reference line's curvature is already absorbed into the frame itself, so a planner can reason about "stay near the centre" and "keep moving forward" as separate, mostly-straight-line problems.
- **Obstacles and other agents are easy to compare.** Two robots — or a robot and an obstacle — projected into the same Frenet frame can be compared directly by their `s` values to see who is ahead of whom, and by their `d` values to see how much lateral separation exists. That's a simpler test than comparing arbitrary points in map coordinates.
- **It suits routes that are drawn broadly rather than exactly.** It works best where a reference path already exists to measure against — which fits [[v-waypoint-version|Dynamic Routing (V5)]]'s broad, hand-drawn lanes: the lane is the reference line, and the planner's job becomes finding a smooth (s, d) trajectory along it that reaches the target station, rather than following one exact pre-computed vector.

:::gap
Ati's own implementation details — which parts of the routing engine use a Frenet-frame planner, and how it interacts with [[v-obstacle-avoidance|obstacle avoidance]] and the fleet's [[traffic-control|traffic control]] layer — are not documented here. The description above is the general algorithm as published in the wider autonomy and robotics literature, not an Ati-specific account of its implementation.
:::
