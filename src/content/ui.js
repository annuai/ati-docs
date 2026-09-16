import { p, h, list, table, callout, gap, defs, code } from './blocks.js';

const S = {
  glossary: 'old/ati-flow-glossary.html',
  ia: 'old/amr-software-ia-roles.html',
  screens: 'old/ati-flow-screens.html',
  architecture: 'old/ati-flow-architecture.html',
  deployment: 'old/amr-deployment-workflow.html',
  prototype: 'old/prototype/',
  prototypeCss: 'old/prototype/styles.css'
};

/*
  Entries with `kind: 'screen'` are rendered by the screen template, which lays out
  purpose / who uses it / what you can see / what you can do / states.
*/

export const ui = [
  {
    id: 'ui-live-fleet-status',
    slug: 'live-fleet-status',
    kind: 'screen',
    title: 'Live Fleet Status',
    summary: 'The live operational screen in the Ati Flow prototype: a facility map beside a robot detail panel.',
    simple:
      'One screen that answers "what is happening right now?" — a map of the floor with the robots on it, and everything known about whichever robot you select.',
    aliases: ['Live Status', 'fleet status', 'live map'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.prototype, S.prototypeCss],
    purpose:
      'Show the current state of the fleet in a zone, and let a person understand one robot in detail without leaving the view.',
    users: [
      'Reached from the prototype navigation as **Live Status**',
      'The sidebar shows a **Supervisor Mode** selector and a **Processing Zone** set to *Zone 24*'
    ],
    see: [
      'A facility map with robots, routes and stations drawn on it',
      'A chip over the map reading *3D LIVE MAP · Zone 24 · N robots online*',
      'A legend: active path, moving, blocked, station',
      'A selection readout naming the currently selected robot',
      'A detail panel for that robot: status pill, robot image, identifier, battery percentage and bar, current state',
      '**Trip Details** — trip ID and next station',
      '**Recent Activity** — a short timeline of events with timestamps'
    ],
    do: [
      'Select a robot by clicking it on the map',
      'Search for material from the content header',
      'Toggle **Show Layers** over the map',
      'Zoom and reset the map view',
      'Pause — and then resume — using the action at the foot of the detail panel',
      'Close the detail panel'
    ],
    states: [
      '**Moving** — the robot is executing a trip. Yellow on the map, teal status pill.',
      '**Blocked** — the robot has stopped. Red status pill, and a pulsing red halo around the robot on the map.',
      '**Paused / running** — the detail panel action toggles between Pause and Resume.',
      '**Nothing selected** — the detail panel can be closed; on narrow screens it is hidden entirely.'
    ],
    blocks: [
      h('Reading the identifiers'),
      p('Two identifier shapes appear on this screen:'),
      code('Trip       TRP-20487\nStation    S102'),
      h('How this screen relates to Fleet Monitor'),
      callout(
        'Two names for one idea',
        'The documented information architecture calls the live view **[[ui-fleet-monitor|Fleet Monitor]]**. This prototype calls it **Live Fleet Status** and navigates to it as **Live Status**. They describe the same kind of view. The naming has not been reconciled.',
        'gap'
      ),
      gap(
        'The prototype is the only record of this screen. There is no specification, no annotated design and no screenshot in this folder — the working prototype source is the reference. It is kept in `old/prototype/`.'
      )
    ],
    related: ['ui-fleet-monitor', 'robot-states', 'trip', 'ui-components', 'zone']
  },

  {
    id: 'ui-fleet-monitor',
    slug: 'fleet-monitor',
    kind: 'screen',
    title: 'Fleet Monitor',
    summary: 'The live, zone-based view of robots, tasks and traffic.',
    simple: 'The screen you watch to know whether the fleet is behaving.',
    aliases: ['monitor', 'live view'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.ia, S.screens, S.glossary],
    purpose: 'Answer the operational question: what is happening now?',
    users: [
      '**Operator** — their own zone',
      '**Fleet Supervisor** — their own zone or zones, with reassignment control',
      '**Head of Operations** — all zones',
      '**Configurator** — view only, to verify that a configuration behaves correctly'
    ],
    see: [
      'Live robots, tasks, traffic and zone-level operational state',
      'Robot status and the task queue for the zones the role can access'
    ],
    do: [
      'An Operator can raise a manual priority request, with the trade-off shown before confirming',
      'A Fleet Supervisor can reassign work within their zones'
    ],
    states: ['Not documented. See [[robot-states]] for the robot states the sources do establish.'],
    blocks: [
      callout(
        'Naming',
        'The prototype’s equivalent screen is called [[ui-live-fleet-status|Live Fleet Status]]. Treat the two entries as two records of the same view until Ati settles the name.'
      ),
      gap('No layout, field list or interaction detail for Fleet Monitor exists in the written sources — only its scope and who may use it.')
    ],
    related: ['ui-live-fleet-status', 'fleet', 'zone', 'task', 'roles-and-permissions']
  },

  {
    id: 'ui-robots',
    slug: 'robots',
    kind: 'screen',
    title: 'Robots',
    summary: 'Robot setup — add, edit, delete, name, assign to zone.',
    simple: 'The list of physical machines, and the place you register a new one.',
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.ia],
    purpose: 'Answer: what physical robots exist, and how are they set up?',
    users: [
      '**Operator** — view own zone: status and location, nothing to edit',
      '**Fleet Supervisor** — manage own zone: mark for maintenance, reassign',
      '**Head of Operations** — manage all: add, rename, reassign zone',
      '**Configurator** — full setup, including low-level parameters'
    ],
    see: ['Robots, their status and their location', 'Zone assignment'],
    do: ['Add, edit, delete and name a robot', 'Assign a robot to a zone', 'Mark a robot for maintenance', 'Configure low-level parameters (Configurator only)'],
    states: ['[[v-maintenance|Maintenance]] is the one robot condition the role model explicitly acts on here.'],
    blocks: [
      p(
        'The Robots page was added to the information architecture as a distinct surface, separate from the live view — setup rather than operation.'
      ),
      gap('No field list, form or layout is documented.')
    ],
    related: ['robot', 'zone', 'roles-and-permissions', 'v-maintenance']
  },

  {
    id: 'ui-maps',
    slug: 'maps',
    kind: 'screen',
    title: 'Maps',
    summary: 'SLAM mapping, positions, zones, and traffic and gate rules.',
    simple: 'Where the floor plan lives, and where you say what each part of it means.',
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.ia, S.screens, S.deployment],
    purpose: 'Answer: where can robots operate, and under what rules?',
    users: [
      '**Operator** — hidden',
      '**Fleet Supervisor** — view',
      '**Head of Operations** — view',
      '**Configurator** — full edit'
    ],
    see: ['The SLAM map', 'Positions and stations', 'Zones', 'Traffic and gate rules'],
    do: ['Build and validate a map', 'Annotate positions, behavioural zones, gates, exclusion zones, forbidden and preferred areas', 'Differentiate zone access by robot type'],
    states: ['Not documented.'],
    blocks: [
      p('For what annotation actually involves, see [[map-annotation]]. For how a map is produced, see [[map]] and [[wf-deployment]].'),
      gap('No editor layout, tool palette or interaction model is documented.')
    ],
    related: ['map', 'map-annotation', 'traffic-control', 'ui-workflows']
  },

  {
    id: 'ui-workflows',
    slug: 'workflows',
    kind: 'screen',
    title: 'Workflows',
    summary: 'Mission and action design, mission patterns, and priority rules.',
    simple: 'Where you describe the jobs robots do, step by step.',
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.ia, S.screens],
    purpose: 'Answer: what should robots do?',
    users: [
      '**Operator** — hidden',
      '**Fleet Supervisor** — view',
      '**Head of Operations** — view and approve',
      '**Configurator** — full edit'
    ],
    see: ['Missions and the actions they are composed from', 'Mission patterns — taxi, milk run, bus', 'Priority rules'],
    do: ['Build atomic actions and compose missions from them', 'Design reusable sub-missions', 'Set mission pattern, priority and interrupt behaviour', 'Approve a workflow (Head of Operations)'],
    states: ['Not documented. The role model implies at least an approval state, since a Head of Operations can "view & approve".'],
    blocks: [
      callout(
        'Not to be confused with the deployment workflow',
        'This surface holds configured transport behaviour. The [[wf-deployment|AMR deployment workflow]] is a human process. See [[workflow]] for the terminology note.'
      ),
      gap('No editor layout or authoring model is documented.')
    ],
    related: ['workflow', 'missions-and-actions', 'ui-maps', 'roles-and-permissions']
  },

  {
    id: 'ui-integrations',
    slug: 'integrations',
    kind: 'screen',
    title: 'Integrations',
    summary: 'ERP connections, master data mapping and sync logs.',
    simple: 'Where Ati Flow is wired into the factory’s own systems.',
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.ia, S.screens, S.deployment],
    purpose: 'Answer: where does demand come from, and is that connection healthy?',
    users: [
      '**Operator** — hidden',
      '**Fleet Supervisor** — hidden',
      '**Head of Operations** — view status: whether syncs are healthy, without configuring them',
      '**Configurator** — full configuration'
    ],
    see: ['ERP connections', 'Master data mapping', 'Sync logs'],
    do: ['Configure API hooks', 'Map master data', 'Check sync health'],
    states: ['Sync health is implied by "view status — whether syncs are healthy", but no state list is documented.'],
    blocks: [p('For what this layer does, see [[integrations]]. For where master data belongs, see [[configuration-layers]].')],
    related: ['integrations', 'configuration-layers', 'v-master-data', 'v-erp']
  },

  {
    id: 'ui-setup-and-config',
    slug: 'setup-and-config',
    kind: 'screen',
    title: 'Setup & Config',
    summary: 'Site, network, docks, and user and role management.',
    simple: 'The one-time setup of the site itself, plus who is allowed to do what.',
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.ia, S.screens],
    purpose: 'Answer: how is the site configured, and who has access?',
    users: [
      '**Operator** — hidden',
      '**Fleet Supervisor** — hidden',
      '**Head of Operations** — users and roles',
      '**Configurator** — full configuration'
    ],
    see: ['Site configuration', 'Network', 'Docks', 'Users and roles'],
    do: ['Configure the site, network and charging docks', 'Manage users and assign roles'],
    states: ['Not documented.'],
    blocks: [
      p('Dock placement decisions are made physically during [[wf-deployment|infrastructure setup]] and reflected here. See [[wf-charging]].')
    ],
    related: ['roles-and-permissions', 'wf-charging', 'v-dock', 'wf-deployment']
  },

  {
    id: 'ui-debug',
    slug: 'debug',
    kind: 'screen',
    title: 'Debug',
    summary: 'Low-level configuration and diagnostics. Configurator only.',
    simple: 'The technical screen for answering "why is this robot behaving like this?" — and it is deliberately not for everyone.',
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.ia, S.glossary, S.architecture],
    purpose: 'Answer the diagnostic question: why is the robot behaving this way?',
    users: ['**Configurator** — exclusive. Hidden from every other role, including the Head of Operations.'],
    see: ['Raw robot state', 'Calibration', 'Diagnostic logs'],
    do: ['Apply overrides', 'Inspect and calibrate low-level robot parameters'],
    states: ['Not documented.'],
    blocks: [
      callout(
        'Why it is walled off',
        'The architecture is explicit: expose the operational decision a user needs rather than reproducing every internal robot state. Debug is where that internal state is allowed to live. See [[d-debug-is-configurator-only]].'
      )
    ],
    related: ['d-debug-is-configurator-only', 'robot-states', 'roles-and-permissions', 'v-debug']
  },

  {
    id: 'ui-components',
    slug: 'components',
    title: 'Components',
    summary: 'The interface pieces the Ati Flow prototype is built from, and what each one is for.',
    simple:
      'A short catalogue of the repeated parts of the product interface — the sidebar, the status pill, the battery bar — and what each one tells you.',
    aliases: ['UI components', 'patterns library'],
    status: 'draft',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.prototype, S.prototypeCss],
    blocks: [
      callout(
        'Scope',
        'Everything here is read from the working prototype in `old/prototype/`. It records what exists, not a specification of what should exist.'
      ),
      h('Navigation and shell'),
      defs([
        {
          term: 'Sidebar',
          text: 'A fixed 256px column holding the logo, a mode selector, a zone selector, grouped primary navigation and a bottom group for Notifications, Settings and Profile. Collapses to a 64px icon rail below 820px.'
        },
        {
          term: 'Mode selector',
          text: 'A large teal gradient button reading **Supervisor Mode**. What it switches is not documented — see [[v-supervisor-mode]].'
        },
        {
          term: 'Zone selector',
          text: 'A pill-shaped control labelled **Processing Zone**, showing *Zone 24*. See [[processing-zone]].'
        },
        {
          term: 'Top bar',
          text: 'Back and forward buttons plus a global search field placeholdered *Search Ati Flow*.'
        },
        {
          term: 'Content head',
          text: 'Page title on the left, contextual controls on the right — a material search field and a **Show Layers** toggle.'
        }
      ]),
      h('Operational components'),
      defs([
        {
          term: 'Status pill',
          text: 'A rounded label with a leading dot showing a [[robot-states|robot state]]. Teal for Moving, red for Blocked.'
        },
        {
          term: 'Battery bar',
          text: 'A 6px track with a teal fill, paired with a percentage. Shown inside the Robot Details section.'
        },
        {
          term: 'Key/value row',
          text: 'The basic unit of the detail panel: a muted label on the left, an emphasised value on the right.'
        },
        {
          term: 'Activity timeline',
          text: 'A dotted list of recent events with timestamps. An amber dot marks an event that needs attention.'
        },
        {
          term: 'Map legend',
          text: 'A floating panel naming what the colours on the map mean: active path, moving, blocked, station.'
        },
        {
          term: 'Map tools',
          text: 'Reset view, zoom in and zoom out, floating bottom-right over the map.'
        },
        {
          term: 'Detail panel',
          text: 'A 340px scrolling card beside the map, holding everything known about the selected robot. Hidden entirely below 820px.'
        },
        {
          term: 'Primary action',
          text: 'A full-width teal button at the foot of the detail panel, toggling between Pause and Resume.'
        }
      ]),
      h('Visual language'),
      p(
        'The prototype uses white surfaces, fine grey borders, generously rounded cards (14–20px), teal for navigation and positive states, red for blocked and yellow for robots in motion. The documentation system reuses the same palette and surface treatment. See [[d-documentation-mirrors-the-product]].'
      ),
      gap(
        'There is no component library, no named design tokens beyond the CSS variables in the prototype stylesheet, and no documented component states beyond those listed above.'
      )
    ],
    related: ['ui-live-fleet-status', 'ui-states', 'ui-patterns', 'd-documentation-mirrors-the-product']
  },

  {
    id: 'ui-patterns',
    slug: 'patterns',
    title: 'Patterns',
    summary: 'How Ati explains and organises a screen — the reading order and the layer rule.',
    simple:
      'There is a repeatable way to describe any Ati Flow screen: say what decision the user is making, then what they need to see, then what they can do.',
    aliases: ['how to read the dashboard', 'screen framework'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.screens, S.architecture],
    blocks: [
      h('Explaining a screen'),
      p('The documented framework, in order:'),
      list(['The user’s decision', 'The information needed to make it', 'The action available']),
      p('Every screen entry in this section follows that order.'),
      h('Reading the dashboard'),
      list([
        '**Start with system state:** is the fleet operating normally?',
        '**Look for exceptions:** which robots, tasks or zones need attention?',
        '**Understand impact:** is the issue isolated or affecting material flow?',
        '**Act at the right layer:** operational intervention belongs in Fleet Monitor and Robots; configuration belongs in Maps, Workflows and Setup; low-level diagnosis belongs in Debug.'
      ]),
      h('The layer rule'),
      table(
        ['Question', 'Layer', 'Where it is answered'],
        [
          ['What is happening now?', 'Operations', 'Fleet Monitor'],
          ['What should happen?', 'Configuration', 'Maps, Workflows, Setup & Config'],
          ['Why is the robot behaving this way?', 'Diagnostics', 'Debug']
        ]
      ),
      p('See [[d-keep-the-layers-clear]] and [[d-expose-the-decision]].')
    ],
    related: ['ui-components', 'wf-exceptions', 'd-keep-the-layers-clear', 'information-architecture']
  },

  {
    id: 'ui-states',
    slug: 'states',
    title: 'States',
    summary: 'The states the interface actually shows, and where they come from.',
    simple: 'What a screen can look like when things are normal, when something is wrong, and when there is nothing to show.',
    status: 'draft',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.prototype, S.glossary, S.ia],
    blocks: [
      h('Robot states in the interface'),
      table(
        ['State', 'How it is shown', 'Source'],
        [
          ['Moving', 'Teal status pill; yellow robot on the map', 'Prototype'],
          ['Blocked', 'Red status pill; red pulsing halo on the map', 'Prototype'],
          ['Maintenance', 'Not shown in any prototype screen; described in the glossary and actionable from Robots', 'Glossary, IA'],
          ['Idle', 'Not shown as a state; referred to in prose about fleet behaviour', 'Deployment stage 6']
        ]
      ),
      h('Interface states'),
      defs([
        { term: 'Paused', text: 'The detail panel action switches from Pause to Resume, and robot motion stops.' },
        { term: 'Selected / not selected', text: 'The map shows a selection readout; the detail panel can be closed.' },
        { term: 'Layers on / off', text: 'A toggle in the content head, highlighted teal when active.' },
        { term: 'Hidden by role', text: 'Whole surfaces are absent, not disabled, for roles that should not see them. See [[d-role-based-visibility]].' }
      ]),
      gap(
        'Loading, empty, error and offline states are not designed or described anywhere in the source material. Neither is the complete robot state machine — see [[robot-states]].'
      )
    ],
    related: ['robot-states', 'ui-components', 'ui-live-fleet-status', 'd-role-based-visibility']
  }
];
