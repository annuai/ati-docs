---
id: configuration-layers
title: Configuration layers
summary: Which settings belong to the robot, the map, the workflow, the fleet, or the business system.
simple: 'Almost every confusing question about Ati Flow is really the same question: where is this configured? There are five answers, and they are set in order.'
aliases:
  - what is configured where
  - configuration
status: current
author: Annuai
added: '2026-09-16'
sources:
  - old/amr-deployment-workflow.html
  - old/ati-flow-architecture.html
  - old/amr-software-ia-roles.html
related:
  - wf-deployment
  - users
  - integrations
  - map-annotation
  - d-keep-the-layers-clear
order: 16
---

## Why it matters

The deployment material returns to this point three separate times — robot configuration is *conceptually distinct* from map and workflow configuration, and master data alignment is named as a common source of cross-team confusion. Knowing which layer owns a setting is most of the battle.

## The five layers

| Layer | What is configured here | Set during |
| --- | --- | --- |
| Robot | Network credentials, robot ID, safety parameters (max speed, footprint, sensor calibration), payload profile, drive parameters | Infrastructure setup |
| Map | The point cloud used for localization | Mapping (SLAM) |
| Map annotation | Positions and stations, behavioural zones, gates and exclusion zones, forbidden and preferred areas, per-type zone access | Map annotation |
| Workflow | Actions, sub-workflows, workflow patterns, priority and interrupt behaviour | Workflow design |
| Fleet | Task allocation, traffic arbitration, charging and idle behaviour, priority and aging | Fleet management |
| Business system | API hooks, implicit priority rules, master data mapping | ERP integration |

:::callout title="Order matters"
Each layer depends on the one above it. You cannot annotate a map that does not exist, and you cannot design a workflow without positions to move between. The [[wf-deployment|deployment workflow]] runs in exactly this order.
:::

## Who configures what

Configuration authority sits with the Solutions Architect (Configurator). Operational control — reassigning a robot, raising a priority — sits with Operators and Supervisors. See [[users]].
