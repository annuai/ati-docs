# AGENTS.md

Working rules for the Ati Documentation System. Read this before changing anything in
`src/content/`.

## What this project is

A living internal knowledge system for Ati Robotics — one source of truth for everything Ati
builds, software and hardware. It documents the product; it is not the product.

The guiding principle is **make Ati understandable**. Plain language first, technical detail second.

## The authorship rule — read this first

Every entry in `src/content/` carries two fields:

```js
author: 'Annuai',      // must be a name listed in src/data/authors.js
added: '2026-09-16',   // ISO date, the day it was written
```

**When you add or substantially rewrite an entry, ask who is authoring it. Never guess, never
default, never carry over the author of a neighbouring entry.**

The ask looks like this:

> Who should be credited as the author of this entry?
> Annuai · Akankshya · Krishna · someone else

Rules:

1. **Ask before writing**, not after. The author is part of the entry, not metadata bolted on later.
2. **One ask covers one batch.** If several entries are being added from the same conversation,
   ask once and apply the answer to all of them. Do not ask per entry.
3. **A new name means a new registry line.** If the answer is someone not in
   `src/data/authors.js`, add them there first:
   ```js
   { id: 'firstname', name: 'Firstname' }
   ```
   The registry is the source of truth for who exists. A content file referencing an unregistered
   name will log a warning in development and the entry will be marked unattributed on the
   contributors page.
4. **`added` is the date the entry was written**, not the date of the thing it describes. Use
   today's date. Do not backdate.
5. **Editing an existing entry does not change its author.** The author is who introduced the
   knowledge. A substantial change is recorded as a revision instead:

   ```js
   revisions: [
     {
       date: '2026-09-16',
       author: 'Annuai',
       note: 'Rewritten. Ati is an OEM that builds both the robots and the orchestration software.'
     }
   ]
   ```

   Append, never overwrite — the list is a history. Log anything that changes what the page
   *says*: a rewritten explanation, a corrected fact, a gap that has been closed. Do not log
   typo fixes or wording polish. Revisions appear on `/contributors`.
6. **Authorship is never shown on the entry itself.** It is collected on `/contributors`. Do not
   add bylines to page templates.

Current contributors: **Annuai**, **Akankshya**, **Krishna**. More will be added.

## The sourcing rule

Every entry also carries `sources`, and there are two kinds:

```js
sources: ['old/ati-flow-glossary.html']   // a file in this repository
sources: [TEAM]                           // knowledge supplied directly by the Ati team
```

`TEAM` is defined at the top of `src/content/vocabulary.js`. When knowledge arrives in conversation
rather than from a file, cite it that way and add a line to the table in
`docs/source-audit.md` under *Knowledge added after the audit*.

**Do not invent Ati-specific facts.** If the sources do not say, the page says so:

```js
gap('What Mule covers is not yet written down — whether it is the robot’s whole autonomy stack, or one layer within it.')
```

A recorded gap is a contribution. A plausible guess is a liability, because it gets repeated.

Where two sources disagree, record both and flag the conflict in
`src/content/openQuestions.js` rather than picking a winner.

## Writing conventions

- **Ati, never ATI.** Capital A, lowercase t-i — in content, comments, headings and commit
  messages. Beware CSS `text-transform: uppercase` on any element that can contain the brand name.
- **Plain language first.** Every entry opens with `simple:` — one or two sentences a new joiner
  would understand. `technical:` and `blocks` carry the detail.
- **Two sentences beat two pages.** Clarity over completeness.
- **British spelling** (`optimisation`, `behavioural`, `organise`), except when quoting a source
  verbatim. Add the American spelling to `aliases` so search finds both.
- **Status badges are for exceptions.** `current` renders nothing. Use `draft` or
  `needs-confirmation` when the knowledge is genuinely unsettled — if everything is badged,
  nothing is.

## Adding content

Content is data. Never put documentation prose in a component.

| Adding | File | Notes |
| --- | --- | --- |
| A concept | `src/content/concepts.js` | |
| A glossary term | `src/content/vocabulary.js` | `id` is prefixed `v-`; `kind` is `term`, `acronym` or `jargon` |
| A workflow | `src/content/workflows.js` | `id` is prefixed `wf-` |
| A screen | `src/content/ui.js` | `kind: 'screen'`, then fill `purpose`, `users`, `see`, `do`, `states` |
| A decision | `src/content/decisions.js` | `kind: 'decision'`, then `context`, `decision`, `why`, `alternatives` |
| A start-here step | `src/content/gettingStarted.js` | `step` drives ordering and previous/next |

An entry gets its route, its place in navigation, its search indexing and its related-knowledge
links automatically. Adding content is enough — do not add routes or components for it.

Blocks available from `src/content/blocks.js`: `p` `h` `h3` `list` `ordered` `table` `callout`
`gap` `chain` `flow` `relationship` `figure` `defs` `accordions` `cards` `code`.

Inline markup inside any string: `**bold**`, `*italic*`, `` `code` ``, `[[entry-id]]`,
`[[entry-id|label]]`.

`id` must be unique across the whole system — the inline link syntax resolves against a single
global registry.

## Icons

Icons come from [Iconoir](https://iconoir.com) via `iconoir-react`, and every one is registered in
`src/components/content/Icon.jsx` under a semantic name:

```jsx
<Icon name="chevron-right" size={16} />
```

Never import from `iconoir-react` anywhere else, and never use a Unicode glyph as an icon. Adding a
new one means adding a line to the `glyphs` map in `Icon.jsx` — that file is the whole icon set, so
swapping libraries later is a single-file change.

Icons are decorative by default and hidden from assistive technology. Pass `label` only when an
icon carries meaning nothing else on screen conveys.

## Cross-linking

A new entry should not be an island. When adding one:

- Give it a `related` array pointing at the entries a reader would want next.
- Link it inline from at least one existing page where it is genuinely relevant.
- `relatedEntries()` resolves backlinks automatically, so a one-way link still shows on both pages.

## Before finishing

```bash
npm run build
```

Then check the dev server for console warnings — missing or unregistered authors are reported
there. Fix them rather than shipping unattributed entries.

## What not to do

- Do not add an AI assistant, AI search or any "Ask Ati" feature. This system is human-authored
  structured knowledge by design.
- Do not add a support CTA. This is documentation, not a support portal.
- Do not rewrite anything in `old/`. It is the preserved source material the whole system is
  traced back to; altering it breaks the audit trail.
- Do not turn this into a copy of the Ati Flow application. Document the product, do not rebuild it.
