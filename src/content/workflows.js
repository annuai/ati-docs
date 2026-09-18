import { p, h, list, table, callout, gap, flow, defs, accordions } from './blocks.js';

const S = {
  glossary: 'old/ati-flow-glossary.html',
  architecture: 'old/ati-flow-architecture.html',
  deployment: 'old/amr-deployment-workflow.html',
  ia: 'old/amr-software-ia-roles.html',
  screens: 'old/ati-flow-screens.html',
  overview: 'old/index.html',
  prototype: 'old/prototype/'
};

// Knowledge supplied directly in conversation rather than found in this folder.
const ID1 = 'Operations Excellence lead — Industrial Design 1:1, September 2026';

export const workflows = [
  {
    id: 'wf-material-movement',
    slug: 'material-movement',
    title: 'Material movement',
    summary: 'How a need somewhere in the factory becomes material arriving somewhere else.',
    simple:
      'Something needs moving. The system picks a robot, tells it where to go, and the robot goes and does it.',
    aliases: ['material flow workflow', 'request to delivery'],
    status: 'draft',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.overview, S.architecture, S.deployment],
    blocks: [
      h('The sequence'),
      flow([
        {
          title: 'Demand appears',
          note: 'Production demand, material availability, a line schedule or an inventory condition creates the reason for movement.',
          tag: 'Business layer'
        },
        {
          title: 'A request arrives',
          note: 'An external system triggers a mission through an API hook, or a person raises the request directly.',
          tag: 'Integration layer'
        },
        {
          title: 'Orchestration turns it into work',
          note: 'The configured workflow and the incoming request become executable work.',
          tag: 'Orchestration layer'
        },
        {
          title: 'The fleet picks a robot',
          kind: 'decision',
          note: 'Task allocation assigns the work to a specific idle or nearby robot. Priority decides what happens first.',
          tag: 'Fleet layer'
        },
        {
          title: 'The robot executes',
          note: 'Navigate to the pickup position, take the load, transport it, drop it off — using the robot’s own navigation and safety systems.',
          tag: 'Robot layer'
        },
        {
          title: 'Material has moved',
          kind: 'outcome',
          note: 'Status and completion updates flow back to the requesting system.',
          tag: 'Factory'
        }
      ]),
      h('What decides which robot goes'),
      list([
        'Task allocation logic — which robot is idle or nearby',
        'Priority, which can be designed into the mission, applied by fleet aging rules, computed from business data, or raised manually by an operator',
        'Traffic arbitration, once more than one robot wants the same route'
      ]),
      gap(
        'The specific allocation algorithm, the priority scale and the request payload are not documented anywhere in this folder. The sequence above is assembled from the architecture chain and the fleet-management stage of deployment.'
      )
    ],
    related: ['material-flow', 'orchestration', 'wf-robot-dispatch', 'integrations']
  },

  {
    id: 'wf-robot-dispatch',
    slug: 'robot-dispatch',
    title: 'Robot dispatch',
    summary: 'How an incoming request becomes a specific robot moving.',
    simple:
      'Dispatch is the moment a job stops being a request and becomes a robot’s problem.',
    aliases: ['task allocation', 'assignment'],
    status: 'draft',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.deployment, S.ia],
    blocks: [
      h('The sequence'),
      flow([
        { title: 'A task enters the queue', note: 'From an integration, a configured schedule, or a person.' },
        {
          title: 'Is a robot available?',
          kind: 'decision',
          note: 'Robots in maintenance are removed from normal dispatch. Robots locked into a user-defined mission are not interrupted by automatic fleet behaviour.'
        },
        { title: 'Allocation picks a robot', note: 'An idle or nearby robot is selected.' },
        {
          title: 'Traffic arbitration applies',
          kind: 'decision',
          note: 'Where the route crosses gates or exclusion zones, access is arbitrated before the robot proceeds.'
        },
        { title: 'The robot runs the mission', kind: 'outcome', note: 'Progress becomes visible in the live view as a trip with a next station.' }
      ]),
      h('Manual intervention'),
      p(
        'An Operator can raise a manual priority request, and the interface shows the trade-off before they confirm. A Fleet Supervisor can reassign work within their zones. Neither is a Configurator activity — day-to-day dispatch is explicitly operational.'
      ),
      gap('Whether an operator can dispatch a robot directly, and which robot actions each role may take, is listed as an open question in the source material.')
    ],
    related: ['task', 'fleet', 'trip', 'v-dispatch', 'roles-and-permissions']
  },

  {
    id: 'wf-charging',
    slug: 'charging',
    title: 'Charging and idle behaviour',
    summary: 'What robots do when they are not carrying anything.',
    simple:
      'When a robot has nothing to do, the fleet sends it somewhere useful — usually a charger, sometimes a waiting spot.',
    aliases: ['docking', 'battery', 'idle'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.deployment, S.prototype],
    blocks: [
      h('Before anything runs: infrastructure'),
      list([
        'Charging docks are placed during infrastructure setup — **ideally distributed rather than centralized**',
        'Dock count is sized against peak-hour demand versus charge time',
        'Docking and charging points are then annotated onto the map as positions, each with an entry-point orientation'
      ]),
      h('At runtime'),
      flow([
        { title: 'A robot becomes idle', note: 'It has finished its work and nothing is queued for it.' },
        {
          title: 'Is it locked into a user-defined mission?',
          kind: 'decision',
          note: 'Fleet management does not touch robots that are. Automatic idle behaviour applies only to robots that are free.'
        },
        { title: 'The fleet sends it to a charger or a staging position', note: 'This happens automatically, without an operator asking.' },
        { title: 'The robot docks and charges', kind: 'outcome', note: 'Battery level is visible per robot in the live view.' }
      ]),
      callout(
        'Battery as an early-warning signal',
        'Battery consumption is one of the three baselines captured right after go-live, alongside normal cycle times and blocked-robot frequency, so that later drift can be told apart from normal variance.'
      ),
      gap('No charging thresholds, charge-time figures or battery capacities appear in any source.')
    ],
    related: ['fleet', 'robot', 'v-dock', 'v-staging-area', 'wf-deployment']
  },

  {
    id: 'wf-exceptions',
    slug: 'exceptions',
    title: 'Exceptions',
    summary: 'The situations that do not go to plan, and where each one is handled.',
    simple:
      'Most of running a fleet is handling the cases where something is in the way, occupied, or contested.',
    aliases: ['blocked', 'edge cases', 'failures'],
    status: 'draft',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.deployment, S.prototype, S.screens],
    blocks: [
      h('Exceptions the sources name'),
      table(
        ['Situation', 'Where it shows up', 'Where it is addressed'],
        [
          ['A robot is blocked', 'Red status pill and a pulsing halo in the live view; automated blocked-robot alerts after go-live', 'Operationally first, then by correcting the map or zone'],
          ['Two robots reach the same gate at once', 'Deliberately tested during validation', '[[traffic-control|Traffic arbitration]] in the fleet layer'],
          ['A station is occupied on arrival', 'Deliberately tested during validation', 'Mission and fleet logic'],
          ['A manual priority escalation mid-cycle', 'Deliberately tested during validation', 'Priority and interrupt behaviour designed into the mission'],
          ['Localization failure', 'Surfaces after go-live rather than in testing', 'Map correction, robot diagnostics'],
          ['Priority misuse', 'Surfaces after go-live rather than in testing', 'Priority rules and operator training']
        ]
      ),
      callout(
        'Why several of these only appear later',
        'Recovery and edge cases tend to surface during real operation rather than during testing, simply because weeks of real operation cannot be fully simulated.'
      ),
      h('How to respond'),
      p('The documented reading order for an operational problem:'),
      flow([
        { title: 'Start with system state', note: 'Is the fleet operating normally?' },
        { title: 'Look for exceptions', note: 'Which robots, tasks or zones need attention?' },
        { title: 'Understand impact', kind: 'decision', note: 'Is the issue isolated, or is it affecting material flow?' },
        {
          title: 'Act at the right layer',
          kind: 'outcome',
          note: 'Operational intervention belongs in Fleet Monitor and Robots. Configuration belongs in Maps, Workflows and Setup. Low-level diagnosis belongs in Debug.'
        }
      ]),
      gap('There is no documented exception taxonomy, alert model, severity scale or escalation path.')
    ],
    related: ['robot-states', 'traffic-control', 'ui-patterns', 'wf-deployment', 'v-blocked']
  },

  {
    id: 'wf-configuration',
    slug: 'configuration',
    title: 'Configuration',
    summary: 'The order configuration is done in, and which layer owns each setting.',
    simple:
      'Set up the robots, then the map, then what the map means, then the jobs, then how robots share the space, then the connection to the business system. Each step depends on the one before it.',
    aliases: ['setup', 'configure'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.deployment, S.architecture, S.ia],
    blocks: [
      h('The order'),
      flow([
        { title: 'Configure each robot', note: 'Network credentials, robot ID, safety parameters, payload profile, drive parameters.', tag: 'Robot layer' },
        { title: 'Build the map', note: 'Drive the full area to produce the point cloud, then validate it.', tag: 'Map' },
        { title: 'Annotate the map', note: 'Positions and stations, behavioural zones, gates and exclusion zones, forbidden and preferred areas.', tag: 'Map annotation' },
        { title: 'Design missions', note: 'Atomic actions first, then sub-missions, then missions, then pattern and priority.', tag: 'Mission' },
        { title: 'Configure the fleet', note: 'Task allocation, traffic arbitration, charging and idle behaviour, priority and aging.', tag: 'Fleet' },
        { title: 'Connect the business system', kind: 'outcome', note: 'API hooks, implicit priority, master data alignment.', tag: 'Integration' }
      ]),
      callout(
        'The question worth asking first',
        'Almost every confusing configuration question is really "which layer owns this setting?". [[configuration-layers]] answers that in one table.'
      ),
      h('Who does it'),
      p(
        'Configuration authority sits with the Solutions Architect (Configurator): full edit on Maps and Workflows, full setup on Robots including low-level parameters, and full configuration on Integrations and Setup & Config. A Head of Operations can view and approve maps and workflows without doing the detailed editing.'
      )
    ],
    related: ['configuration-layers', 'wf-deployment', 'roles-and-permissions', 'map-annotation']
  },

  {
    id: 'wf-deployment',
    slug: 'deployment',
    title: 'AMR deployment',
    summary: 'Nine stages from site assessment to a fleet running in production, and what each one covers.',
    simple:
      'Deploying robots at a site follows a fixed order: understand the site, prepare it, map it, give the map meaning, design the jobs, coordinate the fleet, connect the business systems, test, and go live.',
    aliases: ['deployment workflow', 'rollout', 'nine stages'],
    status: 'current',
    author: 'Annuai',
    added: '2026-09-16',
    sources: [S.deployment, ID1],
    blocks: [
      callout(
        'This is a human process, not a product object',
        'Ati Flow also has a surface called [[ui-workflows|Workflows]], which holds configured transport behaviour. That is a different thing entirely. See [[workflow]].'
      ),
      h('The nine stages'),
      flow(
        [
          { title: '1. Site assessment', note: 'Traffic, deadlines, layout', tag: 'Planning' },
          { title: '2. Infrastructure setup', note: 'WiFi, docks, robot config', tag: 'Planning' },
          { title: '3. Mapping (SLAM)', note: 'Point cloud, loop closure', tag: 'Build' },
          { title: '4. Map annotation', note: 'Positions, zones, traffic rules', tag: 'Build' },
          { title: '5. Mission design', note: 'Actions, priority, mission types', tag: 'Build' },
          { title: '6. Fleet management', note: 'Task allocation, traffic, charging', tag: 'Build' },
          { title: '7. ERP integration', note: 'SAP hooks, priority logic', tag: 'Deploy' },
          { title: '8. Testing & validation', note: 'Floor tests, edge cases', tag: 'Deploy' },
          { title: '9. Go-live & iteration', note: 'Training, monitor, refine', tag: 'Deploy', kind: 'outcome' }
        ],
        'Grouped into three phases: planning, build and deploy. Stage 9 feeds back into stages 4 and 5 rather than ending.'
      ),
      h('Stage detail'),
      accordions([
        {
          title: 'Stage 1 — Site assessment and solutioning',
          tag: 'Planning',
          body: [
            p(
              'Before any hardware moves, this phase establishes what the deployment actually needs to solve. It is the [[v-solutioning|solutioning]] work of defining the solution and routes for a specific project before detailed design begins.'
            ),
            list([
              'What material moves where, how often, and under what deadline pressure — this becomes the basis for mission and priority logic later',
              'Floor layout: aisle widths, ramps, doorways, blind corners, areas with heavy pedestrian or forklift traffic',
              'Where charging infrastructure and staging areas will physically live',
              'Network coverage requirements across the full operating area',
              'Payload types and handling method — top-load, tugger/cart, lift, or conveyor interface'
            ]),
            p(
              'Mistakes here do not surface until much later phases, so it is worth treating as its own gate rather than rushing into mapping.'
            )
          ]
        },
        {
          title: 'Stage 2 — Infrastructure setup',
          tag: 'Planning',
          body: [
            p('Physical, network, and per-robot configuration that has to exist before mapping can start.'),
            list([
              'Install and verify WiFi coverage across the full route network, including overlap at handoff points between access points',
              'Place charging docks — ideally distributed rather than centralized, sized against peak-hour demand versus charge time',
              'Prep physical safety infrastructure that zones will later reference, such as existing floor markings and barriers near machinery',
              'Set up the [[v-fleet-controller|fleet controller]] or server, on-premise or cloud, that robots and any orchestration layer will talk to',
              'Configure each robot: network credentials, robot ID, safety parameters (max speed, footprint, sensor calibration), payload profile and drive parameters'
            ]),
            p(
              'This is also where robot configuration is set at the robot level — worth keeping conceptually distinct from map and mission configuration, which come later. See [[configuration-layers]].'
            )
          ]
        },
        {
          title: 'Stage 3 — Mapping (SLAM)',
          tag: 'Build',
          body: [
            p(
              'The raw spatial substrate everything else gets layered on top of — purely for localization, with no inherent concept of zones or business logic.'
            ),
            list([
              'Manually drive or walk the robot through the full operating area to build the point cloud map',
              'Run pose graph optimization ([[v-loop-closure|loop closure]]) on long corridors or loops where drift could accumulate — judged iteratively rather than flagged automatically',
              'Validate map quality by driving it a second time and checking self-localization confidence, not just visual completeness'
            ]),
            p('Multiple bot types — lifters, pallet movers, tuggers — can typically share the same map without duplicate maps per zone.')
          ]
        },
        {
          title: 'Stage 4 — Map annotation',
          tag: 'Build',
          body: [
            p(
              'This is where the raw map becomes operational — positions, behaviour and traffic rules layered on top of pure localization data. See [[map-annotation]].'
            ),
            list([
              '**Positions and stations:** exact pickup, drop-off, docking and charging points, each with entry-point orientation',
              '**Behavioural zones:** speed-limited zones, ramp zones, docking zones — always active based on location, like a school zone',
              '**Traffic control (gates and exclusion zones):** separate from behavioural zones, governing multi-bot access at single-lane or alternating-direction sections',
              '**Forbidden and preferred zones:** areas to avoid entirely versus areas to bias routing toward'
            ]),
            p('If fleets are mixed, this is also where zone access gets differentiated by robot type.')
          ]
        },
        {
          title: 'Stage 5 — Mission design',
          tag: 'Build',
          body: [
            p('Composing the annotated map into actual transport behaviour. See [[missions-and-actions]].'),
            list([
              'Build atomic actions first — go to position, dock, undock, wait, trigger I/O, request access to a resource — then compose missions from them',
              'Design reusable sub-missions for common patterns, such as "go to charging station", rather than duplicating logic across missions',
              'Choose the mission pattern per use case: **taxi** (on-demand, point-to-point), **milk run** (fixed loop, multiple stops), or **bus** (scheduled repeating route)',
              'Bake in priority and interrupt behaviour where needed — whether a mission can be preempted, and where in its route that is safe'
            ])
          ]
        },
        {
          title: 'Stage 6 — Fleet management',
          tag: 'Build',
          body: [
            p('The multi-robot coordination layer that turns individual missions into a working [[fleet]].'),
            list([
              'Task allocation logic: how an incoming request gets assigned to a specific idle or nearby robot',
              'Traffic arbitration at shared resources — the gates and exclusion zones from stage 4 — where contention and deadlock actually get tested',
              'Charging and idle behaviour: idle robots are typically sent to charging stations and staging positions automatically, without touching robots locked into a user-defined mission',
              'Priority and aging rules, if manual escalation needs to be supported'
            ])
          ]
        },
        {
          title: 'Stage 7 — ERP integration',
          tag: 'Deploy',
          body: [
            p('Connecting the fleet to the business systems that actually drive demand. See [[integrations]].'),
            list([
              'API hooks so an external system — an ERP such as SAP — can trigger a mission and receive status or completion updates back',
              'Implicit priority computed from business data — due dates, line schedules, stock levels — rather than relying purely on manual escalation',
              'Master data alignment: explicitly defining what is configured at this layer versus what belongs to map or mission configuration, since this is a common source of cross-team confusion'
            ])
          ]
        },
        {
          title: 'Stage 8 — Testing and validation',
          tag: 'Deploy',
          body: [
            p(
              'Proving the system works before it is handed over, and deliberately probing the cases that do not show up in a quick walkthrough.'
            ),
            list([
              'Test each mission manually on the floor before handing anything to the fleet or orchestration layer — final handover only happens after floor-testing confirms expected behaviour',
              'Test edge cases deliberately: two robots approaching the same gate simultaneously, a station occupied on arrival, a manual priority escalation mid-cycle',
              'A dedicated validation pass, ahead of solutioning teams even touching the feature, is common practice for new capabilities before site release'
            ])
          ]
        },
        {
          title: 'Stage 9 — Go-live and iteration',
          tag: 'Deploy',
          body: [
            p('Go-live is a phase, not an event — and it feeds back into the build stages rather than being a true end state.'),
            list([
              '**Phased rollout:** start with one robot on one route, confirm it holds under real conditions, then expand robot count and route complexity in stages',
              '**On-site presence:** a deployment engineer typically stays on-site for the first two to three weeks post-handover before support shifts fully to remote operations',
              '**Baseline capture:** record normal cycle times, blocked-robot frequency and battery consumption early, so later drift can be told apart from normal variance',
              '**Issue triage:** issue frequency, often ranging from daily to weekly depending on severity, and automated blocked-robot alerts help pinpoint which routes or zones need correction first',
              '**Map and zone corrections:** usually the first thing adjusted once real traffic patterns are visible — this loops directly back to stage 4',
              '**Mission logic refinement:** real request patterns often reveal that a mission built for average conditions does not hold at peak load, or that a demand-driven pattern should really be a fixed loop instead',
              '**Recovery and edge cases:** localization failures, station conflicts and priority misuse tend to surface here rather than in testing, simply because weeks of real operation cannot be fully simulated',
              '**Operator and supervisor feedback:** the people running the floor daily surface friction points — an override that is too many clicks away, an alert threshold miscalibrated for that line — that dashboards alone will not show'
            ])
          ]
        }
      ]),
      h('The loop'),
      defs([
        { term: 'Stage 9 → stage 4', text: 'Map and zone corrections, once real traffic patterns are visible.' },
        { term: 'Stage 9 → stage 5', text: 'Mission logic refinement, once real request patterns are visible.' }
      ]),
      h('Where the time and money actually go'),
      p(
        'An operational review of real deployments found that stage 3 (mapping) and the process of fine-tuning robots to a site’s specific environmental conditions — such as extreme temperature gradients near factory ovens — cause the longest delays and the largest financial losses of any part of this workflow. Leadership’s stated target is bringing deployment timelines down from a current baseline of around 90 days.'
      ),
      list([
        'Fine-tuning a robot to a site combines hardware calibration (sensor checks, physical measurement) with configuring software instances — deployment engineers doing this work also often need to write Linux-level code, which is a significant skill hurdle on its own.',
        'A structured, fixed sequence for mapping and pick/drop configuration — rather than letting each project manager improvise their own order — is the direction identified to prevent this stage fragmenting and causing further delay.'
      ]),
      gap(
        'An onboard depth-camera streaming tool exists to help field engineers see what a robot’s sensors see during calibration, reducing reliance on measuring tapes and manual sensor checks. Its functionality is not yet documented here — sharing and documenting it was raised as a next step.'
      )
    ],
    revisions: [
      {
        date: '2026-09-18',
        author: 'Annuai',
        note: 'Added findings from an Industrial Design 1:1 operational review: mapping and environmental fine-tuning are the largest source of delay and cost, leadership’s target is reducing the ~90-day deployment timeline, and an undocumented onboard depth-camera streaming tool is used for calibration.'
      }
    ],
    related: ['wf-configuration', 'configuration-layers', 'map', 'map-annotation', 'missions-and-actions', 'wf-exceptions']
  }
];
