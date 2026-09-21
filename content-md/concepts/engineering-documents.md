---
id: engineering-documents
title: Engineering documents
summary: The documents a product is specified, built and risk-checked against — PRD, FRD, BOM and DFMEA.
simple: 'Before a thing gets built, four questions get written down: what it should do, how it must behave, what it is made of, and how it could fail. Each question has its own document.'
aliases:
  - PRD
  - FRD
  - BOM
  - DFMEA
  - requirements documents
  - product documentation
status: needs-confirmation
author: Annuai
added: '2026-09-17'
sources:
  - AtiFLOW v2.0.docx
  - PRD_AtiFLOW_v3.0.docx
  - Ati team — noted September 2026
related:
  - v-prd
  - v-frd
  - v-bom
  - v-dfmea
  - ati-robotics
  - robot
  - d-documentation-mirrors-the-product
order: 17
---

## Why it matters

Ati is an [[v-oem|OEM]]: it builds both the robots and the software that runs them. That means two engineering traditions meet in the same company. The software side specifies in [[v-prd|PRDs]] and [[v-frd|FRDs]]; the hardware side builds against a [[v-bom|BOM]] and risk-checks the design with a [[v-dfmea|DFMEA]]. A new joiner is likely to be handed one of these and expected to know which question it answers.

This system is not a replacement for any of them. A PRD is a decision record written before the work; this documentation describes what exists afterwards. Where the two disagree, the PRD is the source and this page is the thing that needs correcting.

## The four documents

| Document | The question it answers | Written | Side |
| --- | --- | --- | --- |
| [[v-prd\|PRD]] — Product Requirements Document | What should this product do, and why? | Before design | Software and hardware |
| [[v-frd\|FRD]] — Functional Requirements Document | How must the system behave, function by function? | After the PRD, before build | Software |
| [[v-bom\|BOM]] — Bill of Materials | What is it made of, and how many of each? | During and after design | Hardware |
| [[v-dfmea\|DFMEA]] — Design Failure Mode and Effects Analysis | How could this design fail, and what are we doing about it? | During design, revisited as it changes | Hardware |

They are not a sequence so much as four views of the same product. A PRD that no BOM can be costed from is incomplete; a DFMEA finding routinely sends a requirement back to the PRD.

## What is established here

Two Ati PRDs are cited throughout this documentation — **AtiFLOW v2.0** and **PRD_AtiFLOW_v3.0**. They are the only Ati engineering documents this system has been traced to. Where they conflict, both readings are recorded and the conflict is listed in [[open-questions]] rather than resolved — see [[processing-zone]] and [[v-staging-area|staging area]] for two live examples.

:::callout title="A BOM here is not always a parts list"
The v3 PRD uses **BOM** inside the Structured [[v-requester-mode|requester mode]] flow — Machine → Station → Workflow → BOM — where it means the material a machine needs delivered, not the parts a robot is assembled from. Same acronym, two lists. See [[v-bom]].
:::

## What is not

:::gap
No FRD, BOM or DFMEA is present in this repository, and no source here records Ati’s own practice: whether functional detail is written separately from the PRDs or folded into them, who owns the hardware BOM, whether DFMEAs are run on the robot line, and where any of these documents live. The four definitions above are the general industry ones. Ati’s use of them is unconfirmed.
:::

Until that is written down, treat this page as a map of the vocabulary rather than a description of how Ati works.
