# Ati Documentation System

A living internal knowledge system for Ati Robotics. It exists to answer the questions that come up
when someone new — a designer, an engineer, an operator, a product manager, a new joiner — tries to
understand what Ati is building.

> What is this? What does this word mean? Why does this exist? Who uses it? What happens before and
> after it? What does this robot state mean?

One source of truth for everything Ati builds — software and hardware. Lives at
[ati-one.vercel.app](https://ati-one.vercel.app).

This is not a product dashboard, a marketing site, or a copy of the Ati Flow application. The product
being documented is Ati Flow. The application doing the documenting is the **Ati Documentation System**.

## Philosophy

**Make Ati understandable.**

Four rules follow from that:

1. **Plain language first.** Every page opens with an *In simple terms* explanation before any
   technical detail. If a concept fits in two sentences, it gets two sentences.
2. **Nothing is invented.** Every entry names the source files it came from. Where the source
   material is silent, the page says *Not yet documented* instead of guessing.
3. **Disagreements are preserved.** Where two sources contradict each other, both are recorded and
   the conflict is flagged. See [Open questions](src/content/openQuestions.js) in the app, and
   [`docs/source-audit.md`](docs/source-audit.md).
4. **Everything connects.** Related knowledge, breadcrumbs and inline links mean no page is a
   dead end.

## Where the content came from

This folder already contained seven static HTML documentation pages, a working React prototype of
the Ati Flow *Live Fleet Status* screen, the Ati Flow logo and a product render of the robot. All of
it was audited before a line of the application was written.

[`docs/source-audit.md`](docs/source-audit.md) records what existed, what knowledge it established,
what conflicts were found and where the material runs out. The original files are preserved in
[`old/`](old/) — the HTML pages at the top level, the React prototype in `old/prototype/`.

## Architecture

React 18 + Vite, static, no backend. Routing by React Router; content as structured data.

```
ati-documentation-system/
├── docs/
│   └── source-audit.md         Audit of the pre-existing material
├── old/                        Preserved source material (HTML docs + the Ati Flow prototype)
├── public/assets/              Ati-Docs-Logo.svg, Ati-Flow-Logo.svg, ati-sherpa.png
├── src/
│   ├── content/                THE KNOWLEDGE — one file per section
│   │   ├── blocks.js           Block primitives used by every content file
│   │   ├── gettingStarted.js   The start-here learning path
│   │   ├── product.js          Ati Robotics, Ati Flow, architecture, IA, roles
│   │   ├── concepts.js         Robot, fleet, zone, map, mission, trip, orchestration …
│   │   ├── vocabulary.js       Glossary, acronyms and jargon
│   │   ├── workflows.js        Material movement, dispatch, charging, exceptions, deployment
│   │   ├── ui.js               Screens, components, patterns, states
│   │   ├── decisions.js        Terminology, UX and product-principle decisions
│   │   ├── openQuestions.js    What is still undecided
│   │   └── index.js            The registry: sections, lookups, related-entry resolution
│   ├── data/
│   │   ├── navigation.js       Sidebar, derived from the registry
│   │   └── searchIndex.js      Local search index and scoring
│   ├── components/
│   │   ├── layout/             AppShell, Sidebar, TopBar
│   │   ├── navigation/         Search, Breadcrumbs
│   │   ├── content/            BlockRenderer, InlineText, PageHeader, Callout,
│   │   │                       SimpleExplanation, RelatedKnowledge, Table, Tag, Badge …
│   │   ├── glossary/           GlossaryList, GlossaryCard
│   │   └── workflows/          Workflow, WorkflowStep
│   ├── templates/              ConceptPage, GlossaryPage, WorkflowPage,
│   │                           UIScreenPage, DecisionPage, EntryLayout
│   ├── pages/                  Home, Section, Entry, Vocabulary, Search, NotFound
│   ├── styles/                 tokens.css, globals.css, components.css
│   ├── App.jsx                 Routes
│   └── main.jsx
├── index.html
├── vite.config.js
└── vercel.json
```

### Content is data, not JSX

No documentation text lives in a component. An entry is an object:

```js
{
  id: 'fleet',
  title: 'Fleet',
  summary: 'A coordinated group of robots operating within a deployment.',
  simple: 'A fleet is all the robots working together at a site…',
  status: 'current',
  aliases: ['fleet layer'],
  sources: ['old/ati-flow-glossary.html'],
  blocks: [ h('Why it matters'), p('…'), list([ '…' ]) ],
  related: ['robot', 'orchestration', 'zone']
}
```

`src/content/index.js` normalises every entry, assigns its route, and builds the lookups. That means
adding content is enough:

```
Add a content object
        ↓
It gets a route            /concepts/fleet
        ↓
It appears in navigation   sidebar, section index
        ↓
It becomes searchable      title, aliases, summary, body
        ↓
It appears as related      on every entry that links to it
```

### Routing

| Route | Renders |
| --- | --- |
| `/` | Home — start here, relationships, entry points |
| `/:section` | A section index, e.g. `/concepts`, `/workflows`, `/ui` |
| `/:section/:slug` | One entry, e.g. `/concepts/fleet`, `/vocabulary/amr` |
| `/vocabulary` | The filterable A–Z glossary |
| `/open-questions` | The single-page section |
| `/search?q=` | Full search results |

Two generic routes cover every documentation page, so a new entry never needs a new route.

### Templates

The template is chosen from an entry's type — content decides its own presentation.

| Type | Template | Shape |
| --- | --- | --- |
| `concept`, `product`, `guide`, `reference` | `ConceptPage` | Simple explanation → detail → related |
| `term`, `acronym`, `jargon` | `GlossaryPage` | Simple meaning → technical meaning → where it appears |
| `workflow` | `WorkflowPage` | Steps, decisions and outcomes as a diagram |
| `screen` | `UIScreenPage` | Purpose → who uses it → what you see → what you can do → states |
| `decision` | `DecisionPage` | Context → what was decided → why → alternatives |

### Search

`src/data/searchIndex.js` builds a flat index from the registry at module load and scores
substring matches — exact title, title prefix, alias, then body. It is local, structured and
human-authored. There is no AI search and no backend.

Press `/` or `⌘K` anywhere to focus the search field.

## Authorship

Every entry records who added it and when:

```js
author: 'Annuai',      // must be listed in src/data/authors.js
added: '2026-09-16',   // ISO date
```

This is deliberately **not** shown on the entries themselves — a byline on every page would compete
with the content. It is collected on **`/contributors`**, which lists every entry with its author
and date, filterable by contributor. That page is how any statement in the system gets traced back
to a person.

When an entry is substantially changed, the author stays as whoever introduced it and the change is
appended to a `revisions` array:

```js
revisions: [
  { date: '2026-09-16', author: 'Annuai', note: 'What changed and why.' }
]
```

`/contributors` shows both: a revisions log, and the full list of entries with their original author
and date.

Contributors are registered in [`src/data/authors.js`](src/data/authors.js). Adding a new one means
adding a line there first; an entry crediting an unregistered name logs a warning in development.

**When adding an entry, ask who is authoring it.** Never guess and never inherit the author of a
neighbouring entry. [`CLAUDE.md`](CLAUDE.md) sets out the full protocol and is the file to read
before contributing.

## Adding documentation

### A concept

Add an object to `src/content/concepts.js`:

```js
{
  id: 'staging',                       // unique across the whole system
  title: 'Staging',
  summary: 'One sentence.',
  simple: 'The plain-language version. This is the important bit.',
  status: 'draft',                     // current | draft | needs-confirmation | deprecated
  aliases: ['staging area'],           // extra search terms
  sources: ['old/amr-deployment-workflow.html'],
  blocks: [
    h('Why it matters'),
    p('Links to other entries use [[fleet]] or [[fleet|a custom label]].'),
    list(['Point one', 'Point two']),
    callout('A heading', 'Something worth pulling out.'),
    gap('What the sources do not say.')
  ],
  related: ['fleet', 'robot']
}
```

It is now at `/concepts/staging`, in the sidebar, in search, and on the related-knowledge row of
`fleet` and `robot`.

### A glossary term

Add to `src/content/vocabulary.js`. Use `kind` to place it under Terms, Acronyms or Jargon:

```js
{
  id: 'v-wms',                         // vocabulary ids are prefixed `v-`; the route drops it
  term: 'WMS',
  expansion: 'Warehouse Management System',
  kind: 'acronym',                     // term | acronym | jargon
  simple: 'Plain meaning.',
  technical: 'The precise meaning.',
  usedIn: ['Where it appears in Ati material'],
  note: 'Anything a reader should be careful about.',
  related: ['integrations'],
  status: 'current',
  sources: ['…']
}
```

### A workflow

Add to `src/content/workflows.js` and use the `flow()` block. Each step takes
`{ title, note, points, tag, kind }`, where `kind` is `step` (default), `decision` or `outcome`.

### A UI screen

Add to `src/content/ui.js` with `kind: 'screen'` and fill `purpose`, `users`, `see`, `do`
and `states`. The screen template renders those sections in order.

### A decision

Add to `src/content/decisions.js` with `kind: 'decision'` and fill `context`, `decision`, `why`
and `alternatives`. If the sources do not record the alternatives, say so rather than inventing them.

### An image

Put the file in `public/assets/`, then reference it from a content block:

```js
figure('/assets/my-diagram.png', 'Accessible description of the image.', 'Caption shown below it.')
```

### Available blocks

`p` · `h` · `h3` · `list` · `ordered` · `table` · `callout` · `gap` · `chain` · `flow` ·
`relationship` · `figure` · `defs` · `accordions` · `cards` · `code` — all from
`src/content/blocks.js`.

Inline markup inside any string: `**bold**`, `*italic*`, `` `code` ``, `[[entry-id]]` and
`[[entry-id|label]]`.

### Markdown

Content is plain JavaScript objects rather than Markdown files. That was deliberate for the first
version: the object model carries `status`, `sources`, `aliases` and `related`, which is what makes
navigation, search and cross-linking automatic. A Markdown loader can be added later without
touching the UI — parse the files into the same entry shape and concatenate them into the arrays in
`src/content/index.js`.

## Running locally

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm run preview
```

The build is a static bundle in `dist/`.

## Deploying to Vercel

Production: **https://ati-one.vercel.app**

The project is a standard static Vite app. Either connect the repository in the Vercel dashboard or
deploy from the command line:

```bash
npx vercel --prod
```

Settings, if Vercel asks:

| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install` |

`vercel.json` rewrites every path to `/index.html` so that deep links such as
`/concepts/fleet` resolve on a full page load rather than 404ing.

## Accessibility

Semantic landmarks, a skip link, visible focus rings, keyboard-navigable search, labelled form
controls, alt text on every image, and a single `h1` per page with an ordered heading hierarchy
beneath it. The sidebar collapses to a keyboard-dismissable drawer below 832px.

## Conventions

- **Status badges are for exceptions.** `current` shows nothing; `draft` and `needs-confirmation`
  show a badge. If everything is badged, nothing is.
- **Never write a fact without a source.** The `sources` field is how the next person knows what to
  re-check.
- **Prefer a gap to a guess.** `gap('…')` is a first-class block for a reason.
