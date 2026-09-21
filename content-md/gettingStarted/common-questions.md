---
id: gs-common-questions
slug: common-questions
title: Common questions
summary: Questions a new person is likely to ask, answered only as far as the sources allow.
aliases:
  - FAQ
  - questions
status: current
author: Annuai
added: '2026-09-16'
sources:
  - old/ati-flow-faq.html
related:
  - open-questions
  - architecture
  - users
  - robot-states
order: 7
---

:::accordions
items:
  - title: Is Ati Flow the same thing as the robot’s autonomy stack?
    tag: Architecture
    body:
      - t: p
        text: No. The documentation separates orchestration and product from low-level robot configuration, navigation and diagnostics. See [[architecture]].
  - title: Why are Maps and Workflows separate?
    tag: Configuration
    body:
      - t: p
        text: Maps describe the spatial environment and movement rules. Workflows describe actions and transport behaviour. See [[d-maps-and-workflows-are-separate]].
  - title: Does a robot under maintenance still count as available capacity?
    tag: State model
    body:
      - t: p
        text: It should be excluded from normal dispatch if maintenance is a real operational state, but the provided information architecture does not define the complete state machine. See [[robot-states]].
  - title: Is "taxi mode" an industry-standard AMR mode?
    tag: Terminology
    body:
      - t: p
        text: The current documentation does not establish that. *Taxi* is explicitly used as a mission pattern meaning on-demand, point-to-point transport. See [[v-taxi-mode]].
  - title: Who should see low-level robot diagnostics?
    tag: Access
    body:
      - t: p
        text: The current IA places [[ui-debug|Debug]] exclusively with the Solutions Architect (Configurator) role.
  - title: What should a new designer learn first?
    tag: Onboarding
    body:
      - t: p
        text: 'The order recorded in the source material:'
      - t: list
        items:
          - '[[architecture|Architecture]]'
          - '[[vocabulary|Glossary]]'
          - '[[ui-maps|Maps]] vs [[ui-workflows|Workflows]] vs [[ui-fleet-monitor|Fleet Monitor]]'
          - '[[users|Roles & permissions]]'
          - '[[wf-deployment|Deployment workflow]]'
:::

Questions the source material raises and does not answer are collected on [[open-questions]].
