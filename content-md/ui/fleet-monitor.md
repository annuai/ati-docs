---
id: ui-fleet-monitor
slug: fleet-monitor
kind: screen
title: Fleet Monitor
summary: The live, zone-based view of robots, tasks and traffic — a facility map beside a robot detail panel.
simple: 'The screen you watch to know whether the fleet is behaving: a map of the floor with the robots on it, and everything known about whichever robot you select.'
aliases:
  - monitor
  - live view
  - Live Fleet Status
  - Live Status
  - fleet status
  - live map
status: current
author: Annuai
added: '2026-09-16'
revisions:
  - date: '2026-09-18'
    author: Annuai
    note: Merged the separate "Live Fleet Status" screen page into this one. The two were the same screen under two names — the documented information architecture calls it Fleet Monitor, the current prototype UI labels and navigates to it as Live Fleet Status / Live Status. Fleet Monitor is the standard, documented name going forward; nothing from either page was removed.
sources:
  - old/amr-software-ia-roles.html
  - old/ati-flow-screens.html
  - old/ati-flow-glossary.html
  - old/prototype/
  - old/prototype/styles.css
purpose: Show the current state of the fleet in a zone — what is happening now — and let a person understand one robot in detail without leaving the view.
users:
  - '**Operator** — their own zone'
  - '**Fleet Supervisor** — their own zone or zones, with reassignment control'
  - '**Head of Operations** — all zones'
  - '**Configurator** — view only, to verify that a configuration behaves correctly'
see:
  - A facility map with robots, routes and stations drawn on it
  - A chip over the map reading *3D LIVE MAP · Zone 24 · N robots online*
  - 'A legend: active path, moving, blocked, station'
  - A selection readout naming the currently selected robot
  - 'A detail panel for that robot: status pill, robot image, identifier, battery percentage and bar, current state'
  - '**Trip Details** — trip ID and next station'
  - '**Recent Activity** — a short timeline of events with timestamps'
  - Robot status and the trip queue for the zones the role can access
do:
  - Select a robot by clicking it on the map
  - Search for material from the content header
  - Toggle **Show Layers** over the map
  - Zoom and reset the map view
  - Pause — and then resume — using the action at the foot of the detail panel
  - Close the detail panel
  - An Operator can raise a manual priority request, with the trade-off shown before confirming
  - A Fleet Supervisor can reassign work within their zones
states:
  - '**Moving** — the robot is executing a trip. Yellow on the map, teal status pill.'
  - '**Blocked** — the robot has stopped. Red status pill, and a pulsing red halo around the robot on the map.'
  - '**Paused / running** — the detail panel action toggles between Pause and Resume.'
  - '**Nothing selected** — the detail panel can be closed; on narrow screens it is hidden entirely.'
related:
  - robot-states
  - trip
  - ui-components
  - zone
  - fleet
  - users
order: 1
---

## Reading the identifiers

Two identifier shapes appear on this screen:

```
Trip       TRP-20487
Station    S102
```

:::callout title="Currently labelled \"Live Fleet Status\" in the prototype"
The prototype reaches this screen from navigation labelled **Live Status**, and its sidebar shows a **Supervisor Mode** selector and a **Processing Area** set to *Zone 24* (see [[processing-zone|Processing Area]]). Fleet Monitor is the name used going forward — treat Live Fleet Status and Live Status as the same screen under an earlier label, not a separate one.
:::

:::gap
The prototype is the only record of this screen’s layout and interaction detail. There is no specification, no annotated design and no screenshot in this folder — the working prototype source is the reference. It is kept in `old/prototype/`.
:::
