import { p, h, list, callout, gap, table } from './blocks.js';

const S = {
  glossary: 'old/ati-flow-glossary.html',
  ia: 'old/amr-software-ia-roles.html',
  screens: 'old/ati-flow-screens.html',
  architecture: 'old/ati-flow-architecture.html',
  overview: 'old/index.html',
  faq: 'old/ati-flow-faq.html'
};

const NOT_RECORDED = 'Not recorded in the source material.';

/*
  Entries with `kind: 'decision'` are rendered by the decision template:
  context / what was decided / why / alternatives considered.

  Where the sources state a position but not its reasoning or the options weighed against it,
  that field says so rather than reconstructing it.
*/

export const decisions = [
  {
    id: 'd-robot-over-amr',
    slug: 'robot-over-amr',
    kind: 'decision',
    title: 'Say "Robot", not "AMR"',
    summary: 'The product-facing term for one machine is Robot. AMR stays a technical term.',
    aliases: ['terminology', 'naming'],
    status: 'current',
    category: 'Terminology',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.glossary, S.ia],
    context:
      'Engineering, deployment and industry conversations all use **AMR** — autonomous mobile robot. The people using the product day to day are operators and supervisors, not roboticists.',
    decision: 'Use **Robot** as the product-facing term for an individual AMR. Keep AMR for technical contexts.',
    why: 'It is the plainer word, and it does not require the reader to know an acronym before they can read a screen. The glossary records Robot as the preferred product-facing term in the current information architecture.',
    alternatives: [
      'Use **AMR** throughout — matches engineering and vendor language, but pushes an acronym onto the floor.',
      'Use a hardware model name such as **Sherpa** — not used in the product interface anywhere in the sources.'
    ],
    blocks: [
      callout(
        'How to apply it',
        'Write *Robot* in interface labels and documentation headings. Mention *AMR* once, where the technical term is genuinely useful, and link to [[v-amr]].'
      ),
      p('The prototype is not fully consistent with this: its navigation still contains **AMR Trips**.')
    ],
    related: ['robot', 'v-amr', 'v-robot']
  },

  {
    id: 'd-keep-the-layers-clear',
    slug: 'keep-the-layers-clear',
    kind: 'decision',
    title: 'Keep operations, configuration and diagnostics separate',
    summary: 'Three different questions, three different places to answer them.',
    status: 'current',
    category: 'Product principle',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.overview, S.screens, S.architecture],
    context:
      'A fleet product can easily become one screen that shows everything: live robots, the map editor, mission logic and raw diagnostics side by side. Each of those serves a different question and a different person.',
    decision:
      'Organise the product around three layers — **operations** (what is happening now), **configuration** (what should happen) and **diagnostics** (why is the robot behaving this way) — and keep each on its own surfaces.',
    why: 'It keeps each surface answerable. An operator handling a blocked robot should not be reading mission logic, and a configurator verifying a route should not be triaging a queue.',
    alternatives: [NOT_RECORDED],
    blocks: [
      table(
        ['Layer', 'Question', 'Surfaces'],
        [
          ['Operations', 'What is happening now?', 'Fleet Monitor, Robots'],
          ['Configuration', 'What should happen?', 'Maps, Workflows, Setup & Config'],
          ['Diagnostics', 'Why is the robot behaving this way?', 'Debug']
        ]
      ),
      p('This principle also drives the fourth step of the documented dashboard reading order: *act at the right layer*. See [[ui-patterns]].')
    ],
    related: ['ati-flow', 'ui-patterns', 'configuration-layers', 'd-debug-is-configurator-only']
  },

  {
    id: 'd-expose-the-decision',
    slug: 'expose-the-decision',
    kind: 'decision',
    title: 'Expose the decision, not the internal state',
    summary: 'Show the user what they need in order to decide, rather than everything the robot knows.',
    status: 'current',
    category: 'UX decision',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.architecture, S.screens],
    context:
      'A robot produces a great deal of internal state — localization confidence, calibration values, sensor health, drive parameters. All of it is real, and almost none of it helps an operator decide what to do next.',
    decision:
      'Expose the operational decision a user needs rather than reproducing every internal robot state. Low-level diagnostics remain in [[ui-debug|Debug]].',
    why: 'Surfacing internal state as though it were operational information makes the operator responsible for interpreting it. The product should have already done that interpretation.',
    alternatives: [NOT_RECORDED],
    blocks: [
      p(
        'This is also the framework used to describe any screen: the user’s decision first, then the information needed to make it, then the available action. See [[ui-patterns]].'
      ),
      callout(
        'Where it shows up',
        'The live view reduces a robot to a state, a battery level, a trip and a next station. That is a decision-shaped summary, not a state dump.'
      )
    ],
    related: ['ui-patterns', 'robot-states', 'ui-debug', 'd-keep-the-layers-clear']
  },

  {
    id: 'd-role-based-visibility',
    slug: 'role-based-visibility',
    kind: 'decision',
    title: 'Hide surfaces by role, rather than disabling them',
    summary: 'What a role is not responsible for is removed from view entirely.',
    status: 'current',
    category: 'UX decision',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.ia],
    context:
      'Four roles use the same product with very different responsibilities, from a single-zone operator to a site-wide configurator.',
    decision:
      'Hide whole surfaces from roles that do not need them. The permission matrix uses **Hidden**, not *read-only* or *disabled*, for Maps, Workflows, Integrations, Setup and Debug at the Operator level.',
    why:
      'The source material frames this as attention rather than trust: each role card carries an explicit "not bothered with" list. An Operator is described as not seeing any configuration language at all — zones, missions and master data are invisible, not greyed out.',
    alternatives: [
      'Show everything read-only — keeps one mental model of the product, but exposes configuration vocabulary to people who never act on it.'
    ],
    blocks: [
      p('The full matrix is on [[roles-and-permissions]].'),
      gap('Whether "hidden" means removed from navigation, blocked at the route, or both, is not specified.')
    ],
    related: ['roles-and-permissions', 'ui-states', 'd-debug-is-configurator-only']
  },

  {
    id: 'd-debug-is-configurator-only',
    slug: 'debug-is-configurator-only',
    kind: 'decision',
    title: 'Debug belongs to the Configurator alone',
    summary: 'Raw robot state, calibration and overrides are visible to one role only.',
    status: 'current',
    category: 'UX decision',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.ia, S.faq, S.glossary],
    context:
      'Someone has to be able to see raw robot state, calibration values, overrides and diagnostic logs. The question is who.',
    decision:
      'Debug is **exclusive** to the Solutions Architect (Configurator). It is hidden from Operators, Fleet Supervisors and the Head of Operations.',
    why:
      'Low-level robot parameters — drive tuning, safety calibration — are explicitly called Configurator territory, and are on the "not bothered with" list even for the Head of Operations, who otherwise has site-wide authority.',
    alternatives: [NOT_RECORDED],
    blocks: [
      p(
        'This is the one place in the permission matrix where the site-wide operational role has *less* access than a configuration role — which is the point. Authority over operations and authority over the machine are different things.'
      )
    ],
    related: ['ui-debug', 'roles-and-permissions', 'd-expose-the-decision', 'v-debug']
  },

  {
    id: 'd-maps-and-workflows-are-separate',
    slug: 'maps-and-workflows-are-separate',
    kind: 'decision',
    title: 'Maps and Workflows are separate surfaces',
    summary: 'Where a robot can go and what a robot should do are configured in different places.',
    status: 'current',
    category: 'Product principle',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.faq, S.ia, S.architecture],
    context:
      'Both maps and workflows are configuration, both are edited by the same role, and both feed the same missions. A reasonable product could merge them.',
    decision: 'Keep them apart. **Maps** describe the spatial environment and movement rules; **Workflows** describe actions and transport behaviour.',
    why:
      'They answer two of the four product primitives — *where can the robot move* versus *what sequence of actions should happen* — and they change at different rates. Map and zone corrections are the first thing adjusted after go-live; mission logic is refined on a different rhythm.',
    alternatives: [NOT_RECORDED],
    blocks: [
      p('This question is common enough that the source FAQ answers it directly. See [[map]], [[workflow]] and [[configuration-layers]].')
    ],
    related: ['map', 'workflow', 'configuration-layers', 'ui-maps', 'ui-workflows']
  },

  {
    id: 'd-documentation-mirrors-the-product',
    slug: 'documentation-mirrors-the-product',
    kind: 'decision',
    title: 'Documentation mirrors the product’s visual language',
    summary: 'The documentation reuses Ati Flow’s hierarchy rather than introducing a second brand language.',
    status: 'current',
    category: 'UX decision',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.screens],
    context:
      'Internal documentation often ends up looking nothing like the product it describes, which makes moving between the two feel like moving between two companies.',
    decision:
      'Mirror the product’s visual hierarchy: white surfaces, fine grey borders, rounded cards, teal navigation accents, and green/red operational states.',
    why: 'The documentation is about the product, so it should feel continuous with it. Introducing a separate brand language would add a second thing to learn.',
    alternatives: [NOT_RECORDED],
    blocks: [
      p(
        'This documentation system follows the same rule. The teal, the surface and border treatment and the monospace metadata style all come from the existing Ati work. The operational chrome — live maps, status dashboards — is deliberately left out, because this is documentation, not an operations product.'
      ),
      list([
        'Logo: the supplied `Ati-Docs-Logo.svg`, used as-is',
        'Accent: the teal from the logo and the existing documentation stylesheet',
        'Type: Inter for reading, IBM Plex Mono for metadata and eyebrows'
      ])
    ],
    related: ['ui-components', 'ui-patterns']
  }
];
