---
id: processing-zone
title: Processing Area
summary: A segregated, local subset of Plant Master Data, grouped for material configuration, station mapping and workflow creation.
simple: A Processing Area takes the full list of materials in a plant and cuts it down to the ones relevant to one operation, so the person configuring stations and workflows works against a small local list instead of the whole plant’s data.
aliases:
  - Processing Zone
  - Process Area
  - Process Zone
  - zone selector
status: current
author: Annuai
added: '2026-09-16'
revisions:
  - date: '2026-09-17'
    author: Annuai
    note: Separated the prototype-only Processing Zone label from the PRD-defined Processing Area and Station / Staging Area terms.
  - date: '2026-09-18'
    author: Annuai
    note: 'Resolved: Processing Zone, Process Area and Process Zone are the same entity as Processing Area, confirmed by Suryajit (Product Manager) in the Ati Flow system-understanding meeting. Rewrote this page around what a Processing Area actually does — segregating a local material list out of Plant Master Data — instead of leaving it as an open naming gap. See [[d-processing-area-terminology]].'
  - date: '2026-09-18'
    author: Annuai
    note: 'Resolved the physical/geographic gap: a Processing Area is confirmed to not be inherently physical — it can span multiple physical locations, and one physical location can hold multiple Processing Areas. Sharpened the prefix-filtering gap: excluding one item from an otherwise-matching prefix group needs Excel-like filtering, which is not supported today.'
sources:
  - old/ati-flow-glossary.html
  - old/prototype/
  - old/ati-flow-faq.html
  - AtiFLOW v2.0.docx
  - PRD_AtiFLOW_v3.0.docx
  - Suryajit (Product Manager) — Ati Flow system-understanding meeting, 18 September 2026
  - Internal design/architecture review meeting, transcript supplied in conversation, September 2026
related:
  - zone
  - material-flow
  - open-questions
  - v-processing-area
  - v-station
  - v-staging-area
  - d-processing-area-terminology
  - v-material-station-mapping
order: 4
---

:::callout title="Resolved — one name now"
Processing Area, Processing Zone, Process Area and Process Zone all refer to the same entity. **Processing Area** is the standard term going forward. See [[d-processing-area-terminology]] for the decision.
:::

## What a Processing Area actually does

Although the name suggests a physical area within the plant, its system function is largely about segregating information, not geography. A Processing Area:

- Segregates relevant materials out of the full Plant Master Data
- Creates a smaller, local material list from that subset
- Makes those materials available for station mapping and workflow creation
- Prevents users from having to work against irrelevant plant-wide data

:::chain
caption: A Processing Area may correspond to an operational or manufacturing section of the floor, but its software function is primarily material grouping, not a geographical boundary.
steps:
  - title: Plant Master Data
    note: Every material/item in the plant, from SAP or another plant system
  - title: Processing Area
    note: Segregates the relevant subset
  - title: Local material list
    note: What this operation actually works with
:::

:::callout title="Resolved — not inherently physical"
A Processing Area is confirmed to not be inherently a physical or geographic zone. It can span multiple physical locations, and a single physical location can contain multiple Processing Areas. It is purely a categorisation convenience on top of Master Data.
:::

## Where it sits in the wider configuration flow

The full flow, as it exists today, runs from master data to execution:

:::chain
caption: The underlying business logic here is being retained; the existing UI interaction for it is not being replicated one-for-one.
steps:
  - title: Master Data
    note: Plant/SAP source of materials
  - title: Processing Area
    note: Local material list
  - title: Station mapping
    note: Which stations carry which materials
  - title: Workflow
    note: What should move, from where, to where
  - title: Execution
    note: Material movement / Fleet Manager
:::

## How the local material list gets built

Today, materials are pulled from Master Data into a Processing Area using prefixes — a prefix can match a single material, several related materials, or a whole material group. This is criticised as clunky, particularly for excluding one item from an otherwise-matching group. A redesigned configuration experience does not need to expose that prefix logic directly to a user; simpler interactions such as search, filter, multi-select, grouping, and including or excluding individual materials from a group can sit on top of the same underlying grouping capability.

:::gap
Excluding a single item from an otherwise-matching prefix group is not currently supported — it would need Excel-like filtering, which the system does not have today.
:::
