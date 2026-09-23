---
id: open-questions
slug: index
title: Open questions
summary: What this documentation cannot answer yet, and where the sources disagree.
simple: Some things are genuinely undecided, and some sources contradict each other. Both are listed here rather than smoothed over.
aliases:
  - unknowns
  - to validate
  - contradictions
  - gaps
status: current
author: Annuai
added: '2026-09-16'
sources:
  - old/ati-flow-faq.html
  - docs/source-audit.md
  - Suryajit (Product Manager) — Ati Flow system-understanding meeting, 18 September 2026
  - Operations Excellence lead — Industrial Design 1:1, September 2026
  - Ati team — the current, on-the-ground deployment sequence, supplied in conversation, September 2026
  - Internal design/architecture review meeting, transcript supplied in conversation, September 2026
  - Ati team — terminology directive, supplied in conversation, September 2026
  - 'Ati support engineer — Deployment Manager/Fleet Manager walkthrough, transcript supplied in conversation, September 2026'
revisions:
  - date: '2026-09-16'
    author: Annuai
    note: Added the questions the team raised directly — whether Fleet Supervisor is required, where the Configurator went, how VISA relates to gates — and the cluster of similar names.
  - date: '2026-09-16'
    author: Annuai
    note: 'Closed the question of whether the Solutions Architect is still a user — he is. Replaced it with the naming question: Solutions Architect or Configurator.'
  - date: '2026-09-17'
    author: Annuai
    note: Added the unresolved question of whether “map” should keep covering two different artefacts.
  - date: '2026-09-18'
    author: Annuai
    note: Added the team-supplied, role-based architecture as a third unreconciled information architecture, and logged the open question of how it maps onto the earlier screen-based UI section.
  - date: '2026-09-18'
    author: Annuai
    note: 'Added two questions raised by merging Request Operator and Dispatch Operator into one Operator, and by adding an unconfirmed Fleet Supervisor branch to the new information architecture: whether that Operator is the same role as the earlier Users-model Operator, and whether Fleet Supervisor belongs in the new architecture at all given the two existing, disagreeing descriptions of it.'
  - date: '2026-09-18'
    author: Annuai
    note: 'Closed the Zone vs Processing Zone contradiction: Processing Area, Processing Zone, Process Area and Process Zone are confirmed to be the same entity, and Processing Area is now the standard term — see [[d-processing-area-terminology]]. Added the new questions raised in the Ati Flow system-understanding meeting: multi-station material mapping, Machine dependency in workflow creation, Production/Consumption Unit tagging, whether Fleet needs frontend prominence, per-role information needs, and product standardisation.'
  - date: '2026-09-18'
    author: Annuai
    note: 'Added two questions from the Industrial Design 1:1: whether "consumption point", used in some software surfaces, names the same thing as Machine or Consumption Unit; and why Deployment Manager 5.4 increased the steps required for tasks compared to the previous version. Logged the Machine vs "consumption point" naming clash as a contradiction alongside the others.'
  - date: '2026-09-18'
    author: Annuai
    note: 'Added questions raised by the current, on-the-ground deployment sequence: whether manual SLAM mapping (currently done with a PlayStation controller) can be automated, what adding materials to Ati Flow actually involves, what happens afterward, and whether this concrete sequence has been reconciled against the documented nine-stage deployment workflow.'
  - date: '2026-09-18'
    author: Annuai
    note: 'Added two questions from an internal design/architecture review: how System Integrator relates to the existing four-user model, and whether "IT and production planners doing the configuration" describes the same role as Solutions Architect / Configurator under different job titles, or something new.'
  - date: '2026-09-18'
    author: Annuai
    note: 'Closed the Trip vs Task contradiction: confirmed to name the same thing, with no conceptual difference — Ati currently uses Trip. Merged the separate Task pages into Trip.'
  - date: '2026-09-18'
    author: Annuai
    note: 'Closed two more contradictions: Fleet Monitor and Live Fleet Status are the same screen (Fleet Monitor is the standard name going forward, and the two pages have been merged), and Mission and Workflow are the same concept (Ati Flow currently uses Workflow because it is an orchestration product — see the new decision, Say "Workflow", not "Mission").'
  - date: '2026-09-18'
    author: Annuai
    note: 'Closed the question of how System Integrator relates to the four-user model: confirmed to be the same person as the Solutions Architect (Configurator), naming the typical third-party employer relationship rather than a fifth persona. Narrowed the remaining open question to whether "IT / production planner" is a third job title for the same role.'
  - date: '2026-09-22'
    author: Annuai
    note: Added the substantive reason for preferring "Workflow" over "Mission" to the resolved item below — Mission reads as point-to-point, Workflow can cover a longer sequence with steps in between — and audited the rest of this documentation to stop using "Mission" as if it were Ati Flow's own term. See [[d-workflow-over-mission]].
  - date: '2026-09-22'
    author: Annuai
    note: Added that the full list of map zone types is undocumented even inside Ati (from an internal DM/FM walkthrough), and flagged the "V5" waypoint format against Deployment Manager's own version 5.4 as a naming clash worth avoiding, not a confirmed connection.
related:
  - users
  - robot-states
  - processing-zone
  - trip
  - architecture
  - v-material-station-mapping
  - v-machine
  - fleet
  - information-vs-execution-layer
  - d-processing-area-terminology
  - v-deployment-manager
  - wf-deployment
  - v-map-creation
  - v-system-integrator
  - v-mhe
  - map-annotation
  - v-waypoint-version
order: 1
---

:::callout title="Why this page exists"
Documentation that guesses is worse than documentation that admits a gap, because a guess gets repeated. Everything below is either flagged as open by Ati’s own material, or was found while auditing this folder.
:::

## Questions the team has raised

- **Is a Fleet Supervisor required at all?** The role is limited to handling robots with issues — but [[v-operator|Operators]] already do that. If there is nothing else to the job, the persona may be unnecessary. See [[v-fleet-supervisor]].
- Is the [[v-fleet-supervisor|Fleet Supervisor]] row in the permission table too generous? It grants reassignment control and view access to Maps and Workflows, which is more than the current understanding of the role describes.
- **Solutions Architect or Configurator?** Both names are in use for the fourth user and the wording needs finalising. See [[users]].
- **Should a “map” stay one word?** Autonomy engineers and Solutions Architects mean different things by it. The shared name is deliberate — one word is simpler to learn — but whether the simplicity is worth the ambiguity has not been decided. See [[map]].
- How does the Solutions Architect relate to [[v-deployment-manager|Deployment Manager]], the tool Ati support engineers use to configure and deploy robots? The two describe closely related work.
- How does [[v-visa|VISA]] relate to the **gates** and **exclusion zones** in the deployment material — is it their implementation, or a separate mechanism?
- How much of [[v-fleet-manager|Fleet Manager]] has Ati Flow already absorbed, and on what timeline?
- How does the earlier screen-based [[ati-flow|UI]] section (Maps, Workflows, Fleet Monitor, Robots, Integrations, Setup & Config, Debug) map onto the current, team-supplied [[architecture|role-based architecture]] (Ati Flow Configurator, Supervisor, Operator)? No entry has reconciled the two yet.
- Does [[v-fleet-supervisor|Fleet Supervisor]] belong in the new, role-based [[architecture|information architecture]] at all? The team’s two architecture diagrams do not include this persona — the branch now shown for it is reconstructed from the earlier [[users|Users and permissions]] page, whose narrative description and permission matrix already disagree with each other about how narrow the role is.
- Is the **Operator** in the new [[architecture|information architecture]] (merged Request Operator and Dispatch Operator) the same person as the **Operator** in the earlier four-user model ([[users]]) — floor-level, scoped to one zone? Nothing has confirmed or ruled out the two names describing different roles.

## Questions raised in the 18 September 2026 system-understanding meeting

- Can the same material or material group be mapped to multiple [[v-station|Stations]], and if so, how should pickup/drop selection work during workflow creation? See [[v-material-station-mapping]].
- What [[v-machine|Machine]] dependency is technically required while creating a [[workflow|Workflow]], and can it be removed from the user-facing configuration? See [[information-vs-execution-layer]].
- Do [[v-production-unit|Production Unit]] and [[v-consumption-unit|Consumption Unit]] need to remain explicit, user-facing machine tags, or can some of that behaviour be derived from the workflow itself?
- What frontend functionality actually depends on [[fleet|Fleet]]? Is it primarily a backend/execution concept, and could a Robot → Map assignment represent the same outcome more directly?
- What information should Operators see, versus Deployment/Configuration users, in the redesigned configuration experience?
- Which existing client-specific configurations should become universal Ati Flow behaviour rather than one-off customisation?

## Questions raised in the Industrial Design 1:1

- Is a "consumption point", the term some software surfaces use, the same entity as [[v-machine|Machine]] or [[v-consumption-unit|Consumption Unit]] as documented here? See [[v-machine]].
- Why did Deployment Manager 5.4 increase the number of steps required for tasks the previous version did in fewer? A screen-by-screen information architecture, planned but not yet built, is intended to answer this. See [[v-deployment-manager]].

## Questions raised by the current, on-the-ground deployment sequence

- [[v-map-creation|Mapping]] is currently done by manually driving the robot with a PlayStation controller. Could this be automated, and if so, how?
- What exactly is involved in adding materials to Ati Flow, and how does that step relate to the already-documented [[processing-zone|Processing Area]] / material configuration flow?
- What happens after materials are added to Ati Flow — at minimum, workflow creation, fleet configuration and go-live still have to happen somewhere — is not yet documented at this level of detail. See [[wf-deployment]].
- How does this concrete, tool-level sequence (Deployment Manager → mapping → route creation → materials) map onto the documented nine-stage deployment workflow? The two have not been formally reconciled.

## Questions raised by an internal design/architecture review

- "IT and production planners do the configuration" was named alongside System Integrator. Now that System Integrator is confirmed as the same person as the [[v-solutions-architect|Solutions Architect / Configurator]], is "IT / production planner" a third job title for that same role, or a genuinely different one that has not been documented yet?

## Questions the source material raises

- What exact robot states exist in the production system? See [[robot-states]].
- Is Maintenance a fleet-visible state, a robot-local state, or both?
- What exactly does "taxi mode" enable or disable? See [[v-taxi-mode]].
- Which safety mechanisms remain active during manual or teleoperated movement?
- What is the authoritative source for robot availability?
- What is the relationship between [[fleet|Fleet]], [[processing-zone|Processing Area]] and geographical [[zone|Zone]] in the actual data model?
- Which actions can an Operator and a Fleet Supervisor perform directly on a robot?
- What is the full list of map zone types, and what rule does each one carry? An Ati support engineer, asked directly, said this is undocumented even inside the company. See [[map-annotation]].

## Contradictions found in this folder

| Where | The disagreement |
| --- | --- |
| Information architecture | Three models now exist. The earlier documentation lists Maps, Workflows, Fleet Monitor, Robots, Integrations, Setup & Config and Debug. The prototype navigation shows Dashboard, Live Status, Analytics, AMR Trips, Staging Area and WIP Inventory. A team-supplied architecture diagram describes the product by role instead — Ati Flow Configurator, Supervisor, Operator, Fleet Manager and the robot’s HMI — and is now the current model. None of the three acknowledges either of the others. See [[architecture]]. |
| Fleet Supervisor, twice over | The role documentation itself already disagreed — the [[users\|Users and permissions]] page’s narrative description narrows Fleet Supervisor to handling robots with issues only, while its own permission matrix gives it zone-wide Fleet Monitor and robot-management access. Neither has been checked against the new, role-based [[architecture\|information architecture]], where the role appears only as a reconstructed, unconfirmed branch. |
| One name, two Operators | The new [[architecture\|information architecture]]’s **Operator** (merged Request Operator and Dispatch Operator) and the **Operator** in the earlier four-user model ([[users]]) are not confirmed to be the same role. |
| One word, two artefacts: "map" | To an autonomy engineer a [[map]] is the localisation substrate. To a [[v-solutions-architect\|Solutions Architect]] it is the floor plan with the drawn routes on it, as [[ui-maps\|Ati Flow]] presents it. Unlike the other entries in this table, this one is a deliberate choice rather than an accident — but it is still unresolved. |
| Names one word apart | Fleet Manager and Deployment Manager are software; Fleet Supervisor and Supervisor are people; Fleet Monitor is a screen; Supervisor Mode is a control. The disambiguation table on [[ati-flow\|the Ati Flow overview]] keeps them apart. |
| Fleet Manager vs Fleet Monitor | [[v-fleet-manager\|Fleet Manager]] is a separate system that Ati Flow is intended to replace. [[ui-fleet-monitor\|Fleet Monitor]] is a page inside Ati Flow. The names are one word apart. How much of Fleet Manager remains to be absorbed — [[v-route-ops\|Route Ops]] is one known gap — is not documented. |
| Machine vs "consumption point" | This documentation uses [[v-machine\|Machine]], the PRD-backed term. The Industrial Design 1:1 flagged that some software surfaces instead say "consumption point" — jargon that creates a steep learning curve for non-technical users. Whether the two name the same thing has not been confirmed. |
| Roles and modes | Four roles are documented. The prototype exposes a single "Supervisor Mode" selector with no role switching. See [[users\|Users and permissions]]. |
| The word "workflow" | A configured product object on one page, a human deployment process on another. See [[workflow]]. |
| "V5" waypoints vs Deployment Manager 5.4 | [[v-waypoint-version\|Waypoint version]] "V5" (a map/routing format) and Deployment Manager's software version 5.4 sound alike but nothing confirms they are related — recorded as a naming clash to avoid, not as a connection. |

## Subjects with no source at all

- **Ati Robotics as a company** — nothing beyond one sentence of product positioning.
- **Robot hardware** — no specifications, variants or capacities. See [[ati-robotics]].
- **The material model** — no definition of a material or a load, and no detailed model of a container’s contents. See [[material-flow]].
- **The data model** — how fleets, zones, trips, tasks and workflows relate as records.
- **Interface states** — loading, empty, error and offline are undesigned. See [[ui-states]].
- **Six of seven screens** — scoped in one line each, with no layout or field detail.

## Resolved

- **Processing Area, Processing Zone, Process Area, Process Zone** — confirmed to be the same entity by Suryajit (Product Manager), 18 September 2026. Processing Area is now the standard term. See [[d-processing-area-terminology]] and [[processing-zone|Processing Area]].
- **Trip and Task** — confirmed to name the same thing, with no conceptual difference. Ati currently uses Trip. See [[trip]].
- **Fleet Monitor and Live Fleet Status** — confirmed to be the same screen under two names. Fleet Monitor is the documented, standard name going forward; Live Fleet Status / Live Status is the current prototype label. See [[ui-fleet-monitor]].
- **Mission and Workflow** — confirmed to name the same thing. Mission is the wider industry term; Ati Flow currently calls it Workflow because it is an orchestration product, and because Workflow better fits a sequence that can involve several steps rather than just a point-to-point trip. See [[d-workflow-over-mission]]. This documentation now uses "Workflow" throughout rather than mentioning "Mission" more than once per page.
- **System Integrator and Solutions Architect (Configurator)** — confirmed to be the same person and the same permission role. System Integrator names who they typically work for — a third-party company delivering deployment services to the client, rather than an Ati employee; Solutions Architect / Configurator names what they do in the product. Not a fifth user. See [[v-system-integrator]].

## How to close one

Confirm the answer with the people who own it, then edit the relevant content file in `src/content/`, change the entry’s `status` from `needs-confirmation` to `current`, and remove the gap callout. The entry’s `sources` field should name where the answer came from.
