---
id: ui-integrations
slug: integrations
kind: screen
title: Integrations
summary: ERP connections, master data mapping and sync logs.
simple: Where Ati Flow is wired into the factory’s own systems.
status: current
author: Annuai
added: '2026-09-16'
sources:
  - old/amr-software-ia-roles.html
  - old/ati-flow-screens.html
  - old/amr-deployment-workflow.html
purpose: 'Answer: where does demand come from, and is that connection healthy?'
users:
  - '**Operator** — hidden'
  - '**Fleet Supervisor** — hidden'
  - '**Head of Operations** — view status: whether syncs are healthy, without configuring them'
  - '**Configurator** — full configuration'
see:
  - ERP connections
  - Master data mapping
  - Sync logs
do:
  - Configure API hooks
  - Map master data
  - Check sync health
states:
  - Sync health is implied by "view status — whether syncs are healthy", but no state list is documented.
related:
  - integrations
  - configuration-layers
  - v-master-data
  - v-erp
order: 6
---

For what this layer does, see [[integrations]]. For where master data belongs, see [[configuration-layers]].
