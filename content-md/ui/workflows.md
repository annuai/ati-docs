---
id: ui-workflows
slug: workflows
kind: screen
title: Workflows
summary: Mission and action design, workflow logic, mission patterns, and priority rules.
simple: Where you describe the job a robot does, step by step — including the movement, decisions and integrations that make up the job.
status: current
author: Annuai
added: '2026-09-16'
revisions:
  - date: '2026-09-17'
    author: Annuai
    note: 'Added the Workflow Builder library: the available node groups, their options and an example workflow.'
sources:
  - Ati team — noted September 2026
  - old/amr-software-ia-roles.html
  - old/ati-flow-screens.html
purpose: 'Answer: what should robots do?'
users:
  - '**Operator** — hidden'
  - '**Fleet Supervisor** — view'
  - '**Head of Operations** — view and approve'
  - '**Configurator** — full edit'
see:
  - Missions and the actions they are composed from
  - Mission patterns — taxi, milk run, bus
  - Priority rules
  - The [[ui-workflow-builder|Workflow Builder]] node library
do:
  - Build atomic actions and compose missions from them
  - Design reusable sub-missions
  - Set mission pattern, priority and interrupt behaviour
  - Build a workflow from the available nodes
  - Approve a workflow (Head of Operations)
states:
  - Not documented. The role model implies at least an approval state, since a Head of Operations can "view & approve".
related:
  - ui-workflow-builder
  - workflow
  - missions-and-actions
  - ui-maps
  - users
order: 4
---

:::callout title="Not to be confused with the deployment workflow"
This surface holds configured transport behaviour. The [[wf-deployment|Site deployment workflow]] is a human process. See [[workflow]] for the terminology note.
:::

The complete node library and a worked example live on [[ui-workflow-builder|Workflow Builder]].
