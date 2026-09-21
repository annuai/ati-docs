---
id: d-robot-over-amr
slug: robot-over-amr
kind: decision
order: 1
title: 'Say "Robot", not "AMR"'
summary: 'The product-facing term for one machine is Robot. AMR stays a technical term.'
aliases: ['terminology', 'naming']
status: current
category: 'Terminology'
author: Annuai
added: '2026-09-16'
sources:
  - old/ati-flow-glossary.html
  - old/amr-software-ia-roles.html
context: |
  Engineering, deployment and industry conversations all use **AMR** — autonomous mobile robot.
  The people using the product day to day are operators and supervisors, not roboticists.
decision: 'Use **Robot** as the product-facing term for an individual AMR. Keep AMR for technical contexts.'
why: |
  It is the plainer word, and it does not require the reader to know an acronym before they can
  read a screen. The glossary records Robot as the preferred product-facing term in the current
  information architecture.
alternatives:
  - 'Use **AMR** throughout — matches engineering and vendor language, but pushes an acronym onto the floor.'
  - 'Use a hardware model name such as **Sherpa** — not used in the product interface anywhere in the sources.'
related: ['robot', 'v-amr', 'v-robot']
---

:::callout title="How to apply it"
Write *Robot* in interface labels and documentation headings. Mention *AMR* once, where the technical term is genuinely useful, and link to [[v-amr]].
:::

The prototype is not fully consistent with this: its navigation still contains **AMR Trips**.
