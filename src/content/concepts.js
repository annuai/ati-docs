import { p, h, list, table, callout, gap, chain, flow, relationship, figure, defs } from './blocks.js';

// Knowledge contributed directly by the Ati team rather than found in this folder.
const TEAM_C = 'Ati team — noted September 2026';

const S = {
  glossary: 'old/ati-flow-glossary.html',
  architecture: 'old/ati-flow-architecture.html',
  deployment: 'old/amr-deployment-workflow.html',
  ia: 'old/amr-software-ia-roles.html',
  screens: 'old/ati-flow-screens.html',
  overview: 'old/index.html',
  faq: 'old/ati-flow-faq.html',
  prototype: 'old/prototype/',
  prdV2: 'AtiFLOW v2.0.docx',
  prdV3: 'PRD_AtiFLOW_v3.0.docx',
  robotImage: 'public/assets/ati-sherpa.png'
};

export const concepts = [
  {
    id: 'robot',
    title: 'Robot',
    summary: 'One autonomous machine that drives itself around the factory and moves material.',
    simple:
      'A robot is a single machine on the floor. It finds its own way around, carries material from one place to another, and reports where it is and what it is doing.',
    aliases: ['AMR', 'bot', 'autonomous mobile robot'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.glossary, S.ia, S.deployment, S.architecture, S.prototype, S.robotImage],
    blocks: [
      h('Why it matters'),
      p(
        '**Robot** is the product-facing word. The technical term is [[v-amr|AMR]] — autonomous mobile robot — and it still appears in engineering and deployment conversations, but the interface says *Robot*. Getting this right keeps the product readable for an operator who has never met the acronym.'
      ),
      p(
        'A robot is also the smallest unit of capacity in the system. Everything above it — [[fleet|fleets]], [[orchestration]], [[trip|trips]] — exists to decide which robot should do what, and when.'
      ),
      figure(
        '/assets/ati-sherpa.png',
        'An Ati Sherpa XT Lite autonomous mobile robot: a yellow four-wheeled vehicle with a sensor mast, a safety beacon and a side access panel.',
        'The robot pictured in the Ati Flow prototype. The chassis is labelled Ati Sherpa XT Lite — the only hardware naming that appears anywhere in the source material.'
      ),
      h('How it works'),
      p(
        'The robot handles its own movement. Navigation, perception, localization, safety and drive systems all run on the machine — Ati Flow tells it *what* to do, not how to steer. The software running on the robot itself is called [[v-mule|Mule]].'
      ),
      p('Configuration that belongs to an individual robot, set during infrastructure setup:'),
      list([
        'Network credentials and robot ID',
        'Safety parameters — maximum speed, footprint, sensor calibration',
        'Payload profile and drive parameters'
      ]),
      callout(
        'Robot configuration is not map configuration',
        'These per-robot settings are deliberately kept separate from [[map]] and [[missions-and-actions|mission]] configuration, which come later in the deployment and describe the environment and the work rather than the machine.'
      ),
      h('What you see about a robot'),
      p('In the live view, a robot is presented through a small, fixed set of facts:'),
      list([
        'An identifier and a current [[robot-states|state]], for example *Moving* or *Blocked*',
        'Battery level, shown as a percentage and a bar',
        'The [[trip]] it is on and its next station',
        'A short recent-activity timeline'
      ]),
      gap(
        'No source in this folder documents robot hardware specifications — payload capacity, battery capacity, dimensions, speed ranges or the available robot variants. `Sherpa XT Lite` is known only because it is printed on the robot in the product render.'
      )
    ],
    related: ['fleet', 'robot-states', 'trip', 'zone', 'v-amr', 'v-mule']
  },

  {
    id: 'fleet',
    title: 'Fleet',
    summary: 'A coordinated group of robots operating within a deployment.',
    simple:
      'A fleet is all the robots working together at a site. Instead of driving each robot yourself, you manage them as one group and let the system decide which robot takes which job.',
    aliases: ['fleet layer', 'fleet management'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.glossary, S.deployment, S.architecture, S.ia],
    blocks: [
      h('Why it matters'),
      p(
        'One robot following one route is a machine. Several robots sharing corridors, stations and charging docks is a traffic problem. The fleet layer is where that problem is solved: it turns individual [[missions-and-actions|missions]] into a working group.'
      ),
      h('How it works'),
      p('Fleet management covers four kinds of decision:'),
      list([
        '**Task allocation** — how an incoming request gets assigned to a specific idle or nearby robot',
        '**Traffic arbitration** at shared resources such as gates and exclusion zones — this is where contention and deadlock actually get tested',
        '**Charging and idle behaviour** — idle robots are typically sent to charging stations and staging positions automatically, without touching robots locked into a user-defined mission',
        '**Priority and aging rules**, where manual escalation needs to be supported'
      ]),
      callout(
        'A fleet is one of four primitives',
        'The architecture names four product primitives: [[map|Map]], [[workflow|Workflow]], Fleet and [[robot|Robot]]. The question a fleet answers is *how are multiple robots coordinated?*'
      ),
      h('Where a fleet appears in the product'),
      p(
        'Fleet coordination is configured during deployment and observed afterwards in [[ui-fleet-monitor|Fleet Monitor]], which presents robots, tasks and traffic organised around [[zone|zones]].'
      ),
      gap(
        'How a fleet relates as a record to a [[zone]], a [[processing-zone|processing zone]] or a site is not defined in the source material. Whether one site has one fleet or several is an open question.'
      )
    ],
    related: ['robot', 'orchestration', 'traffic-control', 'zone', 'ui-fleet-monitor']
  },

  {
    id: 'zone',
    title: 'Zone',
    summary: 'A geographical operating area, used to organise access and operational responsibility.',
    simple:
      'A zone is a part of the factory floor. It decides which robots work where, and which people are responsible for what.',
    aliases: ['geographical zone', 'operating area'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.glossary, S.ia, S.deployment, S.prototype],
    blocks: [
      h('Why it matters'),
      p(
        'Zones are how the product divides a large floor into something a person can be responsible for. An [[roles-and-permissions|Operator]] sees their own zone. A Fleet Supervisor owns one or more zones. A Head of Operations sees all of them. [[ui-fleet-monitor|Fleet Monitor]] is described as a live, zone-based view of robots, tasks and traffic.'
      ),
      h('The word is used in more than one way'),
      p(
        'In the information architecture, *zone* means a geographical area. During [[map-annotation|map annotation]], several other things are also called zones. They are worth keeping apart:'
      ),
      defs([
        {
          term: 'Zone (geographical)',
          text: 'An operating area used to organise robot access and human responsibility. This is the meaning used by Fleet Monitor and the role model.'
        },
        {
          term: 'Behavioural zone',
          text: 'An area that changes how a robot behaves whenever it is inside — a speed-limited zone, a ramp zone, a docking zone. Always active based on location, like a school zone.'
        },
        {
          term: 'Exclusion zone',
          text: 'A traffic-control construct governing multi-robot access to a single-lane or alternating-direction section. Deliberately separate from behavioural zones.'
        },
        {
          term: 'Forbidden and preferred zone',
          text: 'Areas to avoid entirely, versus areas to bias routing toward.'
        }
      ]),
      callout(
        'Mixed fleets',
        'Where a deployment runs more than one robot type, map annotation is also where zone access is differentiated by robot type.'
      ),
      p('See also [[processing-zone]], which the sources treat as a separate and less settled idea.')
    ],
    related: ['processing-zone', 'map-annotation', 'traffic-control', 'roles-and-permissions']
  },

  {
    id: 'processing-zone',
    title: 'Processing Zone',
    summary: 'A prototype label whose relationship to Processing Area, Station and Staging Area is not yet settled.',
    simple:
      'Processing Zone is a label in the existing prototype. The source documents define Processing Area and Station, but do not define Processing Zone, so it should not be used as a catch-all name for either.',
    aliases: ['zone selector'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-16',
    revisions: [
      {
        date: '2026-09-17',
        author: 'Annuai',
        note: 'Separated the prototype-only Processing Zone label from the PRD-defined Processing Area and Station / Staging Area terms.'
      }
    ],
    sources: [S.glossary, S.prototype, S.faq, S.prdV2, S.prdV3],
    blocks: [
      callout(
        'This definition is not settled',
        'The prototype uses **Processing Zone** above a selector. The supplied [[v-prd|PRDs]] use **Processing Area** for a plant-level configuration boundary, and **Station** as the canonical shared entity for material flow. Neither PRD defines Processing Zone.',
        'gap'
      ),
      h('What the sources actually show'),
      p(
        'The Ati Flow prototype puts a **Processing Zone** label directly above a selector whose value is *Zone 24*. The v2 PRD defines a [[v-processing-area|Processing Area]] as the place where materials, containers, workflows, devices, machines and inventory are configured together. The v3 PRD defines [[v-station|Station]] as the shared entity that connects machines, workflows and staging material. These are not descriptions of the same thing.'
      ),
      p(
        'A [[v-staging-area|Staging Area]] is also a station in the v3 material-flow model, but older material uses *staging area* for a place idle robots wait. That ambiguity needs its own decision rather than being hidden inside the word “zone”.'
      ),
      h('How to talk about it until it is confirmed'),
      list([
        'Use [[v-processing-area|Processing Area]] for the v2 plant configuration boundary.',
        'Use [[v-station|Station]] for the v3 canonical pickup, drop-off, workflow and machine entity.',
        'Use [[v-staging-area|Staging Area]] only with its intended meaning made clear: material holding or idle-robot waiting.',
        'Avoid using *Processing Zone* in new documentation until the product terminology is finalised.'
      ]),
      gap(
        'Decide whether the prototype label should become **Processing Area**, remain **Processing Zone** with a distinct definition, or be removed. Also decide whether material-holding and idle-robot staging need separate names.',
        'Terminology decision required'
      )
    ],
    related: ['zone', 'material-flow', 'open-questions', 'v-processing-area', 'v-station', 'v-staging-area']
  },

  {
    id: 'map',
    title: 'Map',
    summary: 'The spatial substrate the robot uses to know where it is.',
    simple:
      'The map is the robot’s picture of the building. On its own it holds no rules and no meaning — it only lets a robot work out where it is standing.',
    aliases: ['SLAM map', 'point cloud'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    revisions: [
      {
        date: '2026-09-17',
        author: 'Annuai',
        note: 'Recorded that autonomy engineers and Solutions Architects mean different things by “map”, that the shared name is deliberate, and that whether to keep it is unresolved.'
      }
    ],
    sources: [TEAM_C, S.glossary, S.deployment, S.architecture],
    blocks: [
      h('Why it matters'),
      p(
        'The map is the layer everything else is stacked on. It is built purely for localization and has no inherent concept of zones or business logic — those are added afterwards during [[map-annotation|map annotation]].'
      ),
      p('Of the four product primitives, the map answers: *where can the robot move, and what rules apply there?*'),
      h('Two different things are called a map'),
      p('The word does double duty, and the two meanings are not the same thing:'),
      defs([
        {
          term: 'A map, to an autonomy engineer',
          text: 'The localisation substrate. A point cloud the robot uses to work out where it is standing, with no routes, no rules and no business meaning attached. This is the sense the rest of this page describes.'
        },
        {
          term: 'A map, to a [[v-solutions-architect|Solutions Architect]]',
          text: 'What Ati Flow shows them: the floor plan with the drawn routes on it — the thing they look at and work with when setting a site up. See [[ui-maps|the Maps surface]].'
        }
      ]),
      p(
        'They carry the same name on purpose, on the grounds that one word is simpler to learn than two. The cost is that an autonomy engineer and a Solutions Architect can talk about “the map” for a while before either notices they mean different things.'
      ),
      callout(
        'Whether to keep one word is unresolved',
        'Using one name keeps the product easy to explain. Splitting them would make the two layers explicit, at the cost of vocabulary most users do not need. This has not been decided. See [[open-questions]].',
        'gap'
      ),
      h('How it is built'),
      flow([
        {
          title: 'Drive or walk the full area',
          note: 'The robot is manually taken through the whole operating area to build the point cloud map.'
        },
        {
          title: 'Run loop closure where drift could accumulate',
          note: 'Pose graph optimization is applied on long corridors or loops. This is judged iteratively rather than flagged automatically.'
        },
        {
          title: 'Validate by driving it a second time',
          note: 'Map quality is checked against self-localization confidence, not just against how complete it looks.',
          kind: 'outcome'
        }
      ]),
      h('Point cloud now, 2D at run time'),
      p(
        'What map creation produces and what the robot runs against are two different artefacts. Building produces a **point cloud**. At run time that point cloud is compressed into a **2D map**, which keeps compute load — and therefore cost — down. Algorithms such as **PointPillars** are run against the full point cloud to establish accurate global localization, but only when that accuracy is actually needed. See [[v-map-creation]].'
      ),
      callout(
        'One map, many robot types',
        'Lifters, pallet movers and tuggers can typically share the same map. Duplicate maps per zone are not required.'
      ),
      p(
        'Once real traffic patterns are visible after go-live, map and zone corrections are usually the first thing adjusted — the [[wf-deployment|deployment workflow]] loops straight back to this stage.'
      )
    ],
    related: ['map-annotation', 'v-slam', 'v-map-creation', 'v-pose-graph-optimisation', 'traffic-control', 'wf-deployment']
  },

  {
    id: 'map-annotation',
    title: 'Map annotation',
    summary: 'The operational meaning layered on top of a raw map.',
    simple:
      'Annotation is where the map stops being a picture and starts being instructions: this is a pickup point, slow down here, only one robot at a time through there.',
    aliases: ['annotation', 'positions and zones'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.glossary, S.deployment],
    blocks: [
      h('Why it matters'),
      p(
        'A raw [[map]] tells a robot where it is. Annotation tells it what the place means. Without it there is nowhere to pick up, nowhere to drop off, and no rule about how to behave on a ramp or in a narrow aisle.'
      ),
      h('What gets added'),
      defs([
        {
          term: 'Positions and stations',
          text: 'Exact pickup, drop-off, docking and charging points, each with an entry-point orientation.'
        },
        {
          term: 'Behavioural zones',
          text: 'Speed-limited zones, ramp zones and docking zones. Always active based on location, like a school zone.'
        },
        {
          term: 'Traffic control — gates and exclusion zones',
          text: 'Separate from behavioural zones. These govern multi-robot access at single-lane or alternating-direction sections. See [[traffic-control]].'
        },
        {
          term: 'Forbidden and preferred zones',
          text: 'Areas to avoid entirely, versus areas to bias routing toward.'
        }
      ]),
      p('Where a deployment runs mixed robot types, this is also where zone access is differentiated by type.'),
      callout(
        'Where this lives in the product',
        'Annotation is done on the [[ui-maps|Maps]] surface, which the role model gives to the Solutions Architect (Configurator) to edit and to everyone else to view.'
      )
    ],
    related: ['map', 'zone', 'traffic-control', 'ui-maps']
  },

  {
    id: 'missions-and-actions',
    title: 'Missions and actions',
    summary: 'How transport behaviour is composed, from single actions up to repeatable mission patterns.',
    simple:
      'An action is one thing a robot can do, like go to a position or dock. A mission is a sequence of those actions that gets a real job done.',
    aliases: ['mission', 'mission design', 'action', 'sub-mission'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.glossary, S.deployment],
    blocks: [
      h('Why it matters'),
      p(
        'Missions are where the annotated [[map]] becomes actual transport behaviour. They are the unit a [[fleet]] allocates and a [[robot]] executes.'
      ),
      h('How it is composed'),
      p('Build the smallest pieces first, then compose upwards:'),
      relationship([
        { label: 'Action', note: 'go to position · dock · undock · wait · trigger I/O · request access to a resource' },
        { label: 'Sub-mission', note: 'a reusable pattern such as "go to charging station", built once instead of duplicated' },
        { label: 'Mission', note: 'an executable transport behaviour composed from actions and sub-missions' }
      ]),
      h('Mission patterns'),
      p('Three named patterns appear in the source material. Choose one per use case:'),
      table(
        ['Pattern', 'Shape', 'When it fits'],
        [
          ['Taxi', 'On-demand, point-to-point', 'A request arrives and one robot answers it'],
          ['Milk run', 'Fixed loop, multiple stops', 'Regular collection or delivery across several points'],
          ['Bus', 'Scheduled, repeating route', 'Movement that happens on a timetable rather than on demand']
        ]
      ),
      callout(
        '"Taxi" is a mission pattern, not a robot mode',
        'The glossary is explicit: *taxi mode* is not established as an industry term in this material, and should not be assumed to mean maintenance, teleoperation or manual driving. See [[v-taxi-mode]].',
        'gap'
      ),
      h('Priority and interrupts'),
      p(
        'Priority and interrupt behaviour is designed into the mission: whether it can be preempted, and where in its route preemption is safe. Real request patterns after go-live often show that a mission built for average conditions does not hold at peak load.'
      )
    ],
    related: ['workflow', 'fleet', 'map-annotation', 'v-taxi', 'v-milk-run', 'v-bus']
  },

  {
    id: 'workflow',
    title: 'Workflow',
    summary: 'The configured logic for transport behaviour — what should happen, expressed as missions and actions.',
    simple:
      'A workflow is the recipe. It says which steps make up a job, in what order, and how important that job is.',
    aliases: ['workflows', 'transport behaviour'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.glossary, S.ia, S.architecture, S.screens],
    blocks: [
      callout(
        'One word, two meanings',
        'In the product, a **workflow** is configured transport logic — it lives on the [[ui-workflows|Workflows]] surface next to Maps and Robots. In deployment conversations, *workflow* also means a human process, as in the [[wf-deployment|AMR deployment workflow]]. This documentation keeps the two in different sections and says which is meant.',
        'gap'
      ),
      h('Why it matters'),
      p(
        'Of the four product primitives, the workflow answers: *what sequence of actions should happen?* The [[map]] answers where, the [[fleet]] answers who, the workflow answers what.'
      ),
      h('What it contains'),
      list([
        '[[missions-and-actions|Mission and action design]] — the steps themselves',
        'Mission patterns — taxi, milk run, bus',
        'Priority rules — how urgent a job is and whether it can be interrupted'
      ]),
      h('Who touches it'),
      p(
        'Editing workflows is Configurator work. A Head of Operations can view and approve them, a Fleet Supervisor can view them to understand what is configured, and an Operator does not see them at all. See [[roles-and-permissions]].'
      )
    ],
    related: ['missions-and-actions', 'map', 'ui-workflows', 'roles-and-permissions']
  },

  {
    id: 'task',
    title: 'Task',
    summary: 'A unit of work assigned to a robot. The term is used throughout the sources but never formally defined.',
    simple:
      'A task is a piece of work waiting for a robot. The live view shows a queue of them, and the fleet decides which robot picks up which one.',
    aliases: ['task queue', 'task allocation'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.deployment, S.ia, S.glossary],
    blocks: [
      callout(
        'Used, but not defined',
        'No source file in this folder defines what a task is as a record. What follows is what the sources *show* about tasks, not a definition to rely on.',
        'gap'
      ),
      h('What the sources show'),
      list([
        'Fleet management includes **task allocation logic** — how an incoming request gets assigned to a specific idle or nearby robot.',
        '[[ui-fleet-monitor|Fleet Monitor]] is described as a live, zone-based view of robots, **tasks** and traffic.',
        'An Operator sees robot status and the **task queue** for their own zone.',
        'Day-to-day task queues and manual dispatch are explicitly *not* a Configurator concern — they are operational.'
      ]),
      h('Task or trip?'),
      p(
        'The prototype uses [[trip]] for the same general idea — a job a robot is doing right now, with an identifier and a next station. Whether a trip is one task, several tasks, or the execution record of a [[missions-and-actions|mission]] is not established anywhere. Treat the two as unreconciled until Ati confirms the model.'
      )
    ],
    related: ['trip', 'fleet', 'orchestration', 'ui-fleet-monitor', 'open-questions']
  },

  {
    id: 'trip',
    title: 'Trip',
    summary: 'The in-product name for a journey a robot is currently making. Visible in the UI, undefined in the documentation.',
    simple:
      'A trip is one journey: this robot, this load, from here to there. The live view shows its identifier and where the robot is heading next.',
    aliases: ['AMR trip', 'trip ID'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.prototype, S.faq],
    blocks: [
      callout(
        'Used, but not defined',
        'Trip appears only in the Ati Flow prototype. No written source in this folder defines it.',
        'gap'
      ),
      h('What the sources show'),
      list([
        'The prototype navigation includes an **AMR Trips** page.',
        'The robot detail panel has a **Trip Details** section containing a *Trip ID* and a *Next Station*.',
        'Trip identifiers follow the shape `TRP-20487`; stations follow `S100` to `S105`.',
        'The activity timeline records events such as *Trip TRP-20487 assigned*, which implies a trip is assigned to a robot rather than owned by it.'
      ]),
      p(
        'See [[task]] for the same ambiguity from the other direction, and [[ui-live-fleet-status]] for where a trip is displayed.'
      )
    ],
    related: ['task', 'robot', 'ui-live-fleet-status', 'material-flow']
  },

  {
    id: 'orchestration',
    title: 'Orchestration',
    summary: 'Turning a factory’s material demand into coordinated robot work.',
    simple:
      'Ati coordinates where material needs to go, which robot should move it, and when the movement should happen.',
    aliases: ['material orchestration', 'orchestration layer'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.overview, S.architecture, S.glossary],
    blocks: [
      h('Why it matters'),
      p(
        'Orchestration is the reason the product exists. Ati Flow is described as the software layer for **automated material orchestration**, sitting between a factory’s material movement requirements and the robot fleet that executes those movements.'
      ),
      h('More detail'),
      p(
        'The orchestration layer translates configured [[workflow|workflows]] and incoming requests into executable work. [[map|Maps]], workflows, [[fleet|fleets]], [[robot|robots]] and operational monitoring all meet here.'
      ),
      chain(
        [
          { title: 'Factory demand', note: 'Production and material needs' },
          { title: 'Integrations', note: 'ERP / MES signals' },
          { title: 'Workflows', note: 'What should happen' },
          { title: 'Maps', note: 'Where and how to move' },
          { title: 'Fleet', note: 'Who executes it' },
          { title: 'Robot', note: 'Physical execution' }
        ],
        'The core chain, as stated in the overview: factory need becomes a movement request, a configured workflow, fleet coordination, and finally robot execution on the floor.'
      ),
      h('How the pieces relate'),
      relationship([
        { label: 'Robot', to: 'robot', note: 'belongs to' },
        { label: 'Fleet', to: 'fleet', note: 'coordinated by' },
        { label: 'Orchestration', to: 'orchestration', note: 'turns demand into' },
        { label: 'Tasks and trips', to: 'task', note: 'which move' },
        { label: 'Material', to: 'material-flow' }
      ]),
      callout(
        'Orchestration is not autonomy',
        'The sources separate orchestration from the robot’s own navigation, perception and safety stack. Ati Flow decides what should happen; the robot decides how to drive.'
      )
    ],
    related: ['material-flow', 'fleet', 'workflow', 'integrations', 'ati-flow']
  },

  {
    id: 'material-flow',
    title: 'Material flow',
    summary: 'The movement of material through the factory — the thing the whole system exists to coordinate.',
    simple:
      'Material flow is stuff getting where it needs to be: parts to a line, finished work away from it, at the right time.',
    aliases: ['material movement', 'WIP flow'],
    status: 'draft',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.overview, S.deployment, S.architecture, S.screens, S.prototype],
    blocks: [
      h('Why it matters'),
      p(
        'Material flow is the outcome the product is measured against. The architecture puts it at the end of the chain as the physical result in the factory, and the operational reading framework asks, when something goes wrong, whether the issue is isolated or **affecting material flow**.'
      ),
      h('What the sources establish'),
      list([
        'Site assessment begins by asking what material moves where, how often, and under what deadline pressure. That answer becomes the basis for mission and priority logic later.',
        'Payload types and the handling method — top-load, tugger/cart, lift, or conveyor interface — are established at the same stage.',
        'Demand can come from business data: due dates, line schedules and stock levels can compute priority implicitly rather than relying on manual escalation.',
        'The prototype navigation includes **Staging Area** and **WIP Inventory**, and its content head offers a *Search Material* control.'
      ]),
      gap(
        'There is no model of material itself in any source: no definition of a material, a material type, a container, a load or a unit. `WIP Inventory` and `Staging Area` are navigation labels with no documented content behind them.'
      )
    ],
    related: ['orchestration', 'wf-material-movement', 'v-wip', 'processing-zone']
  },

  {
    id: 'traffic-control',
    title: 'Traffic control',
    summary: 'How several robots share the same corridors, stations and doorways without blocking each other.',
    simple:
      'When two robots want the same narrow aisle, something has to decide who goes first. Traffic control is that decision.',
    aliases: ['gates', 'exclusion zone', 'arbitration', 'deadlock'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.deployment],
    blocks: [
      h('Why it matters'),
      p(
        'A single robot on a route rarely fails. A fleet fails where routes overlap. Traffic control is configured during [[map-annotation|map annotation]] and then exercised by the [[fleet]] layer at runtime — and it is explicitly called out as where contention and deadlock actually get tested.'
      ),
      h('What it is made of'),
      defs([
        {
          term: 'Gates',
          text: 'Access control at a point where only one robot may pass at a time.'
        },
        {
          term: 'Exclusion zones',
          text: 'Sections — single-lane or alternating-direction — where multi-robot access has to be arbitrated. Kept deliberately separate from behavioural zones, which only change how a robot drives.'
        },
        {
          term: 'Request access to a resource',
          text: 'One of the atomic actions a mission can contain, which is how a mission participates in arbitration.'
        }
      ]),
      h('VISA — first in, first served'),
      p(
        '**[[v-visa|VISA]]** is Ati’s name for first-in-first-out approval. In a VISA-controlled zone the first robot to arrive is granted the visa and proceeds; any other robot waits. When the first robot clears the area it entered, the next one receives its clearance. It is used particularly at intersections, where traffic can arrive from several directions at once.'
      ),
      p(
        'The appeal of a first-in-first-out rule is that it is predictable. An operator watching two robots at a junction can tell which will move, and why.'
      ),
      callout(
        'How VISA relates to gates is not documented',
        'Gates, exclusion zones and VISA all govern multi-robot access. Whether VISA is the implementation of the gate concept described in the deployment material, or a separate mechanism alongside it, has not been established.',
        'gap'
      ),
      h('How it is tested'),
      p(
        'Edge cases are probed deliberately rather than waited for: two robots approaching the same gate simultaneously, a station occupied on arrival, a manual priority escalation mid-cycle. See [[wf-exceptions]].'
      )
    ],
    revisions: [
      {
        date: '2026-09-16',
        author: 'Annuai',
        note: 'Added VISA, Ati’s first-in-first-out approval mechanism for shared zones and intersections.'
      }
    ],
    related: ['v-visa', 'map-annotation', 'fleet', 'wf-exceptions', 'zone']
  },

  {
    id: 'robot-states',
    title: 'Robot states',
    summary: 'What a robot can be doing, as far as the source material establishes it.',
    simple:
      'A robot is always in some state — moving, stopped and stuck, or out of service. The state is the first thing an operator reads.',
    aliases: ['status', 'moving', 'blocked', 'maintenance', 'idle'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.prototype, S.glossary, S.deployment, S.faq],
    blocks: [
      callout(
        'This is not a complete state machine',
        'Only some states appear in the sources, and they come from different places. The real state list is an open question that the source material itself raises.',
        'gap'
      ),
      h('States that appear in the sources'),
      table(
        ['State', 'Where it comes from', 'What it means'],
        [
          ['Moving', 'Prototype status pill and map legend', 'The robot is executing a trip. Shown in yellow on the map.'],
          ['Blocked', 'Prototype status pill and map legend', 'The robot has stopped because something is in the way. Shown in red, with a pulsing halo on the map.'],
          [
            'Maintenance',
            'Glossary',
            'Used to remove a robot from normal dispatch while it is being serviced. The exact implementation and permissions should be confirmed.'
          ],
          [
            'Idle',
            'Deployment stage 6',
            'Not shown as a state in the UI, but referred to in prose: idle robots are sent to charging stations and staging positions automatically.'
          ]
        ]
      ),
      h('Open questions the sources raise themselves'),
      list([
        'What exact robot states exist in the production system?',
        'Is Maintenance a fleet-visible state, a robot-local state, or both?',
        'Does a robot under maintenance still count as available capacity?',
        'What is the authoritative source for robot availability?'
      ]),
      p(
        'One design principle is relevant here: expose the operational decision a user needs rather than reproducing every internal robot state. Low-level state belongs in [[ui-debug|Debug]]. See [[d-expose-the-decision]].'
      )
    ],
    related: ['robot', 'ui-live-fleet-status', 'wf-exceptions', 'open-questions']
  },

  {
    id: 'integrations',
    title: 'Integrations',
    summary: 'The connection between Ati Flow and the business systems that create demand.',
    simple:
      'The factory’s existing systems already know what needs to be made and when. Integrations let those systems ask for a movement, and hear back when it is done.',
    aliases: ['ERP integration', 'SAP', 'MES', 'master data'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.deployment, S.architecture, S.ia, S.overview],
    blocks: [
      h('Why it matters'),
      p(
        'Without an integration, every movement has to be requested by a person. With one, the factory’s own demand drives the [[fleet]] — which is what makes [[orchestration]] automatic rather than manual.'
      ),
      h('What it covers'),
      list([
        '**API hooks** so an external system — an ERP such as SAP — can trigger a mission and receive status or completion updates back',
        '**Implicit priority** computed from business data: due dates, line schedules, stock levels — rather than relying purely on manual escalation',
        '**Master data alignment**: explicitly defining what is configured at this layer versus what belongs to map or mission configuration'
      ]),
      callout(
        'A known source of confusion',
        'The deployment material calls master data alignment out by name as a common source of cross-team confusion. See [[configuration-layers]] for where each kind of configuration belongs.'
      ),
      p(
        'The overview diagram names **ERP / MES signals** as the input to this layer. MES appears only in that diagram; it is not defined anywhere in the source material.'
      ),
      h('Which systems get connected'),
      p(
        'Ati Flow’s orchestration layer connects to APIs from [[v-erp|ERP]] and [[v-wms|warehouse management]] providers, chosen according to what the client already runs. The connection set is per-deployment rather than fixed.'
      )
    ],
    revisions: [
      {
        date: '2026-09-16',
        author: 'Annuai',
        note: 'Recorded that the orchestration layer connects to ERP and warehouse management APIs chosen per client.'
      }
    ],
    related: ['configuration-layers', 'orchestration', 'ui-integrations', 'v-erp', 'v-wms']
  },

  {
    id: 'configuration-layers',
    title: 'Configuration layers',
    summary: 'Which settings belong to the robot, the map, the mission, the fleet, or the business system.',
    simple:
      'Almost every confusing question about Ati Flow is really the same question: where is this configured? There are five answers, and they are set in order.',
    aliases: ['what is configured where', 'configuration'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.deployment, S.architecture, S.ia],
    blocks: [
      h('Why it matters'),
      p(
        'The deployment material returns to this point three separate times — robot configuration is *conceptually distinct* from map and mission configuration, and master data alignment is named as a common source of cross-team confusion. Knowing which layer owns a setting is most of the battle.'
      ),
      h('The five layers'),
      table(
        ['Layer', 'What is configured here', 'Set during'],
        [
          [
            'Robot',
            'Network credentials, robot ID, safety parameters (max speed, footprint, sensor calibration), payload profile, drive parameters',
            'Infrastructure setup'
          ],
          ['Map', 'The point cloud used for localization', 'Mapping (SLAM)'],
          [
            'Map annotation',
            'Positions and stations, behavioural zones, gates and exclusion zones, forbidden and preferred areas, per-type zone access',
            'Map annotation'
          ],
          ['Mission', 'Actions, sub-missions, mission patterns, priority and interrupt behaviour', 'Mission design'],
          ['Fleet', 'Task allocation, traffic arbitration, charging and idle behaviour, priority and aging', 'Fleet management'],
          ['Business system', 'API hooks, implicit priority rules, master data mapping', 'ERP integration']
        ]
      ),
      callout(
        'Order matters',
        'Each layer depends on the one above it. You cannot annotate a map that does not exist, and you cannot design a mission without positions to move between. The [[wf-deployment|deployment workflow]] runs in exactly this order.'
      ),
      h('Who configures what'),
      p(
        'Configuration authority sits with the Solutions Architect (Configurator). Operational control — reassigning a robot, raising a priority — sits with Operators and Supervisors. See [[roles-and-permissions]].'
      )
    ],
    related: ['wf-deployment', 'roles-and-permissions', 'integrations', 'map-annotation', 'd-keep-the-layers-clear']
  },

  {
    id: 'engineering-documents',
    title: 'Engineering documents',
    summary: 'The documents a product is specified, built and risk-checked against — PRD, FRD, BOM and DFMEA.',
    simple:
      'Before a thing gets built, four questions get written down: what it should do, how it must behave, what it is made of, and how it could fail. Each question has its own document.',
    aliases: ['PRD', 'FRD', 'BOM', 'DFMEA', 'requirements documents', 'product documentation'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [S.prdV2, S.prdV3, TEAM_C],
    blocks: [
      h('Why it matters'),
      p(
        'Ati is an [[v-oem|OEM]]: it builds both the robots and the software that runs them. That means two engineering traditions meet in the same company. The software side specifies in [[v-prd|PRDs]] and [[v-frd|FRDs]]; the hardware side builds against a [[v-bom|BOM]] and risk-checks the design with a [[v-dfmea|DFMEA]]. A new joiner is likely to be handed one of these and expected to know which question it answers.'
      ),
      p(
        'This system is not a replacement for any of them. A PRD is a decision record written before the work; this documentation describes what exists afterwards. Where the two disagree, the PRD is the source and this page is the thing that needs correcting.'
      ),
      h('The four documents'),
      table(
        ['Document', 'The question it answers', 'Written', 'Side'],
        [
          ['[[v-prd|PRD]] — Product Requirements Document', 'What should this product do, and why?', 'Before design', 'Software and hardware'],
          ['[[v-frd|FRD]] — Functional Requirements Document', 'How must the system behave, function by function?', 'After the PRD, before build', 'Software'],
          ['[[v-bom|BOM]] — Bill of Materials', 'What is it made of, and how many of each?', 'During and after design', 'Hardware'],
          ['[[v-dfmea|DFMEA]] — Design Failure Mode and Effects Analysis', 'How could this design fail, and what are we doing about it?', 'During design, revisited as it changes', 'Hardware']
        ]
      ),
      p(
        'They are not a sequence so much as four views of the same product. A PRD that no BOM can be costed from is incomplete; a DFMEA finding routinely sends a requirement back to the PRD.'
      ),
      h('What is established here'),
      p(
        'Two Ati PRDs are cited throughout this documentation — **AtiFLOW v2.0** and **PRD_AtiFLOW_v3.0**. They are the only Ati engineering documents this system has been traced to. Where they conflict, both readings are recorded and the conflict is listed in [[open-questions]] rather than resolved — see [[processing-zone]] and [[v-staging-area|staging area]] for two live examples.'
      ),
      callout(
        'A BOM here is not always a parts list',
        'The v3 PRD uses **BOM** inside the Structured [[v-requester-mode|requester mode]] flow — Machine → Station → Workflow → BOM — where it means the material a machine needs delivered, not the parts a robot is assembled from. Same acronym, two lists. See [[v-bom]].'
      ),
      h('What is not'),
      gap(
        'No FRD, BOM or DFMEA is present in this repository, and no source here records Ati’s own practice: whether functional detail is written separately from the PRDs or folded into them, who owns the hardware BOM, whether DFMEAs are run on the robot line, and where any of these documents live. The four definitions above are the general industry ones. Ati’s use of them is unconfirmed.'
      ),
      p(
        'Until that is written down, treat this page as a map of the vocabulary rather than a description of how Ati works.'
      )
    ],
    related: ['v-prd', 'v-frd', 'v-bom', 'v-dfmea', 'ati-robotics', 'robot', 'd-documentation-mirrors-the-product']
  }
];
