---
id: v-loop-closure
term: Loop closure
kind: jargon
simple: Recognising that the robot has returned to a place it has already seen, and using that to correct accumulated map error.
technical: The detection of a previously visited location during SLAM or mapping. A loop-closure constraint can be used to reduce accumulated drift and improve the consistency of the map. In Ati’s map creation process this is judged iteratively rather than flagged automatically, on long corridors or loops where drift could accumulate.
usedIn:
  - Deployment stage 3
  - SLAM
  - Map creation
note: Loop closure is the *detection* of a loop not meeting itself; [[v-pose-graph-optimisation|pose graph optimisation]] is the algorithm applied once it is detected — the two are related but distinct.
related:
  - v-pose-graph-optimisation
  - v-drift
  - v-slam
  - map
status: current
author: Annuai
added: '2026-09-16'
sources:
  - old/amr-deployment-workflow.html
  - Ati team — noted September 2026
order: 42
---


