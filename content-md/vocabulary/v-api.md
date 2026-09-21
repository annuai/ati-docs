---
id: v-api
term: API
expansion: Application Programming Interface
kind: acronym
simple: A defined way for one piece of software to communicate with another.
technical: 'A documented interface that specifies how software systems can request data, send commands, or exchange information. Ati-FM exposes one: a REST API, authenticated with a bearer API key issued at registration, that lets a customer''s own manufacturing automation system book, schedule and cancel a robot trip and get its status, without going through the FM dashboard UI.'
usedIn:
  - Integrations
  - ERP/WMS/MES connectivity
  - Software architecture
related:
  - v-webhook
  - v-event
  - v-message
  - v-vda-5050
  - v-sanjaya
status: current
author: Annuai
added: '2026-09-17'
revisions:
  - date: '2026-09-21'
    author: Annuai
    note: Added the Ati-FM Partner API — REST, bearer-token auth, trip booking/scheduling/cancellation — from its own integration guide. Previously this entry had no Ati-specific content at all.
sources:
  - Ati team — noted September 2026
  - 'FM_Dashboard_Partner_API_Documentation_V1.pdf, supplied September 2026'
order: 118
---

## Ati-FM's own API

A REST API, documented for partners integrating a manufacturing automation system (MAS) with Ati-FM. A registered client authenticates with a bearer API key, then can:

- **Book a trip** — a route (list of stations), and optionally which [[v-sherpa|Sherpa]] type should run it and what task (e.g. lift/unlift) it should do at each stop
- **Schedule a trip** — a repeating or non-stop milk run, on a start/end time and a repeat interval
- **Cancel a trip** — booked, ongoing, or (as a fallback) forced off a disconnected Sherpa

Trips booked through the API appear on the ordinary FM dashboard alongside ones booked by an operator — it is another way in, not a separate system.

:::gap
Whether this is the same API [[v-vda-5050|VDA 5050]] compliance relies on, or a separate integration surface, is not documented.
:::
