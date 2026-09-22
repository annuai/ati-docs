---
id: d-workflow-over-mission
slug: workflow-over-mission
kind: decision
order: 2
title: 'Say "Workflow", not "Mission"'
summary: 'Mission and Workflow name the same thing. Ati Flow currently calls it Workflow — worth revisiting later.'
aliases: ['terminology', 'naming', 'mission']
status: current
category: 'Terminology'
author: Annuai
added: '2026-09-18'
sources:
  - 'Ati team — terminology directive, supplied in conversation, September 2026'
revisions:
  - date: '2026-09-22'
    author: Annuai
    note: 'Added the substantive reason behind the call: Mission reads as point-to-point, while Workflow can cover a longer sequence with steps in between. Tightened "mention Mission once" to make clear it should not otherwise appear as product terminology, and audited the rest of this documentation to match.'
context: |
  **Mission** is the standard word used across the robotics and AMR industry for a composed
  sequence of robot actions that gets a job done. Ati Flow is an orchestration product, and its
  Workflows surface uses **Workflow** for that same idea.
decision: |
  Use **Workflow** as the product-facing term. Mission and Workflow are the same concept, with no
  meaning difference — this is not a distinction to preserve in new content.
why: |
  Ati Flow is orchestration software, and "Workflow" fits that framing better than the more
  industry/robotics-flavoured "Mission". It is also a better fit for what the product actually
  does: "Mission" reads as point-to-point — one robot, one job, A to B and back — while a Workflow
  can be a longer sequence with several steps in between, not just a single there-and-back trip.
  This is a current call, not a permanent one: it may be worth revisiting as the product and its
  terminology mature.
alternatives:
  - 'Use **Mission** throughout, matching general industry usage — rejected for now since it reads as less native to an orchestration product, and reads as more point-to-point than what a Workflow can actually cover.'
  - 'Use both interchangeably — rejected: this is exactly the kind of split naming that has caused confusion elsewhere in this documentation (see [[d-robot-over-amr]], [[d-processing-area-terminology]]).'
related: ['workflow', 'missions-and-actions', 'v-mission', 'd-robot-over-amr']
---

:::callout title="How to apply it"
Write *Workflow* everywhere in this documentation — including cases that would read naturally as "mission" elsewhere. Mention *Mission* only to name it once as the industry-standard term, and link to [[v-mission]] or [[missions-and-actions]].
:::

This may need revisiting: if Ati Flow’s positioning shifts, or if "Mission" turns out to communicate better to a new audience, this call should be reopened rather than treated as settled forever.

:::gap title="Re-confirmed, not yet final"
This call is being re-confirmed rather than reopened: an audit on 2026-09-22 replaced remaining product-facing uses of "Mission" across this documentation with "Workflow", on the same terms as this decision. Treat the outcome as current working practice, still open to revisiting.
:::
