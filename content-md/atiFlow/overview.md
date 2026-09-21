---
id: ati-flow
slug: overview
title: Overview
summary: The software layer that turns a factory’s material demand into coordinated robot movement.
simple: Ati Flow sits between what a factory needs moved and the robots that move it. The factory says what it needs; Ati Flow works out which robot goes where, and when.
aliases:
  - Ati Flow
  - Flow
  - the product
status: current
author: Annuai
added: '2026-09-16'
revisions:
  - date: '2026-09-16'
    author: Annuai
    note: Added what Ati Flow is made of — Fleet Manager, Deployment Manager and an orchestration layer over ERP and WMS APIs — plus a disambiguation table for the similar names.
  - date: '2026-09-18'
    author: Annuai
    note: Added a screen-by-screen card grid linking directly into the UI section, so this page works as the hub for the whole product rather than just the concept summary.
sources:
  - old/index.html
  - old/ati-flow-architecture.html
  - old/ati-flow-glossary.html
  - old/amr-software-ia-roles.html
  - old/ati-flow-screens.html
related:
  - users
  - architecture
  - orchestration
  - v-fleet-manager
  - v-deployment-manager
  - ati-robotics
  - ui-fleet-monitor
  - ui-robots
  - ui-maps
  - ui-workflows
  - ui-integrations
  - ui-setup-and-config
  - ui-debug
order: 1
---

## What it is

Ati Flow is Ati Robotics’ software layer for automated material orchestration. It sits between a factory’s material movement requirements and the [[fleet|robot fleet]] that executes those movements.

The positioning line used in the existing documentation is *the material orchestration system for today’s factory*.

## Why it exists

Factories already know what needs to move — that information sits in production schedules, due dates and stock levels. What they lack is something to translate that demand into specific robot journeys, while keeping several robots out of each other’s way. That translation is [[orchestration]].

## The core chain

:::chain
caption: Factory need becomes a movement request, a configured workflow, fleet coordination, and finally robot execution on the floor.
steps:
  - title: Factory demand
    note: Production and material needs
  - title: Integrations
    note: ERP / MES signals
  - title: Workflows
    note: What should happen
  - title: Maps
    note: Where and how to move
  - title: Fleet
    note: Who executes it
  - title: Robot
    note: Physical execution
:::

## Core concepts

Four primitives carry most of the product. Each answers one question:

| Primitive | Question it answers | Primary surface |
| --- | --- | --- |
| [[map\|Map]] | Where can the robot move, and what rules apply there? | Maps |
| [[workflow\|Workflow]] | What sequence of actions should happen? | Workflows |
| [[fleet\|Fleet]] | How are multiple robots coordinated? | Fleet Monitor / configuration |
| [[robot\|Robot]] | Which physical machine is available and what is its state? | Robots / Fleet Monitor |

## Keep the layers clear

The product is organised around three different questions, and the documentation treats mixing them as a mistake:

:::defs
items:
  - term: Operations — what is happening now?
    text: '[[ui-fleet-monitor|Fleet Monitor]] exposes live robots, tasks, traffic and exceptions.'
  - term: Configuration — what should happen?
    text: '[[ui-maps|Maps]] and [[ui-workflows|Workflows]] define the environment and transport behaviour.'
  - term: Diagnostics — why is the robot behaving this way?
    text: Low-level state, calibration and diagnostics belong in [[ui-debug|Debug]].
:::

See [[d-keep-the-layers-clear]] for why this separation is treated as a decision rather than a habit.

## What Ati Flow is made of

Ati Flow is not one new system. It brings three things together:

:::defs
items:
  - term: '[[v-fleet-manager|Fleet Manager]]'
    text: Ati’s software already running in real warehouses. It controls the fleet — telling robots where to go, booking and managing trips, analytics, and surfacing traffic problems such as [[v-visa|VISA]] contention. It executes; it does not decide.
  - term: '[[v-deployment-manager|Deployment Manager]]'
    text: The tool Ati’s support engineers use to configure and deploy the robots.
  - term: An orchestration layer
    text: Connected to APIs from [[v-erp|ERP]] and [[v-wms|warehouse management]] providers, chosen per client. This is the part that decides what should happen. See [[orchestration]].
:::

:::callout title="Where the intelligence sits"
Fleet Manager is explicitly not an intelligent system — it controls robots rather than working out what the factory needs. The orchestration layer is what turns demand into instructions. Ati Flow is the product that puts both under one roof.
:::

## Names that are easy to confuse

Several Ati names sit one word apart and mean different things. This table is the reference:

| Name | What it is | Person or software? |
| --- | --- | --- |
| [[v-fleet-manager\|Fleet Manager]] | Ati software that runs the fleet on site today | Software |
| [[v-deployment-manager\|Deployment Manager]] | Ati software used internally to configure and deploy robots | Software |
| [[ui-fleet-monitor\|Fleet Monitor]] | A screen inside Ati Flow showing live robots, tasks and traffic | Software — a page |
| [[v-fleet-supervisor\|Fleet Supervisor]] | A user who owns one or more zones | Person |
| [[v-head-of-operations\|Supervisor]] | A user accountable for the whole site | Person |
| [[v-supervisor-mode\|Supervisor Mode]] | A selector in the prototype sidebar; what it switches is undocumented | Software — a control |

## The product, screen by screen

Everything above is the product in outline. [[architecture|Architecture]] draws the full map — every screen and the features on it — in one diagram. The seven surfaces themselves:

:::cards
items:
  - title: Fleet Monitor
    text: Live robots, tasks and traffic, by zone.
    tag: Operations
    to: /ati-flow/fleet-monitor
  - title: Robots
    text: Add, edit, assign to zone, mark for maintenance.
    tag: Setup
    to: /ati-flow/robots
  - title: Maps
    text: SLAM mapping, positions, zones, traffic and gate rules.
    tag: Configuration
    to: /ati-flow/maps
  - title: Workflows
    text: Mission and action design, patterns, priority rules, and the Workflow Builder.
    tag: Configuration
    to: /ati-flow/workflows
  - title: Integrations
    text: ERP connections, master data mapping, sync logs.
    tag: Configuration
    to: /ati-flow/integrations
  - title: Setup & Config
    text: Site, network, docks, users and roles.
    tag: Configuration
    to: /ati-flow/setup-and-config
  - title: Debug
    text: Low-level diagnostics. Configurator only.
    tag: Diagnostics
    to: /ati-flow/debug
:::

## Where to go next

Read [[users|Users and permissions]] for who uses it, [[architecture|Architecture]] for the layer model and the full diagram of every surface and feature, and the [[concepts|Concepts]] section for the ideas the product is built from.
