---
id: v-deployment-manager
term: Deployment Manager
kind: term
simple: The software Ati’s own support engineers use to configure robots and get them running on a site.
technical: Used internally by Ati support engineers to configure and deploy the bots. It is one of the three parts [[ati-flow|Ati Flow]] brings together, alongside [[v-fleet-manager|Fleet Manager]] and an orchestration layer.
aliases:
  - deployment manager
  - DM
usedIn:
  - Ati support engineers, when configuring and deploying robots
note: An Ati-internal tool, not something a customer operates. Compare [[v-fleet-manager|Fleet Manager]], which runs the fleet on site. Version 5.4 was found to increase the number of steps needed for tasks the previous version did in fewer — see the gap below.
related:
  - ati-flow
  - v-fleet-manager
  - wf-deployment
  - v-solutions-architect
status: current
author: Annuai
added: '2026-09-16'
revisions:
  - date: '2026-09-18'
    author: Annuai
    note: Added the Industrial Design 1:1 finding that version 5.4 increased the number of steps needed for tasks compared to the previous version, and flagged the planned information-architecture mapping exercise as the way to pin down why.
  - date: '2026-09-21'
    author: Annuai
    note: Added what Deployment Manager contains screen by screen, and the fact that its edits are reflected in Fleet Manager automatically, from the DM 5.0 Support Guide. Narrowed the remaining gap to the deployment-workflow mapping and the Solutions Architect relationship, which the guide does not cover.
sources:
  - Ati team — noted September 2026
  - Operations Excellence lead — Industrial Design 1:1, September 2026
  - 'drive-download-20260921T111727Z-1-001/FM-DM-5.0/DM_5.0_Support Guide.pdf, supplied September 2026'
order: 10
---

## What it covers

Three sections, reached from the side navigation:

- **Fleets** — create, rename or delete a fleet; assign a map to it (a map can only belong to one fleet at a time); and assign or unassign [[v-sherpa|Sherpa]] robots to it.
- **Assets** — the inventory the Fleets section draws from: the map library, and every Sherpa robot together with the hardware ID and API key that identify it.
- **Users & Permissions** — add, edit or delete users and roles, and toggle exactly which Fleets, Map, Users, Sherpa and Summon Button actions each one is allowed.

Deleting a fleet, a Sherpa or a user is restricted to the Support role and cannot be undone.

## How it relates to Fleet Manager

A change made in Deployment Manager is reflected in [[v-fleet-manager|Fleet Manager]] automatically — a new or deleted fleet, a Sherpa assignment, and a user's access and permissions all appear on the Fleet Manager side without a separate sync step.

:::gap
How Deployment Manager maps onto the nine stages of the [[wf-deployment|deployment workflow]], and how it relates to the [[v-solutions-architect|Solutions Architect]], the [[users|user]] who sets a new site up, is still not documented — the two describe closely related work.
:::

:::gap
Testing found that version 5.4 unexpectedly increased the number of steps required to perform tasks that an earlier version did in fewer. Whether that increase shows up in the flows described above has not been checked.
:::
