---
id: d-documentation-mirrors-the-product
slug: documentation-mirrors-the-product
kind: decision
order: 9
title: 'Documentation mirrors the product’s visual language'
summary: 'The documentation reuses Ati Flow’s hierarchy rather than introducing a second brand language.'
status: current
category: 'UX decision'
author: Annuai
added: '2026-09-16'
sources:
  - old/ati-flow-screens.html
context: |
  Internal documentation often ends up looking nothing like the product it describes, which
  makes moving between the two feel like moving between two companies.
decision: |
  Mirror the product’s visual hierarchy: white surfaces, fine grey borders, rounded cards, teal
  navigation accents, and green/red operational states.
why: |
  The documentation is about the product, so it should feel continuous with it. Introducing a
  separate brand language would add a second thing to learn.
alternatives:
  - 'Not recorded in the source material.'
related: ['ui-components', 'ui-patterns']
---

This documentation system follows the same rule. The teal, the surface and border treatment and the monospace metadata style all come from the existing Ati work. The operational chrome — live maps, status dashboards — is deliberately left out, because this is documentation, not an operations product.

- Logo: the supplied `Ati-Docs-Logo.svg`, used as-is
- Accent: the teal from the logo and the existing documentation stylesheet
- Type: Inter for reading, IBM Plex Mono for metadata and eyebrows
