---
id: v-map-creation
term: Map creation
kind: term
simple: Driving a robot around the building by hand so it can record the shape of the place and build a map of it.
technical: A robot is run manually across the factory floor or warehouse to produce a **point cloud map**. Today this is done by driving the robot around by hand with a PlayStation controller — whether, and how, this could be automated is not yet clear. At run time that point cloud is compressed into a 2D map, which keeps compute load — and therefore cost — down. Algorithms such as **PointPillars** are used against the full point cloud to establish accurate global localization, but only when that accuracy is actually needed.
aliases:
  - mapping
  - point cloud map
  - PointPillars
  - 2D map
usedIn:
  - Stage 3 of a site deployment
  - The Maps surface
note: The map that is built and the map the robot runs against are not the same artefact. Building produces a point cloud; running uses a 2D compression of it.
related:
  - map
  - v-slam
  - v-pose-graph-optimisation
  - wf-deployment
  - v-point-cloud
status: current
author: Annuai
added: '2026-09-16'
revisions:
  - date: '2026-09-18'
    author: Annuai
    note: Added that this driving-around is currently done manually with a PlayStation controller, and that whether it could be automated is unclear.
sources:
  - Ati team — noted September 2026
  - old/amr-deployment-workflow.html
  - Ati team — the current, on-the-ground deployment sequence, supplied in conversation, September 2026
order: 40
---


