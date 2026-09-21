---
id: v-staging-area
term: Staging area
kind: term
simple: A station used to hold material between production and consumption. Older material also uses this phrase for a place where idle robots wait.
technical: The v3 PRD calls Station the canonical entity and treats a staging area as a Station in the material-flow model. It can contain a grid of material cells and be chosen by priority for pickup or drop-off. Earlier deployment material uses “staging positions” for idle robots, so the two meanings must not be silently merged.
usedIn:
  - 'Material flow: Production Unit → Staging Area (Station) → Consumption Unit'
  - Deployment Manager fill and empty configuration
  - The prototype navigation item "Staging Area"
note: This term has two source-backed meanings. Confirm whether idle-robot staging should be renamed `idle position` or `parking position` in product language.
related:
  - v-station
  - v-processing-area
  - v-multi-station-priority
  - v-fill-sequence
  - v-retrieval-order
  - wf-charging
  - fleet
  - v-wip
  - v-idle
status: needs-confirmation
author: Annuai
added: '2026-09-16'
revisions:
  - date: '2026-09-17'
    author: Annuai
    note: Recorded the v3 material-holding meaning alongside the older idle-robot meaning, rather than presenting them as one concept.
sources:
  - old/amr-deployment-workflow.html
  - old/prototype/
  - AtiFLOW v2.0.docx
  - PRD_AtiFLOW_v3.0.docx
order: 21
---


