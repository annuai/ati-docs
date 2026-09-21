# Authoring content as Markdown

This is the human-editable source for the documentation. Each `.md` file here is one entry —
one concept, term, decision, screen, or workflow step. `scripts/compile-content.mjs` compiles
every file into the plain data objects `src/content/*.js` renders, so nothing about the site
itself needs to change as content is added or edited here.

Every section is here now: `concepts`, `vocabulary`, `workflows`, `ui`, `teams`, `atiFlow`,
`atiRobotics`, `gettingStarted`, `openQuestions` and `decisions`. Nothing is hand-authored JS in
`src/content/` any more — each of those files is a two-line re-export from `./generated/`.

## Running it

```bash
npm run compile:content     # compile once
npm run content:watch       # recompile automatically while you edit
npm run dev                 # also compiles once first, then starts the site
```

If you're actively writing content, run `content:watch` in one terminal and `dev` in another —
saving a `.md` file regenerates `src/content/generated/<section>.js`, and Vite hot-reloads it.

## File shape

Every file has YAML frontmatter (between `---` lines) for the entry's metadata, then Markdown
for its body:

```markdown
---
id: d-robot-over-amr
slug: robot-over-amr
title: 'Say "Robot", not "AMR"'
summary: 'The product-facing term for one machine is Robot. AMR stays a technical term.'
status: current
author: Annuai
added: '2026-09-16'
sources:
  - old/ati-flow-glossary.html
related: ['robot', 'v-amr']
---

Ordinary Markdown goes here — paragraphs, headings, lists, tables.
```

**Quote every date** (`added: '2026-09-16'`, not `added: 2026-09-16`). Without quotes, YAML
reads it as a date object instead of text, and the page will show a garbled date. The compiler
catches this and fixes it automatically, but it still prints a warning — quoting it correctly the
first time avoids the warning.

## The rules that still apply

This format changes *how* content is written, not the rules for *what* gets written. From
CLAUDE.md:

- **Ask before writing.** `author` is who is introducing the knowledge — never guess, never
  copy from a neighbouring file. If the answer is someone new, add them to
  `src/data/authors.js` first.
- **`added` is the day the entry was written**, not the day of the thing it describes.
- **Cite `sources`.** A file path in this repo, or `TEAM` / a description of who supplied it in
  conversation if there's no file to point at. Never leave it empty.
- **British spelling**, `Ati` never `ATI`, plain language in `summary`.
- **A change to an existing entry needs a `revisions` entry**, not a silent edit:
  ```yaml
  revisions:
    - date: '2026-09-20'
      author: Annuai
      note: What changed and why.
  ```

## Markdown → blocks

Most of a page is just Markdown, and maps onto the site's block types directly:

| Write this | Renders as |
| --- | --- |
| A plain paragraph | `p` |
| `## Heading` | `h` (section heading) |
| `### Heading` | `h3` (sub-heading) |
| `- item` / `1. item` | a bullet or numbered list |
| A `\| pipe \| table \|` | `table` |
| ` ```code fence``` ` | `code`, or `mermaid` if the fence says ` ```mermaid ` |
| `**bold**`, `*italic*`, `` `code` `` | inline emphasis, same as always |
| `[[entry-id]]` / `[[entry-id\|label]]` | a link to another entry, auto-resolved |

## Blocks with no Markdown equivalent

A small number of visual blocks (callouts, gaps) don't exist in plain Markdown, so they use a
`:::name ... :::` container — write the block name after three colons, and close it with a line
that's just `:::`.

**Callout** — a highlighted note:

```markdown
:::callout title="How to apply it"
Write *Robot* in interface labels. Mention *AMR* once and link to [[v-amr]].
:::
```

**Gap** — something the sources don't say, instead of guessing:

```markdown
:::gap
What Mule covers beyond navigation is not yet written down.
:::

:::gap title="Custom title instead of the default"
...
:::
```

The rest (`chain`, `flow`, `relationship`, `defs`, `cards`, `accordions`, `figure`, `lights`) hold
structured data rather than prose, so their body is YAML instead of Markdown — the keys match
the block's fields exactly. For example, a `chain`:

```markdown
:::chain
caption: Optional caption text
steps:
  - title: '2017'
    note: Founded in Bengaluru
  - title: '2026'
    note: Rebranded to Ati Robotics
    kind: outcome
:::
```

`defs` (`title`, `items: [{term, text}]`), `flow`/`chain` (`caption`, `steps: [{title, note, kind?, tag?}]`),
`relationship` (`caption`, `nodes: [{label, to, note}]`), `cards`/`accordions` (`items: [...]`,
an accordion item's `body` is itself a list of blocks) and `figure` (`src`, `alt`, `caption`) all
follow the same pattern — YAML keys named after the block's own parameters in `blocks.js`.

**Lights** — a table whose first column pairs an animated colour swatch with its label, for
documenting physical indicator lights (e.g. a robot's status LEDs):

```markdown
:::lights
items:
  - label: Steady green
    color: '#22c55e'
    pattern: steady
    sound: No sound
    status: Idle, ready for a trip
  - label: Fast-blinking red
    color: '#ef4444'
    pattern: pulse-fast
    sound: Emergency tone
    status: E-stop pressed
:::
```

Each item's `pattern` is one of `steady`, `split` (two colours side by side, via `secondary`),
`pulse-slow`, `pulse-fast`, `sweep-slow`, `sweep-fast`, or `off` — chosen to match how the source
describes the light (e.g. "rolling", "fast blinking", "running"), never invented for effect.

A Mermaid diagram can carry a caption via the fence's info string: ` ```mermaid caption="..." `.

If you write a `:::something` the compiler doesn't recognise, or YAML it can't parse, it says so
at compile time rather than silently dropping it.

## When something's wrong

The compiler never fails the build over a mistake in one file — one contributor's typo shouldn't
block everyone else. Instead:

- Problems print as a report in the terminal when you run `compile:content` / `dev` / `build`.
- The affected page is marked **`needs-confirmation`** (a visible badge) instead of looking
  falsely settled.
- An author not in `src/data/authors.js` is separately flagged in the browser's dev console —
  that check already existed and still runs exactly as before.

Fix the file and recompile; the badge and the warning both go away once the problem does.
