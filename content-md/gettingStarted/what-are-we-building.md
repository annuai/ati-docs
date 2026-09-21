---
id: gs-what-are-we-building
slug: what-are-we-building
step: 1
title: What are we building?
summary: Robots that move material around a factory, and the software that decides what they do — both built by Ati.
simple: 'Ati is an OEM: it builds the robots themselves, and it builds Ati Flow, the software that tells those robots what to move, where to take it, and when.'
status: current
author: Annuai
added: '2026-09-16'
revisions:
  - date: '2026-09-16'
    author: Annuai
    note: Reframed around Ati being an OEM that builds both the robots and the orchestration software.
sources:
  - Ati team — noted September 2026
  - old/index.html
  - old/ati-flow-architecture.html
  - public/assets/ati-sherpa.png
related:
  - ati-robotics
  - ati-flow
  - robot
  - orchestration
  - v-oem
order: 1
---

:::figure
src: /assets/ati-sherpa.png
alt: 'An Ati Sherpa XT Lite autonomous mobile robot: a yellow four-wheeled vehicle with a sensor mast and a safety beacon.'
caption: A robot of the kind Ati Flow coordinates.
:::

## The two halves

There is a machine, and there is a decision. The machine is a [[robot]] — it drives itself, avoids people and finds its own way. The decision is which robot should move what, and when. That decision is what Ati Flow makes, and it is called [[orchestration]].

Ati builds both. As an [[v-oem|OEM]] it manufactures the robots and writes the software that commands them, rather than supplying one and buying in the other. See [[ati-robotics]].

## Why the decision is hard

One robot on one route is straightforward. A factory has many robots, shared corridors, charging docks, deadlines and production schedules that shift. Coordinating all of that is the product.

Next: [[gs-what-is-ati-flow|what Ati Flow actually is]].
