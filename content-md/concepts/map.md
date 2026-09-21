---
id: map
title: Map
summary: The spatial substrate the robot uses to know where it is.
simple: The map is the robot’s picture of the building. On its own it holds no rules and no meaning — it only lets a robot work out where it is standing.
aliases:
  - SLAM map
  - point cloud
status: current
author: Annuai
added: '2026-09-16'
revisions:
  - date: '2026-09-17'
    author: Annuai
    note: Recorded that autonomy engineers and Solutions Architects mean different things by “map”, that the shared name is deliberate, and that whether to keep it is unresolved.
sources:
  - Ati team — noted September 2026
  - old/ati-flow-glossary.html
  - old/amr-deployment-workflow.html
  - old/ati-flow-architecture.html
related:
  - map-annotation
  - v-slam
  - v-map-creation
  - v-pose-graph-optimisation
  - traffic-control
  - wf-deployment
order: 5
---

## Why it matters

The map is the layer everything else is stacked on. It is built purely for localization and has no inherent concept of zones or business logic — those are added afterwards during [[map-annotation|map annotation]].

Of the four product primitives, the map answers: *where can the robot move, and what rules apply there?*

## Two different things are called a map

The word does double duty, and the two meanings are not the same thing:

:::defs
items:
  - term: A map, to an autonomy engineer
    text: The localisation substrate. A point cloud the robot uses to work out where it is standing, with no routes, no rules and no business meaning attached. This is the sense the rest of this page describes.
  - term: A map, to a [[v-solutions-architect|Solutions Architect]]
    text: 'What Ati Flow shows them: the floor plan with the drawn routes on it — the thing they look at and work with when setting a site up. See [[ui-maps|the Maps surface]].'
:::

They carry the same name on purpose, on the grounds that one word is simpler to learn than two. The cost is that an autonomy engineer and a Solutions Architect can talk about “the map” for a while before either notices they mean different things.

:::gap title="Whether to keep one word is unresolved"
Using one name keeps the product easy to explain. Splitting them would make the two layers explicit, at the cost of vocabulary most users do not need. This has not been decided. See [[open-questions]].
:::

## How it is built

:::flow
steps:
  - title: Drive or walk the full area
    note: The robot is manually taken through the whole operating area to build the point cloud map.
  - title: Run loop closure where drift could accumulate
    note: Pose graph optimization is applied on long corridors or loops. This is judged iteratively rather than flagged automatically.
  - title: Validate by driving it a second time
    note: Map quality is checked against self-localization confidence, not just against how complete it looks.
    kind: outcome
:::

## Point cloud now, 2D at run time

What map creation produces and what the robot runs against are two different artefacts. Building produces a **point cloud**. At run time that point cloud is compressed into a **2D map**, which keeps compute load — and therefore cost — down. Algorithms such as **PointPillars** are run against the full point cloud to establish accurate global localization, but only when that accuracy is actually needed. See [[v-map-creation]].

:::callout title="One map, many robot types"
Lifters, pallet movers and tuggers can typically share the same map. Duplicate maps per zone are not required.
:::

Once real traffic patterns are visible after go-live, map and zone corrections are usually the first thing adjusted — the [[wf-deployment|deployment workflow]] loops straight back to this stage.
