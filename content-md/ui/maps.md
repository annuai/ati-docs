---
id: ui-maps
slug: maps
kind: screen
title: Maps
summary: SLAM mapping, positions, zones, and traffic and gate rules.
simple: Where the floor plan lives, and where you say what each part of it means.
status: current
author: Annuai
added: '2026-09-16'
sources:
  - old/amr-software-ia-roles.html
  - old/ati-flow-screens.html
  - old/amr-deployment-workflow.html
purpose: 'Answer: where can robots operate, and under what rules?'
users:
  - '**Operator** — hidden'
  - '**Fleet Supervisor** — view'
  - '**Head of Operations** — view'
  - '**Configurator** — full edit'
see:
  - The SLAM map
  - Positions and stations
  - Zones
  - Traffic and gate rules
do:
  - Build and validate a map
  - Annotate positions, behavioural zones, gates, exclusion zones, forbidden and preferred areas
  - Differentiate zone access by robot type
states:
  - Not documented.
revisions:
  - date: '2026-09-17'
    author: Annuai
    note: Noted that the map on this surface — floor plan plus drawn routes — is not the same artefact an autonomy engineer calls a map.
related:
  - map
  - map-annotation
  - v-solutions-architect
  - traffic-control
  - ui-workflows
order: 3
---

For what annotation actually involves, see [[map-annotation]]. For how a map is produced, see [[map]] and [[wf-deployment]].

:::gap title="The map shown here is not the map an autonomy engineer means"
What a [[v-solutions-architect|Solutions Architect]] works with on this surface is the floor plan with the drawn routes on it. What an autonomy engineer calls a map is the localisation substrate underneath. Both are called “map” on purpose, for simplicity. See [[map]].
:::

:::gap
No editor layout, tool palette or interaction model is documented.
:::
