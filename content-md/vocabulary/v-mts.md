---
id: v-mts
term: MTS
expansion: Material Tracking System
kind: acronym
simple: The system used to track material and containers as they move through a site.
technical: A web application with two modules — Order Request, for creating and tracking a request to move a material or a container between a pickup and a drop station, and Manage Staging Area, for setting the status of each staging cell. How it relates to [[v-master-data|Master Data]] and [[material-flow|material flow]] beyond the SKUs it lets a user order is not detailed.
usedIn:
  - Material tracking
  - Warehouse operators, material handlers, production supervisors and logistics coordinators, per its own user guide
related:
  - v-master-data
  - material-flow
  - v-material-station-mapping
  - v-staging-area
  - v-sku
status: current
author: Annuai
added: '2026-09-18'
revisions:
  - date: '2026-09-21'
    author: Annuai
    note: Replaced the gap with what MTS actually does, from its user guide — the Order Request and Manage Staging Area modules, and the staging-cell state model.
sources:
  - Ati team — org structure and internal tooling, supplied in conversation, September 2026
  - 'drive-download-20260921T111852Z-1-001/MTS_User_Guide_1.0.pdf, supplied September 2026'
order: 19
---

## What it does

Two modules:

- **Order Request** — create a request to move a [[v-sku|SKU]] (a material, with a quantity) or a container between a pickup and drop [[v-station|station]], optionally taking back an empty container from a previous order at the same time. Each request becomes a [[trip|trip]] with its own booking time, start time, ETA and end time.
- **Manage Staging Area** — set the status of each cell in a [[v-staging-area|staging area]]: **Blocked** (unavailable — no requests can be sent to it), **Reserved** (assigned to an ongoing request, unavailable until that trip finishes), or **Active** (available, and either **Empty** or **Filled** with a container, or with a SKU and quantity).

:::gap
The guide's own title page calls this "Material Tracking System"; its introduction and definitions call it "Material Transport System." Which is correct has not been confirmed.
:::

:::gap
How MTS relates to [[v-master-data|Master Data]] and [[material-flow|material flow]] beyond the SKUs it lets a user order is not detailed.
:::
