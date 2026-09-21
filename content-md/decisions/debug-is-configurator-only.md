---
id: d-debug-is-configurator-only
slug: debug-is-configurator-only
kind: decision
order: 7
title: 'Debug belongs to the Configurator alone'
summary: 'Raw robot state, calibration and overrides are visible to one role only.'
status: current
category: 'UX decision'
author: Annuai
added: '2026-09-16'
sources:
  - old/amr-software-ia-roles.html
  - old/ati-flow-faq.html
  - old/ati-flow-glossary.html
context: |
  Someone has to be able to see raw robot state, calibration values, overrides and diagnostic
  logs. The question is who.
decision: |
  Debug is **exclusive** to the Solutions Architect (Configurator). It is hidden from Operators,
  Fleet Supervisors and the Head of Operations.
why: |
  Low-level robot parameters — drive tuning, safety calibration — are explicitly called
  Configurator territory, and are on the "not bothered with" list even for the Head of
  Operations, who otherwise has site-wide authority.
alternatives:
  - 'Not recorded in the source material.'
related: ['ui-debug', 'users', 'd-expose-the-decision', 'v-debug']
---

This is the one place in the permission matrix where the site-wide operational role has *less* access than a configuration role — which is the point. Authority over operations and authority over the machine are different things.
