---
id: v-fleet-supervisor
term: Fleet Supervisor
kind: term
simple: Someone who steps in when a robot has a problem — like a support engineer working the floor. Whether the job needs its own person is not settled.
technical: Limited to managing robots when there are issues. They do not control anything else, and they are not given the data to control or manage anything else either.
usedIn:
  - The role and permission model
note: Whether this user is required at all has not been settled — see below. Not to be confused with [[v-fleet-manager|Fleet Manager]], which is software.
related:
  - users
  - users
  - v-operator
  - v-head-of-operations
  - v-fleet-manager
  - robot-states
  - wf-exceptions
status: needs-confirmation
author: Annuai
added: '2026-09-16'
revisions:
  - date: '2026-09-16'
    author: Annuai
    note: 'Narrowed to what the role actually is — handling robots with issues, and nothing else — and recorded the real argument against needing it: Operators already do that job.'
sources:
  - Ati team — noted September 2026
  - old/amr-software-ia-roles.html
order: 141
---

## What the job is

Narrow and reactive. A Fleet Supervisor handles robots that have run into trouble, and nothing more. The scope is deliberate: they are not given the data they would need to manage anything beyond that, so the role cannot quietly widen into general operations.

The closest comparison is a support engineer who works on the floor rather than remotely.

## Whether the role is needed

This is genuinely undecided. The argument against it is straightforward: **[[v-operator|Operators]] already manage the robots when there is an issue.** If that is the whole of the Fleet Supervisor job, and the person already standing on the floor is doing it, a separate persona may not be necessary.

:::gap title="Why it matters before it is decided"
Keeping the role changes the permission model and the zone assignment logic — a Fleet Supervisor owns zones, which means zones need owners. Dropping it makes the [[users|user model]] three people rather than four.
:::

## The earlier table says more than this

The permission table on [[users|Users and permissions]] gives the Fleet Supervisor a wider remit: Fleet Monitor across their assigned zones **with reassignment control**, managing robots within their zone including marking for maintenance, and view-only access to Maps and Workflows. That is more than issue handling, and more data than the current understanding describes.

:::gap
The two descriptions have not been reconciled. Either the earlier table is now too generous, or the role is broader than the current understanding suggests. Both are recorded here rather than one being chosen.
:::
