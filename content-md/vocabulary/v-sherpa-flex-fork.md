---
id: v-sherpa-flex-fork
term: Sherpa Flex Fork
kind: term
simple: An AMR that finds a trolley on its own, slides its forks underneath, lifts it and carries it away — no hitching, no barcode telling it which trolley to take.
technical: 'An AMR rated for a 300 kg payload at up to 1.2 m/s, 1284×1209×538mm, with in-place turning and a 796mm fork. Detects and aligns to a trolley using a sensor stack (one 2D LiDAR below the fork, two 3D LiDARs, two depth cameras) claimed 99% accurate, auto-correcting for a trolley offset of up to 6°. Uses a swappable 58.8V-max NMC battery (8-hour run time, ~2-hour charge) carried on its own dedicated trolley rather than by hand.'
note: Distinct from the mono-fork attachment on [[v-sherpa-pivot|Sherpa Pivot]] — that is a configuration of a modular base robot shown at Product Day 2025; this is a separate, dedicated product with its own manual. Whether the two use the same underlying trolley-detection approach is not documented.
usedIn:
  - Autonomous trolley pick-up and delivery in manufacturing and warehouse workflows
related:
  - v-sherpa-pivot
  - v-sherpa
  - indicator-lights
  - robot
  - ati-robotics
status: current
author: Annuai
added: '2026-09-21'
sources:
  - 'drive-download-20260921T111708Z-1-001/UM_Sherpa_Flexfork_.pdf, supplied September 2026'
order: 157
---
