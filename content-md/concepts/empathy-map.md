---
id: empathy-map
title: Empathy Map
summary: A Says / Thinks / Does / Feels map for each of Ati Flow's four users — drafted from what the documentation already establishes, not from interviews. Everything beyond a sourced fact is a labelled guess, to be corrected once real research comes in.
simple: 'An empathy map is four boxes per user — what they say, what they actually think, what they do, and how they feel — used to build a rounder picture of someone than a permission table gives you. This page has one map per Ati Flow user. Where a box is filled from something already documented, it says so; everywhere else it is a first-pass guess, clearly marked, waiting to be replaced by a real interview.'
aliases:
  - empathy map
  - empathy mapping
  - user empathy
  - says thinks does feels
status: draft
author: Annuai
added: '2026-09-21'
revisions:
  - date: '2026-09-21'
    author: Annuai
    note: Created as a first-pass draft, one map per confirmed Ati Flow user, filled from the documented permission model and task list plus reasonable inferred guesses where no source exists. Every inferred statement is marked as a guess. Fleet Supervisor is included but flagged, since the role itself is unconfirmed. Nothing here should be treated as a finding until checked against a real interview.
sources:
  - content-md/atiFlow/users.md
  - Annuai — drafted from the documented user model, in the absence of interview data, September 2026
related:
  - users
  - jtbd-framework
  - v-operator
  - v-fleet-supervisor
  - v-head-of-operations
  - v-solutions-architect
  - open-questions
order: 20
---

## Why this page exists, and why most of it is a guess

A permission matrix says what a role is *allowed* to do. It says nothing about what that person is frustrated by, worried about, or trying to look good in front of. An empathy map is the second thing — four quadrants per user:

:::defs
items:
  - term: 'Says'
    text: What the person would actually say out loud, in their own words — a quote, or something close to one.
  - term: 'Thinks'
    text: What runs through their head that they might not say directly — worries, private doubts, unspoken priorities.
  - term: 'Does'
    text: Observable behaviour and action — what they actually do, day to day.
  - term: 'Feels'
    text: The underlying emotional state — frustration, pride, anxiety, relief.
:::

:::gap title="No interviews have happened yet"
Everything below is a first pass, not a finding. Statements taken from [[users|the documented user model]] (scope, permissions, tasks) are grounded in a source and marked **sourced**. Everything else is a plausible guess written to give the map a shape worth reacting to, marked **guess**, and should be treated as a question to validate rather than a fact about a real person. Replace guesses with real quotes as Support, CS and direct user interviews happen — the same discipline [[jtbd-framework|the JTBD framework]] uses.
:::

## Operator — floor level, single zone

:::cards
items:
  - title: Says
    text: '"Guess: Is my zone okay right now?" / "Guess: Why is this robot just sitting there?" (Sourced: raises a manual priority request when something needs to jump the queue, and sees the trade-off before confirming it.)'
  - title: Thinks
    text: 'Guess: worries about being blamed for a slowdown that is not their fault. Guess: wants to be sure a priority override will not cause a bigger problem two zones over that they cannot see.'
  - title: Does
    text: 'Sourced: watches Fleet Monitor for their own zone — robot status and task queue. Sourced: views Robots in their zone (view-only). Sourced: raises manual priority requests. Guess: checks the queue frequently in short bursts rather than one long look.'
  - title: Feels
    text: 'Guess: focused but exposed — accountable for what happens in the zone, with visibility into that zone only, and no view of whether a decision they made is rippling elsewhere.'
:::

## Fleet Supervisor — zone-level oversight

:::gap title="This role's very existence is unconfirmed"
[[v-fleet-supervisor|The role itself is still an open question]] — the case against it is that Operators already do this job. The map below assumes the role exists as currently described. If it is dropped, this map goes with it.
:::

:::cards
items:
  - title: Says
    text: '"Guess: Which zones need me right now?" / "Guess: I don''t need to see everything, just what''s broken." (Sourced: closest comparison given in the documentation is a support engineer who works the floor rather than remotely.)'
  - title: Thinks
    text: 'Guess: unsure whether this job is actually distinct from what Operators already handle — possibly the same doubt the documentation itself records. Guess: wants clear ownership boundaries between their assigned zones and everyone else''s.'
  - title: Does
    text: 'Sourced: manages robots that have run into trouble, within their assigned zones — and nothing beyond that scope by design (they are not given the data to manage more). Guess: moves between zones reactively, triggered by an alert rather than a fixed round.'
  - title: Feels
    text: 'Guess: narrow and reactive, per the documented scope — likely to feel useful only in the moment something breaks, and otherwise idle by design.'
:::

## Supervisor (Head of Operations) — across the site

:::cards
items:
  - title: Says
    text: '"Guess: Show me the whole site, not one zone." / "Guess: Who approved this workflow change?" (Sourced: is the escalation point above Fleet Supervisors, and manages users and roles.)'
  - title: Thinks
    text: 'Guess: weighs whether to trust a Configurator''s setup versus needing to see it approved. Guess: concerned with accountability across zones rather than any one robot.'
  - title: Does
    text: 'Sourced: Fleet Monitor across all zones. Sourced: manages robots site-wide. Sourced: views and approves Workflows and Maps. Sourced: views Integrations status. Sourced: manages users and roles.'
  - title: Feels
    text: 'Guess: responsible for outcomes they do not directly execute — approving and escalating rather than doing, which can feel like carrying risk without full control.'
:::

## Solutions Architect (Configurator) — sets everything up

:::cards
items:
  - title: Says
    text: '"Guess: Is this configuration actually correct before I hand it over?" / "Guess: I need Debug to prove this works, not just trust it." (Sourced: the only role with Debug access, used to verify a configuration behaves correctly rather than for daily operations.)'
  - title: Thinks
    text: 'Guess: pressure to get a brand-new site from zero to running correctly, since nobody downstream will catch a bad setup before it causes an operational problem. Guess: as often a third-party [[v-system-integrator|System Integrator]] rather than an Ati employee, may feel answerable to a client rather than to Ati.'
  - title: Does
    text: 'Sourced: builds and annotates the map. Sourced: designs workflows. Sourced: configures robots down to low-level parameters. Sourced: wires up integrations and site configuration. Sourced: uses Debug to verify configuration.'
  - title: Feels
    text: 'Guess: methodical and high-stakes — one setup mistake here is inherited by every other user of the site afterwards, which is a different kind of pressure than the day-to-day operational roles carry.'
:::

## How to use this until real research exists

1. Every **guess** above is a placeholder, not a claim about a real person — treat it as a question for the next Support, CS or direct user interview, not as something to cite elsewhere in the docs.
2. When a real interview happens, replace the relevant guess with the person's own words, move the statement from *guess* to *sourced*, and cite the interview in `sources` and `revisions` here — the same provenance discipline as the rest of this docs set.
3. If the Fleet Supervisor role is dropped or redefined, this page's Fleet Supervisor section needs to be revised or removed alongside [[users]] and [[v-fleet-supervisor]].

:::callout title="Related framework"
[[jtbd-framework|The Jobs-to-be-Done framework]] covers the same four users from a different angle — the job they're trying to get done, rather than how they feel while doing it. Read together, not as duplicates.
:::
