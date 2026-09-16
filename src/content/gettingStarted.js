import { p, h, list, callout, gap, chain, relationship, figure, accordions, table } from './blocks.js';

// Knowledge contributed directly by the Ati team rather than found in this folder.
const TEAM = 'Ati team — noted September 2026';

const S = {
  glossary: 'old/ati-flow-glossary.html',
  architecture: 'old/ati-flow-architecture.html',
  deployment: 'old/amr-deployment-workflow.html',
  ia: 'old/amr-software-ia-roles.html',
  screens: 'old/ati-flow-screens.html',
  overview: 'old/index.html',
  faq: 'old/ati-flow-faq.html',
  prototype: 'old/prototype/'
};

/*
  The start-here learning path. Each step is deliberately short: it orients, then hands off to the
  full concept page. `step` drives the numbering and the previous/next navigation.
*/

export const gettingStarted = [
  {
    id: 'gs-what-are-we-building',
    slug: 'what-are-we-building',
    step: 1,
    title: 'What are we building?',
    summary: 'Robots that move material around a factory, and the software that decides what they do — both built by Ati.',
    simple:
      'Ati is an OEM: it builds the robots themselves, and it builds Ati Flow, the software that tells those robots what to move, where to take it, and when.',
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    revisions: [
      {
        date: '2026-09-16',
        author: 'Annuai',
        note: 'Reframed around Ati being an OEM that builds both the robots and the orchestration software.'
      }
    ],
    sources: [TEAM, S.overview, S.architecture, 'public/assets/ati-sherpa.png'],
    blocks: [
      figure(
        '/assets/ati-sherpa.png',
        'An Ati Sherpa XT Lite autonomous mobile robot: a yellow four-wheeled vehicle with a sensor mast and a safety beacon.',
        'A robot of the kind Ati Flow coordinates.'
      ),
      h('The two halves'),
      p(
        'There is a machine, and there is a decision. The machine is a [[robot]] — it drives itself, avoids people and finds its own way. The decision is which robot should move what, and when. That decision is what Ati Flow makes, and it is called [[orchestration]].'
      ),
      p(
        'Ati builds both. As an [[v-oem|OEM]] it manufactures the robots and writes the software that commands them, rather than supplying one and buying in the other. See [[ati-robotics]].'
      ),
      h('Why the decision is hard'),
      p(
        'One robot on one route is straightforward. A factory has many robots, shared corridors, charging docks, deadlines and production schedules that shift. Coordinating all of that is the product.'
      ),
      p('Next: [[gs-what-is-ati-flow|what Ati Flow actually is]].')
    ],
    related: ['ati-robotics', 'ati-flow', 'robot', 'orchestration', 'v-oem']
  },

  {
    id: 'gs-what-is-ati-flow',
    slug: 'what-is-ati-flow',
    step: 2,
    title: 'What is Ati Flow?',
    summary: 'The software layer between a factory’s material needs and the robots that meet them.',
    simple:
      'Ati Flow sits in the middle. The factory tells it what needs moving; it works out which robot goes, and keeps all the robots out of each other’s way.',
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.overview, S.architecture],
    blocks: [
      p(
        'The definition used across the existing documentation: **Ati Flow is Ati Robotics’ software layer for automated material orchestration.** It sits between a factory’s material movement requirements and the robot fleet that executes those movements.'
      ),
      h('The chain to remember'),
      chain([
        { title: 'Factory demand', note: 'Production and material needs' },
        { title: 'Integrations', note: 'ERP / MES signals' },
        { title: 'Workflows', note: 'What should happen' },
        { title: 'Maps', note: 'Where and how to move' },
        { title: 'Fleet', note: 'Who executes it' },
        { title: 'Robot', note: 'Physical execution' }
      ]),
      p(
        'If you remember one thing from this documentation, make it this chain. Almost every concept sits somewhere along it.'
      ),
      p('Next: [[gs-what-is-a-robot|what a robot is]]. Or read the full [[ati-flow]] page now.')
    ],
    related: ['ati-flow', 'architecture', 'orchestration']
  },

  {
    id: 'gs-what-is-a-robot',
    slug: 'what-is-a-robot',
    step: 3,
    title: 'What is a robot?',
    summary: 'One self-driving machine that carries material from one place to another.',
    simple:
      'A robot is a single machine on the floor. It knows where it is, finds its own route, and reports its state as it goes.',
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.glossary, S.ia, S.prototype],
    blocks: [
      h('The word matters'),
      p(
        'The technical term is **AMR** — autonomous mobile robot. The product says **Robot**, deliberately, so that nobody needs an acronym to read a screen. See [[d-robot-over-amr]].'
      ),
      h('What you know about a robot'),
      list([
        'Its identifier',
        'Its [[robot-states|state]] — for example *Moving* or *Blocked*',
        'Its battery level',
        'The [[trip]] it is on and its next station'
      ]),
      callout(
        'The robot steers itself',
        'Navigation, perception, localization and safety all run on the machine. Ati Flow decides what should happen, not how to drive.'
      ),
      p('Next: [[gs-what-is-a-fleet|what a fleet is]]. Or read the full [[robot]] page.')
    ],
    related: ['robot', 'robot-states', 'v-amr']
  },

  {
    id: 'gs-what-is-a-fleet',
    slug: 'what-is-a-fleet',
    step: 4,
    title: 'What is a fleet?',
    summary: 'All the robots at a site, managed as one group rather than one at a time.',
    simple:
      'A fleet is the robots working together. Once there is more than one, something has to decide who takes which job and who goes first through a narrow aisle.',
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.glossary, S.deployment],
    blocks: [
      p('Fleet management makes four kinds of decision:'),
      list([
        '**Which robot** takes an incoming job — task allocation',
        '**Who goes first** at a shared gate or single-lane section — [[traffic-control|traffic arbitration]]',
        '**What idle robots do** — go and charge, or wait at a staging position',
        '**What is urgent** — priority and aging rules'
      ]),
      callout(
        'Where zones come in',
        'A large floor is divided into [[zone|zones]]. Zones decide who is responsible for what: an operator watches one zone, a fleet supervisor owns several, a head of operations sees them all.'
      ),
      p('Next: [[gs-how-material-moves|how material moves]]. Or read the full [[fleet]] page.')
    ],
    related: ['fleet', 'zone', 'traffic-control']
  },

  {
    id: 'gs-how-material-moves',
    slug: 'how-material-moves',
    step: 5,
    title: 'How does material move?',
    summary: 'A need becomes a request, a request becomes a robot journey, and material arrives.',
    simple:
      'Something in the factory needs material. That need becomes a job. A robot is chosen, it collects the material and delivers it.',
    status: 'draft',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.overview, S.architecture, S.deployment],
    blocks: [
      relationship([
        { label: 'Demand', note: 'a line needs material, or work is finished and needs clearing' },
        { label: 'Request', note: 'raised by a business system through an integration, or by a person' },
        { label: 'Task', to: 'task', note: 'allocated to' },
        { label: 'Robot', to: 'robot', note: 'which makes a' },
        { label: 'Trip', to: 'trip', note: 'and so material moves' }
      ]),
      p('The fuller version, with what decides each step, is on [[wf-material-movement]].'),
      gap(
        'Material itself is not modelled anywhere in the source material — there is no definition of a material, a load or a container. This step describes the movement, not the thing being moved.'
      ),
      p('Next: [[gs-what-is-orchestration|what orchestration means]].')
    ],
    related: ['material-flow', 'wf-material-movement', 'trip']
  },

  {
    id: 'gs-what-is-orchestration',
    slug: 'what-is-orchestration',
    step: 6,
    title: 'What does orchestration mean?',
    summary: 'Coordinating what should move, which robot moves it, and when.',
    simple:
      'Ati coordinates where materials need to go, which robot should move them, and when the movement should happen.',
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.overview, S.architecture],
    blocks: [
      h('More detail'),
      p(
        'Orchestration is the layer that turns configured [[workflow|workflows]] and incoming requests into executable work. It is where maps, workflows, fleets, robots and operational monitoring meet.'
      ),
      p(
        'It is deliberately *not* the robot’s own autonomy. The robot handles navigation and safety; orchestration handles intent.'
      ),
      h('Where to go next'),
      list([
        '[[vocabulary|Explore the vocabulary]] — the words you will hear in every conversation',
        '[[workflows|Understand the workflows]] — how deployment and dispatch actually run',
        '[[ui|Browse the UI]] — what each screen is for',
        '[[concepts|Read the concepts]] — the full set of ideas, with their relationships'
      ])
    ],
    related: ['orchestration', 'ati-flow', 'material-flow']
  },

  {
    id: 'gs-common-questions',
    slug: 'common-questions',
    title: 'Common questions',
    summary: 'Questions a new person is likely to ask, answered only as far as the sources allow.',
    aliases: ['FAQ', 'questions'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.faq],
    blocks: [
      accordions([
        {
          title: 'Is Ati Flow the same thing as the robot’s autonomy stack?',
          tag: 'Architecture',
          body: [
            p(
              'No. The documentation separates orchestration and product from low-level robot configuration, navigation and diagnostics. See [[architecture]].'
            )
          ]
        },
        {
          title: 'Why are Maps and Workflows separate?',
          tag: 'Configuration',
          body: [
            p(
              'Maps describe the spatial environment and movement rules. Workflows describe actions and transport behaviour. See [[d-maps-and-workflows-are-separate]].'
            )
          ]
        },
        {
          title: 'Does a robot under maintenance still count as available capacity?',
          tag: 'State model',
          body: [
            p(
              'It should be excluded from normal dispatch if maintenance is a real operational state, but the provided information architecture does not define the complete state machine. See [[robot-states]].'
            )
          ]
        },
        {
          title: 'Is "taxi mode" an industry-standard AMR mode?',
          tag: 'Terminology',
          body: [
            p(
              'The current documentation does not establish that. *Taxi* is explicitly used as a mission pattern meaning on-demand, point-to-point transport. See [[v-taxi-mode]].'
            )
          ]
        },
        {
          title: 'Who should see low-level robot diagnostics?',
          tag: 'Access',
          body: [p('The current IA places [[ui-debug|Debug]] exclusively with the Solutions Architect (Configurator) role.')]
        },
        {
          title: 'What should a new designer learn first?',
          tag: 'Onboarding',
          body: [
            p('The order recorded in the source material:'),
            list([
              '[[architecture|Architecture]]',
              '[[vocabulary|Glossary]]',
              '[[ui-maps|Maps]] vs [[ui-workflows|Workflows]] vs [[ui-fleet-monitor|Fleet Monitor]]',
              '[[roles-and-permissions|Roles & permissions]]',
              '[[wf-deployment|Deployment workflow]]'
            ])
          ]
        }
      ]),
      p('Questions the source material raises and does not answer are collected on [[open-questions]].')
    ],
    related: ['open-questions', 'architecture', 'roles-and-permissions', 'robot-states']
  }
];
