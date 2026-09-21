---
id: integrations
title: Integrations
summary: The connection between Ati Flow and the business systems that create demand.
simple: The factory’s existing systems already know what needs to be made and when. Integrations let those systems ask for a movement, and hear back when it is done.
aliases:
  - ERP integration
  - SAP
  - MES
  - master data
status: current
author: Annuai
added: '2026-09-16'
sources:
  - old/amr-deployment-workflow.html
  - old/ati-flow-architecture.html
  - old/amr-software-ia-roles.html
  - old/index.html
revisions:
  - date: '2026-09-16'
    author: Annuai
    note: Recorded that the orchestration layer connects to ERP and warehouse management APIs chosen per client.
related:
  - configuration-layers
  - orchestration
  - ui-integrations
  - v-erp
  - v-wms
order: 15
---

## Why it matters

Without an integration, every movement has to be requested by a person. With one, the factory’s own demand drives the [[fleet]] — which is what makes [[orchestration]] automatic rather than manual.

## What it covers

- **API hooks** so an external system — an ERP such as SAP — can trigger a mission and receive status or completion updates back
- **Implicit priority** computed from business data: due dates, line schedules, stock levels — rather than relying purely on manual escalation
- **Master data alignment**: explicitly defining what is configured at this layer versus what belongs to map or mission configuration

:::callout title="A known source of confusion"
The deployment material calls master data alignment out by name as a common source of cross-team confusion. See [[configuration-layers]] for where each kind of configuration belongs.
:::

The overview diagram names **ERP / MES signals** as the input to this layer. MES appears only in that diagram; it is not defined anywhere in the source material.

## Which systems get connected

Ati Flow’s orchestration layer connects to APIs from [[v-erp|ERP]] and [[v-wms|warehouse management]] providers, chosen according to what the client already runs. The connection set is per-deployment rather than fixed.
