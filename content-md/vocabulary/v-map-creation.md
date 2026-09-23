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
  - v-deployment-manager
status: current
author: Annuai
added: '2026-09-16'
revisions:
  - date: '2026-09-18'
    author: Annuai
    note: Added that this driving-around is currently done manually with a PlayStation controller, and that whether it could be automated is unclear.
  - date: '2026-09-22'
    author: Annuai
    note: Added where map generation actually runs, its practical limits, and how remapping after a physical site change works, from an internal DM/FM walkthrough.
sources:
  - Ati team — noted September 2026
  - old/amr-deployment-workflow.html
  - Ati team — the current, on-the-ground deployment sequence, supplied in conversation, September 2026
  - 'Ati support engineer — Deployment Manager/Fleet Manager walkthrough, transcript supplied in conversation, September 2026'
order: 40
---

## Where generation actually happens

The manual run is recorded on the robot itself as a timestamped run-data file. Generating the map from it also runs on the robot — [[v-deployment-manager|Deployment Manager]]'s UI only selects the run and triggers the job, it does not do the processing. A run that is too large or complex for the robot's onboard compute has to be regenerated instead using a more powerful GPU-based tool back at Ati, run by the team rather than on site.

Generation typically takes minutes rather than hours, but scales with how much was recorded, not with the physical size of the site — leaving the robot idle mid-run (or driving it in reverse by mistake) inflates the frame count and both the processing time and the chance of a bad result. If generation fails, the tool only reports that the script failed, not why; diagnosing the actual cause (an idle stretch, a reversed run) is manual, by inspecting the resulting map.

:::gap
Whether a redo is ever needed for reasons other than a mistake in the manual run itself has not been confirmed.
:::

## Remapping after a site changes

If the physical environment changes after go-live — new equipment, a removed cabinet — only the affected area is remapped, as a separate support task using different tooling from the initial deployment. The whole site is not remapped from scratch.