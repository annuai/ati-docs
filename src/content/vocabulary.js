/*
  Vocabulary.

  Merged from two source passes over this folder: the original Ati Flow-specific glossary
  (deployment workflow, roles, screens, prototype) and a second pass adding general AMR/robotics,
  fleet-management, material-flow, robot-state, safety, integration and VDA 5050 vocabulary.

  Duplicated terms have been consolidated into a single entry each. Where the two passes defined
  the same term differently, the definitions were merged rather than one being dropped — in one
  case (Loop closure) the original entry was also corrected: it had defined loop closure as being
  pose graph optimisation itself, which contradicts this file's own Pose graph optimisation entry
  (which correctly treats loop closure as the *situation* and pose graph optimisation as the
  *algorithm* applied to it). The corrected entry keeps that distinction consistent.

  Terms that a reader might expect — WMS-adjacent roles like Requester, Approver, Dispatcher —
  are deliberately absent because no source uses them. See docs/source-audit.md.

  kind: 'acronym' | 'term' | 'jargon'
  status: 'current' | 'draft' | 'needs-confirmation'
*/

import { p, h, list, flow, callout, gap } from './blocks.js';

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
const V2 = 'AtiFLOW v2.0.docx';
const V3 = 'PRD_AtiFLOW_v3.0.docx';
// Knowledge supplied directly in conversation rather than found in this folder.
const MOM = 'Suryajit (Product Manager) — Ati Flow system-understanding meeting, 18 September 2026';
const ID1 = 'Operations Excellence lead — Industrial Design 1:1, September 2026';
const ORG = 'Ati team — org structure and internal tooling, supplied in conversation, September 2026';
const CUR = 'Ati team — the current, on-the-ground deployment sequence, supplied in conversation, September 2026';
const TRANSCRIPT = 'Internal design/architecture review meeting, transcript supplied in conversation, September 2026';
const DIRECTIVE = 'Ati team — terminology directive, supplied in conversation, September 2026';

export const vocabulary = [
  // ─────────────────────────────────────────────────────────────────────────
  // GENERAL / COMPANY
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'v-aiot',
    term: 'AIoT',
    expansion: 'Artificial Intelligence of Things',
    kind: 'acronym',
    simple: 'The combination of AI and IoT, used here to connect a robot workflow to physical devices and signals.',
    technical:
      'A Workflow Builder node group for physical-device interactions: Bluetooth connection, output control, input/output reset and waiting for an input signal.',
    usedIn: ['[[ui-workflow-builder|Workflow Builder]]'],
    related: ['ui-workflow-builder', 'v-rfid'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-rfid',
    term: 'RFID',
    expansion: 'Radio-Frequency Identification',
    kind: 'acronym',
    simple: 'A way for the system to recognise something using a radio tag, without a person pressing a button.',
    technical:
      'One automatic confirmation option in Workflow Builder. It can be selected on a Confirm node instead of manual confirmation through a Dispatch Button.',
    usedIn: ['[[ui-workflow-builder|Workflow Builder]] — Confirm node'],
    related: ['ui-workflow-builder', 'v-aiot'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },

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
    id: 'v-agv',
    term: 'AGV',
    expansion: 'Automated Guided Vehicle',
    kind: 'acronym',
    simple: 'A vehicle that moves materials automatically, usually by following a predefined guidance system.',
    technical:
      'An automated vehicle used for material transport that traditionally follows defined routes or guidance infrastructure. AGVs differ conceptually from AMRs, which are designed for more autonomous navigation.',
    usedIn: ['Factory automation', 'Material handling'],
    related: ['v-amr', 'v-material-flow'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-visa',
    term: 'VISA',
    kind: 'jargon',
    simple:
      'First come, first served for robots. In a VISA-controlled zone the first robot in gets to go; the next one waits until it is clear.',
    technical:
      'A first-in-first-out approval mechanism. When several robots want to enter a zone that is VISA controlled, the first to arrive is granted the visa. The others hold. When the first robot clears the area it entered, the next robot receives its clearance. It is used particularly at intersections where traffic can arrive from more than one direction at once.',
    aliases: ['visa', 'visa control', 'visa clearance', 'FIFO'],
    usedIn: ['Traffic control at intersections', 'Fleet Manager, when a traffic problem needs explaining'],
    note: 'The name is a metaphor, not an acronym — a robot is granted entry the way a traveller is granted a visa.',
    blocks: [
      h('How it plays out'),
      flow([
        {
          title: 'Two robots approach a VISA-controlled zone',
          note: 'Typically an intersection, with oncoming traffic possible from several directions.'
        },
        {
          title: 'Which one arrived first?',
          kind: 'decision',
          note: 'Entry is granted in arrival order — first in, first served.'
        },
        { title: 'The first robot is granted the visa', note: 'It proceeds through the zone.' },
        { title: 'The second robot waits', note: 'It holds outside the zone rather than entering behind.' },
        {
          title: 'The first robot clears the area',
          note: 'Clearance is tied to leaving the zone it entered, not to finishing its trip.'
        },
        { title: 'The second robot gets its clearance', kind: 'outcome', note: 'The queue advances by one.' }
      ]),
      h('Why it exists'),
      p(
        'An intersection is where a fleet is most likely to jam. Without an ordering rule, two robots arriving from different directions can each wait for the other — see [[v-deadlock|deadlock]]. First-in-first-out gives a plain answer to who goes, and it is an answer a person can predict and explain.'
      ),
      gap(
        'How VISA relates to the **gates** and **exclusion zones** described in the deployment material is not documented. All three govern multi-robot access, but whether VISA is the implementation of gates, or a separate mechanism alongside them, has not been established. See [[traffic-control]].'
      )
    ],
    related: ['traffic-control', 'v-gate', 'v-exclusion-zone', 'v-deadlock', 'v-fleet-manager', 'zone'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [TEAM]
  },
  {
    id: 'v-vda-5050',
    term: 'VDA 5050',
    kind: 'jargon',
    simple: 'A standard way for a fleet control system and mobile robots to communicate with each other.',
    technical:
      'An interface for exchanging job and status data between a central fleet control system and mobile robots. It is designed to allow heterogeneous fleets from different manufacturers to operate with a shared control system. VDA 5050 version 3.0.0, released in March 2026, also supports higher-autonomy mobile robots through concepts such as zones and path sharing.',
    aliases: ['VDA5050', 'VDA 5050 interface', 'VDA 5050 standard'],
    usedIn: [
      'Robot-to-fleet-controller communication',
      'Multi-vendor mobile robot deployments',
      'Discussions about interoperability and fleet control'
    ],
    note:
      'VDA 5050 is a communication interface, not a safety standard and not the traffic-management logic itself. The current version is 3.0.0.',
    related: ['v-amr', 'v-fleet-controller', 'v-fleet-manager', 'v-orchestration', 'v-massrobotics'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-massrobotics',
    term: 'MassRobotics AMR Interoperability Standard',
    kind: 'jargon',
    simple:
      'A common format that lets robots from different manufacturers share basic information about themselves and what they are doing.',
    technical:
      'An interoperability standard for autonomous mobile robots and other automated vehicles that defines a common way to share information such as robot identity, manufacturer and model, location, destination, speed, direction, operational state, and availability. It is primarily intended for interoperability and situational awareness rather than fleet management, navigation, or safety.',
    aliases: [
      'MassRobotics standard',
      'MassRobotics AMR Standard',
      'AMR Interoperability Standard',
      'MassRobotics Interoperability Standard'
    ],
    usedIn: [
      'Multi-vendor AMR interoperability',
      'Sharing robot status and location information',
      'Discussions about common robot data formats'
    ],
    note:
      'The MassRobotics AMR Interoperability Standard is different from VDA 5050. MassRobotics focuses on sharing basic operational information, while VDA 5050 defines a communication interface between mobile robots and a central fleet control system. The MassRobotics working group has been turned over to ISO and its working-group meetings are currently suspended.',
    related: ['v-amr', 'v-vda-5050', 'v-fleet-manager', 'v-fleet-controller'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-interoperability',
    term: 'Interoperability',
    kind: 'jargon',
    simple: 'Different systems or robots being able to work together.',
    technical:
      'The ability of independently developed systems, devices, or robots to exchange information and operate together through compatible interfaces and shared conventions.',
    usedIn: ['VDA 5050', 'MassRobotics', 'Multi-vendor fleets'],
    related: ['v-vda-5050', 'v-massrobotics', 'v-api'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ATI FLOW SYSTEM COMPONENTS
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'v-deployment-manager',
    term: 'Deployment Manager',
    kind: 'term',
    simple: 'The software Ati’s own support engineers use to configure robots and get them running on a site.',
    technical:
      'Used internally by Ati support engineers to configure and deploy the bots. It is one of the three parts [[ati-flow|Ati Flow]] brings together, alongside [[v-fleet-manager|Fleet Manager]] and an orchestration layer.',
    aliases: ['deployment manager', 'DM'],
    usedIn: ['Ati support engineers, when configuring and deploying robots'],
    note: 'An Ati-internal tool, not something a customer operates. Compare [[v-fleet-manager|Fleet Manager]], which runs the fleet on site. Version 5.4 was found to increase the number of steps needed for tasks the previous version did in fewer — see the gap below.',
    blocks: [
      gap(
        'What Deployment Manager contains screen by screen, and how it maps onto the nine stages of the [[wf-deployment|deployment workflow]], is not documented. Nor is its relationship to the [[v-solutions-architect|Solutions Architect]], the [[users|user]] who sets a new site up — the two describe closely related work.'
      ),
      gap(
        'Testing found that version 5.4 unexpectedly increased the number of steps required to perform tasks that an earlier version did in fewer. No screen-by-screen information architecture exists yet to show why — mapping one out for both Deployment Manager and Fleet Manager is a stated next step.'
      )
    ],
    related: ['ati-flow', 'v-fleet-manager', 'wf-deployment', 'v-solutions-architect'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    revisions: [
      {
        date: '2026-09-18',
        author: 'Annuai',
        note: 'Added the Industrial Design 1:1 finding that version 5.4 increased the number of steps needed for tasks compared to the previous version, and flagged the planned information-architecture mapping exercise as the way to pin down why.'
      }
    ],
    sources: [TEAM, ID1]
  },
  {
    id: 'v-wms',
    term: 'WMS',
    expansion: 'Warehouse Management System',
    kind: 'acronym',
    simple: 'The software a warehouse already uses to track what it holds and what needs moving.',
    technical:
      'One of the external system types Ati Flow’s orchestration layer connects to through APIs, alongside [[v-erp|ERP]] providers. Which providers are connected depends on what the client already runs.',
    usedIn: ['The orchestration layer, as a source of demand'],
    related: ['integrations', 'v-erp', 'v-mes', 'ati-flow', 'v-sku'],
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
    id: 'v-wip',
    term: 'WIP',
    expansion: 'Work In Progress',
    kind: 'acronym',
    simple: 'Material that has been started but is not finished — parts between one process and the next.',
    usedIn: ['The prototype navigation item "WIP Inventory"'],
    note: 'WIP appears only as a navigation label. No source describes what the WIP Inventory screen contains.',
    related: ['material-flow', 'v-staging-area', 'v-material-flow'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [P]
  },
  {
    id: 'v-fleet-manager',
    term: 'Fleet Manager',
    kind: 'term',
    simple:
      'Ati’s software running in real warehouses today. It controls the fleet — where robots go, which trips they run — but it does not decide what ought to happen.',
    technical:
      'The software that actually runs the fleet on site. It is deliberately **not an intelligent system**: it executes fleet control rather than deciding what the factory needs. The thinking sits above it, in the orchestration layer that [[ati-flow|Ati Flow]] adds.',
    aliases: ['fleet manager', 'FM'],
    usedIn: ['Live sites today', 'Any conversation about what physically commands the robots'],
    note: 'Three similar names, three different things. See [[ati-flow|the disambiguation table on the Ati Flow page]].',
    blocks: [
      h('What it does'),
      list([
        'Manages the fleet',
        'Tells robots where to go',
        'Books a trip for a robot, and manages trips once they are running',
        'Analytics',
        'Surfaces traffic problems, including [[v-visa|VISA]] contention',
        '[[v-route-ops|Route Ops]] — route changes such as excluding a station from the map'
      ]),
      h('The mechanism, concretely'),
      p(
        'Fleet Manager takes a [[workflow|workflow]]’s start station, end station and material, and dispatches an available, nearby robot to execute the resulting [[trip|trip]]. That is the bridge between the information/booking layer and the execution layer — see [[information-vs-execution-layer]].'
      ),
      h('How it relates to Ati Flow'),
      p(
        'Fleet Manager is one of the three parts [[ati-flow|Ati Flow]] brings together, alongside [[v-deployment-manager|Deployment Manager]] and an orchestration layer. Today they are separate tools; Ati Flow is the product that combines them.'
      ),
      gap(
        'How much of Fleet Manager has already been absorbed into Ati Flow, and on what timeline, is not documented. [[v-route-ops|Route Ops]] is one capability known to still live only in Fleet Manager.'
      )
    ],
    related: ['ati-flow', 'v-deployment-manager', 'v-route-ops', 'v-visa', 'v-fleet-monitor', 'fleet', 'v-fleet-controller', 'v-fleet-management-system', 'workflow', 'trip', 'information-vs-execution-layer'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    revisions: [
      {
        date: '2026-09-16',
        author: 'Annuai',
        note: 'Expanded with what Fleet Manager actually does, and corrected: Ati Flow combines it with Deployment Manager and an orchestration layer rather than simply replacing it.'
      },
      {
        date: '2026-09-18',
        author: 'Annuai',
        note: 'Added the concrete dispatch mechanism — taking a workflow’s start/end/material and dispatching a nearby robot to run the trip — from an internal design/architecture review.'
      }
    ],
    sources: [TEAM, TRANSCRIPT]
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
    id: 'v-fleet-controller',
    term: 'Fleet Controller',
    kind: 'term',
    simple: 'The server and control layer that robots and any orchestration software connect to, and that coordinates what the fleet does as a group.',
    technical:
      'The fleet controller or server — on-premise or cloud — that robots and any orchestration layer connect to, set up during infrastructure setup. It is the central control layer responsible for coordinating robot tasks and fleet-level behaviour: in a VDA 5050 architecture, it communicates with mobile robots through that defined interface.',
    usedIn: ['Deployment stage 2', 'Fleet management', 'Robot orchestration', 'VDA 5050'],
    related: ['fleet', 'wf-deployment', 'v-fleet-management-system', 'v-fleet-manager', 'v-vda-5050', 'v-orchestration'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D, TEAM]
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
    id: 'v-mts',
    term: 'MTS',
    expansion: 'Material Tracking System',
    kind: 'acronym',
    simple: 'The system used to track material as it moves through a site.',
    technical:
      'Named in conversation as the system responsible for material tracking. What it tracks a material against — a station, a container, a workflow — and how it relates to [[v-master-data|Master Data]] and [[material-flow|material flow]] has not yet been detailed.',
    usedIn: ['Material tracking'],
    related: ['v-master-data', 'material-flow', 'v-material-station-mapping'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-18',
    sources: [ORG]
  },
  {
    id: 'v-mhe',
    term: 'MHE',
    expansion: 'Material Handling Equipment',
    kind: 'acronym',
    simple: 'A code that identifies a container — what it is picking up and where it is dropping off.',
    technical:
      'An MHE code identifies a container for pickup/drop-off matching, the same operational role as a [[material-flow|Container ID]]. It does not map a container to a material type, and there is no empty-container or inventory tracking yet — acknowledged as a deliberate scope gap, to be extended as the system scales.',
    usedIn: ['Container/pickup-drop matching'],
    note: 'A deliberate, temporary scope gap rather than an oversight: container-type-to-material mapping and inventory tracking are expected to be added later.',
    related: ['material-flow', 'v-material-station-mapping'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-18',
    sources: [TRANSCRIPT]
  },
  {
    id: 'v-staging-area',
    term: 'Staging area',
    kind: 'term',
    simple:
      'A station used to hold material between production and consumption. Older material also uses this phrase for a place where idle robots wait.',
    technical:
      'The v3 PRD calls Station the canonical entity and treats a staging area as a Station in the material-flow model. It can contain a grid of material cells and be chosen by priority for pickup or drop-off. Earlier deployment material uses “staging positions” for idle robots, so the two meanings must not be silently merged.',
    usedIn: ['Material flow: Production Unit → Staging Area (Station) → Consumption Unit', 'Deployment Manager fill and empty configuration', 'The prototype navigation item "Staging Area"'],
    note: 'This term has two source-backed meanings. Confirm whether idle-robot staging should be renamed `idle position` or `parking position` in product language.',
    related: ['v-station', 'v-processing-area', 'v-multi-station-priority', 'v-fill-sequence', 'v-retrieval-order', 'wf-charging', 'fleet', 'v-wip', 'v-idle'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-16',
    revisions: [
      {
        date: '2026-09-17',
        author: 'Annuai',
        note: 'Recorded the v3 material-holding meaning alongside the older idle-robot meaning, rather than presenting them as one concept.'
      }
    ],
    sources: [D, P, V2, V3]
  },
  {
    id: 'v-processing-area',
    term: 'Processing area',
    kind: 'term',
    simple:
      'A configured part of a plant where the material, containers, workflows, devices and inventory for that operation are set up together.',
    technical:
      'In AtiFLOW v2.0, a Processing Area is a plant-level configuration boundary. It contains machine details, linked stations, material and container configuration, workflows, device configuration and Processing Area inventory. Its system function is to segregate a relevant subset of Plant Master Data into a local material list for that operation.',
    usedIn: ['AtiFLOW v2.0 — Central Configurations and Processing Areas Detailing', 'The prototype sidebar selector (legacy label "Processing Zone")'],
    note: 'Processing Zone, Process Area and Process Zone are the same entity as Processing Area — confirmed by Suryajit (Product Manager), 18 September 2026. Processing Area is now the standard term. See [[d-processing-area-terminology]].',
    aliases: ['Processing Zone', 'Process Area', 'Process Zone'],
    related: ['v-processing-zone', 'processing-zone', 'v-station', 'v-staging-area', 'workflow', 'material-flow', 'd-processing-area-terminology'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    revisions: [
      {
        date: '2026-09-18',
        author: 'Annuai',
        note: 'Resolved the relationship to Processing Zone: they are the same entity. Processing Area is the standard term going forward.'
      }
    ],
    sources: [V2, MOM]
  },
  {
    id: 'v-machine',
    term: 'Machine',
    kind: 'term',
    simple: 'A physical unit on the floor that can represent one or several stations, and is tagged by the role it plays in material movement.',
    technical:
      'A Machine can represent or contain one or multiple [[v-station|Stations]]. Users/operators are currently assigned to machines rather than directly to stations — the chain runs User → Machine(s) → Station(s). A user only sees the [[workflow|workflows]] tied to the machines they are assigned to — the same filtering idea as [[processing-zone|Processing Area]], one level down. Machines are also tagged [[v-production-unit|Production Unit]] or [[v-consumption-unit|Consumption Unit]] depending on their role in material movement; one machine can carry both tags at once. Whether this Machine dependency needs to be exposed directly during workflow configuration is under review.',
    usedIn: ['User-to-machine assignment', 'Workflow configuration (currently)'],
    note: 'Whether Machine dependency is technically required in workflow creation, or can be removed from user-facing configuration, is an open question. Separately, some software surfaces use the jargon "consumption point" where this documentation uses "Machine" — see [[open-questions]] for whether the two name the same thing.',
    related: ['v-station', 'v-production-unit', 'v-consumption-unit', 'workflow', 'open-questions', 'information-vs-execution-layer'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-18',
    revisions: [
      {
        date: '2026-09-18',
        author: 'Annuai',
        note: 'Noted a plain-language concern raised in the Industrial Design 1:1: some software surfaces say "consumption point" where this documentation says "Machine", and jargon like this creates a steep learning curve for non-technical users. Logged as an open question rather than assumed to be the same concept as Consumption Unit.'
      },
      {
        date: '2026-09-18',
        author: 'Annuai',
        note: 'Added, from an internal design/architecture review: a user only sees workflows tied to their assigned machines, and one machine can be tagged both Production Unit and Consumption Unit at once.'
      }
    ],
    sources: [MOM, ID1, TRANSCRIPT]
  },
  {
    id: 'v-production-unit',
    term: 'Production unit',
    kind: 'term',
    simple: 'A machine tag meaning the machine produces or pushes material into the workflow.',
    technical:
      'One of two machine-role tags used to classify a [[v-machine|Machine]] by its function in material movement, alongside [[v-consumption-unit|Consumption Unit]]. Whether this needs to remain an explicit, user-facing configuration or could instead be derived from the workflow itself is unresolved.',
    usedIn: ['Machine classification'],
    related: ['v-machine', 'v-consumption-unit', 'workflow', 'open-questions'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-18',
    sources: [MOM]
  },
  {
    id: 'v-consumption-unit',
    term: 'Consumption unit',
    kind: 'term',
    simple: 'A machine tag meaning the machine receives or consumes material from the workflow.',
    technical:
      'One of two machine-role tags used to classify a [[v-machine|Machine]] by its function in material movement, alongside [[v-production-unit|Production Unit]]. Whether this needs to remain an explicit, user-facing configuration or could instead be derived from the workflow itself is unresolved.',
    usedIn: ['Machine classification'],
    note: 'Not confirmed to be the same thing as the "consumption point" jargon flagged in the Industrial Design 1:1 as confusing for end users — see [[v-machine]] and [[open-questions]].',
    related: ['v-machine', 'v-production-unit', 'workflow', 'open-questions'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-18',
    sources: [MOM]
  },
  {
    id: 'v-material-station-mapping',
    term: 'Material station mapping',
    kind: 'term',
    simple: 'Which materials are available at which station, and whether that station is a pickup or a drop-off point.',
    technical:
      'Once a local material list exists for a [[v-processing-area|Processing Area]], materials or material groups are mapped to [[v-station|Stations]] to define availability and role — pickup/start point or drop/end point. These mappings are then used when creating [[workflow|workflows]]. Whether the same material or material group can be mapped to multiple stations, and how the system should choose between them during workflow creation, has not been confirmed.',
    usedIn: ['Ati Flow Configurator — Zonal Configuration, Station Mapping'],
    note: 'Needs validation: can the same material/material group map to multiple stations, and if so how should pickup/drop selection work during workflow creation?',
    related: ['v-processing-area', 'v-station', 'workflow', 'open-questions'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-18',
    sources: [MOM]
  },
  {
    id: 'v-execution-source',
    term: 'Execution source',
    kind: 'term',
    simple: 'The place or system that starts a workflow.',
    technical:
      'AtiFLOW v2.0 separates execution sources from workflow logic. A Requester Device, MES event, Dispatcher Device or Supervisor Device can be configured as an execution source, with its own visibility and workflow bindings.',
    usedIn: ['AtiFLOW v2.0 — Execution Source Configuration'],
    related: ['workflow', 'v-requester-mode', 'v-assignment-strategy', 'v-pickup-confirmation-mode'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [V2]
  },
  {
    id: 'v-requester-mode',
    term: 'Requester mode',
    kind: 'term',
    simple: 'The version of the request screen a requester uses: Legacy or Structured.',
    technical:
      'The v3 PRD says an administrator selects the mode when creating a requester user. Legacy allows a requester to choose pickup station, material and drop station. Structured follows Machine → Station → Workflow → [[v-bom|BOM]], using configured station mapping. Both modes can run in the same deployment.',
    usedIn: ['AtiFLOW v3.0 — Requester Operating Mode'],
    related: ['v-execution-source', 'v-station', 'workflow', 'v-assignment-strategy', 'v-bom'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [V3]
  },
  {
    id: 'v-assignment-strategy',
    term: 'Assignment strategy',
    kind: 'term',
    simple: 'The rule that decides when a trip is created and how its pickup, drop-off and material are known.',
    technical:
      'AtiFLOW v2.0 defines two choices: Request-based assignment, where the pickup, drop-off and material are already defined; and On-route Assignment, where they are determined from the execution trigger. The strategy is separate from the workflow itself.',
    usedIn: ['AtiFLOW v2.0 — Workflow Configuration'],
    related: ['trip', 'workflow', 'v-execution-source', 'v-request-based-assignment', 'v-on-route-assignment'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [V2]
  },
  {
    id: 'v-request-based-assignment',
    term: 'Request-based assignment',
    kind: 'term',
    simple: 'A trip can be created as soon as someone makes the request because its key details are already known.',
    technical:
      'The pickup station, drop-off station and material are predefined in the request. AtiFLOW v2.0 describes the resulting behaviour as request created, then trip created immediately.',
    usedIn: ['AtiFLOW v2.0 — Workflow Configuration and Requester Flow'],
    related: ['v-assignment-strategy', 'trip', 'v-on-route-assignment'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [V2]
  },
  {
    id: 'v-on-route-assignment',
    term: 'On-route assignment',
    kind: 'term',
    simple: 'The request exists first; the exact trip is decided when the robot reaches the relevant point in the process.',
    technical:
      'AtiFLOW v2.0 describes Dispatch Button and QR code scan as execution triggers for this strategy. For QR-based flows, the robot arrives, scans the code, reads trolley details and matches an active request before it executes the trip.',
    usedIn: ['AtiFLOW v2.0 — Workflow Configuration and Requester Flow'],
    related: ['v-assignment-strategy', 'trip', 'v-request-based-assignment', 'v-execution-source'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [V2]
  },
  {
    id: 'v-pickup-confirmation-mode',
    term: 'Pickup confirmation mode',
    kind: 'term',
    simple: 'The setting that decides whether a pickup needs a person to confirm it.',
    technical:
      'At a Point Station or Staging Area, the v2 PRD provides Auto Confirmation or Manual Confirmation. Dispatcher involvement depends only on this setting: manual confirmation requires a dispatcher; automatic confirmation does not.',
    usedIn: ['AtiFLOW v2.0 — Pickup Configuration'],
    related: ['v-point-station', 'v-staging-area', 'v-execution-source', 'workflow'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [V2]
  },
  {
    id: 'v-point-station',
    term: 'Point station',
    kind: 'term',
    simple: 'A station that represents one pickup or drop-off point, rather than a multi-cell staging area.',
    technical:
      'In the v3 PRD, handling granularity does not apply to a Point Station because it has no cells to enumerate. In v2, Point Station is one of the locations that can use auto or manual pickup confirmation.',
    usedIn: ['AtiFLOW v2.0 — Pickup Confirmation Mode', 'AtiFLOW v3.0 — Workflow Handling Granularity'],
    related: ['v-station', 'v-staging-area', 'v-pickup-confirmation-mode', 'v-handling-granularity'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [V2, V3]
  },
  {
    id: 'v-multi-station-priority',
    term: 'Multi-station priority',
    kind: 'term',
    simple: 'An ordered list of stations the system tries one after another for the same material.',
    technical:
      'The v3 PRD changes material-to-staging mapping from one station to a priority-ordered list. For a drop, the system tries the first station with a free cell; for a pickup, the first station with an occupied cell. It falls through when a station is full or empty respectively.',
    usedIn: ['AtiFLOW v3.0 — Multiple Station Mapping with Priority'],
    related: ['v-station', 'v-staging-area', 'v-fill-sequence', 'v-retrieval-order', 'workflow'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [V3]
  },
  {
    id: 'v-fill-sequence',
    term: 'Fill sequence',
    kind: 'term',
    simple: 'The order used to place material into the cells of a staging area.',
    technical:
      'The v3 PRD replaces a single FIFO/LIFO setting with Fill Sequence and Retrieval Order. Fill Sequence can follow rows, columns or any available cell, with separate line and cell order settings.',
    usedIn: ['AtiFLOW v3.0 — Deployment Manager staging area configuration'],
    related: ['v-staging-area', 'v-retrieval-order', 'v-handling-granularity', 'v-multi-station-priority'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [V3]
  },
  {
    id: 'v-retrieval-order',
    term: 'Retrieval order',
    kind: 'term',
    simple: 'The order used to take material out of the cells of a staging area.',
    technical:
      'The v3 PRD defines Retrieval Order independently from Fill Sequence. It can follow arrival order (FIFO or LIFO), position by row or column, or any available cell.',
    usedIn: ['AtiFLOW v3.0 — Deployment Manager staging area configuration'],
    related: ['v-staging-area', 'v-fill-sequence', 'v-handling-granularity', 'v-multi-station-priority'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [V3]
  },
  {
    id: 'v-handling-granularity',
    term: 'Handling granularity',
    kind: 'term',
    simple: 'Whether one workflow step handles one staging-area cell or every eligible cell in that area.',
    technical:
      'The v3 PRD defines this per pickup and drop leg: Single Cell creates one trip for the next eligible cell; Whole Area creates one trip per eligible cell in the selected staging area. It is meaningful only for a multi-cell staging area, not a Point Station.',
    usedIn: ['AtiFLOW v3.0 — Workflow Handling Granularity'],
    related: ['workflow', 'v-staging-area', 'v-point-station', 'v-fill-sequence', 'v-retrieval-order'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [V3]
  },
  {
    id: 'v-orchestration',
    term: 'Material orchestration',
    kind: 'term',
    simple: 'Deciding where material needs to go, which robot should move it, and when.',
    technical:
      'The function Ati Flow performs. It sits between a factory’s material movement requirements and the robot fleet that executes those movements.',
    usedIn: ['The product definition', 'The architecture orchestration layer'],
    related: ['orchestration', 'ati-flow', 'material-flow', 'v-task-allocation'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [O, A]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MAPPING & NAVIGATION
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'v-slam',
    term: 'SLAM',
    expansion: 'Simultaneous Localization and Mapping',
    kind: 'acronym',
    simple: 'How a robot builds a map of a building while working out where it is inside that map.',
    technical:
      'The mapping stage of deployment. The robot is manually driven or walked through the full operating area to build a point cloud map, with pose graph optimization applied where drift could accumulate.',
    usedIn: ['Deployment stage 3', 'The Maps surface'],
    related: ['map', 'v-loop-closure', 'v-localization', 'v-point-cloud'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D, I]
  },
  {
    id: 'v-map-creation',
    term: 'Map creation',
    kind: 'term',
    simple:
      'Driving a robot around the building by hand so it can record the shape of the place and build a map of it.',
    technical:
      'A robot is run manually across the factory floor or warehouse to produce a **point cloud map**. Today this is done by driving the robot around by hand with a PlayStation controller — whether, and how, this could be automated is not yet clear. At run time that point cloud is compressed into a 2D map, which keeps compute load — and therefore cost — down. Algorithms such as **PointPillars** are used against the full point cloud to establish accurate global localization, but only when that accuracy is actually needed.',
    aliases: ['mapping', 'point cloud map', 'PointPillars', '2D map'],
    usedIn: ['Stage 3 of a site deployment', 'The Maps surface'],
    note: 'The map that is built and the map the robot runs against are not the same artefact. Building produces a point cloud; running uses a 2D compression of it.',
    related: ['map', 'v-slam', 'v-pose-graph-optimisation', 'wf-deployment', 'v-point-cloud'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    revisions: [
      {
        date: '2026-09-18',
        author: 'Annuai',
        note: 'Added that this driving-around is currently done manually with a PlayStation controller, and that whether it could be automated is unclear.'
      }
    ],
    sources: [TEAM, D, CUR]
  },
  {
    id: 'v-pose-graph-optimisation',
    term: 'Pose graph optimisation',
    kind: 'jargon',
    simple:
      'The maths that fixes a map when a robot drives a full loop and does not end up exactly where it started.',
    technical:
      'An optimisation process that adjusts estimated robot poses and map relationships to make the overall set of measurements more consistent, particularly when loop-closure constraints reveal accumulated drift. In Ati’s map creation process it is used to find the zero point when a robot finishes a full loop somewhere other than where it began: small errors accumulate over a long circuit, so the two ends of the loop disagree, and pose graph optimisation reconciles them and corrects the map.',
    aliases: ['posegraph optimisation', 'pose graph optimization', 'PGO'],
    usedIn: ['Map creation, on long corridors or loops where drift could accumulate'],
    note: 'The deployment material names this in the same breath as [[v-loop-closure|loop closure]]. Loop closure is the situation — the loop not meeting itself — and pose graph optimisation is the algorithm applied to it.',
    related: ['v-loop-closure', 'v-drift', 'v-map-creation', 'map', 'v-slam'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [TEAM, D]
  },
  {
    id: 'v-loop-closure',
    term: 'Loop closure',
    kind: 'jargon',
    simple:
      'Recognising that the robot has returned to a place it has already seen, and using that to correct accumulated map error.',
    technical:
      'The detection of a previously visited location during SLAM or mapping. A loop-closure constraint can be used to reduce accumulated drift and improve the consistency of the map. In Ati’s map creation process this is judged iteratively rather than flagged automatically, on long corridors or loops where drift could accumulate.',
    usedIn: ['Deployment stage 3', 'SLAM', 'Map creation'],
    note: 'Loop closure is the *detection* of a loop not meeting itself; [[v-pose-graph-optimisation|pose graph optimisation]] is the algorithm applied once it is detected — the two are related but distinct.',
    related: ['v-pose-graph-optimisation', 'v-drift', 'v-slam', 'map'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D, TEAM]
  },
  {
    id: 'v-localization',
    term: 'Localization',
    kind: 'term',
    simple: 'The robot working out where it is on the map.',
    technical:
      'The process of estimating a robot’s current position and orientation within a known map or reference frame. In Ati’s product, localization is the purpose of the raw map: map quality is validated against self-localization confidence, and localization failures are named as something that tends to surface after go-live rather than during testing.',
    usedIn: ['Deployment stages 3 and 9', 'Robot autonomy', 'Mapping', 'Navigation', 'The Maps surface'],
    related: ['map', 'v-slam', 'v-pose', 'v-odometry', 'v-map-matching', 'wf-exceptions'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [TEAM, D, A]
  },
  {
    id: 'v-map',
    term: 'Map',
    kind: 'term',
    simple: 'The robot’s picture of the building, used to work out where it is.',
    technical:
      'The spatial substrate used for localization and operational behaviour. Purely for localization, with no inherent concept of zones or business logic.',
    usedIn: ['The Maps surface', 'Deployment stage 3'],
    note: 'Two different things are called a map. To an autonomy engineer it is the localisation substrate; to a [[v-solutions-architect|Solutions Architect]] it is the floor plan with the drawn routes on it, as Ati Flow shows it. The shared name is deliberate; whether to keep it is unresolved. See [[map]].',
    related: ['map', 'v-map-annotation', 'v-map-creation', 'v-slam', 'ui-maps'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    revisions: [
      {
        date: '2026-09-17',
        author: 'Annuai',
        note: 'Flagged the two meanings of “map” — the autonomy sense and the Solutions Architect sense.'
      }
    ],
    sources: [TEAM, G, D]
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
    related: ['map-annotation', 'v-station', 'v-waypoint'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D, I]
  },
  {
    id: 'v-station',
    term: 'Station',
    kind: 'term',
    simple: 'A named place in the system where work happens — such as a pickup, drop-off or staging point.',
    technical:
      'AtiFLOW v3.0 establishes Station as the canonical shared entity. A station can be selected by a requester, attached to a machine, mapped to a workflow and used as the staging area where material is held. The prototype also shows stations as map identifiers such as S100 to S105. Its relation to the older `position` term still needs confirmation.',
    usedIn: ['AtiFLOW v3.0 — Machine → Station → Workflow', 'Map annotation', 'The prototype, as station identifiers S100 to S105 and a "Next Station" field'],
    note: 'Station is now a defined product entity in the v3 PRD. Its exact relationship to `position` and the idle-robot meaning of `staging area` remains unresolved.',
    related: ['v-position', 'map-annotation', 'trip', 'v-waypoint', 'v-staging-area', 'v-point-station', 'v-processing-area', 'v-requester-mode', 'v-machine', 'v-material-station-mapping'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-16',
    revisions: [
      {
        date: '2026-09-17',
        author: 'Annuai',
        note: 'Added the v3 PRD decision that Station is the canonical shared entity across requester, machine, workflow and material staging.'
      }
    ],
    sources: [D, P, V3]
  },
  {
    id: 'v-dock',
    term: 'Dock',
    kind: 'term',
    simple: 'The charging point a robot drives into when its battery is low.',
    technical:
      'Charging docks are placed during infrastructure setup — ideally distributed rather than centralized, and sized against peak-hour demand versus charge time. Docking is also one of the atomic mission actions.',
    usedIn: ['Deployment stages 2, 4 and 5', 'Setup & Config'],
    related: ['wf-charging', 'missions-and-actions', 'v-charging'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D, I]
  },
  {
    id: 'v-pose',
    term: 'Pose',
    kind: 'jargon',
    simple: 'Where the robot is and which direction it is facing.',
    technical:
      'The robot’s position and orientation in a coordinate frame. In a 2D factory environment this is commonly represented as x, y position plus heading.',
    usedIn: ['Localization', 'Navigation', 'Mapping', 'Robot positioning'],
    related: ['v-localization', 'v-waypoint', 'v-odometry', 'v-pose-graph-optimisation'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-odometry',
    term: 'Odometry',
    kind: 'jargon',
    simple: 'Estimating how far and in which direction the robot has moved based on its own movement.',
    technical:
      'An estimate of robot motion derived from onboard sensors such as wheel encoders, inertial sensors, or other motion measurements. Odometry accumulates error over time and is therefore commonly combined with other localization sources.',
    aliases: ['odom'],
    usedIn: ['Robot localization', 'Navigation', 'Autonomy'],
    related: ['v-localization', 'v-pose', 'v-slam', 'v-drift'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-drift',
    term: 'Drift',
    kind: 'jargon',
    simple: 'Small position errors that build up as the robot moves.',
    technical:
      'Accumulated error between a robot’s estimated pose and its actual pose. Drift is particularly important during long trajectories and mapping, where small errors can compound.',
    usedIn: ['Mapping', 'Localization', 'Odometry'],
    related: ['v-odometry', 'v-loop-closure', 'v-pose-graph-optimisation', 'v-localization'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-path',
    term: 'Path',
    kind: 'jargon',
    simple: 'The route the robot is supposed to follow from one place to another.',
    technical:
      'A spatial sequence connecting a start position to a destination. A path describes where the robot should travel but does not necessarily specify the exact timing or velocity at every point.',
    usedIn: ['Navigation', 'Route planning', 'VDA 5050'],
    related: ['v-path-planning', 'v-trajectory', 'v-waypoint'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-path-planning',
    term: 'Path planning',
    kind: 'jargon',
    simple: 'Working out a route from where the robot is to where it needs to go.',
    technical:
      'The process of generating a collision-free path between a start and goal position while considering the map, obstacles, constraints, and other navigation requirements.',
    usedIn: ['Navigation', 'Autonomy', 'Rerouting'],
    related: ['v-path', 'v-trajectory', 'v-obstacle-avoidance', 'v-replanning'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-trajectory',
    term: 'Trajectory',
    kind: 'jargon',
    simple: 'A path plus how the robot should move along it over time.',
    technical:
      'A time-parameterized description of motion that specifies position, velocity, acceleration, or other motion characteristics as a function of time. A trajectory is more specific than a path.',
    usedIn: ['Motion planning', 'Navigation', 'Robot control'],
    related: ['v-path', 'v-path-planning', 'v-waypoint'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-waypoint',
    term: 'Waypoint',
    kind: 'jargon',
    simple: 'A point along the route that helps tell the robot where to go.',
    technical:
      'A defined spatial point used to shape or specify a route. Waypoints can represent intermediate destinations, navigation constraints, or points that a robot is expected to pass through.',
    usedIn: ['Navigation', 'Path planning', 'Route configuration'],
    related: ['v-path', 'v-trajectory', 'v-position', 'v-station'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-navigation',
    term: 'Navigation',
    kind: 'term',
    simple: 'How the robot figures out where to go and how to get there.',
    technical:
      'The broader autonomy function that combines localization, planning, obstacle handling, and motion execution to move a robot toward a goal.',
    usedIn: ['Robot autonomy', 'Fleet operations', 'Maps'],
    related: ['v-localization', 'v-path-planning', 'v-obstacle-avoidance', 'v-replanning'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-obstacle-avoidance',
    term: 'Obstacle avoidance',
    kind: 'jargon',
    simple: 'The robot noticing something in its way and changing how it drives to avoid it.',
    technical:
      'The runtime autonomy behaviour responsible for detecting obstacles and modifying the robot’s motion or route to avoid collisions.',
    usedIn: ['Robot autonomy', 'Navigation', 'Blocked-robot behaviour'],
    related: ['v-dynamic-obstacle', 'v-static-obstacle', 'v-path-planning', 'v-replanning'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-static-obstacle',
    term: 'Static obstacle',
    kind: 'jargon',
    simple: 'Something that normally stays in one place and blocks the robot’s route.',
    technical:
      'A physical object or environmental feature whose position is assumed to remain fixed or change very slowly relative to the robot’s navigation cycle.',
    usedIn: ['Navigation', 'Mapping', 'Obstacle avoidance'],
    related: ['v-dynamic-obstacle', 'v-obstacle-avoidance', 'map'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-dynamic-obstacle',
    term: 'Dynamic obstacle',
    kind: 'jargon',
    simple: 'Something that can move into or across the robot’s path.',
    technical:
      'A moving or potentially moving object, such as a person, forklift, pallet, or another robot, that must be considered during real-time navigation.',
    usedIn: ['Navigation', 'Obstacle avoidance', 'Robot autonomy'],
    related: ['v-static-obstacle', 'v-obstacle-avoidance', 'v-replanning'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-replanning',
    term: 'Replanning',
    kind: 'jargon',
    simple: 'Figuring out a new route when the original one no longer works.',
    technical:
      'Generating a new path or trajectory after conditions change, such as an obstacle appearing, a route becoming unavailable, or a navigation constraint changing.',
    usedIn: ['Navigation', 'Obstacle avoidance', 'Traffic and route changes'],
    related: ['v-path-planning', 'v-rerouting', 'v-obstacle-avoidance'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-rerouting',
    term: 'Rerouting',
    kind: 'jargon',
    simple: 'Sending the robot along a different route to reach the same destination.',
    technical:
      'Changing an existing route in response to a blocked path, traffic condition, unavailable resource, or other operational constraint.',
    usedIn: ['Fleet operations', 'Navigation', 'Route configuration'],
    related: ['v-replanning', 'v-path-planning', 'v-route-ops', 'traffic-control'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM, D]
  },
  {
    id: 'v-map-matching',
    term: 'Map matching',
    kind: 'jargon',
    simple: 'Figuring out which part of the map matches what the robot is currently sensing.',
    technical:
      'The process of associating observed or estimated robot motion and surroundings with corresponding features in a known map to improve pose estimation.',
    usedIn: ['Localization', 'Navigation'],
    related: ['v-localization', 'v-map', 'v-slam', 'v-pose'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-geofencing',
    term: 'Geofencing',
    kind: 'jargon',
    simple: 'Using a defined area on the map to control what the robot can or cannot do there.',
    technical:
      'Applying location-based rules to a geographical region. Depending on the system, a geofence can restrict access, impose speed limits, or trigger specific behaviours.',
    usedIn: ['Navigation', 'Map configuration', 'Operational constraints'],
    related: ['v-behavioural-zone', 'v-forbidden-zone', 'v-preferred-zone', 'v-safety-zone'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-recovery-behaviour',
    term: 'Recovery behaviour',
    kind: 'jargon',
    simple: 'What the robot tries to do when something goes wrong.',
    technical:
      'An autonomous response to a navigation or execution failure, such as attempting to clear an obstacle, retrying a motion, stopping safely, or requesting intervention.',
    usedIn: ['Robot autonomy', 'Exception handling', 'Blocked robots'],
    related: ['v-obstacle-avoidance', 'v-replanning', 'v-blocked', 'wf-exceptions'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-perception',
    term: 'Perception',
    kind: 'jargon',
    simple: 'How the robot senses and understands what is around it.',
    technical:
      'The autonomy function that processes sensor information to identify environmental features, obstacles, objects, or other information needed for navigation and behaviour.',
    usedIn: ['Robot autonomy', 'Obstacle detection', 'Navigation'],
    related: ['v-obstacle-avoidance', 'v-dynamic-obstacle', 'v-static-obstacle'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-point-cloud',
    term: 'Point cloud',
    kind: 'jargon',
    simple: 'A collection of 3D points that describes the shape of the environment.',
    technical:
      'A set of spatial points, typically generated from depth or LiDAR sensing, representing surfaces and objects in the environment. Ati’s mapping process produces a point-cloud map before a 2D representation is used at runtime.',
    usedIn: ['Map creation', 'Localization', 'LiDAR-based autonomy'],
    related: ['v-map-creation', 'v-slam', 'map'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM, D]
  },
  {
    id: 'v-sensor-fusion',
    term: 'Sensor fusion',
    kind: 'jargon',
    simple: 'Combining information from multiple sensors to get a better understanding of where the robot is and what is around it.',
    technical:
      'The process of combining measurements from different sensors or estimation systems to produce a more robust estimate of the robot’s state or environment.',
    usedIn: ['Localization', 'Perception', 'Autonomy'],
    related: ['v-localization', 'v-perception', 'v-odometry'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ZONES & TRAFFIC
  // ─────────────────────────────────────────────────────────────────────────

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
    simple: 'The prototype’s legacy label for what is now called Processing Area.',
    technical:
      'The prototype sidebar labels a selector “Processing Zone” and shows “Zone 24”. Confirmed by the Product Manager to be the same entity as [[v-processing-area|Processing Area]], not a distinct concept — see [[d-processing-area-terminology]]. The label survives on the existing prototype screen as a historical name; new work uses Processing Area.',
    usedIn: ['The prototype sidebar selector, above a value of "Zone 24" — legacy label only'],
    note: 'Retired in favour of Processing Area. Kept as an entry so the legacy prototype label resolves to the current term rather than reading as an unexplained gap.',
    related: ['processing-zone', 'v-zone', 'v-processing-area', 'v-station', 'v-staging-area', 'd-processing-area-terminology'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    revisions: [
      {
        date: '2026-09-17',
        author: 'Annuai',
        note: 'Separated the prototype-only Processing Zone label from the source-defined Processing Area and Station terms.'
      },
      {
        date: '2026-09-18',
        author: 'Annuai',
        note: 'Resolved: Processing Zone is the same entity as Processing Area, confirmed by the Product Manager. Retired as a distinct term.'
      }
    ],
    sources: [G, P, F, V2, V3, MOM]
  },
  {
    id: 'v-behavioural-zone',
    term: 'Behavioural zone',
    kind: 'term',
    simple: 'An area that changes how a robot drives while it is inside — like a school zone.',
    technical:
      'A map annotation that is always active based on location: speed-limited zones, ramp zones, docking zones. Distinct from traffic control.',
    usedIn: ['Deployment stage 4', 'Map annotation'],
    related: ['map-annotation', 'v-exclusion-zone', 'zone', 'v-geofencing'],
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
    related: ['traffic-control', 'v-gate', 'map-annotation', 'v-resource-reservation'],
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
    related: ['traffic-control', 'v-exclusion-zone', 'v-contention'],
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
    related: ['map-annotation', 'v-preferred-zone', 'v-geofencing'],
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
    id: 'v-deadlock',
    term: 'Deadlock',
    kind: 'jargon',
    simple: 'Two robots each waiting for the other to move, so neither ever does.',
    technical: 'Contention and deadlock are tested at shared resources — gates and exclusion zones — during fleet management.',
    usedIn: ['Deployment stage 6'],
    related: ['traffic-control', 'wf-exceptions', 'v-contention', 'v-resource-reservation'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D]
  },
  {
    id: 'v-traffic-management',
    term: 'Traffic Management',
    kind: 'jargon',
    simple: 'Coordinating robots so they can move around the factory without getting in each other’s way.',
    technical:
      'Fleet-level coordination of robot movement through shared spaces, intersections, gates, exclusion zones, and other constrained resources.',
    usedIn: ['Fleet management', 'Deployment stage 6'],
    related: ['traffic-control', 'v-visa', 'v-deadlock', 'v-resource-reservation', 'v-contention'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM, D]
  },
  {
    id: 'v-resource-reservation',
    term: 'Resource Reservation',
    kind: 'jargon',
    simple: 'Temporarily claiming a shared area so another robot does not enter it at the same time.',
    technical:
      'A fleet-management mechanism in which a robot obtains exclusive or controlled access to a shared resource such as a gate, intersection, aisle, or exclusion zone.',
    usedIn: ['Traffic management', 'Multi-robot coordination'],
    related: ['v-traffic-management', 'v-contention', 'v-deadlock', 'v-visa'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-contention',
    term: 'Contention',
    kind: 'jargon',
    simple: 'Two or more robots wanting to use the same space or resource at the same time.',
    technical:
      'A competition between multiple robots for access to a shared resource. Contentions may occur at gates, intersections, exclusion zones, charging points, or other constrained resources.',
    usedIn: ['Traffic management', 'Deadlock handling'],
    related: ['v-resource-reservation', 'v-deadlock', 'v-traffic-management'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM, D]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // FLEET MANAGEMENT & OPERATIONS
  // ─────────────────────────────────────────────────────────────────────────

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
    id: 'v-fleet-monitor',
    term: 'Fleet Monitor',
    kind: 'term',
    simple: 'The live screen showing what every robot is doing right now.',
    technical: 'The live operational view of robots, tasks and traffic, organized around zones.',
    usedIn: ['The information architecture, as a page name'],
    note: 'The Ati Flow prototype calls its equivalent screen **Live Fleet Status** and navigates to it as **Live Status**. The two names have not been reconciled.',
    related: ['ui-fleet-monitor', 'fleet', 'v-fleet-manager'],
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
    related: ['robot-states', 'v-dispatch', 'open-questions', 'v-paused'],
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
    related: ['robot-states', 'wf-exceptions', 'v-recovery-behaviour'],
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
    related: ['robot-states', 'v-executing'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [P]
  },
  {
    id: 'v-trip',
    term: 'Trip',
    kind: 'term',
    simple: 'One journey a robot is making right now — a piece of work waiting for, or assigned to, a robot.',
    aliases: ['task', 'task queue'],
    usedIn: ['The prototype: the "AMR Trips" page, "Trip Details", and identifiers shaped like `TRP-20487`', 'Fleet task allocation', 'The Fleet Monitor task queue'],
    note: 'Also called "Task" in some sources — resolved as the same thing, with no conceptual difference. Ati currently uses Trip. See [[trip]].',
    related: ['trip', 'v-dispatch', 'v-task-allocation'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    revisions: [
      {
        date: '2026-09-18',
        author: 'Annuai',
        note: 'Merged the separate "Task" vocabulary entry into this one — resolved as the same thing, and Ati currently uses Trip.'
      }
    ],
    sources: [P, D, I]
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
    related: ['wf-robot-dispatch', 'v-trip', 'fleet', 'v-task-allocation'],
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
    related: ['missions-and-actions', 'v-escalation', 'integrations', 'v-task-allocation'],
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
    related: ['v-priority', 'users', 'wf-exceptions'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [I, D]
  },
  {
    id: 'v-fleet-management-system',
    term: 'Fleet Management System',
    kind: 'jargon',
    simple: 'The software that manages a group of robots and coordinates their work.',
    technical:
      'A system responsible for managing multiple robots, including task assignment, robot state, traffic coordination, and operational monitoring.',
    aliases: ['FMS', 'fleet management'],
    usedIn: ['Robot fleet operations', 'Ati Flow architecture'],
    related: ['v-fleet-controller', 'v-fleet-manager', 'v-task-allocation', 'v-traffic-management'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-task-allocation',
    term: 'Task Allocation',
    kind: 'jargon',
    simple: 'Deciding which robot should do a particular job.',
    technical:
      'The process of assigning transport or other robot tasks to available robots based on factors such as location, capability, workload, priority, and operational constraints.',
    usedIn: ['Fleet management', 'Material orchestration'],
    related: ['v-dispatch', 'v-robot-availability', 'v-robot-capability', 'v-priority'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-robot-availability',
    term: 'Robot Availability',
    kind: 'jargon',
    simple: 'Whether a robot is currently able to accept and perform work.',
    technical:
      'An operational property indicating whether a robot can be considered for task assignment. Availability may differ from the robot’s physical or execution state.',
    usedIn: ['Task allocation', 'Fleet monitoring'],
    related: ['v-robot-capability', 'v-task-allocation', 'v-available'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-robot-capability',
    term: 'Robot Capability',
    kind: 'jargon',
    simple: 'What a particular robot is capable of doing.',
    technical:
      'The set of capabilities or constraints associated with a robot that determine which tasks it can execute, such as payload handling, attachments, navigation capabilities, or access to particular areas.',
    usedIn: ['Task allocation', 'Fleet management'],
    related: ['v-task-allocation', 'v-robot-availability', 'robot'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ROBOT STATES
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'v-idle',
    term: 'Idle',
    kind: 'term',
    simple: 'The robot is not currently doing a task.',
    technical: 'An operational state in which the robot is not actively executing a transport task or motion command.',
    usedIn: ['Robot status', 'Fleet monitoring'],
    related: ['v-available', 'v-executing', 'robot-states'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-available',
    term: 'Available',
    kind: 'term',
    simple: 'The robot is ready to be given work.',
    technical: 'An operational availability state indicating that a robot is eligible to receive a new task.',
    usedIn: ['Task allocation', 'Fleet monitoring'],
    related: ['v-idle', 'v-robot-availability', 'v-task-allocation'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-executing',
    term: 'Executing',
    kind: 'term',
    simple: 'The robot is currently carrying out a task.',
    technical:
      'A state indicating that a robot has accepted a task and is actively executing the associated movement or action sequence.',
    usedIn: ['Robot status', 'Fleet monitoring'],
    related: ['v-idle', 'v-paused', 'robot-states', 'v-moving'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-paused',
    term: 'Paused',
    kind: 'term',
    simple: 'The robot has temporarily stopped its current task but has not abandoned it.',
    technical:
      'A temporary execution state in which the current task remains active while robot motion or execution is suspended.',
    usedIn: ['Robot control', 'Fleet monitoring'],
    related: ['v-executing', 'v-blocked', 'v-maintenance'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-charging',
    term: 'Charging',
    kind: 'term',
    simple: 'The robot is connected to a charger and replenishing its battery.',
    technical:
      'An operational state in which the robot is positioned at a charging station or dock and is replenishing stored electrical energy.',
    usedIn: ['Robot status', 'Fleet operations'],
    related: ['v-robot-availability', 'v-dock'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-fault',
    term: 'Fault',
    kind: 'term',
    simple: 'The robot has detected a problem that prevents normal operation.',
    technical: 'An abnormal condition requiring attention or recovery before the robot can continue normal operation.',
    usedIn: ['Robot status', 'Exception handling'],
    related: ['wf-exceptions', 'v-recovery-behaviour', 'v-maintenance'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-offline',
    term: 'Offline',
    kind: 'term',
    simple: 'The system cannot currently communicate with the robot.',
    technical: 'A connectivity state indicating that the fleet system is not receiving the expected communication from the robot.',
    usedIn: ['Robot monitoring', 'Connectivity'],
    related: ['v-fault', 'v-robot-availability'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MISSIONS & WORKFLOW
  // ─────────────────────────────────────────────────────────────────────────

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
    simple: 'The standard industry word for a sequence of robot actions that gets one job done. Ati Flow currently calls this a Workflow.',
    technical: 'An executable transport behaviour composed from actions. Same concept as [[workflow|Workflow]], Ati Flow\'s current product-facing term — chosen because Ati Flow is an orchestration product. See [[d-workflow-over-mission]].',
    usedIn: ['Deployment stage 5', 'The Workflows surface'],
    note: 'Not a distinction to preserve in new content — Mission and Workflow name the same thing.',
    related: ['missions-and-actions', 'v-action', 'v-sub-mission', 'workflow', 'd-workflow-over-mission'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    revisions: [
      {
        date: '2026-09-18',
        author: 'Annuai',
        note: 'Added that Mission and Workflow are the same concept, per a terminology directive: Ati Flow currently uses Workflow because it is an orchestration product.'
      }
    ],
    sources: [G, D, DIRECTIVE]
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

  // ─────────────────────────────────────────────────────────────────────────
  // DEPLOYMENT LIFECYCLE
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'v-payload',
    term: 'Payload',
    kind: 'term',
    simple: 'What the robot is carrying, and how it carries it.',
    technical:
      'Payload type and handling method — top-load, tugger/cart, lift, or conveyor interface — are established at site assessment. A payload profile is then configured per robot.',
    usedIn: ['Deployment stages 1 and 2'],
    related: ['robot', 'material-flow', 'v-material-flow'],
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
    related: ['v-go-live', 'wf-exceptions', 'v-cycle-time'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [D]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SAFETY
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'v-estop',
    term: 'E-stop',
    expansion: 'Emergency Stop',
    kind: 'acronym',
    simple: 'A safety mechanism that immediately stops the robot’s motion when activated.',
    technical:
      'A safety-related stop function intended to bring hazardous motion to a safe condition when an emergency situation is detected.',
    aliases: ['Emergency Stop', 'E-Stop', 'emergency stop'],
    usedIn: ['Robot safety', 'Maintenance', 'Emergency situations'],
    related: ['v-safe-stop', 'v-safety-scanner', 'v-safety-zone'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-safety-zone',
    term: 'Safety Zone',
    kind: 'jargon',
    simple: 'An area where special safety rules apply to the robot.',
    technical:
      'A defined physical or mapped region associated with safety constraints, such as reduced speed, restricted operation, or protective stopping behaviour.',
    usedIn: ['Robot safety', 'Map configuration'],
    related: ['v-estop', 'v-safety-scanner', 'v-safe-stop', 'v-geofencing'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-safety-scanner',
    term: 'Safety Scanner',
    kind: 'jargon',
    simple: 'A sensor used to detect people or objects around the robot for safety.',
    technical:
      'A safety-rated sensing device used to monitor defined protective fields around a robot and trigger safety behaviour when an intrusion is detected.',
    usedIn: ['Robot safety', 'Obstacle detection'],
    related: ['v-safety-zone', 'v-safe-stop', 'v-estop'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-safe-stop',
    term: 'Safe Stop',
    kind: 'jargon',
    simple: 'Stopping the robot in a way that puts it into a defined safe condition.',
    technical:
      'A controlled safety-related stopping function intended to prevent hazardous motion while preserving the conditions required for a safe state.',
    usedIn: ['Robot safety', 'Safety systems'],
    related: ['v-estop', 'v-safety-scanner', 'v-safety-zone'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // INTEGRATION
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'v-api',
    term: 'API',
    expansion: 'Application Programming Interface',
    kind: 'acronym',
    simple: 'A defined way for one piece of software to communicate with another.',
    technical:
      'A documented interface that specifies how software systems can request data, send commands, or exchange information.',
    usedIn: ['Integrations', 'ERP/WMS/MES connectivity', 'Software architecture'],
    related: ['v-webhook', 'v-event', 'v-message', 'v-vda-5050'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-webhook',
    term: 'Webhook',
    kind: 'jargon',
    simple: 'A way for one system to automatically tell another system that something happened.',
    technical:
      'An HTTP-based callback mechanism in which one system sends an event notification to a configured endpoint when a specified event occurs.',
    usedIn: ['System integrations', 'Event-driven workflows'],
    related: ['v-api', 'v-event', 'v-message'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-mqtt',
    term: 'MQTT',
    expansion: 'Message Queuing Telemetry Transport',
    kind: 'acronym',
    simple: 'A lightweight messaging protocol commonly used by connected devices to exchange data.',
    technical:
      'A publish-subscribe messaging protocol commonly used for IoT and machine-to-machine communication where devices publish messages to topics and subscribers receive relevant messages.',
    usedIn: ['IoT', 'Robot telemetry', 'Connected systems'],
    related: ['v-message', 'v-event', 'v-vda-5050'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-event',
    term: 'Event',
    kind: 'jargon',
    simple: 'A piece of information saying that something happened.',
    technical:
      'A discrete occurrence in a software or operational system that can trigger processing, notifications, state changes, or downstream actions.',
    usedIn: ['Integrations', 'Orchestration', 'Event-driven workflows'],
    related: ['v-message', 'v-webhook', 'v-api'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-message',
    term: 'Message',
    kind: 'jargon',
    simple: 'A piece of data sent from one system or component to another.',
    technical:
      'A structured unit of information exchanged between software components, devices, or services through a communication mechanism.',
    usedIn: ['Robot communication', 'Integrations', 'VDA 5050'],
    related: ['v-event', 'v-api', 'v-vda-5050'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // VDA 5050 DETAIL
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'v-vda-5050-order',
    term: 'VDA 5050 Order',
    kind: 'jargon',
    simple: 'The instruction sent to a robot describing the work or route it should execute.',
    technical:
      'A VDA 5050 message used by the central control system to provide the mobile robot with an order containing the information required to execute a planned movement.',
    usedIn: ['VDA 5050', 'Robot-fleet communication'],
    related: ['v-vda-5050', 'v-vda-5050-state', 'v-instant-action'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-vda-5050-state',
    term: 'VDA 5050 State',
    kind: 'jargon',
    simple: 'The status information a robot sends back to the fleet control system.',
    technical:
      'A VDA 5050 message containing the robot’s current state and execution information for the central control system.',
    usedIn: ['VDA 5050', 'Robot monitoring'],
    related: ['v-vda-5050', 'v-vda-5050-order', 'robot-states'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-instant-action',
    term: 'Instant Action',
    kind: 'jargon',
    simple: 'An immediate command sent to a robot rather than part of its normal route.',
    technical:
      'A VDA 5050 mechanism for requesting an immediate action independently of the normal order execution flow.',
    usedIn: ['VDA 5050', 'Robot control'],
    related: ['v-vda-5050', 'v-vda-5050-order'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MANUFACTURING & MATERIAL FLOW
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'v-sku',
    term: 'SKU',
    expansion: 'Stock Keeping Unit',
    kind: 'acronym',
    simple: 'A unique identifier for a particular product or material item.',
    technical:
      'A distinct inventory identifier used to represent a specific product, material, or variant within an inventory system.',
    usedIn: ['Material movement', 'Inventory', 'WMS/ERP integrations'],
    related: ['v-sub-sku', 'v-wms', 'v-erp'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-sub-sku',
    term: 'Sub-SKU',
    kind: 'jargon',
    simple: 'A more specific material item or variant belonging to a larger SKU structure.',
    technical:
      'A lower-level material identifier used when a workflow needs to distinguish components, variants, or material units within a broader SKU hierarchy.',
    usedIn: ['Material movement workflows', 'Pick and drop operations'],
    related: ['v-sku', 'v-material-flow'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-material-flow',
    term: 'Material Flow',
    kind: 'term',
    simple: 'The movement of materials through a factory.',
    technical:
      'The movement of raw materials, components, work-in-progress, and finished goods between locations or process steps within a manufacturing environment.',
    usedIn: ['Material orchestration', 'Factory operations'],
    related: ['v-orchestration', 'v-wip', 'v-line-side', 'v-throughput'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-line-side',
    term: 'Line-side',
    kind: 'jargon',
    simple: 'The area immediately next to a production line where materials are supplied.',
    technical:
      'The production-side location where components or materials are staged for operators or machines to consume during manufacturing.',
    usedIn: ['Material movement', 'Manufacturing logistics'],
    related: ['v-material-flow', 'v-buffer', 'v-supermarket'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-buffer',
    term: 'Buffer',
    kind: 'jargon',
    simple: 'A temporary place where material waits before moving to its next destination.',
    technical:
      'An intermediate storage or staging location used to decouple two processes and absorb differences in their timing or throughput.',
    usedIn: ['Material flow', 'Manufacturing logistics'],
    related: ['v-material-flow', 'v-line-side', 'v-supermarket', 'v-wip'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-supermarket',
    term: 'Supermarket',
    kind: 'jargon',
    simple: 'A stocked material area where production can pull the components it needs.',
    technical:
      'A controlled inventory area positioned near consumption points and replenished according to demand, commonly associated with lean manufacturing and pull-based material flow.',
    usedIn: ['Manufacturing logistics', 'Material replenishment'],
    related: ['v-kanban', 'v-line-side', 'v-buffer', 'v-material-flow'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-kanban',
    term: 'Kanban',
    kind: 'jargon',
    simple: 'A system for signalling that more material is needed.',
    technical:
      'A pull-based production and replenishment method in which a signal triggers the movement or production of material when inventory is consumed.',
    usedIn: ['Material replenishment', 'Lean manufacturing'],
    related: ['v-supermarket', 'v-material-flow', 'v-line-side'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-takt-time',
    term: 'Takt Time',
    kind: 'jargon',
    simple: 'How often a product needs to come off the production line to meet demand.',
    technical:
      'The available production time divided by customer demand. It represents the required production rhythm rather than the actual time required to manufacture one item.',
    usedIn: ['Manufacturing operations', 'Production planning'],
    related: ['v-cycle-time', 'v-throughput'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-cycle-time',
    term: 'Cycle Time',
    kind: 'jargon',
    simple: 'How long it takes to complete one cycle of a process.',
    technical:
      'The elapsed time required to complete one unit or one repeatable process cycle. It is distinct from takt time, which represents the required production rate.',
    usedIn: ['Manufacturing operations', 'Material movement'],
    related: ['v-takt-time', 'v-throughput'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-throughput',
    term: 'Throughput',
    kind: 'jargon',
    simple: 'How much work or material a system can move through in a given amount of time.',
    technical:
      'The rate at which units, materials, tasks, or other work items are completed or transported by a system.',
    usedIn: ['Factory analytics', 'Fleet performance', 'Material flow'],
    related: ['v-cycle-time', 'v-takt-time', 'v-material-flow'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ROLES & PERMISSIONS
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'v-debug',
    term: 'Debug',
    kind: 'term',
    simple: 'The technical screen for finding out why a robot is behaving the way it is.',
    technical:
      'A low-level configuration and diagnostics area — raw robot state, calibration, overrides, diagnostic logs — assigned exclusively to the Configurator role in the current IA.',
    usedIn: ['The information architecture, as a page name'],
    related: ['ui-debug', 'd-debug-is-configurator-only', 'users'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [G, I]
  },
  {
    id: 'v-validation',
    term: 'Validation',
    kind: 'term',
    simple: 'The Tech function that tests robots and software against real and simulated conditions before they are trusted in production.',
    technical:
      'One of the four functions inside the [[team-tech|Tech]] team, alongside Autonomy, Electronics and Cloud. Distinct from stage 8 of the [[wf-deployment|deployment workflow]] ("Testing & validation"), which is a step in that workflow rather than the team performing it. Uses [[v-feluda|Feluda]] for tracking, analytics and metrics.',
    usedIn: ['Teams at Ati — Tech'],
    related: ['team-tech', 'v-feluda', 'wf-deployment'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-18',
    sources: [ORG]
  },
  {
    id: 'v-roc',
    term: 'ROC',
    expansion: 'Robot Operations Center',
    kind: 'acronym',
    simple: 'Software built in-house at Ati as an alternative to Zendesk for issue tracking. It was never deployed extensively and is now deprecated.',
    technical:
      'ROC is not a team and not related to [[v-feluda|Feluda]] — the two are separate, unconnected tools that were previously and incorrectly documented as linked. Why it was not adopted more widely, and whether it has been fully retired or is still running in a limited capacity, has not been confirmed.',
    related: [],
    status: 'deprecated',
    author: 'Annuai',
    added: '2026-09-18',
    revisions: [
      {
        date: '2026-09-18',
        author: 'Annuai',
        note: 'Corrected: ROC is deprecated in-house software (a Zendesk alternative for issue tracking that was not deployed extensively), not a team, and not related to Feluda. Earlier drafts of this entry had it backwards.'
      }
    ],
    sources: [ORG]
  },
  {
    id: 'v-feluda',
    term: 'Feluda',
    kind: 'jargon',
    simple: 'A tracking, analytics and metrics tool built in-house at Ati, actively used by Validation.',
    technical:
      'Feluda is currently in use by [[v-validation|Validation]] for tracking, analytics and metrics. It is unrelated to [[v-roc|ROC]] — a separate, deprecated in-house tool — despite both being named together in earlier drafts of this and the ROC entry.',
    usedIn: ['Validation'],
    related: ['v-validation', 'team-tech'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-18',
    revisions: [
      {
        date: '2026-09-18',
        author: 'Annuai',
        note: 'Corrected: Feluda is used by Validation only, not ROC.'
      },
      {
        date: '2026-09-18',
        author: 'Annuai',
        note: 'Corrected again: Feluda is still actively in use (not deprecated) and has no relationship to ROC at all — ROC is a separate, deprecated Zendesk-alternative tool, not a team, and the two should not be confused.'
      }
    ],
    sources: [ORG]
  },
  {
    id: 'v-operator',
    term: 'Operator',
    kind: 'term',
    simple: 'The person on the floor, looking after one zone.',
    technical:
      'Sees Fleet Monitor for their own zone — robot status and task queue. Can raise a manual priority request, with the trade-off shown before confirming. View-only on Robots in their zone. Maps, Workflows, Integrations, Setup and Debug are entirely hidden.',
    usedIn: ['The role and permission model'],
    related: ['users', 'v-fleet-supervisor'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [I]
  },
  {
    id: 'v-fleet-supervisor',
    term: 'Fleet Supervisor',
    kind: 'term',
    simple:
      'Someone who steps in when a robot has a problem — like a support engineer working the floor. Whether the job needs its own person is not settled.',
    technical:
      'Limited to managing robots when there are issues. They do not control anything else, and they are not given the data to control or manage anything else either.',
    usedIn: ['The role and permission model'],
    note: 'Whether this user is required at all has not been settled — see below. Not to be confused with [[v-fleet-manager|Fleet Manager]], which is software.',
    blocks: [
      h('What the job is'),
      p(
        'Narrow and reactive. A Fleet Supervisor handles robots that have run into trouble, and nothing more. The scope is deliberate: they are not given the data they would need to manage anything beyond that, so the role cannot quietly widen into general operations.'
      ),
      p('The closest comparison is a support engineer who works on the floor rather than remotely.'),
      h('Whether the role is needed'),
      p(
        'This is genuinely undecided. The argument against it is straightforward: **[[v-operator|Operators]] already manage the robots when there is an issue.** If that is the whole of the Fleet Supervisor job, and the person already standing on the floor is doing it, a separate persona may not be necessary.'
      ),
      callout(
        'Why it matters before it is decided',
        'Keeping the role changes the permission model and the zone assignment logic — a Fleet Supervisor owns zones, which means zones need owners. Dropping it makes the [[users|user model]] three people rather than four.',
        'gap'
      ),
      h('The earlier table says more than this'),
      p(
        'The permission table on [[users|Users and permissions]] gives the Fleet Supervisor a wider remit: Fleet Monitor across their assigned zones **with reassignment control**, managing robots within their zone including marking for maintenance, and view-only access to Maps and Workflows. That is more than issue handling, and more data than the current understanding describes.'
      ),
      gap(
        'The two descriptions have not been reconciled. Either the earlier table is now too generous, or the role is broader than the current understanding suggests. Both are recorded here rather than one being chosen.'
      )
    ],
    related: ['users', 'users', 'v-operator', 'v-head-of-operations', 'v-fleet-manager', 'robot-states', 'wf-exceptions'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-16',
    revisions: [
      {
        date: '2026-09-16',
        author: 'Annuai',
        note: 'Narrowed to what the role actually is — handling robots with issues, and nothing else — and recorded the real argument against needing it: Operators already do that job.'
      }
    ],
    sources: [TEAM, I]
  },
  {
    id: 'v-head-of-operations',
    term: 'Head of Operations',
    kind: 'term',
    simple: 'The person accountable for the whole site.',
    technical:
      'Named in the IA as Supervisor (Head of Operations). Fleet Monitor across all zones, manages robots site-wide, views and approves Workflows and Maps, views Integrations status, and manages users and roles. Debug is hidden.',
    usedIn: ['The role and permission model'],
    related: ['users', 'v-fleet-supervisor', 'v-solutions-architect'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [I]
  },
  {
    id: 'v-solutions-architect',
    term: 'Solutions Architect',
    expansion: 'also called the Configurator; typically a System Integrator',
    kind: 'term',
    simple:
      'The person who sets everything up — building the maps and doing whatever else it takes to get a fleet running in a warehouse that has never had one. In practice, this is usually someone at a third-party System Integrator delivering the deployment, not an Ati employee.',
    technical:
      'Full edit on Maps and Workflows, full setup on Robots including low-level parameters, full configuration on Integrations and Setup & Config, and the only role with Debug access. View-only on Fleet Monitor, for verifying configuration rather than daily operations.',
    usedIn: ['The role and permission model'],
    note: 'Three names in play for the same person and relationship: **Solutions Architect** and **Configurator** describe what they do in the product (the wording between the two is not finalised); **[[v-system-integrator|System Integrator]]** describes who they typically work for — a third-party company delivering deployment services to the end client, rather than an Ati employee. Neither is the name of a screen. See [[users]].',
    blocks: [
      h('What setting up involves'),
      p(
        'Everything needed to take a site from having no fleet to running one: building and annotating the [[map]], designing [[missions-and-actions|missions]], configuring [[robot|robots]] down to their low-level parameters, wiring up [[integrations]], and site configuration. He is also the only user with [[ui-debug|Debug]] access.'
      ),
      gap(
        'How this user relates to [[v-deployment-manager|Deployment Manager]] — the tool Ati support engineers use to configure and deploy robots — is not established, although the two describe closely related work.'
      )
    ],
    related: ['users', 'v-system-integrator', 'configuration-layers', 'wf-deployment', 'v-deployment-manager', 'v-debug'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    revisions: [
      {
        date: '2026-09-18',
        author: 'Annuai',
        note: 'Added that System Integrator names the same person and relationship from a different angle: who they typically work for (a third-party deployment partner), rather than what they do in the product. Resolves the earlier open question of how System Integrator relates to the four-user model.'
      }
    ],
    sources: [I, DIRECTIVE]
  },
  {
    id: 'v-system-integrator',
    term: 'System Integrator',
    kind: 'term',
    simple: 'The same person as the Solutions Architect (Configurator) — a third-party company delivering deployment services to a client, rather than an Ati employee.',
    technical:
      'Resolved: System Integrator and [[v-solutions-architect|Solutions Architect (Configurator)]] name the same person and the same permission role in the four-user model, viewed from two different angles. Solutions Architect / Configurator describes what they do inside the product — full setup authority. System Integrator describes who they typically work for: a third-party company reselling or deploying the system alongside the client’s own ERP, rather than an Ati employee. It is an organisational descriptor, not a fifth persona.',
    usedIn: ['Third-party resale and deployment', 'The role and permission model'],
    note: 'See [[open-questions]] for the naming recommendation: keep the in-product role named for what it does (Solutions Architect / Configurator) rather than for who typically fills it (System Integrator).',
    related: ['users', 'v-solutions-architect', 'open-questions'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-18',
    revisions: [
      {
        date: '2026-09-18',
        author: 'Annuai',
        note: 'Resolved: System Integrator and Solutions Architect (Configurator) are the same person/role. System Integrator names the typical third-party employer relationship; Solutions Architect / Configurator names the in-product function. Not a fifth persona.'
      }
    ],
    sources: [TRANSCRIPT, DIRECTIVE]
  },
  {
    id: 'v-supervisor-mode',
    term: 'Supervisor Mode',
    kind: 'term',
    simple: 'A selector at the top of the prototype sidebar. What it switches is not documented.',
    usedIn: ['The prototype sidebar'],
    note: 'How this control relates to the four documented roles is unestablished.',
    related: ['users', 'ui-components', 'open-questions'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [P]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ENGINEERING DOCUMENTS
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'v-prd',
    term: 'PRD',
    expansion: 'Product Requirements Document',
    kind: 'acronym',
    simple: 'The document that says what a product should do, and why, before anyone builds it.',
    technical:
      'A statement of intent for a product or a release: the problem, the users, the behaviour expected of the system and the boundaries of scope. It describes the product from the outside — what it must do — rather than the implementation.',
    usedIn: [
      'AtiFLOW v2.0 and AtiFLOW v3.0 — the two supplied Ati Flow requirement documents this system is partly traced to'
    ],
    note: 'The two supplied PRDs are the only Ati requirement documents in evidence here, and they disagree in places — v3 renames and restructures parts of v2 rather than extending it. The documentation records both readings rather than treating the newer one as automatically correct.',
    aliases: ['product requirements document', 'product spec', 'requirements document'],
    related: ['engineering-documents', 'v-frd', 'v-bom', 'v-dfmea', 'ati-flow'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [V2, V3, TEAM]
  },
  {
    id: 'v-frd',
    term: 'FRD',
    expansion: 'Functional Requirements Document',
    kind: 'acronym',
    simple:
      'The document that says how the system has to behave, function by function, so that the product does what the PRD asked for.',
    technical:
      'Where a [[v-prd|PRD]] states the intent, an FRD states the required behaviour: inputs, outputs, rules, states and conditions for each function, written so that an implementation can be checked against it. It is the layer between a product decision and a testable requirement.',
    note: 'No Ati FRD is present in this repository, and no source here says whether Ati writes FRDs separately from its PRDs or folds functional detail into them. The definition above is the general one.',
    aliases: ['functional requirements document', 'functional spec', 'functional specification'],
    related: ['engineering-documents', 'v-prd', 'v-bom', 'v-dfmea'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },
  {
    id: 'v-bom',
    term: 'BOM',
    expansion: 'Bill of Materials',
    kind: 'acronym',
    simple: 'The list of every part needed to build one thing, with how many of each.',
    technical:
      'A structured parts list for an assembly: components, quantities, part numbers and the sub-assemblies they roll up into. On the hardware side it is what a robot is built from; in a plant it is also what a machine consumes to produce one unit of output.',
    usedIn: [
      'AtiFLOW v3.0 — the Structured [[v-requester-mode|requester mode]] flow, Machine → Station → Workflow → BOM'
    ],
    note: 'The acronym carries two meanings in Ati material and they are not the same list. In the v3 PRD, BOM is a material-demand input to a request — what a machine needs delivered. In hardware engineering, a BOM is the build list for a product. Which of the two the Structured requester flow resolves against, and whether it comes from an [[v-erp|ERP]], is not documented.',
    aliases: ['bill of materials', 'parts list'],
    related: ['engineering-documents', 'v-requester-mode', 'v-sku', 'material-flow', 'v-prd', 'v-dfmea'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [V3, TEAM]
  },
  {
    id: 'v-dfmea',
    term: 'DFMEA',
    expansion: 'Design Failure Mode and Effects Analysis',
    kind: 'acronym',
    simple:
      'A structured way of asking, before anything is built, how a design could fail — and deciding what to change about the worst answers.',
    technical:
      'A design-stage analysis that enumerates the ways each function of a design can fail, the effect and cause of each failure, and the controls already in place. Severity, occurrence and detection are rated and combined into a risk priority, which drives the actions taken back into the design. It is a living document, revisited as the design changes.',
    note: 'No DFMEA is present in this repository. Whether Ati runs DFMEAs on its robot hardware, who owns them and how they relate to the [[v-safety-zone|safety]] parameters configured per robot is not documented here.',
    aliases: ['design failure mode and effects analysis', 'FMEA', 'design FMEA', 'failure mode and effects analysis'],
    related: ['engineering-documents', 'v-prd', 'v-bom', 'v-safe-stop', 'robot'],
    status: 'needs-confirmation',
    author: 'Annuai',
    added: '2026-09-17',
    sources: [TEAM]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MISC
  // ─────────────────────────────────────────────────────────────────────────

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
