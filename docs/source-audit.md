# Source audit

An inventory of the material that existed in this folder before the Ati Documentation System was
built, what knowledge it establishes, and where it runs out. Everything in the application traces
back to one of the sources listed here. Where the sources disagree or stop short, that is recorded
below rather than resolved by invention.

Audit date: 2026-09-16.

---

## 1. Existing assets

### Logos and images

| File | What it is | How it is used |
| --- | --- | --- |
| `public/assets/Ati-Docs-Logo.svg` | The "Ati Docs v1.0" wordmark, 101×32 — the same lockup as the Ati Flow mark with a different second word and version. | Used as-is in the sidebar header and as the favicon. |
| `public/assets/Ati-Flow-Logo.svg` | The "Ati Flow v3.0" wordmark, 101×32. Teal `#00A99D` / `#08B89D`, near-black `#231F20`, grey `#8D8D8D` for the version suffix. | The product’s own mark. Kept as source material; used by the archived prototype. |
| `public/assets/ati-sherpa.png` | Product render, 638×400, transparent background. A yellow AMR with a lidar mast, safety beacon, four wheels and a side access door. The chassis is labelled **Ati · SHERPA XT LITE**. | Used on the Robot concept page. It is the only photographic evidence of Ati hardware in the folder. |

There were no other images, no PDFs, no Figma exports, no icon sets and no screenshots in the folder.
Every icon in the old prototypes is a Unicode glyph (`⌂ ⌘ ↳ ◫ ▦ ⌕ ⌄`), not an asset.

### Documents and prototypes

| File | Type | Value |
| --- | --- | --- |
| `old/index.html` | Static docs page | Overview, product positioning statement, the demand-to-robot chain, three product principles. |
| `old/ati-flow-architecture.html` | Static docs page | Five-layer system model and the four product primitives. |
| `old/amr-deployment-workflow.html` | Static docs page | The richest single source: a nine-stage deployment workflow with detail under each stage, plus an inline SVG flowchart grouped into Planning / Build / Deploy. |
| `old/amr-software-ia-roles.html` | Static docs page | Page list, a full permission matrix, and four role cards including an explicit "not bothered with" list per role. |
| `old/ati-flow-glossary.html` | Static docs page | Sixteen defined terms, several carrying explicit confidence caveats. |
| `old/ati-flow-screens.html` | Static docs page | A framework for explaining screens, a six-surface summary, a "how to read the dashboard" sequence and an IA boundary table. |
| `old/ati-flow-faq.html` | Static docs page | Six onboarding Q&As and seven explicitly open questions to validate with Ati. |
| `old/styles.css` | Stylesheet | The documentation visual language: tokens, layout, card and table styling. |
| `old/docs.js` | Script | A seven-entry client-side search over page titles and descriptions. |
| `old/prototype/` (was `src/`) | Vite + React app | A working "Live Fleet Status" screen: sidebar, top bar, an animated Three.js facility map, and a robot detail panel. The most detailed evidence of real product UI. |

### What was removed

- The **Ati AI** button present in the top bar of all seven `old/*.html` pages.
- The **Go to Support** button present in the same top bar.
- `.DS_Store` files from `public/` and `src/`, which would otherwise be published.

---

## 2. Existing knowledge

### Product definition

Both `old/index.html` and `old/ati-flow-architecture.html` agree on the core statement:

> Ati Flow is Ati Robotics' software layer for automated material orchestration. It sits between a
> factory's material movement requirements and the robot fleet that executes those movements.

The documented chain is: **factory demand → integrations → workflows → maps → fleet → robot**, with
the architecture page expanding this into five layers (business, integration, orchestration, fleet,
robot/autonomy) and a sixth outcome (physical material flow in the factory).

### Four product primitives

`old/ati-flow-architecture.html` names these explicitly, each with the question it answers and its
primary surface: **Map** (where can the robot move), **Workflow** (what sequence of actions),
**Fleet** (how are multiple robots coordinated), **Robot** (which physical machine, in what state).

### Deployment workflow

Nine ordered stages, grouped into three phases:

1. Site assessment and solutioning — *Planning*
2. Infrastructure setup — *Planning*
3. Mapping (SLAM) — *Build*
4. Map annotation — *Build*
5. Mission design — *Build*
6. Fleet management — *Build*
7. ERP integration — *Deploy*
8. Testing and validation — *Deploy*
9. Go-live and iteration — *Deploy*

Stage 9 explicitly loops back to stage 4 (map and zone corrections) and stage 5 (mission logic).

### Roles

Four roles, with a complete page-by-page permission matrix:

- **Operator** — floor level, single zone, view-only on robots, can raise a manual priority request.
- **Fleet Supervisor** — owns one or more zones, can manage robots in those zones, view-only on
  Maps and Workflows.
- **Supervisor (Head of Operations)** — site-wide, manages robots everywhere, views and approves
  Workflows and Maps, manages users and roles.
- **Solutions Architect (Configurator)** — full configuration authority and the only role with
  Debug access; view-only on the live fleet view.

### Product surfaces (documentation IA)

Maps, Workflows, Fleet Monitor, Robots, Integrations, Setup & Config, Debug.

### Product principles

- Keep the layers clear: *operations* (what is happening now), *configuration* (what should happen),
  *diagnostics* (why is the robot behaving this way).
- "Expose the operational decision a user needs rather than reproducing every internal robot state."
- Explain a screen by naming the user's decision first, then the information needed, then the action.
- The documentation mirrors the product's visual hierarchy rather than introducing a separate brand
  language.

### States

The only robot states that appear anywhere in the sources are **Moving**, **Blocked** (both in the
prototype, as a status pill and a map legend), **Maintenance** (glossary, with a caveat) and the
informal notion of an **idle** robot being sent to charge (deployment stage 6). No source defines a
complete state machine.

---

## 3. Existing UI

From `old/prototype/` (formerly `src/`), the reusable patterns are:

- **Shell** — fixed sidebar (256px) plus a main column with a 70px top bar.
- **Sidebar** — logo lockup, a large "Supervisor Mode" selector, a "Processing Zone → Zone 24"
  selector, a divider, primary navigation in labelled groups, and a bottom navigation group.
- **Prototype navigation** — Dashboard, Live Status, Analytics, AMR Trips, Staging Area,
  WIP Inventory; then Notifications, Settings, Profile.
- **Top bar** — back/forward arrow buttons and a global search field ("Search Ati Flow").
- **Content head** — page title on the left, contextual controls on the right (material search,
  "Show Layers" toggle).
- **Workspace** — a large map card beside a fixed-width detail panel.
- **Map card** — a 3D facility map with an overlay chip ("3D LIVE MAP · Zone 24 · N robots online"),
  a legend (Active path, Moving, Blocked, Station), zoom/reset tools and a selection readout.
- **Detail panel** — status pill, robot render, robot heading, "Robot Details" (battery bar,
  current state), "Trip Details" (Trip ID, Next Station), "Recent Activity" timeline, Pause action.
- **Identifiers** — trips are shown as `TRP-20487`; stations as `S100`–`S105`.

From `old/styles.css`, the documentation visual language: `#FAFAFA` page, white surfaces, 1px
`#E4E7E6` borders, 12px radii, teal `#19B5B0` accent, Inter for text and IBM Plex Mono for
eyebrows and metadata, a 286px sidebar and a 1080px content column.

The documentation system keeps the teal accent, the surface/border treatment, the mono eyebrow and
the calm neutral background, and drops the operational chrome (3D map, live state, dashboards).

---

## 4. Existing terminology

Preliminary glossary assembled from the sources. "Where from" names the file the definition or the
usage comes from.

| Term | Where from | Confidence |
| --- | --- | --- |
| AMR | Glossary | Defined |
| Robot | Glossary | Defined, and marked as the preferred product-facing term |
| Fleet | Glossary | Defined |
| Zone | Glossary, IA page | Defined as a geographical operating area |
| Processing zone | Glossary, prototype sidebar | Defined with an explicit caveat |
| Map | Glossary, deployment stage 3 | Defined |
| Map annotation | Glossary, deployment stage 4 | Defined |
| Workflow | Glossary, IA page | Defined |
| Mission | Glossary, deployment stage 5 | Defined |
| Taxi / Milk run / Bus | Glossary, deployment stage 5 | Defined as mission patterns |
| Taxi mode | Glossary, FAQ | Explicitly *not* established |
| Fleet Monitor | Glossary, IA page | Defined |
| Maintenance | Glossary | Defined with an explicit caveat |
| Debug | Glossary, IA page | Defined |
| SLAM | Deployment stage 3 | Used, not defined |
| ERP / SAP | Deployment stages 2 and 7, architecture | Used, not defined |
| MES | `old/index.html` flow diagram | Mentioned once, not defined |
| Station / position / dock | Deployment stages 2 and 4, prototype | Used, not defined |
| Gate / exclusion zone | Deployment stage 4 | Used, described |
| Behavioural / forbidden / preferred zone | Deployment stage 4 | Used, described |
| Action / sub-mission | Deployment stage 5 | Used, described |
| Loop closure / pose graph optimization | Deployment stage 3 | Used, described |
| Solutioning | Deployment stage 1 | Used, described |
| Trip | Prototype only (`AMR Trips`, `Trip ID`, `Trip Details`) | Used, never defined |
| Task | Deployment stage 6, IA page | Used, never defined |
| WIP | Prototype nav (`WIP Inventory`) | Used, never defined |
| Staging area | Deployment stage 2, prototype nav | Used, never defined |
| Operator / Fleet Supervisor / Head of Operations / Solutions Architect (Configurator) | IA page | Defined as roles |
| Sherpa XT Lite | `ati-sherpa.png` chassis label | Appears on the hardware only |

---

## 4b. Knowledge added after the audit

Not everything in the documentation came from this folder. Where the Ati team supplies knowledge
directly, the entry cites them rather than a file, so a reader can always tell which is which.

| Entry | What was added | Source |
| --- | --- | --- |
| `Mule` | The origin of the word — *test mule*, the automotive term for a camouflaged prototype vehicle — and the fact that Mule is now the name of the software running on Ati's robots. | Ati team, September 2026 |
| `Map creation` | That mapping is done by manually running a robot across the floor; that point clouds are compressed to 2D at run time to cut compute load and cost; and that algorithms such as PointPillars establish accurate global localization only when needed. | Ati team, September 2026 |
| `Pose graph optimisation` | That it is the algorithm used to find the zero point when a robot does not finish a full loop where it started. | Ati team, September 2026 |
| `Route Ops` | That route operations — excluding a station from the map, for example — exist only in Fleet Manager. | Ati team, September 2026 |
| `Fleet Manager` | That it is a separate system from Ati Flow, that it still holds capabilities Ati Flow lacks, and that Ati Flow is intended to replace it. | Ati team, September 2026 |
| `Ati Robotics`, `OEM` | That Ati is an OEM, building both the robots and the orchestration software that runs them. This closed the largest gap recorded in section 6 below. | Ati team, September 2026 |
| `Ati Flow` | That Ati Flow is a combination of Fleet Manager, Deployment Manager and an orchestration layer connected to ERP and warehouse-management APIs chosen per client. | Ati team, September 2026 |
| `Fleet Manager` (revised) | What it actually does — fleet management, telling robots where to go, booking and managing trips, analytics, surfacing traffic problems — and that it is deliberately not an intelligent system. | Ati team, September 2026 |
| `Deployment Manager` | That Ati support engineers use it to configure and deploy the robots. | Ati team, September 2026 |
| `VISA` | First-in-first-out approval for robots entering a controlled zone, used particularly at intersections with traffic from several directions. | Ati team, September 2026 |
| `WMS` | That warehouse management systems are among the APIs the orchestration layer connects to. Previously excluded from the glossary for having no source. | Ati team, September 2026 |
| `Users` | That the newly proposed system has three users — Operator, Fleet Supervisor, Supervisor — and that whether Fleet Supervisor is required is unconfirmed. | Ati team, September 2026 |
| `Users`, `Solutions Architect` (revised) | That the Solutions Architect is the fourth user, not an Ati-internal job: he sets up the maps and everything else required to deploy a fleet at a new site. Also called the Configurator; the wording is not final. | Ati team, September 2026 |
| `Fleet Supervisor` (revised) | That the role is limited to handling robots with issues, with no data to manage anything else — closest to a floor-based support engineer — and that the case against needing it is that Operators already do that job. | Ati team, September 2026 |
| `Map` (revised) | That “map” covers two different artefacts — the autonomy localisation substrate, and the floor plan with drawn routes that Ati Flow shows a Solutions Architect — that the shared name is a deliberate simplification, and that whether to keep it is unresolved. | Ati team, September 2026 |
| `Workflow Builder`, `AIoT`, `RFID` | The complete Workflow Builder node library: movement, logic, errors, sound and light, email, AIoT, boundary nodes, station, container and confirmation options. The supplied UI establishes the node-based canvas, map preview and field examples. | Ati team + user-supplied Workflow Builder UI reference, September 2026 |

Anything sourced this way should be treated exactly like a file-sourced fact: cited, and corrected in
place if it turns out to be wrong.

## 5. Conflicts and ambiguities

These are preserved in the application rather than resolved.

1. **Two different information architectures.** The documentation IA lists Maps, Workflows,
   Fleet Monitor, Robots, Integrations, Setup & Config, Debug. The React prototype's sidebar shows
   Dashboard, Live Status, Analytics, AMR Trips, Staging Area, WIP Inventory. Neither source
   acknowledges the other. Both are documented, side by side, in the UI section.
2. **Fleet Monitor vs Live Fleet Status.** The IA page calls the live view "Fleet Monitor"; the
   prototype titles the same kind of view "Live Fleet Status" and navigates to it as "Live Status".
3. **Zone vs Processing Zone.** The glossary defines Zone as geographical and flags Processing Zone
   as needing confirmation. The prototype puts "Processing Zone" above a selector whose value is
   "Zone 24", which reads as though the two are the same thing. The FAQ lists this exact question as
   open.
4. **Trip vs Task.** Both appear. Neither is defined. Whether a trip is one task, several tasks, or
   the execution record of a mission is unestablished.
5. **"Workflow" carries two meanings.** A configured product object (the Workflows page), and a
   human process (the deployment workflow). The documentation keeps them in separate sections and
   says so on both pages.
6. **Robot states are incomplete.** Moving and Blocked are the only states the prototype shows;
   Maintenance is glossary-only; idle appears only as prose. The FAQ asks for the real state list.
7. **Role model vs prototype.** The IA defines four roles; the prototype has a single "Supervisor
   Mode" selector with no visible role switching. How modes and roles relate is unestablished.

---

## 6. Gaps — where the sources run out

Not filled in. Pages that touch these say so explicitly.

- **Ati Robotics as a company.** *Partly closed.* The team has since confirmed that Ati is an OEM
  building both the robots and the orchestration software — see the table in section 4b. Still
  undocumented: founding, market, customer base, hardware line-up and product family.
  `Sherpa XT Lite` is known only because it is printed on the robot in the product render.
- **Robot hardware.** No specifications, payload figures, battery capacity, footprint or variants —
  although stages 1 and 2 establish that payload type, footprint, max speed and drive parameters are
  configured per robot.
- **Material and WIP model.** "Material" is central to the product statement but never modelled.
  There is no definition of a material, a material type, a container or a load.
- **The data model.** How Fleet, Zone, Processing Zone, Trip, Task and Mission relate as records is
  never stated. This is the single largest gap.
- **Screens outside Live Fleet Status.** Six other surfaces are named and scoped in one line each,
  but no source describes their layout, fields or actions.
- **Requester / approver.** No requester or approver role exists in the sources. The only approval
  evidence is "View & approve" for Head of Operations on Workflows and Maps.
- **WMS.** *Closed.* Absent from every file in this folder, so it was initially left out. The team has
  since confirmed that warehouse management systems are among the APIs the orchestration layer
  connects to, and the term is now in the glossary.
- **Dispatcher.** "Dispatch" appears as an activity ("normal dispatch", "manual dispatch"); no
  Dispatcher role or component is documented. Dispatch is included as a term; Dispatcher is not.
- **Configurator as a product surface.** "Configurator" appears only as the parenthetical name of the
  Solutions Architect role, never as a screen. It is documented as a role, not a page.
- **Screenshots.** The folder contains no captured UI images. The prototype source itself is the
  reference for the Live Fleet Status documentation.
