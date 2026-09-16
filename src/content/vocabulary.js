/*
  Vocabulary.

  Every entry here is backed by a source file in this folder. Terms that a reader might expect —
  WMS, Requester, Approver, Dispatcher — are deliberately absent because no source uses them.
  See docs/source-audit.md.

  kind: 'acronym' | 'term' | 'jargon'
  status: 'current' | 'draft' | 'needs-confirmation'
*/

import { gap } from './blocks.js';

const G = 'old/ati-flow-glossary.html';
const D = 'old/amr-deployment-workflow.html';
const I = 'old/amr-software-ia-roles.html';
const A = 'old/ati-flow-architecture.html';
const S = 'old/ati-flow-screens.html';
const O = 'old/index.html';
const F = 'old/ati-flow-faq.html';
const P = 'old/prototype/';
// Knowledge contributed directly by the Ati team rather than found in this folder.
const TEAM = 'Ati team — noted September 2026';

export const vocabulary = [
  {
    id: 'v-amr',
    term: 'AMR',
    expansion: 'Autonomous Mobile Robot',
    kind: 'acronym',
    simple: 'A robot that drives itself. Nobody steers it and it is not fixed to a rail or a track.',
    technical:
      'A mobile robot capable of navigating and performing transport work without continuous manual driving.',
    usedIn: ['Deployment conversations', 'Engineering documentation', 'The prototype page name "AMR Trips"'],
    note: 'The product-facing word is **Robot**. AMR is the technical term.',
    related: ['robot', 'v-robot'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [G, I, D]
  },
  {
    id: 'v-oem',
    term: 'OEM',
    expansion: 'Original Equipment Manufacturer',
    kind: 'acronym',
    simple: 'A company that makes the product it sells, instead of reselling or assembling someone else’s.',
    technical:
      'Ati is an OEM: the robots and the orchestration software that runs them are both built in-house. The fleet is not third-party software wrapped around third-party machines.',
    usedIn: ['Describing what kind of company Ati is'],
    related: ['ati-robotics', 'robot', 'ati-flow'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [TEAM]
  },
  {
    id: 'v-erp',
    term: 'ERP',
    expansion: 'Enterprise Resource Planning',
    kind: 'acronym',
    simple: 'The factory’s core business system. It knows what is being produced, when it is due, and what stock exists.',
    technical:
      'The external business system Ati Flow integrates with. SAP is the example named in the deployment material. Integration covers API hooks to trigger a mission and receive status back, implicit priority from business data, and master data alignment.',
    usedIn: ['Deployment stage 7', 'The Integrations surface', 'The architecture integration layer'],
    related: ['integrations', 'v-master-data', 'v-mes'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D, A, I]
  },
  {
    id: 'v-mes',
    term: 'MES',
    expansion: 'Manufacturing Execution System',
    kind: 'acronym',
    simple: 'A factory system that tracks production as it actually happens on the floor.',
    usedIn: ['The overview diagram, as a source of demand signals alongside ERP'],
    note: 'MES appears once, in a diagram label. No source in this folder defines it or describes an MES integration.',
    related: ['integrations', 'v-erp'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [O, A]
  },
  {
    id: 'v-slam',
    term: 'SLAM',
    expansion: 'Simultaneous Localization and Mapping',
    kind: 'acronym',
    simple: 'How a robot builds a map of a building while working out where it is inside that map.',
    technical:
      'The mapping stage of deployment. The robot is manually driven or walked through the full operating area to build a point cloud map, with pose graph optimization applied where drift could accumulate.',
    usedIn: ['Deployment stage 3', 'The Maps surface'],
    related: ['map', 'v-loop-closure', 'v-localization'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D, I]
  },
  {
    id: 'v-wip',
    term: 'WIP',
    expansion: 'Work In Progress',
    kind: 'acronym',
    simple: 'Material that has been started but is not finished — parts between one process and the next.',
    usedIn: ['The prototype navigation item "WIP Inventory"'],
    note: 'WIP appears only as a navigation label. No source describes what the WIP Inventory screen contains.',
    related: ['material-flow', 'v-staging-area'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [P]
  },

  {
    id: 'v-map-creation',
    term: 'Map creation',
    kind: 'term',
    simple:
      'Driving a robot around the building by hand so it can record the shape of the place and build a map of it.',
    technical:
      'A robot is run manually across the factory floor or warehouse to produce a **point cloud map**. At run time that point cloud is compressed into a 2D map, which keeps compute load — and therefore cost — down. Algorithms such as **PointPillars** are used against the full point cloud to establish accurate global localization, but only when that accuracy is actually needed.',
    aliases: ['mapping', 'point cloud map', 'PointPillars', '2D map'],
    usedIn: ['Stage 3 of a site deployment', 'The Maps surface'],
    note: 'The map that is built and the map the robot runs against are not the same artefact. Building produces a point cloud; running uses a 2D compression of it.',
    related: ['map', 'v-slam', 'v-pose-graph-optimisation', 'wf-deployment'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [TEAM, D]
  },
  {
    id: 'v-pose-graph-optimisation',
    term: 'Pose graph optimisation',
    kind: 'jargon',
    simple:
      'The maths that fixes a map when a robot drives a full loop and does not end up exactly where it started.',
    technical:
      'An algorithm used during map creation to find the zero point when a robot finishes a full loop somewhere other than where it began. Small errors accumulate over a long circuit, so the two ends of the loop disagree; pose graph optimisation reconciles them and corrects the map.',
    aliases: ['posegraph optimisation', 'pose graph optimization', 'PGO'],
    usedIn: ['Map creation, on long corridors or loops where drift could accumulate'],
    note: 'The deployment material names this in the same breath as [[v-loop-closure|loop closure]]. Loop closure is the situation — the loop not meeting itself — and pose graph optimisation is the algorithm applied to it.',
    related: ['v-loop-closure', 'v-map-creation', 'map', 'v-slam'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [TEAM, D]
  },
  {
    id: 'v-route-ops',
    term: 'Route Ops',
    kind: 'term',
    simple:
      'Changing how robots are allowed to move around the map — for example taking a station out of service.',
    technical:
      'Route operations are adjustments to the route network, such as excluding a station from the map. They are available in [[v-fleet-manager|Fleet Manager]] only, not in Ati Flow.',
    aliases: ['route operations', 'route ops'],
    usedIn: ['Fleet Manager'],
    note: 'This is a live gap between the two systems: an operator who needs a route operation today has to go to Fleet Manager to do it.',
    related: ['v-fleet-manager', 'map-annotation', 'v-station', 'traffic-control'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [TEAM]
  },
  {
    id: 'v-fleet-manager',
    term: 'Fleet Manager',
    kind: 'term',
    simple: 'The system Ati uses today for fleet operations. Ati Flow is intended to replace it.',
    technical:
      'The existing fleet system. It currently holds capabilities Ati Flow does not yet have — [[v-route-ops|Route Ops]] is one — and the intention is for Ati Flow to replace it over time.',
    aliases: ['fleet manager'],
    usedIn: ['Fleet operations today', 'Conversations about what Ati Flow still has to absorb'],
    note: 'Not the same thing as [[v-fleet-monitor|Fleet Monitor]], which is a page inside Ati Flow. The names are one word apart and mean different things: Fleet Manager is a separate system, Fleet Monitor is a screen.',
    blocks: [
      gap(
        'What else Fleet Manager does, how much of it Ati Flow has already absorbed, and when the replacement is expected are all undocumented.'
      )
    ],
    related: ['v-route-ops', 'v-fleet-monitor', 'ati-flow', 'fleet'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [TEAM]
  },
  {
    id: 'v-robot',
    term: 'Robot',
    kind: 'term',
    simple: 'One self-driving machine on the factory floor.',
    technical: 'The preferred product-facing term for an individual AMR in the current information architecture.',
    usedIn: ['Everywhere in the product interface', 'The Robots surface'],
    related: ['robot', 'v-amr', 'd-robot-over-amr'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [G, I]
  },
  {
    id: 'v-mule',
    term: 'Mule',
    kind: 'term',
    simple: 'The software that runs on an Ati robot. The name began as a nickname for prototypes and stuck.',
    technical:
      'The word is borrowed from the automotive industry, where a **test mule** is a prototype vehicle — the ones driven around wrapped in zebra-striped camouflage before the model reaches the market. Ati’s autonomy team used *mule* the same way, to talk about the prototype machines. Over time the name transferred from the prototypes to the software they ran, and it stayed. Today Mule is the software on Ati’s robots.',
    aliases: ['test mule', 'robot software'],
    usedIn: [
      'The autonomy team, originally to describe prototype vehicles',
      'Conversations about the software running on a robot'
    ],
    note: 'Two related senses share the word: the original prototype-vehicle meaning, and the software that now carries the name. Which one is meant is usually clear from context.',
    blocks: [
      gap(
        'What Mule covers is not yet written down — whether it is the robot’s whole autonomy stack, or one layer within it. See [[architecture]] for the responsibilities the architecture assigns to the machine itself.'
      )
    ],
    related: ['robot', 'architecture', 'v-amr'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [TEAM]
  },
  {
    id: 'v-fleet',
    term: 'Fleet',
    kind: 'term',
    simple: 'All the robots working together at a site.',
    technical: 'A coordinated group of robots operating within a deployment.',
    usedIn: ['Fleet Monitor', 'Deployment stage 6'],
    related: ['fleet', 'v-fleet-monitor'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [G, D]
  },
  {
    id: 'v-zone',
    term: 'Zone',
    kind: 'term',
    simple: 'A part of the factory floor, used to decide who is responsible for what.',
    technical: 'A geographical operating area used to organize access and operational responsibility.',
    usedIn: ['Fleet Monitor', 'The role and permission model'],
    related: ['zone', 'v-processing-zone', 'v-behavioural-zone'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [G, I]
  },
  {
    id: 'v-processing-zone',
    term: 'Processing zone',
    kind: 'term',
    simple: 'An area tied to a particular process rather than simply a patch of floor.',
    technical:
      'A configured area associated with a material-processing or operational context. The exact Ati data model should be confirmed before treating it as identical to a generic geographical zone.',
    usedIn: ['The prototype sidebar selector, above a value of "Zone 24"'],
    note: 'The glossary flags this term as unconfirmed. Do not assume it is the same as a geographical zone.',
    related: ['processing-zone', 'v-zone'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [G, P, F]
  },
  {
    id: 'v-behavioural-zone',
    term: 'Behavioural zone',
    kind: 'term',
    simple: 'An area that changes how a robot drives while it is inside — like a school zone.',
    technical:
      'A map annotation that is always active based on location: speed-limited zones, ramp zones, docking zones. Distinct from traffic control.',
    usedIn: ['Deployment stage 4', 'Map annotation'],
    related: ['map-annotation', 'v-exclusion-zone', 'zone'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D]
  },
  {
    id: 'v-exclusion-zone',
    term: 'Exclusion zone',
    kind: 'term',
    simple: 'A stretch only one robot may use at a time.',
    technical:
      'A traffic-control annotation governing multi-robot access at single-lane or alternating-direction sections. Separate from behavioural zones.',
    usedIn: ['Deployment stage 4', 'Fleet traffic arbitration in stage 6'],
    related: ['traffic-control', 'v-gate', 'map-annotation'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D]
  },
  {
    id: 'v-gate',
    term: 'Gate',
    kind: 'term',
    simple: 'A point where robots have to take turns.',
    technical:
      'A traffic-control annotation governing multi-robot access. Gates are where contention and deadlock are tested during fleet management.',
    usedIn: ['Deployment stages 4, 6 and 8'],
    related: ['traffic-control', 'v-exclusion-zone'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D]
  },
  {
    id: 'v-forbidden-zone',
    term: 'Forbidden zone',
    kind: 'term',
    simple: 'An area robots must never enter.',
    usedIn: ['Deployment stage 4'],
    related: ['map-annotation', 'v-preferred-zone'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D]
  },
  {
    id: 'v-preferred-zone',
    term: 'Preferred zone',
    kind: 'term',
    simple: 'An area routing should favour when there is a choice.',
    usedIn: ['Deployment stage 4'],
    related: ['map-annotation', 'v-forbidden-zone'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D]
  },
  {
    id: 'v-map',
    term: 'Map',
    kind: 'term',
    simple: 'The robot’s picture of the building, used to work out where it is.',
    technical:
      'The spatial substrate used for localization and operational behaviour. Purely for localization, with no inherent concept of zones or business logic.',
    usedIn: ['The Maps surface', 'Deployment stage 3'],
    related: ['map', 'v-map-annotation', 'v-slam'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [G, D]
  },
  {
    id: 'v-map-annotation',
    term: 'Map annotation',
    kind: 'term',
    simple: 'The meaning added on top of a raw map — where to stop, where to slow down, where to wait.',
    technical:
      'Operational information layered onto the raw map: stations, behavioural zones, traffic controls, forbidden areas and preferred areas.',
    usedIn: ['Deployment stage 4', 'The Maps surface'],
    related: ['map-annotation', 'v-map', 'v-station'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [G, D]
  },
  {
    id: 'v-position',
    term: 'Position',
    kind: 'term',
    simple: 'An exact spot a robot can be sent to, with the direction it should face on arrival.',
    technical: 'Pickup, drop-off, docking and charging points, each annotated with an entry-point orientation.',
    usedIn: ['Deployment stage 4', 'The Maps surface'],
    related: ['map-annotation', 'v-station'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D, I]
  },
  {
    id: 'v-station',
    term: 'Station',
    kind: 'term',
    simple: 'A named place where a robot picks something up, drops something off, or docks.',
    usedIn: ['Map annotation', 'The prototype, as station identifiers S100 to S105 and a "Next Station" field'],
    note: 'Station and position are used for overlapping ideas. No source distinguishes them precisely.',
    related: ['v-position', 'map-annotation', 'trip'],
    status: 'draft',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D, P]
  },
  {
    id: 'v-dock',
    term: 'Dock',
    kind: 'term',
    simple: 'The charging point a robot drives into when its battery is low.',
    technical:
      'Charging docks are placed during infrastructure setup — ideally distributed rather than centralized, and sized against peak-hour demand versus charge time. Docking is also one of the atomic mission actions.',
    usedIn: ['Deployment stages 2, 4 and 5', 'Setup & Config'],
    related: ['wf-charging', 'missions-and-actions'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D, I]
  },
  {
    id: 'v-workflow',
    term: 'Workflow',
    kind: 'term',
    simple: 'The recipe for a job: which steps, in what order, and how urgent.',
    technical: 'The configured logic for transport behaviour.',
    usedIn: ['The Workflows surface'],
    note: 'Also used informally to mean a human process, as in "the deployment workflow". The two meanings are unrelated.',
    related: ['workflow', 'v-mission', 'wf-deployment'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [G, I]
  },
  {
    id: 'v-mission',
    term: 'Mission',
    kind: 'term',
    simple: 'A sequence of robot actions that gets one job done.',
    technical: 'An executable transport behaviour composed from actions.',
    usedIn: ['Deployment stage 5', 'The Workflows surface'],
    related: ['missions-and-actions', 'v-action', 'v-sub-mission'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [G, D]
  },
  {
    id: 'v-action',
    term: 'Action',
    kind: 'term',
    simple: 'One single thing a robot can be told to do.',
    technical:
      'The atomic unit missions are composed from: go to position, dock, undock, wait, trigger I/O, request access to a resource.',
    usedIn: ['Deployment stage 5', 'The Workflows surface'],
    related: ['missions-and-actions', 'v-mission', 'v-sub-mission'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D]
  },
  {
    id: 'v-sub-mission',
    term: 'Sub-mission',
    kind: 'term',
    simple: 'A small reusable piece of a mission, written once and used in many places.',
    technical:
      'A reusable pattern for a common sequence — "go to charging station" is the example given — used instead of duplicating logic across missions.',
    usedIn: ['Deployment stage 5'],
    related: ['missions-and-actions', 'v-mission'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D]
  },
  {
    id: 'v-taxi',
    term: 'Taxi',
    kind: 'jargon',
    simple: 'A one-off trip: something is needed somewhere, and a robot goes and does it.',
    technical: 'An on-demand, point-to-point transport pattern.',
    usedIn: ['Mission design, as one of three mission patterns'],
    related: ['missions-and-actions', 'v-milk-run', 'v-bus', 'v-taxi-mode'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [G, D]
  },
  {
    id: 'v-milk-run',
    term: 'Milk run',
    kind: 'jargon',
    simple: 'A fixed round trip with several stops, like a delivery round.',
    technical: 'A fixed-loop transport pattern with multiple stops.',
    usedIn: ['Mission design, as one of three mission patterns'],
    related: ['missions-and-actions', 'v-taxi', 'v-bus'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [G, D]
  },
  {
    id: 'v-bus',
    term: 'Bus',
    kind: 'jargon',
    simple: 'A route that runs on a timetable whether or not anyone asked for it.',
    technical: 'A scheduled, repeating transport route.',
    usedIn: ['Mission design, as one of three mission patterns'],
    related: ['missions-and-actions', 'v-taxi', 'v-milk-run'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [G, D]
  },
  {
    id: 'v-taxi-mode',
    term: 'Taxi mode',
    kind: 'jargon',
    simple: 'A phrase to be careful with. It is not established what it means at Ati.',
    technical:
      'Not established as a universal AMR industry term in the provided documentation. Do not assume it means maintenance, teleoperation or manual driving without confirming Ati’s implementation.',
    usedIn: ['Raised as an open question in the FAQ'],
    note: 'Distinct from [[v-taxi|Taxi]], which *is* defined, as a mission pattern.',
    related: ['v-taxi', 'open-questions'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [G, F]
  },
  {
    id: 'v-fleet-monitor',
    term: 'Fleet Monitor',
    kind: 'term',
    simple: 'The live screen showing what every robot is doing right now.',
    technical: 'The live operational view of robots, tasks and traffic, organized around zones.',
    usedIn: ['The information architecture, as a page name'],
    note: 'The Ati Flow prototype calls its equivalent screen **Live Fleet Status** and navigates to it as **Live Status**. The two names have not been reconciled.',
    related: ['ui-fleet-monitor', 'ui-live-fleet-status', 'fleet', 'v-fleet-manager'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [G, I, P]
  },
  {
    id: 'v-maintenance',
    term: 'Maintenance',
    kind: 'term',
    simple: 'A robot that has been taken out of service on purpose.',
    technical:
      'A robot state or operational condition used to remove a robot from normal dispatch while it is being serviced. The exact Ati implementation and permissions should be confirmed.',
    usedIn: ['The glossary', 'Fleet Supervisors can "mark for maintenance" within their zone'],
    related: ['robot-states', 'v-dispatch', 'open-questions'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [G, I]
  },
  {
    id: 'v-blocked',
    term: 'Blocked',
    kind: 'term',
    simple: 'The robot has stopped because something is in its way.',
    technical:
      'A robot state shown in the prototype as a red status pill and a pulsing red halo on the map. Automated blocked-robot alerts are used after go-live to pinpoint which routes or zones need correction.',
    usedIn: ['The prototype status pill and map legend', 'Deployment stage 9'],
    related: ['robot-states', 'wf-exceptions'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [P, D]
  },
  {
    id: 'v-moving',
    term: 'Moving',
    kind: 'term',
    simple: 'The robot is driving as expected.',
    usedIn: ['The prototype status pill and map legend'],
    related: ['robot-states'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [P]
  },
  {
    id: 'v-task',
    term: 'Task',
    kind: 'term',
    simple: 'A piece of work waiting for a robot.',
    usedIn: ['Fleet task allocation', 'The Fleet Monitor task queue'],
    note: 'Used throughout the sources but never formally defined. See [[task]].',
    related: ['task', 'v-trip', 'v-dispatch'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D, I]
  },
  {
    id: 'v-trip',
    term: 'Trip',
    kind: 'term',
    simple: 'One journey a robot is making right now.',
    usedIn: ['The prototype: the "AMR Trips" page, "Trip Details", and identifiers shaped like `TRP-20487`'],
    note: 'Appears only in the prototype. Never defined in writing. See [[trip]].',
    related: ['trip', 'v-task'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [P]
  },
  {
    id: 'v-dispatch',
    term: 'Dispatch',
    kind: 'term',
    simple: 'Sending a robot to do a job.',
    technical:
      'Referred to as "normal dispatch" — the flow a robot is removed from when placed in maintenance — and "manual dispatch", which the role model treats as operational rather than configuration work.',
    usedIn: ['The glossary definition of Maintenance', 'The Configurator role description'],
    note: 'No Dispatcher role or component is documented anywhere in this folder.',
    related: ['wf-robot-dispatch', 'v-task', 'fleet'],
    status: 'draft',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [G, I]
  },
  {
    id: 'v-priority',
    term: 'Priority',
    kind: 'term',
    simple: 'How urgent a job is, and therefore what gets done first.',
    technical:
      'Priority appears three ways: designed into a mission along with interrupt behaviour, applied by the fleet through priority and aging rules, and computed implicitly from business data such as due dates, line schedules and stock levels.',
    usedIn: ['Deployment stages 5, 6 and 7', 'The Workflows surface'],
    related: ['missions-and-actions', 'v-escalation', 'integrations'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D, I]
  },
  {
    id: 'v-escalation',
    term: 'Escalation',
    kind: 'term',
    simple: 'A person deciding, by hand, that something needs to happen sooner.',
    technical:
      'An Operator can raise a manual priority request, with the trade-off shown before confirming. Priority misuse is named as something that surfaces during real operation rather than in testing.',
    usedIn: ['The Operator role', 'Deployment stages 6, 8 and 9'],
    related: ['v-priority', 'roles-and-permissions', 'wf-exceptions'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [I, D]
  },
  {
    id: 'v-localization',
    term: 'Localization',
    kind: 'term',
    simple: 'The robot working out where it is on the map.',
    technical:
      'The purpose of the raw map. Map quality is validated against self-localization confidence. Localization failures are named as something that tends to surface after go-live rather than during testing.',
    usedIn: ['Deployment stages 3 and 9', 'The robot autonomy layer'],
    related: ['map', 'v-slam', 'wf-exceptions'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D, A]
  },
  {
    id: 'v-loop-closure',
    term: 'Loop closure',
    kind: 'jargon',
    simple: 'Correcting a map so that a long loop joins back up properly instead of drifting apart.',
    technical:
      'Pose graph optimization, run on long corridors or loops where drift could accumulate. Judged iteratively rather than flagged automatically.',
    usedIn: ['Deployment stage 3'],
    related: ['v-pose-graph-optimisation', 'map', 'v-slam'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D]
  },
  {
    id: 'v-payload',
    term: 'Payload',
    kind: 'term',
    simple: 'What the robot is carrying, and how it carries it.',
    technical:
      'Payload type and handling method — top-load, tugger/cart, lift, or conveyor interface — are established at site assessment. A payload profile is then configured per robot.',
    usedIn: ['Deployment stages 1 and 2'],
    related: ['robot', 'material-flow'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D]
  },
  {
    id: 'v-solutioning',
    term: 'Solutioning',
    kind: 'jargon',
    simple: 'Working out what a specific site actually needs before anything is designed or installed.',
    technical:
      'The work of defining the solution and routes for a specific project before detailed design begins. Site assessment is described as solutioning work.',
    usedIn: ['Deployment stage 1', 'Referred to again in stage 8 as "solutioning teams"'],
    related: ['wf-deployment'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D]
  },
  {
    id: 'v-go-live',
    term: 'Go-live',
    kind: 'jargon',
    simple: 'The point where the system starts being used for real — treated as a phase, not a single day.',
    technical:
      'A phased rollout: one robot on one route first, then expanding robot count and route complexity in stages. A deployment engineer typically stays on site for the first two to three weeks after handover.',
    usedIn: ['Deployment stage 9'],
    related: ['wf-deployment', 'v-handover', 'v-baseline'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D]
  },
  {
    id: 'v-handover',
    term: 'Handover',
    kind: 'jargon',
    simple: 'Passing the running system from the deployment team to the people who will use it.',
    technical:
      'Final handover only happens after floor-testing confirms expected behaviour. Support shifts to remote operations after the first two to three weeks on site.',
    usedIn: ['Deployment stages 8 and 9'],
    related: ['v-go-live', 'wf-deployment'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D]
  },
  {
    id: 'v-baseline',
    term: 'Baseline',
    kind: 'term',
    simple: 'A record of what normal looks like, captured early so you can tell later if something has changed.',
    technical:
      'Normal cycle times, blocked-robot frequency and battery consumption are recorded early after go-live, so later drift can be told apart from normal variance.',
    usedIn: ['Deployment stage 9'],
    related: ['v-go-live', 'wf-exceptions'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D]
  },
  {
    id: 'v-master-data',
    term: 'Master data',
    kind: 'term',
    simple: 'The shared reference information both the business system and Ati Flow have to agree on.',
    technical:
      'Master data alignment means explicitly defining what is configured at the integration layer versus what belongs to map or mission configuration. Named as a common source of cross-team confusion.',
    usedIn: ['Deployment stage 7', 'The Integrations surface'],
    related: ['integrations', 'configuration-layers'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D, I]
  },
  {
    id: 'v-fleet-controller',
    term: 'Fleet controller',
    kind: 'term',
    simple: 'The server everything talks to.',
    technical:
      'The fleet controller or server, on-premise or cloud, that robots and any orchestration layer connect to. Set up during infrastructure setup.',
    usedIn: ['Deployment stage 2'],
    related: ['fleet', 'wf-deployment'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D]
  },
  {
    id: 'v-staging-area',
    term: 'Staging area',
    kind: 'term',
    simple: 'Somewhere robots wait when they have nothing to do.',
    technical:
      'Staging areas are placed during infrastructure setup, and fleet management sends idle robots to staging positions automatically.',
    usedIn: ['Deployment stages 2 and 6', 'The prototype navigation item "Staging Area"'],
    related: ['wf-charging', 'fleet', 'v-wip'],
    status: 'draft',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D, P]
  },
  {
    id: 'v-debug',
    term: 'Debug',
    kind: 'term',
    simple: 'The technical screen for finding out why a robot is behaving the way it is.',
    technical:
      'A low-level configuration and diagnostics area — raw robot state, calibration, overrides, diagnostic logs — assigned exclusively to the Configurator role in the current IA.',
    usedIn: ['The information architecture, as a page name'],
    related: ['ui-debug', 'd-debug-is-configurator-only', 'roles-and-permissions'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [G, I]
  },
  {
    id: 'v-operator',
    term: 'Operator',
    kind: 'term',
    simple: 'The person on the floor, looking after one zone.',
    technical:
      'Sees Fleet Monitor for their own zone — robot status and task queue. Can raise a manual priority request, with the trade-off shown before confirming. View-only on Robots in their zone. Maps, Workflows, Integrations, Setup and Debug are entirely hidden.',
    usedIn: ['The role and permission model'],
    related: ['roles-and-permissions', 'v-fleet-supervisor'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [I]
  },
  {
    id: 'v-fleet-supervisor',
    term: 'Fleet Supervisor',
    kind: 'term',
    simple: 'The person responsible for one or more zones.',
    technical:
      'Fleet Monitor across their assigned zones with reassignment control. Manages robots within their zone, including marking for maintenance. View-only on Maps and Workflows. Integrations, Setup & Config and Debug are hidden.',
    usedIn: ['The role and permission model'],
    related: ['roles-and-permissions', 'v-operator', 'v-head-of-operations'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [I]
  },
  {
    id: 'v-head-of-operations',
    term: 'Head of Operations',
    kind: 'term',
    simple: 'The person accountable for the whole site.',
    technical:
      'Named in the IA as Supervisor (Head of Operations). Fleet Monitor across all zones, manages robots site-wide, views and approves Workflows and Maps, views Integrations status, and manages users and roles. Debug is hidden.',
    usedIn: ['The role and permission model'],
    related: ['roles-and-permissions', 'v-fleet-supervisor', 'v-solutions-architect'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [I]
  },
  {
    id: 'v-solutions-architect',
    term: 'Solutions Architect',
    expansion: 'also called the Configurator',
    kind: 'term',
    simple: 'The person who sets the system up — routes, zones, missions and integrations.',
    technical:
      'Full edit on Maps and Workflows, full setup on Robots including low-level parameters, full configuration on Integrations and Setup & Config, and the only role with Debug access. View-only on Fleet Monitor, for verifying configuration rather than daily operations.',
    usedIn: ['The role and permission model'],
    note: '"Configurator" is the name of this role. It is not the name of a screen.',
    related: ['roles-and-permissions', 'configuration-layers', 'v-debug'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [I]
  },
  {
    id: 'v-supervisor-mode',
    term: 'Supervisor Mode',
    kind: 'term',
    simple: 'A selector at the top of the prototype sidebar. What it switches is not documented.',
    usedIn: ['The prototype sidebar'],
    note: 'How this control relates to the four documented roles is unestablished.',
    related: ['roles-and-permissions', 'ui-components', 'open-questions'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [P]
  },
  {
    id: 'v-orchestration',
    term: 'Material orchestration',
    kind: 'term',
    simple: 'Deciding where material needs to go, which robot should move it, and when.',
    technical:
      'The function Ati Flow performs. It sits between a factory’s material movement requirements and the robot fleet that executes those movements.',
    usedIn: ['The product definition', 'The architecture orchestration layer'],
    related: ['orchestration', 'ati-flow', 'material-flow'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [O, A]
  },
  {
    id: 'v-deadlock',
    term: 'Deadlock',
    kind: 'jargon',
    simple: 'Two robots each waiting for the other to move, so neither ever does.',
    technical: 'Contention and deadlock are tested at shared resources — gates and exclusion zones — during fleet management.',
    usedIn: ['Deployment stage 6'],
    related: ['traffic-control', 'wf-exceptions'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D]
  },
  {
    id: 'v-sherpa',
    term: 'Sherpa XT Lite',
    kind: 'term',
    simple: 'The name printed on the robot in Ati’s product render.',
    usedIn: ['The chassis of the robot in `public/assets/ati-sherpa.png`'],
    note: 'This is the only hardware naming that appears anywhere in the source material, and it appears only as a label in an image. Nothing describes the model, its variants or its specifications.',
    related: ['robot', 'ati-robotics'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-16',
    sources: ['public/assets/ati-sherpa.png']
  }
];
