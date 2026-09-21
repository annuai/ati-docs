---
id: v-station
term: Station
kind: term
simple: A named place in the system where work happens — such as a pickup, drop-off or staging point.
technical: AtiFLOW v3.0 establishes Station as the canonical shared entity. A station can be selected by a requester, attached to a machine, mapped to a workflow and used as the staging area where material is held. The prototype also shows stations as map identifiers such as S100 to S105. Its relation to the older `position` term still needs confirmation.
usedIn:
  - AtiFLOW v3.0 — Machine → Station → Workflow
  - Map annotation
  - The prototype, as station identifiers S100 to S105 and a "Next Station" field
note: Station is now a defined product entity in the v3 PRD. Its exact relationship to `position` and the idle-robot meaning of `staging area` remains unresolved.
related:
  - v-position
  - map-annotation
  - trip
  - v-waypoint
  - v-staging-area
  - v-point-station
  - v-processing-area
  - v-requester-mode
  - v-machine
  - v-material-station-mapping
status: needs-confirmation
author: Annuai
added: '2026-09-16'
revisions:
  - date: '2026-09-17'
    author: Annuai
    note: Added the v3 PRD decision that Station is the canonical shared entity across requester, machine, workflow and material staging.
sources:
  - old/amr-deployment-workflow.html
  - old/prototype/
  - PRD_AtiFLOW_v3.0.docx
order: 47
---


