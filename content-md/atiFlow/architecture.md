---
id: architecture
title: Architecture
summary: How factory demand becomes coordinated robot work, in five layers — and how that structure becomes the actual apps and screens people use.
simple: 'Demand starts in the factory’s business systems, arrives through an integration, gets planned by Ati Flow, coordinated across the fleet, and finally driven by one robot. That same structure is also how the product itself is split up: one setup app for whoever configures a site, separate apps for day-to-day use, and a small interface on the robot itself.'
aliases:
  - system model
  - layers
  - IA
  - information architecture
  - pages
  - navigation
status: current
author: Annuai
added: '2026-09-16'
revisions:
  - date: '2026-09-18'
    author: Annuai
    note: Added a full diagram of every screen and its documented features, drawn from the individual UI section pages, so the whole product is visible in one place rather than only as a surface list.
  - date: '2026-09-18'
    author: Annuai
    note: Replaced the screen-based diagram with the architecture the Ati team supplied directly — Ati Flow Configurator, Supervisor, Request Operator, Dispatch Operator and the robot’s own HMI — and corrected terminology that did not match current usage (Requester → Request Operator, Dispatcher → Dispatch Operator). The earlier screen-based model is kept below as superseded, and the mismatch between the two is logged as an open question.
  - date: '2026-09-18'
    author: Annuai
    note: Merged Request Operator and Dispatch Operator into one broader Operator — their feature groups overlapped almost entirely. Added a Fleet Supervisor branch, reconstructed from the earlier Users and permissions page rather than the team’s diagrams, and flagged it as needing confirmation. Flagged that this Operator and the Operator in the earlier four-user model are not confirmed to be the same role.
  - date: '2026-09-18'
    author: Annuai
    note: 'Merged the separate "Information architecture" page into this one — the two were splitting one story (how the system is layered, and what that turns into on screen) across two pages. Nothing was removed: the diagrams, every feature group, and every open question below the fold are all still here, now read top to bottom as one page.'
  - date: '2026-09-21'
    author: Annuai
    note: Replaced "AMR" with "Robot" throughout the team-supplied architecture diagram and its feature groups (Robot Configuration, Robot Manager, Robot API, the Robot HMI node), per [[d-robot-over-amr|the existing decision]] to keep AMR out of product-facing labels. The one exception is the literal quote of the prototype’s "AMR Trips" navigation item below — left as-is because it records what that screen actually says, not this page’s own terminology.
sources:
  - old/ati-flow-architecture.html
  - old/index.html
  - Ati team — noted September 2026
  - old/amr-software-ia-roles.html
  - old/ati-flow-screens.html
  - old/prototype/
related:
  - ati-flow
  - orchestration
  - integrations
  - fleet
  - configuration-layers
  - users
  - v-fleet-supervisor
  - v-operator
  - v-fleet-manager
  - ui-fleet-monitor
  - ui-robots
  - ui-maps
  - ui-workflows
  - ui-workflow-builder
  - ui-integrations
  - ui-setup-and-config
  - ui-debug
  - open-questions
order: 2
---

## The system at a glance

:::chain
steps:
  - title: Business systems
    note: ERP / MES / production signals
  - title: Integrations
    note: Requests, status, master data
  - title: Ati Flow
    note: Orchestration + configuration
  - title: Fleet layer
    note: Allocation, traffic, charging
  - title: Robot
    note: Navigation + execution
  - title: Factory
    note: Physical material flow
:::

## The five layers

:::accordions
items:
  - title: Layer 1 — Business
    body:
      - t: p
        text: The factory creates the reason for movement. Examples include production demand, material availability, line schedules or inventory conditions.
  - title: Layer 2 — Integration
    body:
      - t: p
        text: '[[integrations|Integrations]] connect external systems to Ati Flow: ERP hooks, status and completion updates, priority logic and master-data alignment.'
  - title: Layer 3 — Orchestration
    body:
      - t: p
        text: Ati Flow translates configured [[workflow|workflows]] and incoming requests into executable work. [[map|Maps]], workflows, [[fleet|fleets]], [[robot|robots]] and operational monitoring meet here.
  - title: Layer 4 — Fleet
    body:
      - t: p
        text: 'Fleet management coordinates multiple robots: task allocation, shared-resource arbitration, charging and idle behaviour, and operational priorities.'
  - title: Layer 5 — Robot / autonomy
    body:
      - t: p
        text: The robot executes movement using its own navigation, perception, localization, safety and drive systems. The software running on the robot is called [[v-mule|Mule]].
:::

:::callout title="Design implication"
Expose the operational decision a user needs rather than reproducing every internal robot state. Low-level diagnostics can remain in Debug. See [[d-expose-the-decision]].
:::

## The four product primitives

| Primitive | Question it answers | Primary surface |
| --- | --- | --- |
| [[map\|Map]] | Where can the robot move, and what rules apply there? | Maps |
| [[workflow\|Workflow]] | What sequence of actions should happen? | Workflows |
| [[fleet\|Fleet]] | How are multiple robots coordinated? | Fleet Monitor / configuration |
| [[robot\|Robot]] | Which physical machine is available and what is its state? | Robots / Fleet Monitor |

## How the objects relate

:::relationship
caption: This chain is assembled from the architecture and glossary pages. The underlying data model — what is a record, what references what — is not documented.
nodes:
  - label: Robot
    to: robot
    note: belongs to
  - label: Fleet
    to: fleet
    note: coordinated by
  - label: Orchestration
    to: orchestration
    note: produces
  - label: Trips
    to: trip
    note: which move
  - label: Material
    to: material-flow
:::

:::gap
The architecture describes layers of responsibility, not a data model. How a fleet, a zone, a trip and a task relate as records is the largest single gap in the source material.
:::

That five-layer model is also how the product itself is organised into concrete apps and screens. The rest of this page maps that out.

## Every surface, every feature, at a glance

This diagram replaces the earlier surface list below with the architecture the Ati team supplied directly: two architecture diagrams showing how the product actually divides by *who is using it*, not by screen name. Read it left to right — [[ati-flow|Ati Flow]] splits into one configuration app and a set of client-facing apps; underneath, [[v-fleet-manager|Fleet Manager]] coordinates the fleet before work reaches a physical [[robot|robot]], which exposes its own small interface. Request Operator and Dispatch Operator are drawn here as one broader **Operator**, and a **Fleet Supervisor** branch has been added from the earlier role documentation — see the two callouts below the diagram before treating either as settled.

```mermaid caption="The current, team-supplied information architecture. Ati Flow Configurator is the one admin app; Supervisor and Operator are the confirmed client-facing apps. Fleet Supervisor (dashed) is not in the team’s original diagrams — it is carried over from the earlier role documentation and needs confirming against this architecture. Fleet Manager now exposes its configuration through the Configurator and its monitoring through Supervisor, rather than as a separate app — the change that removed most of the overlap in the earlier version of this diagram."
flowchart LR
    AF(("Ati Flow")):::hub

    subgraph CFG["Ati Flow Configurator — admin"]
        direction TB
        CFG1["Map Configuration"]
        CFG2["Robot Configuration"]
        CFG3["API Configuration"]
        CFG4["User and Role Configuration"]
        CFG5["Fleet Configuration"]
        CFG6["Traffic Management"]
        CFG7["Devices Configuration"]
        CFG8["Zonal Configuration"]
    end

    subgraph SUP["Supervisor — client"]
        direction TB
        SUP1["Staging Area"]
        SUP2["Live Monitoring"]
        SUP3["WIP Inventory"]
        SUP4["Trip Booking"]
        SUP5["Trip Management"]
        SUP6["Alerts"]
        SUP7["Analytics"]
        SUP8["Settings"]
    end

    subgraph OP["Operator — client"]
        direction TB
        OP1["Request Material"]
        OP2["Request Activity"]
        OP3["Staging Area"]
        OP4["Alerts"]
        OP5["Settings"]
    end

    subgraph FSUP["Fleet Supervisor — client, needs confirmation"]
        direction TB
        FSUP1["Live Monitoring, own zones"]
        FSUP2["Robot management, own zones"]
        FSUP3["View only, Maps and Workflows"]
        FSUP4["Alerts, own zones"]
    end

    AF --> CFG
    AF --> SUP
    AF --> OP
    AF -.-> FSUP

    FM(("Fleet Manager")):::hub
    AF --> FM

    ROBOT(("Robot")):::hub
    FM --> ROBOT

    subgraph HMI["HMI — on the robot"]
        direction TB
        HMI1["Live Status of Robot"]
        HMI2["Operation"]
    end

    ROBOT --> HMI

    class CFG cfgGroup
    class SUP supGroup
    class OP opGroup
    class FSUP fsupGroup
    class HMI hmiGroup

    classDef hub fill:#cfeae3,stroke:#7fc2b6,color:#173c34,font-weight:700,stroke-width:2px;
    classDef cfgGroup fill:#e2eefb,stroke:#b7d1ef,color:#1f3a5f;
    classDef supGroup fill:#e5f4e1,stroke:#bfe2b5,color:#22492a;
    classDef opGroup fill:#fdf0dc,stroke:#f2d8a7,color:#5c4114;
    classDef fsupGroup fill:#f4e2f6,stroke:#ddbfe3,color:#4a2350,stroke-dasharray: 4 3;
    classDef hmiGroup fill:#fbe1e5,stroke:#efc1ca,color:#5c2530;
    classDef default fill:#ffffff,stroke:#d8dee5,color:#33403c;
```

## Every group, in full

The diagram above stops at feature-group level so it stays readable. Every item inside each group:

:::accordions
items:
  - title: Ati Flow Configurator — admin
    tag: 8 groups
    body:
      - t: defs
        items:
          - term: Map Configuration
            text: Map Manager — generate a new map, manage saved maps, edit saved maps, preview saved maps.
          - term: Robot Configuration
            text: Robot Manager — view the robot list, add a new robot, configure a robot, manage the robot list.
          - term: API Configuration
            text: API Connections — Fleet Manager connection, Robot API, ERP API.
          - term: User & Role Configuration
            text: User Configuration — view users, update permissions, add users, manage the user list. Assign Roles — view existing roles, manage roles, add new roles.
          - term: Fleet Configuration
            text: View Existing Fleets — view robots, maps and triggers. Make New Fleets — assign robots, maps and triggers. Manage Fleets.
          - term: Traffic Management
            text: Manage, add and edit traffic rules.
          - term: Devices Configuration
            text: Execution Source Config — Requester Device, Dispatcher Device, Supervisor Device. Trigger Manager — manage and add triggers. RTLS Manager.
          - term: Zonal Configuration
            text: Material config, Container config and Workflow Config — view, set rules for, and manage each. Staging Area and WIP Inventory — view and manage. Station Mapping — map material and containers to stations.
  - title: Supervisor — client
    tag: 8 groups
    body:
      - t: defs
        items:
          - term: Staging Area
            text: Manage and view staging area cells.
          - term: Live Monitoring
            text: Live status, an energy card, robot status, an info panel, route preview, available actions, stations and an emergency stop.
          - term: WIP Inventory
            text: WIP inventory status and management.
          - term: Trip Booking
            text: Route selection, book a trip, schedule a trip, station tagging, dock operations, charging, parking, excluding a robot from a trip, and battery swap.
          - term: Trip Management
            text: Active trips, trip history, cancel a trip.
          - term: Alerts
            text: Action items and alert history.
          - term: Analytics
            text: KPIs and the data log.
          - term: Settings
            text: Common buttons, plugin settings, system settings.
  - title: Operator — client
    tag: 5 groups
    body:
      - t: p
        text: Request Operator and Dispatch Operator, merged. Their feature groups overlapped almost entirely — see the callout below.
      - t: defs
        items:
          - term: Request Material
            text: Material request, container request.
          - term: Request Activity
            text: Request status, request history, cancel a request. This is the merged Request Operator "Request Activity" and Dispatch Operator "Request Management" — the two were the same two items plus one extra.
          - term: Staging Area
            text: View and manage staging area cells.
          - term: Alerts
            text: Action items, alert history.
          - term: Settings
            text: Not further documented.
  - title: Fleet Supervisor — client, needs confirmation
    tag: needs confirmation
    body:
      - t: p
        text: This branch does not appear in the team’s two architecture diagrams at all. It is reconstructed from the existing [[users|Users and permissions]] page, translated into this architecture’s app names, because the team asked for it to be represented here while it is confirmed.
      - t: defs
        items:
          - term: Live Monitoring, own zones
            text: The zone-based view of robots, tasks and traffic that [[users|the earlier permission table]] gives a Fleet Supervisor across their assigned zones, with reassignment control.
          - term: Robot management, own zones
            text: Manage robots within the zones this Fleet Supervisor owns — narrower than a Configurator’s full Robot Configuration.
          - term: View only, Maps and Workflows
            text: View access to what a Configurator has set up — Map Configuration and Zonal Configuration in this architecture’s terms — without the ability to edit it.
          - term: Alerts, own zones
            text: Action items and alert history, scoped to the zones this Fleet Supervisor owns.
      - t: callout
        title: Not yet documented
        body:
          - 'Two different descriptions of this role already disagree within the [[users|Users and permissions]] page itself: its narrative description narrows Fleet Supervisor to “robots that need help, and nothing else,” while its own permission matrix gives the broader zone-oversight picture used above. Neither has been checked against the team’s new, role-based architecture. Treat every item in this branch as a starting point for that conversation, not a confirmed spec.'
        tone: gap
  - title: Robot — HMI, on the robot
    tag: 2 groups
    body:
      - t: defs
        items:
          - term: Live Status of Robot
            text: Wi-Fi connection, idle state, power on/off, moving state, Fleet Manager connection, trip assignment, obstacle detection, error state.
          - term: Operation
            text: Mode change, send to park, recover location, send to charging, robot info, power on/off.
:::

:::gap title="Two labels were hard to read on the supplied diagram"
One item under Supervisor → Trip Booking and one under Supervisor → Settings were only partly legible in the source image. Both are rendered above as the closest confident reading rather than a guess at the missing word — worth confirming with whoever drew the diagrams.
:::

:::gap title="One name, two possibly different roles"
This page’s merged **Operator** and the **Operator** in the earlier four-user model ([[users]]) are not confirmed to be the same person. The earlier Operator is floor-level and scoped to one zone; this Operator is a request/dispatch app with no zone scoping described. They may turn out to be the same role read from two different documents, or two different roles that happen to share a name — see [[open-questions]].
:::

## Corrected terms

The previous version of this page used screen names from the earlier documentation — **Maps, Workflows, Fleet Monitor, Robots, Integrations, Setup & Config, Debug** — and two prototype role names, **Requester** and **Dispatcher**. None of those are the terms the team’s own architecture diagrams use. The current terms are **Ati Flow Configurator**, **Supervisor** and **Operator** (Request Operator and Dispatch Operator, merged — their groups overlapped almost entirely, down to sharing the same two Request Activity / Request Management items).

## The earlier, screen-based model

:::gap title="Superseded, not deleted"
The table below is what the earlier documentation (and the separate Ati Flow prototype) described before the team supplied the diagrams above. It is kept for the audit trail, and because most of the [[ati-flow|screen pages]] are still written against it. Reconciling the two — which UI page maps to which app above — is now an open question rather than a settled fact. See [[open-questions]].
:::

| Page | Covers |
| --- | --- |
| [[ui-maps\|Maps]] | SLAM mapping, positions, zones, traffic and gate rules |
| [[ui-workflows\|Workflows]] | Workflow and action design, workflow patterns, priority rules |
| [[ui-fleet-monitor\|Fleet Monitor]] | Live, zone-based view of robots, tasks and traffic |
| [[ui-robots\|Robots]] | Robot setup — add, edit, delete, name, assign to zone |
| [[ui-integrations\|Integrations]] | ERP connections, master data mapping, sync logs |
| [[ui-setup-and-config\|Setup & Config]] | Site, network, docks, user and role management |
| [[ui-debug\|Debug]] | Low-level configuration and diagnostics — Configurator only |

:::gap title="Three information architectures now exist in this folder"
The table above is the earlier documentation. The separate Ati Flow prototype shows a third navigation again: **Dashboard, Live Status, Analytics, AMR Trips, Staging Area, WIP Inventory**, followed by Notifications, Settings and Profile.

None of the three sources acknowledges either of the others. All three are recorded here. See [[open-questions]].
:::
