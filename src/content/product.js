import { p, h, list, table, callout, gap, chain, relationship, defs, accordions, figure } from './blocks.js';

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

export const product = [
  {
    id: 'ati-robotics',
    title: 'Ati Robotics',
    summary: 'An OEM that builds both the robots and the orchestration software that runs them.',
    simple:
      'Ati is an OEM. It manufactures the robots itself, and it builds the software that decides what those robots do. Both halves come from the same company.',
    aliases: ['Ati', 'the company', 'OEM'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    revisions: [
      {
        date: '2026-09-16',
        author: 'Annuai',
        note: 'Rewritten. Ati is an OEM that builds both the robots and the orchestration software — the page previously recorded this as a gap.'
      }
    ],
    sources: [TEAM, S.overview, 'public/assets/ati-sherpa.png'],
    blocks: [
      h('What Ati builds'),
      p('Two halves of one system, both made in-house:'),
      defs([
        {
          term: 'The robots',
          text: 'The physical machines that move material around a factory floor. See [[robot]].'
        },
        {
          term: 'The orchestration software',
          text: '[[ati-flow|Ati Flow]], which decides what needs moving, which robot moves it, and when. See [[orchestration]].'
        }
      ]),
      h('Why being an OEM matters'),
      p(
        'An [[v-oem|OEM]] manufactures what it sells rather than reselling or integrating someone else’s equipment. For Ati that means the fleet is not software from one vendor wrapped around robots from another — the machine and the system that commands it are built by the same company.'
      ),
      p(
        'It also explains the shape of this documentation. Robot-level configuration, the [[map|map]] and the [[missions-and-actions|mission]] logic are all Ati’s concern, which is why [[configuration-layers]] runs from drive parameters all the way up to business-system integration.'
      ),
      figure(
        '/assets/ati-sherpa.png',
        'An Ati Sherpa XT Lite autonomous mobile robot: a yellow four-wheeled vehicle with a sensor mast, a safety beacon and a side access panel.',
        'The robot in Ati’s product render. Its chassis is labelled Ati · Sherpa XT Lite — the only hardware naming that appears anywhere in the source material.'
      ),
      gap(
        'The company itself is still largely undocumented here: no founding, market, customer base, hardware line-up, product family or roadmap. The robot line is known only by the name printed on one render.'
      ),
      p('For the software half in detail, read [[ati-flow]].')
    ],
    related: ['ati-flow', 'robot', 'orchestration', 'v-oem', 'v-sherpa']
  },

  {
    id: 'ati-flow',
    title: 'Ati Flow',
    summary: 'The software layer that turns a factory’s material demand into coordinated robot movement.',
    simple:
      'Ati Flow sits between what a factory needs moved and the robots that move it. The factory says what it needs; Ati Flow works out which robot goes where, and when.',
    aliases: ['Flow', 'the product'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.overview, S.architecture, S.glossary, S.ia, S.screens],
    blocks: [
      h('What it is'),
      p(
        'Ati Flow is Ati Robotics’ software layer for automated material orchestration. It sits between a factory’s material movement requirements and the [[fleet|robot fleet]] that executes those movements.'
      ),
      p('The positioning line used in the existing documentation is *the material orchestration system for today’s factory*.'),
      h('Why it exists'),
      p(
        'Factories already know what needs to move — that information sits in production schedules, due dates and stock levels. What they lack is something to translate that demand into specific robot journeys, while keeping several robots out of each other’s way. That translation is [[orchestration]].'
      ),
      h('The core chain'),
      chain(
        [
          { title: 'Factory demand', note: 'Production and material needs' },
          { title: 'Integrations', note: 'ERP / MES signals' },
          { title: 'Workflows', note: 'What should happen' },
          { title: 'Maps', note: 'Where and how to move' },
          { title: 'Fleet', note: 'Who executes it' },
          { title: 'Robot', note: 'Physical execution' }
        ],
        'Factory need becomes a movement request, a configured workflow, fleet coordination, and finally robot execution on the floor.'
      ),
      h('Core concepts'),
      p('Four primitives carry most of the product. Each answers one question:'),
      table(
        ['Primitive', 'Question it answers', 'Primary surface'],
        [
          ['[[map|Map]]', 'Where can the robot move, and what rules apply there?', 'Maps'],
          ['[[workflow|Workflow]]', 'What sequence of actions should happen?', 'Workflows'],
          ['[[fleet|Fleet]]', 'How are multiple robots coordinated?', 'Fleet Monitor / configuration'],
          ['[[robot|Robot]]', 'Which physical machine is available and what is its state?', 'Robots / Fleet Monitor']
        ]
      ),
      h('Keep the layers clear'),
      p('The product is organised around three different questions, and the documentation treats mixing them as a mistake:'),
      defs([
        { term: 'Operations — what is happening now?', text: '[[ui-fleet-monitor|Fleet Monitor]] exposes live robots, tasks, traffic and exceptions.' },
        { term: 'Configuration — what should happen?', text: '[[ui-maps|Maps]] and [[ui-workflows|Workflows]] define the environment and transport behaviour.' },
        { term: 'Diagnostics — why is the robot behaving this way?', text: 'Low-level state, calibration and diagnostics belong in [[ui-debug|Debug]].' }
      ]),
      p('See [[d-keep-the-layers-clear]] for why this separation is treated as a decision rather than a habit.'),
      h('Where to go next'),
      p(
        'Read [[architecture]] for the layer model, [[information-architecture]] for the list of surfaces, [[roles-and-permissions]] for who uses which one, and the [[concepts|Concepts]] section for the ideas the product is built from.'
      )
    ],
    related: ['architecture', 'orchestration', 'information-architecture', 'roles-and-permissions', 'ati-robotics']
  },

  {
    id: 'architecture',
    title: 'Architecture',
    summary: 'A mental model for how factory demand becomes coordinated robot work, in five layers.',
    simple:
      'Demand starts in the factory’s business systems, arrives through an integration, gets planned by Ati Flow, coordinated across the fleet, and finally driven by one robot.',
    aliases: ['system model', 'layers'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.architecture, S.overview],
    blocks: [
      h('The system at a glance'),
      chain([
        { title: 'Business systems', note: 'ERP / MES / production signals' },
        { title: 'Integrations', note: 'Requests, status, master data' },
        { title: 'Ati Flow', note: 'Orchestration + configuration' },
        { title: 'Fleet layer', note: 'Allocation, traffic, charging' },
        { title: 'Robot', note: 'Navigation + execution' },
        { title: 'Factory', note: 'Physical material flow' }
      ]),
      h('The five layers'),
      accordions([
        {
          title: 'Layer 1 — Business',
          body: [
            p(
              'The factory creates the reason for movement. Examples include production demand, material availability, line schedules or inventory conditions.'
            )
          ]
        },
        {
          title: 'Layer 2 — Integration',
          body: [
            p(
              '[[integrations|Integrations]] connect external systems to Ati Flow: ERP hooks, status and completion updates, priority logic and master-data alignment.'
            )
          ]
        },
        {
          title: 'Layer 3 — Orchestration',
          body: [
            p(
              'Ati Flow translates configured [[workflow|workflows]] and incoming requests into executable work. [[map|Maps]], workflows, [[fleet|fleets]], [[robot|robots]] and operational monitoring meet here.'
            )
          ]
        },
        {
          title: 'Layer 4 — Fleet',
          body: [
            p(
              'Fleet management coordinates multiple robots: task allocation, shared-resource arbitration, charging and idle behaviour, and operational priorities.'
            )
          ]
        },
        {
          title: 'Layer 5 — Robot / autonomy',
          body: [
            p(
              'The robot executes movement using its own navigation, perception, localization, safety and drive systems. The software running on the robot is called [[v-mule|Mule]].'
            )
          ]
        }
      ]),
      callout(
        'Design implication',
        'Expose the operational decision a user needs rather than reproducing every internal robot state. Low-level diagnostics can remain in Debug. See [[d-expose-the-decision]].'
      ),
      h('The four product primitives'),
      table(
        ['Primitive', 'Question it answers', 'Primary surface'],
        [
          ['[[map|Map]]', 'Where can the robot move, and what rules apply there?', 'Maps'],
          ['[[workflow|Workflow]]', 'What sequence of actions should happen?', 'Workflows'],
          ['[[fleet|Fleet]]', 'How are multiple robots coordinated?', 'Fleet Monitor / configuration'],
          ['[[robot|Robot]]', 'Which physical machine is available and what is its state?', 'Robots / Fleet Monitor']
        ]
      ),
      h('How the objects relate'),
      relationship(
        [
          { label: 'Robot', to: 'robot', note: 'belongs to' },
          { label: 'Fleet', to: 'fleet', note: 'coordinated by' },
          { label: 'Orchestration', to: 'orchestration', note: 'produces' },
          { label: 'Tasks and trips', to: 'task', note: 'which move' },
          { label: 'Material', to: 'material-flow' }
        ],
        'This chain is assembled from the architecture and glossary pages. The underlying data model — what is a record, what references what — is not documented.'
      ),
      gap(
        'The architecture describes layers of responsibility, not a data model. How a fleet, a zone, a trip and a task relate as records is the largest single gap in the source material.'
      )
    ],
    related: ['ati-flow', 'orchestration', 'integrations', 'fleet', 'configuration-layers']
  },

  {
    id: 'information-architecture',
    title: 'Information architecture',
    summary: 'The surfaces the product is divided into, and the decision each one supports.',
    simple:
      'The product is split into seven screens. Each one answers a different question, and the split is deliberate.',
    aliases: ['IA', 'pages', 'navigation'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.ia, S.screens, S.prototype],
    blocks: [
      h('The documented surfaces'),
      p('Current naming, reflecting product terminology in use today.'),
      table(
        ['Page', 'Covers'],
        [
          ['[[ui-maps|Maps]]', 'SLAM mapping, positions, zones, traffic and gate rules'],
          ['[[ui-workflows|Workflows]]', 'Mission and action design, mission patterns, priority rules'],
          ['[[ui-fleet-monitor|Fleet Monitor]]', 'Live, zone-based view of robots, tasks and traffic'],
          ['[[ui-robots|Robots]]', 'Robot setup — add, edit, delete, name, assign to zone'],
          ['[[ui-integrations|Integrations]]', 'ERP connections, master data mapping, sync logs'],
          ['[[ui-setup-and-config|Setup & Config]]', 'Site, network, docks, user and role management'],
          ['[[ui-debug|Debug]]', 'Low-level configuration and diagnostics — Configurator only']
        ]
      ),
      h('Which surface for which need'),
      table(
        ['Need', 'Primary surface', 'Typical user'],
        [
          ['See live movement', 'Fleet Monitor', 'Operator / Fleet Supervisor / Head of Operations'],
          ['Manage a robot', 'Robots', 'Fleet Supervisor / Head of Operations / Configurator'],
          ['Edit movement environment', 'Maps', 'Configurator'],
          ['Edit transport behaviour', 'Workflows', 'Configurator'],
          ['Check business-system connection', 'Integrations', 'Head of Operations / Configurator'],
          ['Diagnose low-level robot state', 'Debug', 'Configurator']
        ]
      ),
      callout(
        'Two information architectures exist in this folder',
        [
          'The list above comes from the documentation. The Ati Flow prototype shows a different navigation: **Dashboard, Live Status, Analytics, AMR Trips, Staging Area, WIP Inventory**, followed by Notifications, Settings and Profile.',
          'Neither source acknowledges the other. Both are recorded here. See [[open-questions]].'
        ],
        'gap'
      ),
      p('For what each screen actually shows, see the [[ui|UI]] section.')
    ],
    related: ['roles-and-permissions', 'ati-flow', 'ui-live-fleet-status', 'open-questions']
  },

  {
    id: 'roles-and-permissions',
    title: 'Roles and permissions',
    summary: 'Four roles, and what each of them can see and do on every surface.',
    simple:
      'Not everyone needs the whole product. An operator gets one zone and a task queue; a configurator gets everything. What each role does *not* see is as deliberate as what it does.',
    aliases: ['roles', 'permissions', 'access', 'operator', 'supervisor', 'configurator'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.ia],
    blocks: [
      h('The four roles'),
      defs([
        {
          term: '[[v-operator|Operator]] — floor level, single zone',
          text: 'The person physically on the floor, day to day. Fleet Monitor for their own zone, with robot status and task queue. Can raise a manual priority request, with the trade-off shown before confirming. View-only on Robots in their zone.'
        },
        {
          term: '[[v-fleet-supervisor|Fleet Supervisor]] — zone-level oversight',
          text: 'Owns one or more zones. Fleet Monitor across their assigned zones with reassignment control, manages robots within their zone, and views Maps and Workflows to understand what is configured without editing it.'
        },
        {
          term: '[[v-head-of-operations|Supervisor (Head of Operations)]] — site-wide authority',
          text: 'Sees across every zone and is the escalation point above Fleet Supervisors. Manages robots site-wide, views and approves Workflows and Maps, sees Integrations status, and manages users and roles.'
        },
        {
          term: '[[v-solutions-architect|Solutions Architect (Configurator)]] — full configuration authority',
          text: 'Designs the solution — routes, zones, missions, integrations — and is the only role with Debug access. View-only on Fleet Monitor, for verifying that a configuration behaves correctly rather than for daily operations.'
        }
      ]),
      h('Permission matrix'),
      table(
        ['Page', 'Operator', 'Fleet Supervisor', 'Head of Operations', 'Configurator'],
        [
          ['Fleet Monitor', 'Own zone', 'Own zone(s)', 'All zones', 'View'],
          ['Robots', 'View own zone', 'Manage own zone', 'Manage all', 'Full setup'],
          ['Workflows', 'Hidden', 'View', 'View & approve', 'Full edit'],
          ['Maps', 'Hidden', 'View', 'View', 'Full edit'],
          ['Integrations', 'Hidden', 'Hidden', 'View status', 'Full config'],
          ['Setup & Config', 'Hidden', 'Hidden', 'Users & roles', 'Full config'],
          ['Debug', 'Hidden', 'Hidden', 'Hidden', 'Exclusive']
        ],
        'What each role can do on each page, at a glance.'
      ),
      h('What each role is not bothered with'),
      p('The source material lists this explicitly per role, which makes the design intent unusually clear.'),
      accordions([
        {
          title: 'Operator',
          body: [
            list([
              'Maps, Workflows, Integrations, Setup, Debug — entirely hidden',
              'Other zones’ traffic or task queues',
              'Any configuration language — zones, missions and master data are invisible here'
            ])
          ]
        },
        {
          title: 'Fleet Supervisor',
          body: [
            list([
              'Integrations, Setup & Config, Debug — entirely hidden',
              'Editing missions or map zones — that is a Configurator task',
              'Zones outside their own assignment'
            ])
          ]
        },
        {
          title: 'Supervisor (Head of Operations)',
          body: [
            list([
              'Debug — entirely hidden',
              'Low-level robot parameters such as drive tuning and safety calibration',
              'Writing mission logic or drawing map zones from scratch'
            ])
          ]
        },
        {
          title: 'Solutions Architect (Configurator)',
          body: [
            list([
              'Day-to-day task queues or manual dispatch — that is operational, not configuration',
              'Zone-specific operational escalations'
            ])
          ]
        }
      ]),
      callout(
        'Read the matrix as a design principle',
        'Hiding a surface is a decision about attention, not about trust. See [[d-role-based-visibility]].'
      ),
      gap(
        'The prototype offers a single **Supervisor Mode** selector and no visible role switching. How modes relate to these four roles is unestablished.'
      )
    ],
    related: ['information-architecture', 'zone', 'ui-debug', 'd-role-based-visibility', 'v-escalation']
  }
];
