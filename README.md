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
   the conflict is flagged. See [Open questions](content-md/openQuestions/index.md) in the app, and
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

React 18 + Vite, static, no backend. Routing by React Router. **Content is Markdown, compiled at
build time into the same structured objects the app has always rendered.**

```
ati-documentation-system/
├── content-md/                  THE KNOWLEDGE — one Markdown file per entry, one folder per section
│   ├── README.md                The authoring format: frontmatter, blocks, directives
│   ├── concepts/                Robot, fleet, zone, map, mission, trip, orchestration …
│   ├── vocabulary/               156 terms, acronyms and jargon
│   ├── workflows/                Material movement, dispatch, charging, exceptions, deployment
│   ├── ui/                       Screens, components, patterns, states
│   ├── teams/                    Who does what across the company
│   ├── decisions/                Terminology, UX and product-principle decisions
│   ├── atiFlow/                  Ati Flow overview, architecture, users
│   ├── atiRobotics/              The company behind the product
│   ├── gettingStarted/           The start-here learning path
│   └── openQuestions/            What is still undecided
├── scripts/
│   ├── compile-content.mjs      Markdown → the objects src/content/generated/*.js exports
│   ├── migrate-to-md.mjs        One-off: the JS → Markdown converter used to bootstrap this
│   └── verify-migration.mjs     One-off: diffs generated output against the pre-migration JS
├── docs/
│   └── source-audit.md          Audit of the pre-existing material
├── old/                         Preserved source material (HTML docs + the Ati Flow prototype)
├── public/assets/               Ati-Docs-Logo.svg, Ati-Flow-Logo.svg, ati-sherpa.png
├── src/
│   ├── content/
│   │   ├── blocks.js            Block primitives used by the compiler and by BlockRenderer
│   │   ├── *.js                 One file per section, each a two-line re-export —
│   │   │                        e.g. `export { concepts } from './generated/concepts.js'`
│   │   ├── generated/           Compiled output. Not hand-edited — regenerated from content-md/
│   │   └── index.js             The registry: sections, lookups, related-entry resolution
│   ├── data/
│   │   ├── authors.js           The registered-contributor list
│   │   ├── navigation.js        Sidebar, derived from the registry
│   │   └── searchIndex.js       Local search index and scoring
│   ├── components/
│   │   ├── layout/               AppShell, Sidebar, TopBar
│   │   ├── navigation/           Search, Breadcrumbs
│   │   ├── content/              BlockRenderer, InlineText, PageHeader, Callout,
│   │   │                         SimpleExplanation, RelatedKnowledge, Table, Tag, Badge …
│   │   ├── glossary/             GlossaryList, GlossaryCard
│   │   └── workflows/            Workflow, WorkflowStep
│   ├── templates/                ConceptPage, GlossaryPage, WorkflowPage,
│   │                             UIScreenPage, DecisionPage, EntryLayout
│   ├── pages/                    Home, Section, Entry, Vocabulary, Search, NotFound
│   ├── styles/                   tokens.css, globals.css, components.css
│   ├── App.jsx                   Routes
│   └── main.jsx
├── index.html
├── vite.config.js
└── vercel.json
```

### Markdown in, the same objects out

Nothing about the rendering layer changed when content moved to Markdown — `BlockRenderer`,
`InlineText`, the `[[link]]` resolver, `relatedEntries()` and the contributors page all still work
on exactly the shape they always did:

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

The only thing that changed is how that object gets written. Instead of a JS object in
`src/content/concepts.js`, it's now a Markdown file in `content-md/concepts/fleet.md`:

```markdown
---
id: fleet
title: Fleet
summary: A coordinated group of robots operating within a deployment.
status: current
aliases: [fleet layer]
sources: [old/ati-flow-glossary.html]
related: [robot, orchestration, zone]
---

## Why it matters

…

- Point one
- Point two
```

`scripts/compile-content.mjs` reads every `content-md/<section>/*.md` file, parses the frontmatter
and body, and writes `src/content/generated/<section>.js` — run automatically before `npm run dev`
and `npm run build`, or on demand with `npm run compile:content` (`npm run content:watch`
recompiles as you save). `src/content/index.js` then normalises every entry, assigns its route, and
builds the lookups exactly as before:

```
Add a Markdown file in content-md/<section>/
        ↓
The compiler turns it into a plain object   src/content/generated/<section>.js
        ↓
It gets a route                             /concepts/fleet
        ↓
It appears in navigation                    sidebar, section index
        ↓
It becomes searchable                       title, aliases, summary, body
        ↓
It appears as related                       on every entry that links to it
```

### Mistakes don't take the site down

One contributor's typo shouldn't block everyone else, so the compiler never fails the build over a
single bad file. A missing `author`, an unrecognised `status`, an unclosed `:::` block, a duplicate
`id` — each is collected into a report printed to the terminal, and the affected entry is marked
`needs-confirmation` (a visible badge) instead of looking falsely settled. A few common mistakes are
corrected automatically rather than just flagged — an unquoted date (`added: 2026-09-16`, read by
YAML as a date object instead of text) is silently normalised back to a string, with a warning
explaining why.

See [`content-md/README.md`](content-md/README.md) for the full authoring format.

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

Every entry records who added it and when, in its frontmatter:

```yaml
author: Annuai      # must be listed in src/data/authors.js
added: '2026-09-16'  # ISO date, quoted — see content-md/README.md for why
```

This is deliberately **not** shown on the entries themselves — a byline on every page would compete
with the content. It is collected on **`/contributors`**, which lists every entry with its author
and date, filterable by contributor. That page is how any statement in the system gets traced back
to a person.

When an entry is substantially changed, the author stays as whoever introduced it and the change is
appended to a `revisions` list:

```yaml
revisions:
  - date: '2026-09-20'
    author: Annuai
    note: What changed and why.
```

`/contributors` shows both: a revisions log, and the full list of entries with their original author
and date.

Contributors are registered in [`src/data/authors.js`](src/data/authors.js). Adding a new one means
adding a line there first; an entry crediting an unregistered name is flagged both at compile time
(in the terminal) and in the browser's dev console.

**When adding an entry, ask who is authoring it.** Never guess and never inherit the author of a
neighbouring entry. [`CLAUDE.md`](CLAUDE.md) sets out the full protocol and is the file to read
before contributing.

## Adding documentation

Every section is a folder in `content-md/`; every entry is one `.md` file in it, frontmatter plus
Markdown body. Full format reference: [`content-md/README.md`](content-md/README.md). Quick
examples per section:

### A concept

`content-md/concepts/staging.md`:

```markdown
---
id: staging                            # unique across the whole system
title: Staging
summary: One sentence.
status: draft                          # current | draft | needs-confirmation | deprecated
aliases: [staging area]                # extra search terms
sources: [old/amr-deployment-workflow.html]
related: [fleet, robot]
---

## Why it matters

Links to other entries use [[fleet]] or [[fleet|a custom label]].

- Point one
- Point two

:::callout title="A heading"
Something worth pulling out.
:::

:::gap
What the sources do not say.
:::
```

It is now at `/concepts/staging`, in the sidebar, in search, and on the related-knowledge row of
`fleet` and `robot`.

### A glossary term

`content-md/vocabulary/v-wms.md`. Use `kind` to place it under Terms, Acronyms or Jargon:

```markdown
---
id: v-wms                              # vocabulary ids are prefixed v-; the route drops it
term: WMS
expansion: Warehouse Management System
kind: acronym                          # term | acronym | jargon
simple: Plain meaning.
technical: The precise meaning.
usedIn: [Where it appears in Ati material]
note: Anything a reader should be careful about.
related: [integrations]
status: current
sources: ['…']
---
```

### A workflow

Add to `content-md/workflows/` and use the `:::flow` directive. Each step is `{title, note, kind?,
tag?, points?}`, where `kind` is `step` (default), `decision` or `outcome` — see
`content-md/README.md` for the exact YAML shape.

### A UI screen

Add to `content-md/ui/` with `kind: screen` and fill `purpose`, `users`, `see`, `do` and `states`
in the frontmatter. The screen template renders those sections in order.

### A decision

Add to `content-md/decisions/` with `kind: decision` and fill `context`, `decision`, `why` and
`alternatives`. If the sources do not record the alternatives, say so rather than inventing them.

### An image

Put the file in `public/assets/`, then reference it with the `:::figure` directive:

```markdown
:::figure
src: /assets/my-diagram.png
alt: Accessible description of the image.
caption: Caption shown below it.
:::
```

### Available blocks

Most of a page is native Markdown — paragraphs, `## headings`, `### sub-headings`, `- lists`,
`1. numbered lists`, pipe tables, and fenced code (` ```mermaid ` for a diagram). The blocks with no
Markdown equivalent use a `:::name ... :::` container: `callout`, `gap`, `chain`, `flow`,
`relationship`, `defs`, `accordions`, `cards`, `figure`. See
[`content-md/README.md`](content-md/README.md) for each one's exact syntax.

Inline markup inside any text: `**bold**`, `*italic*`, `` `code` ``, `[[entry-id]]` and
`[[entry-id|label]]`.

## Running locally

```bash
npm install
npm run dev
```

`npm run dev` compiles `content-md/` first, then starts Vite. If you're actively editing content,
run `npm run content:watch` in a second terminal to recompile on every save.

## Production

```bash
npm run build
npm run preview
```

`npm run build` also compiles `content-md/` first. The build is a static bundle in `dist/`.

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

## Icons

[Iconoir](https://iconoir.com), through `iconoir-react`. Every icon is registered under a semantic
name in [`src/components/content/Icon.jsx`](src/components/content/Icon.jsx), which is the only file
that imports from the icon library:

```jsx
<Icon name="search" size={16} />
```

Icons are decorative by default — hidden from assistive technology, because each use site already
carries a visible or screen-reader label.

## Accessibility

Semantic landmarks, a skip link, visible focus rings, keyboard-navigable search, labelled form
controls, alt text on every image, and a single `h1` per page with an ordered heading hierarchy
beneath it. The sidebar collapses to a keyboard-dismissable drawer below 832px.

## Conventions

- **Status badges are for exceptions.** `current` shows nothing; `draft`, `needs-confirmation` and
  `deprecated` show a badge. If everything is badged, nothing is.
- **Never write a fact without a source.** The `sources` field is how the next person knows what to
  re-check.
- **Prefer a gap to a guess.** `:::gap` is a first-class block for a reason.
