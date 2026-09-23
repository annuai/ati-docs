---
id: v-dispatch
term: Dispatch
kind: term
simple: Sending a robot to do a job. Also the name of the physical button an operator presses to release a robot waiting at a station.
technical: 'Referred to as "normal dispatch" — the flow a robot is removed from when placed in maintenance — and "manual dispatch", which the role model treats as operational rather than configuration work. Separately, a **dispatch button** is a physical button on the robot: pressing it releases a robot that is waiting at a station configured to require it. See the station-level behaviour below.'
usedIn:
  - The glossary definition of Maintenance
  - The Configurator role description
  - Station configuration in Deployment Manager
note: No Dispatcher role or component is documented anywhere in this folder.
related:
  - wf-robot-dispatch
  - v-trip
  - fleet
  - v-task-allocation
  - map-annotation
  - v-deployment-manager
status: current
author: Annuai
added: '2026-09-16'
revisions:
  - date: '2026-09-22'
    author: Annuai
    note: Added the station-level dispatch mechanic — three fixed options, set once per station in Deployment Manager, not switchable per trip — from an internal DM/FM walkthrough. Changed status from draft to current now that this half of the term has a concrete, sourced definition.
sources:
  - old/ati-flow-glossary.html
  - old/amr-software-ia-roles.html
  - 'Ati support engineer — Deployment Manager/Fleet Manager walkthrough, transcript supplied in conversation, September 2026'
order: 87
---

## Dispatch as a station setting

Every station on a map is configured, once, with one of three dispatch behaviours — set in [[v-deployment-manager|Deployment Manager]], not chosen per trip:

| Setting | What happens at that station |
| --- | --- |
| Not required | The robot doesn't stop — it passes through without pausing. |
| Optional | The robot waits up to a configured timeout (e.g. five minutes) for someone to press the dispatch button; if nobody does, it carries on by itself. |
| Required (default) | The robot waits indefinitely until the dispatch button is pressed. |

:::gap title="Fixed per station, not per trip"
This setting belongs to the station on the map, not to the robot or the trip booked in [[v-fleet-manager|Fleet Manager]]. Two robots visiting the same station cannot be given different dispatch behaviour — if one robot needs to stop there and another needs to pass straight through, the only way to do that today is to route the second robot around the station entirely, or to add a second station nearby with the other setting. Whether this is intended to change is not documented.
:::
