---
id: v-bom
term: BOM
expansion: Bill of Materials
kind: acronym
simple: The list of every part needed to build one thing, with how many of each.
technical: 'A structured parts list for an assembly: components, quantities, part numbers and the sub-assemblies they roll up into. On the hardware side it is what a robot is built from; in a plant it is also what a machine consumes to produce one unit of output.'
usedIn:
  - AtiFLOW v3.0 — the Structured [[v-requester-mode|requester mode]] flow, Machine → Station → Workflow → BOM
note: The acronym carries two meanings in Ati material and they are not the same list. In the v3 PRD, BOM is a material-demand input to a request — what a machine needs delivered. In hardware engineering, a BOM is the build list for a product. Which of the two the Structured requester flow resolves against, and whether it comes from an [[v-erp|ERP]], is not documented.
aliases:
  - bill of materials
  - parts list
related:
  - engineering-documents
  - v-requester-mode
  - v-sku
  - material-flow
  - v-prd
  - v-dfmea
status: needs-confirmation
author: Annuai
added: '2026-09-17'
sources:
  - PRD_AtiFLOW_v3.0.docx
  - Ati team — noted September 2026
order: 148
---


