---
id: v-solutions-architect
term: Solutions Architect
expansion: also called the Configurator; typically a System Integrator
kind: term
simple: The person who sets everything up — building the maps and doing whatever else it takes to get a fleet running in a warehouse that has never had one. In practice, this is usually someone at a third-party System Integrator delivering the deployment, not an Ati employee.
technical: Full edit on Maps and Workflows, full setup on Robots including low-level parameters, full configuration on Integrations and Setup & Config, and the only role with Debug access. View-only on Fleet Monitor, for verifying configuration rather than daily operations.
usedIn:
  - The role and permission model
note: 'Three names in play for the same person and relationship: **Solutions Architect** and **Configurator** describe what they do in the product (the wording between the two is not finalised); **[[v-system-integrator|System Integrator]]** describes who they typically work for — a third-party company delivering deployment services to the end client, rather than an Ati employee. Neither is the name of a screen. See [[users]].'
related:
  - users
  - v-system-integrator
  - configuration-layers
  - wf-deployment
  - v-deployment-manager
  - v-debug
status: current
author: Annuai
added: '2026-09-16'
revisions:
  - date: '2026-09-18'
    author: Annuai
    note: 'Added that System Integrator names the same person and relationship from a different angle: who they typically work for (a third-party deployment partner), rather than what they do in the product. Resolves the earlier open question of how System Integrator relates to the four-user model.'
sources:
  - old/amr-software-ia-roles.html
  - Ati team — terminology directive, supplied in conversation, September 2026
order: 143
---

## What setting up involves

Everything needed to take a site from having no fleet to running one: building and annotating the [[map]], designing [[missions-and-actions|workflows]], configuring [[robot|robots]] down to their low-level parameters, wiring up [[integrations]], and site configuration. He is also the only user with [[ui-debug|Debug]] access.

:::gap
How this user relates to [[v-deployment-manager|Deployment Manager]] — the tool Ati support engineers use to configure and deploy robots — is not established, although the two describe closely related work.
:::
