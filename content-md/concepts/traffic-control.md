---
id: traffic-control
title: Traffic control
summary: How several robots share the same corridors, stations and doorways without blocking each other.
simple: When two robots want the same narrow aisle, something has to decide who goes first. Traffic control is that decision.
aliases:
  - gates
  - exclusion zone
  - arbitration
  - deadlock
status: current
author: Annuai
added: '2026-09-16'
sources:
  - old/amr-deployment-workflow.html
revisions:
  - date: '2026-09-16'
    author: Annuai
    note: Added VISA, Ati’s first-in-first-out approval mechanism for shared zones and intersections.
related:
  - v-visa
  - map-annotation
  - fleet
  - wf-exceptions
  - zone
order: 13
---

## Why it matters

A single robot on a route rarely fails. A fleet fails where routes overlap. Traffic control is configured during [[map-annotation|map annotation]] and then exercised by the [[fleet]] layer at runtime — and it is explicitly called out as where contention and deadlock actually get tested.

## What it is made of

:::defs
items:
  - term: Gates
    text: Access control at a point where only one robot may pass at a time.
  - term: Exclusion zones
    text: Sections — single-lane or alternating-direction — where multi-robot access has to be arbitrated. Kept deliberately separate from behavioural zones, which only change how a robot drives.
  - term: Request access to a resource
    text: One of the atomic actions a workflow can contain, which is how a workflow participates in arbitration.
:::

## VISA — first in, first served

**[[v-visa|VISA]]** is Ati’s name for first-in-first-out approval. In a VISA-controlled zone the first robot to arrive is granted the visa and proceeds; any other robot waits. When the first robot clears the area it entered, the next one receives its clearance. It is used particularly at intersections, where traffic can arrive from several directions at once.

The appeal of a first-in-first-out rule is that it is predictable. An operator watching two robots at a junction can tell which will move, and why.

:::gap title="How VISA relates to gates is not documented"
Gates, exclusion zones and VISA all govern multi-robot access. Whether VISA is the implementation of the gate concept described in the deployment material, or a separate mechanism alongside it, has not been established.
:::

## How it is tested

Edge cases are probed deliberately rather than waited for: two robots approaching the same gate simultaneously, a station occupied on arrival, a manual priority escalation mid-cycle. See [[wf-exceptions]].
