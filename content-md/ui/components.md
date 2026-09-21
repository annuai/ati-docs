---
id: ui-components
slug: components
kind: reference
title: Components
summary: The interface pieces the Ati Flow prototype is built from, and what each one is for.
simple: A short catalogue of the repeated parts of the product interface — the sidebar, the status pill, the battery bar — and what each one tells you.
aliases:
  - UI components
  - patterns library
status: draft
author: Annuai
added: '2026-09-16'
sources:
  - old/prototype/
  - old/prototype/styles.css
related:
  - ui-fleet-monitor
  - ui-states
  - ui-patterns
  - d-documentation-mirrors-the-product
order: 9
---

:::callout title="Scope"
Everything here is read from the working prototype in `old/prototype/`. It records what exists, not a specification of what should exist.
:::

## Navigation and shell

:::defs
items:
  - term: Sidebar
    text: A fixed 256px column holding the logo, a mode selector, a zone selector, grouped primary navigation and a bottom group for Notifications, Settings and Profile. Collapses to a 64px icon rail below 820px.
  - term: Mode selector
    text: A large teal gradient button reading **Supervisor Mode**. What it switches is not documented — see [[v-supervisor-mode]].
  - term: Zone selector
    text: A pill-shaped control labelled **Processing Zone**, showing *Zone 24*. See [[processing-zone]].
  - term: Top bar
    text: Back and forward buttons plus a global search field placeholdered *Search Ati Flow*.
  - term: Content head
    text: Page title on the left, contextual controls on the right — a material search field and a **Show Layers** toggle.
:::

## Operational components

:::defs
items:
  - term: Status pill
    text: A rounded label with a leading dot showing a [[robot-states|robot state]]. Teal for Moving, red for Blocked.
  - term: Battery bar
    text: A 6px track with a teal fill, paired with a percentage. Shown inside the Robot Details section.
  - term: Key/value row
    text: 'The basic unit of the detail panel: a muted label on the left, an emphasised value on the right.'
  - term: Activity timeline
    text: A dotted list of recent events with timestamps. An amber dot marks an event that needs attention.
  - term: Map legend
    text: 'A floating panel naming what the colours on the map mean: active path, moving, blocked, station.'
  - term: Map tools
    text: Reset view, zoom in and zoom out, floating bottom-right over the map.
  - term: Detail panel
    text: A 340px scrolling card beside the map, holding everything known about the selected robot. Hidden entirely below 820px.
  - term: Primary action
    text: A full-width teal button at the foot of the detail panel, toggling between Pause and Resume.
:::

## Visual language

The prototype uses white surfaces, fine grey borders, generously rounded cards (14–20px), teal for navigation and positive states, red for blocked and yellow for robots in motion. The documentation system reuses the same palette and surface treatment. See [[d-documentation-mirrors-the-product]].

:::gap
There is no component library, no named design tokens beyond the CSS variables in the prototype stylesheet, and no documented component states beyond those listed above.
:::
