import { p, h, list, table, callout, gap, chain, relationship, defs, accordions, mermaid, cards } from './blocks.js';

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

export const atiFlow = [
  {
    id: 'ati-flow',
    slug: 'overview',
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
      h('What Ati Flow is made of'),
      p('Ati Flow is not one new system. It brings three things together:'),
      defs([
        {
          term: '[[v-fleet-manager|Fleet Manager]]',
          text: 'Ati’s software already running in real warehouses. It controls the fleet — telling robots where to go, booking and managing trips, analytics, and surfacing traffic problems such as [[v-visa|VISA]] contention. It executes; it does not decide.'
        },
        {
          term: '[[v-deployment-manager|Deployment Manager]]',
          text: 'The tool Ati’s support engineers use to configure and deploy the robots.'
        },
        {
          term: 'An orchestration layer',
          text: 'Connected to APIs from [[v-erp|ERP]] and [[v-wms|warehouse management]] providers, chosen per client. This is the part that decides what should happen. See [[orchestration]].'
        }
      ]),
      callout(
        'Where the intelligence sits',
        'Fleet Manager is explicitly not an intelligent system — it controls robots rather than working out what the factory needs. The orchestration layer is what turns demand into instructions. Ati Flow is the product that puts both under one roof.'
      ),
      h('Names that are easy to confuse'),
      p('Several Ati names sit one word apart and mean different things. This table is the reference:'),
      table(
        ['Name', 'What it is', 'Person or software?'],
        [
          ['[[v-fleet-manager|Fleet Manager]]', 'Ati software that runs the fleet on site today', 'Software'],
          ['[[v-deployment-manager|Deployment Manager]]', 'Ati software used internally to configure and deploy robots', 'Software'],
          ['[[ui-fleet-monitor|Fleet Monitor]]', 'A screen inside Ati Flow showing live robots, tasks and traffic', 'Software — a page'],
          ['[[v-fleet-supervisor|Fleet Supervisor]]', 'A user who owns one or more zones', 'Person'],
          ['[[v-head-of-operations|Supervisor]]', 'A user accountable for the whole site', 'Person'],
          ['[[v-supervisor-mode|Supervisor Mode]]', 'A selector in the prototype sidebar; what it switches is undocumented', 'Software — a control']
        ]
      ),
      h('The product, screen by screen'),
      p(
        'Everything above is the product in outline. [[information-architecture|Information architecture]] draws the full map — every screen and the features on it — in one diagram. The seven surfaces themselves:'
      ),
      cards([
        { title: 'Fleet Monitor', text: 'Live robots, tasks and traffic, by zone.', tag: 'Operations', to: '/ui/fleet-monitor' },
        { title: 'Robots', text: 'Add, edit, assign to zone, mark for maintenance.', tag: 'Setup', to: '/ui/robots' },
        { title: 'Maps', text: 'SLAM mapping, positions, zones, traffic and gate rules.', tag: 'Configuration', to: '/ui/maps' },
        { title: 'Workflows', text: 'Mission and action design, patterns, priority rules, and the Workflow Builder.', tag: 'Configuration', to: '/ui/workflows' },
        { title: 'Integrations', text: 'ERP connections, master data mapping, sync logs.', tag: 'Configuration', to: '/ui/integrations' },
        { title: 'Setup & Config', text: 'Site, network, docks, users and roles.', tag: 'Configuration', to: '/ui/setup-and-config' },
        { title: 'Debug', text: 'Low-level diagnostics. Configurator only.', tag: 'Diagnostics', to: '/ui/debug' }
      ]),
      h('Where to go next'),
      p(
        'Read [[users]] for who uses it, [[architecture]] for the layer model, [[information-architecture]] for the full diagram of every surface and feature, and the [[concepts|Concepts]] section for the ideas the product is built from.'
      )
    ],
    revisions: [
      {
        date: '2026-09-16',
        author: 'Annuai',
        note: 'Added what Ati Flow is made of — Fleet Manager, Deployment Manager and an orchestration layer over ERP and WMS APIs — plus a disambiguation table for the similar names.'
      },
      {
        date: '2026-09-18',
        author: 'Annuai',
        note: 'Added a screen-by-screen card grid linking directly into the UI section, so this page works as the hub for the whole product rather than just the concept summary.'
      }
    ],
    related: [
      'users',
      'architecture',
      'orchestration',
      'information-architecture',
      'v-fleet-manager',
      'v-deployment-manager',
      'ati-robotics',
      'ui-fleet-monitor',
      'ui-robots',
      'ui-maps',
      'ui-workflows',
      'ui-integrations',
      'ui-setup-and-config',
      'ui-debug'
    ]
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
      h('Every surface, every feature, at a glance'),
      p(
        'One diagram of the whole product: the seven documented screens, and every feature recorded for each of them. Read it as a map, not a menu — the detail pages linked throughout this section are where each branch is explained.'
      ),
      mermaid(
        `mindmap
  root(("Ati Flow"))
    ("Fleet Monitor")
      ("Live robots, tasks & traffic, by zone")
      ("Manual priority request — Operator")
      ("Reassign work within a zone — Fleet Supervisor")
      ("View only — Configurator")
    ("Robots")
      ("Add, edit, delete, rename")
      ("Assign a robot to a zone")
      ("Mark a robot for maintenance")
      ("Low-level parameters — Configurator only")
    ("Maps")
      ("Build & validate the SLAM map")
      ("Positions & stations")
      ("Zones — behavioural, exclusion, forbidden, preferred")
      ("Traffic & gate rules")
      ("Zone access by robot type")
    ("Workflows")
      ("Missions & the actions they are composed from")
      ("Mission patterns — taxi, milk run, bus")
      ("Priority & interrupt rules")
      ("Reusable sub-missions")
      ("Approval — Head of Operations")
      ("Workflow Builder")
        ("Move — localisation, turn, dock, move, footprint, switch map")
        ("Logic — if, while, loop, wait, pause, prompt user")
        ("Errors — try/catch, create log")
        ("Sound & Light — play sound, show light")
        ("Email — send email")
        ("AIoT — Bluetooth, set output, set/reset I-O, wait for input")
    ("Integrations")
      ("ERP connections")
      ("Master data mapping")
      ("Sync logs & health")
    ("Setup & Config")
      ("Site & network configuration")
      ("Dock placement")
      ("User & role management")
    ("Debug — Configurator only")
      ("Raw robot state")
      ("Calibration")
      ("Diagnostic logs & overrides")`,
        'The current, documented information architecture — seven screens and their recorded features. Workflow Builder is drawn as part of Workflows, since it is reached from there rather than being a separate top-level surface.'
      ),
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
    revisions: [
      {
        date: '2026-09-18',
        author: 'Annuai',
        note: 'Added a full diagram of every screen and its documented features, drawn from the individual UI section pages, so the whole product is visible in one place rather than only as a surface list.'
      }
    ],
    related: [
      'roles-and-permissions',
      'ati-flow',
      'ui-live-fleet-status',
      'ui-fleet-monitor',
      'ui-robots',
      'ui-maps',
      'ui-workflows',
      'ui-workflow-builder',
      'ui-integrations',
      'ui-setup-and-config',
      'ui-debug',
      'open-questions'
    ]
  },

  {
    id: 'users',
    title: 'Users',
    summary: 'The four users the system is designed around — three who operate it, and one who sets it all up.',
    simple:
      'Four kinds of person use the system: someone on the floor, someone looking after a group of zones, someone accountable for the whole site, and the person who sets everything up in the first place.',
    aliases: ['users', 'personas', 'who uses it', 'operator', 'supervisor', 'configurator'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-16',
    revisions: [
      {
        date: '2026-09-16',
        author: 'Annuai',
        note: 'Solutions Architect added as the fourth user. This corrects the earlier reading that the role had become Ati-internal, and reconciles the user model with the four-role permission table.'
      },
      {
        date: '2026-09-16',
        author: 'Annuai',
        note: 'Narrowed the Fleet Supervisor description to handling robots with issues, and replaced a speculative reason for questioning the role with the real one: Operators already do that job.'
      }
    ],
    sources: [TEAM, S.ia],
    blocks: [
      h('The four users'),
      p('Three of them operate the system. The fourth sets it up.'),
      defs([
        {
          term: '[[v-operator|Operator]] — on the floor',
          text: 'The person physically present, day to day, working in one zone. They watch what the robots in their zone are doing and can raise a manual priority request, with the trade-off shown before they confirm.'
        },
        {
          term: '[[v-fleet-supervisor|Fleet Supervisor]] — robots that need help',
          text: 'Steps in when a robot has a problem, and does nothing else: they are not given the data to control or manage anything beyond that. Closest to a support engineer working the floor. **Whether this user is required at all is not yet settled.**'
        },
        {
          term: '[[v-head-of-operations|Supervisor]] — across the site',
          text: 'Accountable for every zone, and the escalation point above the others. Manages robots site-wide, approves what has been configured, and manages users and roles.'
        },
        {
          term: '[[v-solutions-architect|Solutions Architect]] — sets everything up',
          text: 'The person who makes a new site work at all: building the [[map|maps]], and doing every other piece of setup needed to deploy a fleet in a warehouse or factory that has never had one. Also called the **Configurator** — the wording is not final.'
        }
      ]),
      h('Two different axes'),
      p(
        'The first three users sit on a ladder of scope. Each sees further than the one below, and acts on less detail:'
      ),
      relationship([
        { label: 'Operator', to: 'v-operator', note: 'one zone — what is happening now' },
        { label: 'Fleet Supervisor', to: 'v-fleet-supervisor', note: 'robots in trouble — if the role is kept at all' },
        { label: 'Supervisor', to: 'v-head-of-operations', note: 'the whole site — approve and escalate' }
      ]),
      p(
        'The Solutions Architect is not further up that ladder — he is on a different one. The other three ask *what is happening, and what should I do about it*. He asks *what should this site do in the first place*. That is the difference between operating a system and configuring one, and it is the same split the product itself is built around. See [[d-keep-the-layers-clear]].'
      ),
      callout(
        'Fleet Supervisor is not confirmed',
        [
          'The argument against the role is direct: **[[v-operator|Operators]] already manage the robots when there is an issue.** If handling robots in trouble is the whole of the Fleet Supervisor job, and the person already on the floor is doing it, a separate persona may not be needed.',
          'It is worth settling early. Keeping the role means zones need owners, which shapes the permission model and the zone assignment logic. Dropping it makes this a three-user system.'
        ],
        'gap'
      ),
      callout(
        'Solutions Architect or Configurator? Not yet decided',
        [
          'Both names are in use for the same person, and one needs picking.',
          'Worth noting while deciding: the other three users are named for what they do inside the product — an Operator operates, a Supervisor supervises. By that pattern *Configurator* is the consistent choice, and *Solutions Architect* reads as a job title rather than a role in the system. That is an observation about the naming pattern, not a decision. See [[d-robot-over-amr]] for how the last terminology call of this kind was made and recorded.'
        ],
        'gap'
      ),
      h('What he sets up'),
      p('The setup work spans most of the [[configuration-layers|configuration layers]]:'),
      list([
        '[[map|Maps]] — building the map of the site and annotating it with positions, zones and traffic rules',
        '[[missions-and-actions|Missions]] — the actions and transport behaviour robots will run',
        '[[robot|Robots]] — setup including low-level parameters',
        '[[integrations|Integrations]] and site configuration',
        '[[ui-debug|Debug]] — the only role with access'
      ]),
      p('In short: everything required to take a warehouse or factory from having no fleet to running one.'),
      h('The earlier table'),
      p(
        'A permission table made earlier lists these same four: Operator, Fleet Supervisor, Supervisor (Head of Operations) and Solutions Architect (Configurator). It is preserved in full on [[roles-and-permissions]], and it remains the most detailed statement of who can do what that exists.'
      ),
      callout(
        'The names are confusing',
        'Fleet Supervisor, Fleet Manager, Fleet Monitor and Supervisor Mode all sound alike and mean different things — two are people, two are software. The disambiguation table on [[ati-flow]] is the reference to use when the terms collide.',
        'gap'
      ),
      gap(
        'Two things are still unwritten. What each user needs from the newly proposed system has not been described separately from the earlier permission table. And the relationship between the Solutions Architect and [[v-deployment-manager|Deployment Manager]] — the tool Ati support engineers use to configure and deploy robots — has not been established, although they describe closely related work.'
      )
    ],
    related: ['roles-and-permissions', 'v-operator', 'v-fleet-supervisor', 'v-head-of-operations', 'v-solutions-architect', 'v-deployment-manager', 'configuration-layers', 'open-questions']
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
      callout(
        'These four roles are the four users',
        [
          'The newly proposed system is designed around the same four people described here — see [[users]]. Two questions remain open: whether the Fleet Supervisor layer is needed at all, and whether the fourth should be called Solutions Architect or Configurator.',
          'One row is also under question. The current understanding of the [[v-fleet-supervisor|Fleet Supervisor]] is narrower than the table below: handling robots with issues, with no data to manage anything else. The table gives them reassignment control and view access to Maps and Workflows. The two have not been reconciled.'
        ],
        'gap'
      ),
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
    revisions: [
      {
        date: '2026-09-16',
        author: 'Annuai',
        note: 'Flagged that this four-role table predates the user model now proposed, and linked to the Users page.'
      },
      {
        date: '2026-09-16',
        author: 'Annuai',
        note: 'Corrected: with Solutions Architect confirmed as the fourth user, this table and the user model agree. The open points are the Fleet Supervisor layer and the Solutions Architect naming.'
      }
    ],
    related: ['users', 'information-architecture', 'zone', 'ui-debug', 'd-role-based-visibility', 'v-escalation']
  }
];
