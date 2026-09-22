---
id: users
title: Users and permissions
summary: The four users the system is designed around, and what each of them can see and do on every surface.
simple: 'Four kinds of person use the system: someone on the floor, someone looking after a group of zones, someone accountable for the whole site, and the person who sets everything up. What each of them can and can’t do is deliberate, not accidental.'
aliases:
  - users
  - personas
  - who uses it
  - roles
  - permissions
  - access
  - operator
  - supervisor
  - configurator
status: needs-confirmation
author: Annuai
added: '2026-09-16'
revisions:
  - date: '2026-09-16'
    author: Annuai
    note: Solutions Architect added as the fourth user. This corrects the earlier reading that the role had become Ati-internal, and reconciles the user model with the four-role permission table.
  - date: '2026-09-16'
    author: Annuai
    note: 'Narrowed the Fleet Supervisor description to handling robots with issues, and replaced a speculative reason for questioning the role with the real one: Operators already do that job.'
  - date: '2026-09-16'
    author: Annuai
    note: Flagged that the separate permission table predates the user model now proposed, and linked the two pages together.
  - date: '2026-09-16'
    author: Annuai
    note: 'Corrected: with Solutions Architect confirmed as the fourth user, the permission table and the user model agree. The open points are the Fleet Supervisor layer and the Solutions Architect naming.'
  - date: '2026-09-18'
    author: Annuai
    note: 'Merged the separate "Roles and permissions" page into this one — both described the same four people, one narratively and one as a permission matrix, and kept pointing back and forth at each other. Nothing was removed: the permission matrix, the per-role "not bothered with" lists and every open question are all still here, now read as one page instead of two.'
  - date: '2026-09-18'
    author: Annuai
    note: Added that System Integrator names the same person as the Solutions Architect (Configurator), from an organisational-relationship angle rather than a product-function angle — resolved as not a fifth user. The Solutions-Architect-vs-Configurator naming question remains separately open.
sources:
  - Ati team — noted September 2026
  - old/amr-software-ia-roles.html
  - Ati team — terminology directive, supplied in conversation, September 2026
related:
  - v-operator
  - v-fleet-supervisor
  - v-head-of-operations
  - v-solutions-architect
  - v-system-integrator
  - v-deployment-manager
  - configuration-layers
  - open-questions
  - architecture
  - zone
  - ui-debug
  - d-role-based-visibility
  - v-escalation
order: 3
---

## The four users

Three of them operate the system. The fourth sets it up.

:::defs
items:
  - term: '[[v-operator|Operator]] — floor level, single zone'
    text: The person physically present, day to day, working in one zone. Fleet Monitor for their own zone, with robot status and a task queue, and view-only access to Robots in their zone. They can raise a manual priority request, with the trade-off shown before they confirm.
  - term: '[[v-fleet-supervisor|Fleet Supervisor]] — zone-level oversight'
    text: 'Owns one or more zones: Fleet Monitor across their assigned zones with reassignment control, managing robots within those zones, and viewing Maps and Workflows to understand what is configured, without editing them. Closest to a support engineer working the floor. **Whether this user is required at all is not yet settled** — see the callout below.'
  - term: '[[v-head-of-operations|Supervisor (Head of Operations)]] — across the site'
    text: Accountable for every zone, and the escalation point above the Fleet Supervisors. Manages robots site-wide, views and approves Workflows and Maps, sees Integrations status, and manages users and roles.
  - term: '[[v-solutions-architect|Solutions Architect (Configurator)]] — sets everything up'
    text: 'The person who makes a new site work at all: building and annotating the [[map|maps]], designing workflows, configuring robots down to their low-level parameters, wiring up integrations, and site configuration. Full edit on Maps and Workflows, full setup on Robots, full configuration on Integrations and Setup & Config, and the only role with Debug access — used to verify a configuration behaves correctly rather than for daily operations. Also called the **Configurator** — the wording is not final.'
:::

## Two different axes

The first three users sit on a ladder of scope. Each sees further than the one below, and acts on less detail:

:::relationship
nodes:
  - label: Operator
    to: v-operator
    note: one zone — what is happening now
  - label: Fleet Supervisor
    to: v-fleet-supervisor
    note: robots in trouble — if the role is kept at all
  - label: Supervisor
    to: v-head-of-operations
    note: the whole site — approve and escalate
:::

The Solutions Architect is not further up that ladder — he is on a different one. The other three ask *what is happening, and what should I do about it*. He asks *what should this site do in the first place*. That is the difference between operating a system and configuring one, and it is the same split the product itself is built around. See [[d-keep-the-layers-clear]].

:::gap title="Fleet Supervisor is not confirmed"
The argument against the role is direct: **[[v-operator|Operators]] already manage the robots when there is an issue.** If handling robots in trouble is the whole of the Fleet Supervisor job, and the person already on the floor is doing it, a separate persona may not be needed.

It is worth settling early. Keeping the role means zones need owners, which shapes the permission model and the zone assignment logic. Dropping it makes this a three-user system.

One row of the permission matrix below is also under question: it gives the Fleet Supervisor reassignment control and view access to Maps and Workflows, which is more than the narrower "robots with issues, and nothing else" description above. The two have not been reconciled.
:::

:::gap title="Solutions Architect or Configurator? Not yet decided"
Both names are in use for the same person, and one needs picking.

Worth noting while deciding: the other three users are named for what they do inside the product — an Operator operates, a Supervisor supervises. By that pattern *Configurator* is the consistent choice, and *Solutions Architect* reads as a job title rather than a role in the system. That is an observation about the naming pattern, not a decision. See [[d-robot-over-amr]] for how the last terminology call of this kind was made and recorded.
:::

:::callout title="A third name: System Integrator"
**Resolved:** [[v-system-integrator|System Integrator]] is the same person as the Solutions Architect (Configurator) — in practice, usually a third-party company delivering deployment services to a client, rather than an Ati employee.

This does not add a fifth user. Solutions Architect / Configurator names what they do inside the product; System Integrator names who they typically work for. The Solutions-Architect-vs-Configurator naming question above is unaffected by this — it is still open.
:::

## What he sets up

The setup work spans most of the [[configuration-layers|configuration layers]]:

- [[map|Maps]] — building the map of the site and annotating it with positions, zones and traffic rules
- [[missions-and-actions|Workflows]] — the actions and transport behaviour robots will run
- [[robot|Robots]] — setup including low-level parameters
- [[integrations|Integrations]] and site configuration
- [[ui-debug|Debug]] — the only role with access

In short: everything required to take a warehouse or factory from having no fleet to running one.

## Permission matrix

The most detailed statement of who can do what that exists — what each role can do on each page, at a glance:

| Page | Operator | Fleet Supervisor | Head of Operations | Configurator |
| --- | --- | --- | --- | --- |
| Fleet Monitor | Own zone | Own zone(s) | All zones | View |
| Robots | View own zone | Manage own zone | Manage all | Full setup |
| Workflows | Hidden | View | View & approve | Full edit |
| Maps | Hidden | View | View | Full edit |
| Integrations | Hidden | Hidden | View status | Full config |
| Setup & Config | Hidden | Hidden | Users & roles | Full config |
| Debug | Hidden | Hidden | Hidden | Exclusive |

## What each role is not bothered with

The source material lists this explicitly per role, which makes the design intent unusually clear.

:::accordions
items:
  - title: Operator
    body:
      - t: list
        items:
          - Maps, Workflows, Integrations, Setup, Debug — entirely hidden
          - Other zones’ traffic or task queues
          - Any configuration language — zones, workflows and master data are invisible here
  - title: Fleet Supervisor
    body:
      - t: list
        items:
          - Integrations, Setup & Config, Debug — entirely hidden
          - Editing workflows or map zones — that is a Configurator task
          - Zones outside their own assignment
  - title: Supervisor (Head of Operations)
    body:
      - t: list
        items:
          - Debug — entirely hidden
          - Low-level robot parameters such as drive tuning and safety calibration
          - Writing workflow logic or drawing map zones from scratch
  - title: Solutions Architect (Configurator)
    body:
      - t: list
        items:
          - Day-to-day task queues or manual dispatch — that is operational, not configuration
          - Zone-specific operational escalations
:::

:::callout title="Read the matrix as a design principle"
Hiding a surface is a decision about attention, not about trust. See [[d-role-based-visibility]].
:::

:::gap
The prototype offers a single **Supervisor Mode** selector and no visible role switching. How modes relate to these four roles is unestablished.
:::

:::gap title="The names are confusing"
Fleet Supervisor, Fleet Manager, Fleet Monitor and Supervisor Mode all sound alike and mean different things — two are people, two are software. The disambiguation table on [[ati-flow|the Ati Flow overview]] is the reference to use when the terms collide.
:::

:::gap
Two things are still unwritten. What each user needs from the newly proposed system has not been described separately from this permission table. And the relationship between the Solutions Architect and [[v-deployment-manager|Deployment Manager]] — the tool Ati support engineers use to configure and deploy robots — has not been established, although they describe closely related work.
:::
