---
id: v-pose-graph-optimisation
term: Pose graph optimisation
kind: jargon
simple: The maths that fixes a map when a robot drives a full loop and does not end up exactly where it started.
technical: 'An optimisation process that adjusts estimated robot poses and map relationships to make the overall set of measurements more consistent, particularly when loop-closure constraints reveal accumulated drift. In Ati’s map creation process it is used to find the zero point when a robot finishes a full loop somewhere other than where it began: small errors accumulate over a long circuit, so the two ends of the loop disagree, and pose graph optimisation reconciles them and corrects the map.'
aliases:
  - posegraph optimisation
  - pose graph optimization
  - PGO
usedIn:
  - Map creation, on long corridors or loops where drift could accumulate
note: The deployment material names this in the same breath as [[v-loop-closure|loop closure]]. Loop closure is the situation — the loop not meeting itself — and pose graph optimisation is the algorithm applied to it.
related:
  - v-loop-closure
  - v-drift
  - v-map-creation
  - map
  - v-slam
status: current
author: Annuai
added: '2026-09-16'
sources:
  - Ati team — noted September 2026
  - old/amr-deployment-workflow.html
order: 41
---


