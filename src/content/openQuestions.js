import { p, h, list, callout, table } from './blocks.js';

/*
  Open questions.

  Two kinds are recorded here: the questions the source material raises about itself, and the
  contradictions found while auditing the folder. Neither is resolved. See docs/source-audit.md.
*/

export const openQuestions = [
  {
    id: 'open-questions',
    slug: 'index',
    title: 'Open questions',
    summary: 'What this documentation cannot answer yet, and where the sources disagree.',
    simple:
      'Some things are genuinely undecided, and some sources contradict each other. Both are listed here rather than smoothed over.',
    aliases: ['unknowns', 'to validate', 'contradictions', 'gaps'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: ['old/ati-flow-faq.html', 'docs/source-audit.md'],
    blocks: [
      callout(
        'Why this page exists',
        'Documentation that guesses is worse than documentation that admits a gap, because a guess gets repeated. Everything below is either flagged as open by Ati’s own material, or was found while auditing this folder.'
      ),
      h('Questions the team has raised'),
      list([
        '**Is a Fleet Supervisor required at all?** The newly proposed system has three [[users]], but whether the middle one is needed has not been settled. It changes the permission model and the zone assignment logic. See [[users]].',
        '**Solutions Architect or Configurator?** Both names are in use for the fourth user and the wording needs finalising. See [[users]].',
        'How does the Solutions Architect relate to [[v-deployment-manager|Deployment Manager]], the tool Ati support engineers use to configure and deploy robots? The two describe closely related work.',
        'How does [[v-visa|VISA]] relate to the **gates** and **exclusion zones** in the deployment material — is it their implementation, or a separate mechanism?',
        'How much of [[v-fleet-manager|Fleet Manager]] has Ati Flow already absorbed, and on what timeline?'
      ]),
      h('Questions the source material raises'),
      list([
        'What exact robot states exist in the production system? See [[robot-states]].',
        'Is Maintenance a fleet-visible state, a robot-local state, or both?',
        'What exactly does "taxi mode" enable or disable? See [[v-taxi-mode]].',
        'Which safety mechanisms remain active during manual or teleoperated movement?',
        'What is the authoritative source for robot availability?',
        'What is the relationship between [[fleet|Fleet]], [[processing-zone|Processing Zone]] and geographical [[zone|Zone]] in the actual data model?',
        'Which actions can an Operator and a Fleet Supervisor perform directly on a robot?'
      ]),
      h('Contradictions found in this folder'),
      table(
        ['Where', 'The disagreement'],
        [
          [
            'Information architecture',
            'The documentation lists Maps, Workflows, Fleet Monitor, Robots, Integrations, Setup & Config and Debug. The prototype navigation shows Dashboard, Live Status, Analytics, AMR Trips, Staging Area and WIP Inventory. Neither acknowledges the other. See [[information-architecture]].'
          ],
          [
            'Names one word apart',
            'Fleet Manager and Deployment Manager are software; Fleet Supervisor and Supervisor are people; Fleet Monitor is a screen; Supervisor Mode is a control. The disambiguation table on [[ati-flow]] keeps them apart.'
          ],
          [
            'Fleet Manager vs Fleet Monitor',
            '[[v-fleet-manager|Fleet Manager]] is a separate system that Ati Flow is intended to replace. [[ui-fleet-monitor|Fleet Monitor]] is a page inside Ati Flow. The names are one word apart. How much of Fleet Manager remains to be absorbed — [[v-route-ops|Route Ops]] is one known gap — is not documented.'
          ],
          [
            'The live view',
            'Called **Fleet Monitor** in the documentation and **Live Fleet Status** in the prototype. See [[ui-fleet-monitor]] and [[ui-live-fleet-status]].'
          ],
          [
            'Zone and Processing Zone',
            'The glossary keeps them distinct and unconfirmed; the prototype UI presents them as the same selector. See [[processing-zone]].'
          ],
          [
            'Trip and Task',
            'Both name a unit of robot work. Neither is defined. See [[trip]] and [[task]].'
          ],
          [
            'Roles and modes',
            'Four roles are documented. The prototype exposes a single "Supervisor Mode" selector with no role switching. See [[roles-and-permissions]].'
          ],
          [
            'The word "workflow"',
            'A configured product object on one page, a human deployment process on another. See [[workflow]].'
          ]
        ]
      ),
      h('Subjects with no source at all'),
      list([
        '**Ati Robotics as a company** — nothing beyond one sentence of product positioning.',
        '**Robot hardware** — no specifications, variants or capacities. See [[ati-robotics]].',
        '**The material model** — no definition of a material, a load or a container. See [[material-flow]].',
        '**The data model** — how fleets, zones, trips, tasks and missions relate as records.',
        '**Interface states** — loading, empty, error and offline are undesigned. See [[ui-states]].',
        '**Six of seven screens** — scoped in one line each, with no layout or field detail.'
      ]),
      h('How to close one'),
      p(
        'Confirm the answer with the people who own it, then edit the relevant content file in `src/content/`, change the entry’s `status` from `needs-confirmation` to `current`, and remove the gap callout. The entry’s `sources` field should name where the answer came from.'
      )
    ],
    revisions: [
      {
        date: '2026-09-16',
        author: 'Annuai',
        note: 'Added the questions the team raised directly — whether Fleet Supervisor is required, where the Configurator went, how VISA relates to gates — and the cluster of similar names.'
      },
      {
        date: '2026-09-16',
        author: 'Annuai',
        note: 'Closed the question of whether the Solutions Architect is still a user — he is. Replaced it with the naming question: Solutions Architect or Configurator.'
      }
    ],
    related: ['users', 'robot-states', 'processing-zone', 'trip', 'task', 'information-architecture']
  }
];
