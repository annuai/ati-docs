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
sources:
  - Ati team — noted September 2026
  - Operations Excellence lead — Industrial Design 1:1, September 2026
order: 10
---

:::gap
What Deployment Manager contains screen by screen, and how it maps onto the nine stages of the [[wf-deployment|deployment workflow]], is not documented. Nor is its relationship to the [[v-solutions-architect|Solutions Architect]], the [[users|user]] who sets a new site up — the two describe closely related work.
:::

:::gap
Testing found that version 5.4 unexpectedly increased the number of steps required to perform tasks that an earlier version did in fewer. No screen-by-screen information architecture exists yet to show why — mapping one out for both Deployment Manager and Fleet Manager is a stated next step.
:::
