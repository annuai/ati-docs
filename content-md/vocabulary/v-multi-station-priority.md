---
id: v-multi-station-priority
term: Multi-station priority
kind: term
simple: An ordered list of stations the system tries one after another for the same material.
technical: The v3 PRD changes material-to-staging mapping from one station to a priority-ordered list. For a drop, the system tries the first station with a free cell; for a pickup, the first station with an occupied cell. It falls through when a station is full or empty respectively.
usedIn:
  - AtiFLOW v3.0 — Multiple Station Mapping with Priority
related:
  - v-station
  - v-staging-area
  - v-fill-sequence
  - v-retrieval-order
  - workflow
status: current
author: Annuai
added: '2026-09-17'
sources:
  - PRD_AtiFLOW_v3.0.docx
order: 34
---


