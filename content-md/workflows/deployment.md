---
id: wf-deployment
slug: deployment
title: Site deployment
summary: Nine stages from site assessment to a fleet running in production, and what each one covers.
simple: 'Deploying robots at a site follows a fixed order: understand the site, prepare it, map it, give the map meaning, design the jobs, coordinate the fleet, connect the business systems, test, and go live.'
aliases:
  - AMR deployment
  - deployment workflow
  - rollout
  - nine stages
  - configuration
  - setup
  - configure
status: current
author: Annuai
added: '2026-09-16'
sources:
  - old/amr-deployment-workflow.html
  - old/ati-flow-architecture.html
  - old/amr-software-ia-roles.html
  - Operations Excellence lead — Industrial Design 1:1, September 2026
  - Ati team — the current, on-the-ground deployment sequence, supplied in conversation, September 2026
revisions:
  - date: '2026-09-18'
    author: Annuai
    note: 'Added findings from an Industrial Design 1:1 operational review: mapping and environmental fine-tuning are the largest source of delay and cost, leadership’s target is reducing the ~90-day deployment timeline, and an undocumented onboard depth-camera streaming tool is used for calibration.'
  - date: '2026-09-18'
    author: Annuai
    note: Added a concrete, tool-level view of how deployment actually happens today — adding the robot to Deployment Manager, manual SLAM mapping, route creation on the map, and adding materials to Ati Flow — with a diagram, and flagged that reconciling it against the nine-stage model above, and what happens after materials are added, are both open.
  - date: '2026-09-18'
    author: Annuai
    note: Added a tentative step 5, "Design workflows" (needs confirmation), plus that workflows are then mapped to the right stations using Machine name and Processing Area for logical grouping. Also switched "AMR" to "Robot" throughout this section, per the existing decision to say Robot rather than AMR.
  - date: '2026-09-18'
    author: Annuai
    note: Renamed from "AMR deployment" to "Site deployment" and merged in the separate "Configuration" page, which had become a confusing, near-duplicate condensed version of the same nine-stage order. Its only unique content — the "who has configuration authority" paragraph and its pointer to Configuration layers — is now a section here, and the standalone Configuration page has been retired. Former titles kept as aliases.
related:
  - configuration-layers
  - map
  - map-annotation
  - missions-and-actions
  - wf-exceptions
  - v-deployment-manager
  - v-map-creation
  - processing-zone
  - v-machine
  - v-material-station-mapping
  - workflow
  - users
order: 5
---

:::callout title="This is a human process, not a product object"
Ati Flow also has a surface called [[ui-workflows|Workflows]], which holds configured transport behaviour. That is a different thing entirely. See [[workflow]].
:::

## The nine stages

:::flow
caption: 'Grouped into three phases: planning, build and deploy. Stage 9 feeds back into stages 4 and 5 rather than ending.'
steps:
  - title: 1. Site assessment
    note: Traffic, deadlines, layout
    tag: Planning
  - title: 2. Infrastructure setup
    note: WiFi, docks, robot config
    tag: Planning
  - title: 3. Mapping (SLAM)
    note: Point cloud, loop closure
    tag: Build
  - title: 4. Map annotation
    note: Positions, zones, traffic rules
    tag: Build
  - title: 5. Mission design
    note: Actions, priority, mission types
    tag: Build
  - title: 6. Fleet management
    note: Task allocation, traffic, charging
    tag: Build
  - title: 7. ERP integration
    note: SAP hooks, priority logic
    tag: Deploy
  - title: 8. Testing & validation
    note: Floor tests, edge cases
    tag: Deploy
  - title: 9. Go-live & iteration
    note: Training, monitor, refine
    tag: Deploy
    kind: outcome
:::

## Who has configuration authority

:::callout title="The question worth asking first"
Almost every confusing configuration question is really "which layer owns this setting?". [[configuration-layers]] answers that in one table.
:::

Configuration authority sits with the Solutions Architect (Configurator): full edit on Maps and Workflows, full setup on Robots including low-level parameters, and full configuration on Integrations and Setup & Config. A Head of Operations can view and approve maps and workflows without doing the detailed editing.

## Stage detail

:::accordions
items:
  - title: Stage 1 — Site assessment and solutioning
    tag: Planning
    body:
      - t: p
        text: Before any hardware moves, this phase establishes what the deployment actually needs to solve. It is the [[v-solutioning|solutioning]] work of defining the solution and routes for a specific project before detailed design begins.
      - t: list
        items:
          - What material moves where, how often, and under what deadline pressure — this becomes the basis for mission and priority logic later
          - 'Floor layout: aisle widths, ramps, doorways, blind corners, areas with heavy pedestrian or forklift traffic'
          - Where charging infrastructure and staging areas will physically live
          - Network coverage requirements across the full operating area
          - Payload types and handling method — top-load, tugger/cart, lift, or conveyor interface
      - t: p
        text: Mistakes here do not surface until much later phases, so it is worth treating as its own gate rather than rushing into mapping.
  - title: Stage 2 — Infrastructure setup
    tag: Planning
    body:
      - t: p
        text: Physical, network, and per-robot configuration that has to exist before mapping can start.
      - t: list
        items:
          - Install and verify WiFi coverage across the full route network, including overlap at handoff points between access points
          - Place charging docks — ideally distributed rather than centralized, sized against peak-hour demand versus charge time
          - Prep physical safety infrastructure that zones will later reference, such as existing floor markings and barriers near machinery
          - Set up the [[v-fleet-controller|fleet controller]] or server, on-premise or cloud, that robots and any orchestration layer will talk to
          - 'Configure each robot: network credentials, robot ID, safety parameters (max speed, footprint, sensor calibration), payload profile and drive parameters'
      - t: p
        text: This is also where robot configuration is set at the robot level — worth keeping conceptually distinct from map and mission configuration, which come later. See [[configuration-layers]].
  - title: Stage 3 — Mapping (SLAM)
    tag: Build
    body:
      - t: p
        text: The raw spatial substrate everything else gets layered on top of — purely for localization, with no inherent concept of zones or business logic.
      - t: list
        items:
          - Manually drive or walk the robot through the full operating area to build the point cloud map
          - Run pose graph optimization ([[v-loop-closure|loop closure]]) on long corridors or loops where drift could accumulate — judged iteratively rather than flagged automatically
          - Validate map quality by driving it a second time and checking self-localization confidence, not just visual completeness
      - t: p
        text: Multiple bot types — lifters, pallet movers, tuggers — can typically share the same map without duplicate maps per zone.
  - title: Stage 4 — Map annotation
    tag: Build
    body:
      - t: p
        text: This is where the raw map becomes operational — positions, behaviour and traffic rules layered on top of pure localization data. See [[map-annotation]].
      - t: list
        items:
          - '**Positions and stations:** exact pickup, drop-off, docking and charging points, each with entry-point orientation'
          - '**Behavioural zones:** speed-limited zones, ramp zones, docking zones — always active based on location, like a school zone'
          - '**Traffic control (gates and exclusion zones):** separate from behavioural zones, governing multi-bot access at single-lane or alternating-direction sections'
          - '**Forbidden and preferred zones:** areas to avoid entirely versus areas to bias routing toward'
      - t: p
        text: If fleets are mixed, this is also where zone access gets differentiated by robot type.
  - title: Stage 5 — Mission design
    tag: Build
    body:
      - t: p
        text: Composing the annotated map into actual transport behaviour. See [[missions-and-actions]].
      - t: list
        items:
          - Build atomic actions first — go to position, dock, undock, wait, trigger I/O, request access to a resource — then compose missions from them
          - Design reusable sub-missions for common patterns, such as "go to charging station", rather than duplicating logic across missions
          - 'Choose the mission pattern per use case: **taxi** (on-demand, point-to-point), **milk run** (fixed loop, multiple stops), or **bus** (scheduled repeating route)'
          - Bake in priority and interrupt behaviour where needed — whether a mission can be preempted, and where in its route that is safe
  - title: Stage 6 — Fleet management
    tag: Build
    body:
      - t: p
        text: The multi-robot coordination layer that turns individual missions into a working [[fleet]].
      - t: list
        items:
          - 'Task allocation logic: how an incoming request gets assigned to a specific idle or nearby robot'
          - Traffic arbitration at shared resources — the gates and exclusion zones from stage 4 — where contention and deadlock actually get tested
          - 'Charging and idle behaviour: idle robots are typically sent to charging stations and staging positions automatically, without touching robots locked into a user-defined mission'
          - Priority and aging rules, if manual escalation needs to be supported
  - title: Stage 7 — ERP integration
    tag: Deploy
    body:
      - t: p
        text: Connecting the fleet to the business systems that actually drive demand. See [[integrations]].
      - t: list
        items:
          - API hooks so an external system — an ERP such as SAP — can trigger a mission and receive status or completion updates back
          - Implicit priority computed from business data — due dates, line schedules, stock levels — rather than relying purely on manual escalation
          - 'Master data alignment: explicitly defining what is configured at this layer versus what belongs to map or mission configuration, since this is a common source of cross-team confusion'
  - title: Stage 8 — Testing and validation
    tag: Deploy
    body:
      - t: p
        text: Proving the system works before it is handed over, and deliberately probing the cases that do not show up in a quick walkthrough.
      - t: list
        items:
          - Test each mission manually on the floor before handing anything to the fleet or orchestration layer — final handover only happens after floor-testing confirms expected behaviour
          - 'Test edge cases deliberately: two robots approaching the same gate simultaneously, a station occupied on arrival, a manual priority escalation mid-cycle'
          - A dedicated validation pass, ahead of solutioning teams even touching the feature, is common practice for new capabilities before site release
  - title: Stage 9 — Go-live and iteration
    tag: Deploy
    body:
      - t: p
        text: Go-live is a phase, not an event — and it feeds back into the build stages rather than being a true end state.
      - t: list
        items:
          - '**Phased rollout:** start with one robot on one route, confirm it holds under real conditions, then expand robot count and route complexity in stages'
          - '**On-site presence:** a deployment engineer typically stays on-site for the first two to three weeks post-handover before support shifts fully to remote operations'
          - '**Baseline capture:** record normal cycle times, blocked-robot frequency and battery consumption early, so later drift can be told apart from normal variance'
          - '**Issue triage:** issue frequency, often ranging from daily to weekly depending on severity, and automated blocked-robot alerts help pinpoint which routes or zones need correction first'
          - '**Map and zone corrections:** usually the first thing adjusted once real traffic patterns are visible — this loops directly back to stage 4'
          - '**Mission logic refinement:** real request patterns often reveal that a mission built for average conditions does not hold at peak load, or that a demand-driven pattern should really be a fixed loop instead'
          - '**Recovery and edge cases:** localization failures, station conflicts and priority misuse tend to surface here rather than in testing, simply because weeks of real operation cannot be fully simulated'
          - '**Operator and supervisor feedback:** the people running the floor daily surface friction points — an override that is too many clicks away, an alert threshold miscalibrated for that line — that dashboards alone will not show'
:::

## The loop

:::defs
items:
  - term: Stage 9 → stage 4
    text: Map and zone corrections, once real traffic patterns are visible.
  - term: Stage 9 → stage 5
    text: Mission logic refinement, once real request patterns are visible.
:::

## How this actually happens today

:::callout title="A more concrete, tool-level view"
The nine stages above describe deployment in general terms. This is the same process at the level of what a deployment engineer actually does, gathered directly from the team. It has not been formally reconciled against the nine-stage model — see the gap below — but the rough correspondence is: step 2 sits inside stage 3, step 3 sits inside stage 4, and steps 4 and 5 have not been placed yet.
:::

```mermaid caption="The deployment sequence as it happens on the ground today. Dashed boxes are open points, not steps; the dashed purple step is tentative rather than confirmed."
flowchart TD
    START(("Site ready for deployment")):::hub
    S1["1. Add the Robot to Deployment Manager"]
    S2["2. Scan the environment (SLAM)"]
    S2NOTE["Done manually today —
driving the robot with a
PlayStation controller.
Whether/how to automate
this is unclear."]
    S3["Point cloud map"]
    S4["3. Create routes on the map"]
    S4NOTE["Add waypoints, stations,
gates, speed zones and other
route information"]
    S5["4. Add materials to Ati Flow"]
    S5NOTE["Needs more clarity"]
    S6["5. Design workflows"]
    S6NOTE["Needs confirmation —
not yet verified as the
actual next step"]
    S7["Map workflows to the
right stations"]
    S7NOTE["Machine name and
Processing Area used
for logical grouping"]

    START --> S1 --> S2
    S2 -.-> S2NOTE
    S2 --> S3 --> S4
    S4 -.-> S4NOTE
    S4 --> S5
    S5 -.-> S5NOTE
    S5 -.-> S6
    S6 -.-> S6NOTE
    S6 --> S7
    S7 -.-> S7NOTE

    classDef hub fill:#cfeae3,stroke:#7fc2b6,color:#173c34,font-weight:700,stroke-width:2px;
    classDef note fill:#fdf0dc,stroke:#f2d8a7,color:#5c4114,stroke-dasharray: 3 2;
    classDef tentative fill:#f4e2f6,stroke:#ddbfe3,color:#4a2350,stroke-dasharray: 4 3;
    classDef default fill:#ffffff,stroke:#d8dee5,color:#33403c;

    class S2NOTE,S4NOTE,S5NOTE,S7NOTE note;
    class S6,S6NOTE tentative;
```

- **1. Add the Robot to [[v-deployment-manager|Deployment Manager]]** — registering the robot in the tool Ati’s own engineers use to configure and deploy it.
- **2. Scan the environment to build a point cloud map** — the [[v-map-creation|mapping]] work in stage 3 above. Done manually today by driving the robot with a PlayStation controller; see [[v-map-creation]] for the open question on automating it.
- **3. Create routes on the map** — the [[map-annotation|map annotation]] work in stage 4 above: adding waypoints, stations, gates, speed zones and other route information on top of the point cloud map. This is a different artefact from the point cloud map itself, though both are commonly called “the map” — see [[map]] for why that overlap is kept deliberately.
- **4. Add materials to Ati Flow** — likely connects to the [[processing-zone|Processing Area]] / material-list work already documented, but exactly how has not been confirmed.
- **5. Design workflows** — not confirmed as the actual next step, but the best current guess. [[workflow|Workflows]] are then mapped to the right stations, using **Machine name** and [[processing-zone|Processing Area]] for logical grouping — see [[v-machine]] and [[v-material-station-mapping]].

:::gap
Step 5 onward is the least confirmed part of this sequence: whether "design workflows" is genuinely the next step, and exactly how mission/workflow creation, fleet configuration and go-live follow it, is not yet documented at this level of detail. Nor is it confirmed how step 4 here relates to the already-documented Processing Area / material configuration flow.
:::

## Where the time and money actually go

An operational review of real deployments found that stage 3 (mapping) and the process of fine-tuning robots to a site’s specific environmental conditions — such as extreme temperature gradients near factory ovens — cause the longest delays and the largest financial losses of any part of this workflow. Leadership’s stated target is bringing deployment timelines down from a current baseline of around 90 days.

- Fine-tuning a robot to a site combines hardware calibration (sensor checks, physical measurement) with configuring software instances — deployment engineers doing this work also often need to write Linux-level code, which is a significant skill hurdle on its own.
- A structured, fixed sequence for mapping and pick/drop configuration — rather than letting each project manager improvise their own order — is the direction identified to prevent this stage fragmenting and causing further delay.

:::gap
An onboard depth-camera streaming tool exists to help field engineers see what a robot’s sensors see during calibration, reducing reliance on measuring tapes and manual sensor checks. Its functionality is not yet documented here — sharing and documenting it was raised as a next step.
:::
