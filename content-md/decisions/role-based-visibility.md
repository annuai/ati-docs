---
id: d-role-based-visibility
slug: role-based-visibility
kind: decision
order: 6
title: 'Hide surfaces by role, rather than disabling them'
summary: 'What a role is not responsible for is removed from view entirely.'
status: current
category: 'UX decision'
author: Annuai
added: '2026-09-16'
sources:
  - old/amr-software-ia-roles.html
context: |
  Four roles use the same product with very different responsibilities, from a single-zone
  operator to a site-wide configurator.
decision: |
  Hide whole surfaces from roles that do not need them. The permission matrix uses **Hidden**,
  not *read-only* or *disabled*, for Maps, Workflows, Integrations, Setup and Debug at the
  Operator level.
why: |
  The source material frames this as attention rather than trust: each role card carries an
  explicit "not bothered with" list. An Operator is described as not seeing any configuration
  language at all — zones, workflows and master data are invisible, not greyed out.
alternatives:
  - 'Show everything read-only — keeps one mental model of the product, but exposes configuration vocabulary to people who never act on it.'
related: ['users', 'ui-states', 'd-debug-is-configurator-only']
---

The full matrix is on [[users]].

:::gap
Whether "hidden" means removed from navigation, blocked at the route, or both, is not specified.
:::
