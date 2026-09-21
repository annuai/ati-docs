---
id: v-machine
term: Machine
kind: term
simple: A physical unit on the floor that can represent one or several stations, and is tagged by the role it plays in material movement.
technical: A Machine can represent or contain one or multiple [[v-station|Stations]]. Users/operators are currently assigned to machines rather than directly to stations — the chain runs User → Machine(s) → Station(s). A user only sees the [[workflow|workflows]] tied to the machines they are assigned to — the same filtering idea as [[processing-zone|Processing Area]], one level down. Machines are also tagged [[v-production-unit|Production Unit]] or [[v-consumption-unit|Consumption Unit]] depending on their role in material movement; one machine can carry both tags at once. Whether this Machine dependency needs to be exposed directly during workflow configuration is under review.
usedIn:
  - User-to-machine assignment
  - Workflow configuration (currently)
note: Whether Machine dependency is technically required in workflow creation, or can be removed from user-facing configuration, is an open question. Separately, some software surfaces use the jargon "consumption point" where this documentation uses "Machine" — see [[open-questions]] for whether the two name the same thing.
related:
  - v-station
  - v-production-unit
  - v-consumption-unit
  - workflow
  - open-questions
  - information-vs-execution-layer
status: needs-confirmation
author: Annuai
added: '2026-09-18'
revisions:
  - date: '2026-09-18'
    author: Annuai
    note: 'Noted a plain-language concern raised in the Industrial Design 1:1: some software surfaces say "consumption point" where this documentation says "Machine", and jargon like this creates a steep learning curve for non-technical users. Logged as an open question rather than assumed to be the same concept as Consumption Unit.'
  - date: '2026-09-18'
    author: Annuai
    note: 'Added, from an internal design/architecture review: a user only sees workflows tied to their assigned machines, and one machine can be tagged both Production Unit and Consumption Unit at once.'
sources:
  - Suryajit (Product Manager) — Ati Flow system-understanding meeting, 18 September 2026
  - Operations Excellence lead — Industrial Design 1:1, September 2026
  - Internal design/architecture review meeting, transcript supplied in conversation, September 2026
order: 23
---


