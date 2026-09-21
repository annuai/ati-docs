#!/usr/bin/env node
/*
  Compiles human-edited Markdown files in `content-md/<section>/*.md` into the same plain
  JS block objects `src/content/*.js` has always exported — so the rendering layer
  (BlockRenderer, InlineText, the [[link]] resolver, relatedEntries, the contributors page)
  does not need to change at all. Only the authoring format changes.

  Usage:
    node scripts/compile-content.mjs            compile once
    node scripts/compile-content.mjs --watch     recompile whenever a .md file changes

  See content-md/README.md for the authoring format.
*/

import { readdirSync, readFileSync, writeFileSync, mkdirSync, watch } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { dump, load } from 'js-yaml';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const SOURCE_DIR = join(ROOT, 'content-md');
const OUTPUT_DIR = join(ROOT, 'src', 'content', 'generated');

const KNOWN_STATUSES = ['current', 'draft', 'needs-confirmation', 'deprecated'];

/*
  Every problem found while compiling. Printed as one report at the end, rather than
  interleaved with individual entries, so a contributor sees everything wrong in one place.
*/
const issues = [];

function issue(file, message) {
  issues.push(`${file}: ${message}`);
}

// ───────────────────────────────────────────────────────────────────────────
// Inline text passes through untouched — **bold**, *italic*, `code` and [[links]]
// are already the exact markup src/components/content/InlineText.jsx expects, so the
// compiler never needs to parse or re-serialise inline markup, only find block boundaries.
// ───────────────────────────────────────────────────────────────────────────

function splitParagraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map((block) => block.split('\n').map((line) => line.trim()).join(' ').trim())
    .filter(Boolean);
}

function parseAttrs(rest) {
  const attrs = {};
  const positional = [];
  // "([^"\\]|\\.)*" allows a title like \"Taxi\" mode to carry an escaped quote.
  const pattern = /(?:(\w+)=)?"((?:[^"\\]|\\.)*)"|(?:(\w+)=)?(\S+)/g;
  let match;
  while ((match = pattern.exec(rest))) {
    const key = match[1] || match[3];
    const value = match[2] !== undefined ? match[2].replace(/\\(.)/g, '$1') : match[4];
    if (key) attrs[key] = value;
    else positional.push(value);
  }
  return { attrs, positional };
}

export function escapeAttr(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

// A cell like [[users|Users and permissions]] contains a literal "|", which would otherwise be
// read as a column separator. `\|` (written by the serialiser) is the escaped, literal form.
function splitTableRow(line) {
  const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  const cells = trimmed.split(/(?<!\\)\|/);
  return cells.map((cell) => cell.trim().replace(/\\\|/g, '|'));
}

function parseTable(lines) {
  const rows = lines.map(splitTableRow);
  const [head, separator, ...body] = rows;
  const isSeparator = separator && separator.every((cell) => /^:?-+:?$/.test(cell));
  return { head, rows: isSeparator ? body : rows.slice(1) };
}

/** Parses one entry's Markdown body into the same block array shape as `blocks.js`. */
function parseBlocks(content, file) {
  const lines = content.split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    if (trimmed.startsWith('### ')) {
      blocks.push({ t: 'h3', text: trimmed.slice(4).trim() });
      i += 1;
      continue;
    }

    if (trimmed.startsWith('## ')) {
      blocks.push({ t: 'h', text: trimmed.slice(3).trim() });
      i += 1;
      continue;
    }

    if (trimmed.startsWith('```')) {
      const info = trimmed.slice(3).trim();
      const [lang, ...rest] = info.split(/\s+/);
      const { attrs } = parseAttrs(rest.join(' '));
      const codeLines = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i += 1;
      }
      i += 1; // consume closing fence
      const text = codeLines.join('\n');
      blocks.push(lang === 'mermaid' ? { t: 'mermaid', code: text, caption: attrs.caption } : { t: 'code', text });
      continue;
    }

    const directiveMatch = trimmed.match(/^:::(\w+)\s*(.*)$/);
    if (directiveMatch) {
      const [, name, rest] = directiveMatch;
      const { attrs, positional } = parseAttrs(rest);
      const bodyLines = [];
      i += 1;
      while (i < lines.length && lines[i].trim() !== ':::') {
        bodyLines.push(lines[i]);
        i += 1;
      }
      if (i >= lines.length) {
        issue(file, `":::${name}" block is never closed with a line containing only ":::".`);
      }
      i += 1; // consume closing :::
      const bodyText = bodyLines.join('\n').trim();
      const paragraphs = splitParagraphs(bodyText);

      const asYaml = () => {
        try {
          return load(bodyText) || {};
        } catch (error) {
          issue(file, `":::${name}" body is not valid YAML: ${error.message}`);
          return {};
        }
      };

      if (name === 'callout') {
        const title = attrs.title || positional[0];
        if (!title) issue(file, '":::callout" is missing a title (add title="...").');
        blocks.push({ t: 'callout', title: title || 'Note', body: paragraphs, tone: attrs.tone || 'note' });
      } else if (name === 'gap') {
        const title = attrs.title || positional[0] || 'Not yet documented';
        blocks.push({ t: 'callout', title, body: paragraphs, tone: 'gap' });
      } else if (name === 'defs') {
        const { title, items } = asYaml();
        blocks.push({ t: 'defs', items: items || [], title });
      } else if (name === 'chain') {
        const { caption, steps } = asYaml();
        blocks.push({ t: 'chain', steps: steps || [], caption });
      } else if (name === 'flow') {
        const { caption, steps } = asYaml();
        blocks.push({ t: 'flow', steps: steps || [], caption });
      } else if (name === 'relationship') {
        const { caption, nodes } = asYaml();
        blocks.push({ t: 'relationship', nodes: nodes || [], caption });
      } else if (name === 'cards') {
        const { items } = asYaml();
        blocks.push({ t: 'cards', items: items || [] });
      } else if (name === 'accordions') {
        const { items } = asYaml();
        blocks.push({ t: 'accordions', items: items || [] });
      } else if (name === 'figure') {
        const { src, alt, caption } = asYaml();
        blocks.push({ t: 'figure', src, alt, caption });
      } else {
        issue(
          file,
          `Unknown directive ":::${name}". Supported: callout, gap, defs, chain, flow, relationship, cards, accordions, figure.`
        );
      }
      continue;
    }

    if (trimmed.startsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i += 1;
      }
      const { head, rows } = parseTable(tableLines);
      blocks.push({ t: 'table', head, rows, caption: undefined });
      continue;
    }

    const orderedMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    const bulletMatch = trimmed.match(/^[-*]\s+(.*)$/);
    if (orderedMatch || bulletMatch) {
      const ordered = Boolean(orderedMatch);
      const marker = ordered ? /^\d+\.\s+/ : /^[-*]\s+/;
      const items = [];
      while (i < lines.length && marker.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(marker, ''));
        i += 1;
      }
      blocks.push(ordered ? { t: 'list', items, ordered: true } : { t: 'list', items });
      continue;
    }

    // Paragraph: consume contiguous non-blank lines that don't start a different block.
    const paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{2,3}\s|```|:::\w|\||[-*]\s|\d+\.\s)/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i += 1;
    }
    blocks.push({ t: 'p', text: paraLines.join(' ').trim() });
  }

  return blocks;
}

// ───────────────────────────────────────────────────────────────────────────
// Frontmatter → entry object. Anything not recognised as a block-bearing field passes
// through as-is, so section-specific fields (context/decision/why/alternatives for
// decisions, purpose/users/see/do/states for screens, etc.) need no special-casing here.
// ───────────────────────────────────────────────────────────────────────────

/*
  A bare `added: 2026-09-16` (no quotes) is valid YAML but gets parsed as a JS Date object,
  not the string the rest of the app expects — an easy, invisible mistake for a human editor
  to make. Silently normalise it back to the YYYY-MM-DD string rather than let it corrupt
  every date shown on the page.
*/
function normaliseDate(value, file, field) {
  if (value instanceof Date) {
    issue(file, `"${field}" was written without quotes and YAML read it as a date object — treating it as the string "${value.toISOString().slice(0, 10)}". Quote dates: ${field}: '2026-09-16'.`);
    return value.toISOString().slice(0, 10);
  }
  return value;
}

/*
  YAML block scalars (`why: |`) are the friendliest way to write a multi-line paragraph in
  frontmatter, but they preserve every line break literally. A prose field wrapped across
  several lines in the file should read as one flowing sentence, not one with hard breaks in
  the middle — so collapse whitespace the same way a Markdown paragraph would.
*/
function collapseWhitespace(value) {
  if (typeof value === 'string') return value.replace(/\s*\n\s*/g, ' ').trim();
  if (Array.isArray(value)) return value.map(collapseWhitespace);
  if (value instanceof Date) return value;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, val]) => [key, collapseWhitespace(val)]));
  }
  return value;
}

function compileFile(path, file) {
  const raw = readFileSync(path, 'utf8');
  const { data: rawData, content } = matter(raw);
  const data = collapseWhitespace(rawData);

  data.added = normaliseDate(data.added, file, 'added');
  if (Array.isArray(data.revisions)) {
    data.revisions = data.revisions.map((revision) => ({
      ...revision,
      date: normaliseDate(revision.date, file, 'revisions[].date')
    }));
  }

  if (!data.id) issue(file, 'Missing required frontmatter field "id".');
  if (!data.title && !data.term) issue(file, 'Missing required frontmatter field "title" (or "term" for vocabulary entries).');
  if (!data.author) issue(file, 'Missing required frontmatter field "author". See CLAUDE.md — ask before guessing.');
  if (!data.added) issue(file, 'Missing required frontmatter field "added" (ISO date, e.g. 2026-09-21).');
  if (data.added && !/^\d{4}-\d{2}-\d{2}$/.test(String(data.added))) {
    issue(file, `"added: ${data.added}" is not an ISO date (YYYY-MM-DD).`);
  }
  if (!data.sources || (Array.isArray(data.sources) && data.sources.length === 0)) {
    issue(file, 'Missing "sources". Do not invent facts — every entry must cite where it came from.');
  }

  let status = data.status || 'draft';
  if (!KNOWN_STATUSES.includes(status)) {
    issue(file, `status "${status}" is not one of ${KNOWN_STATUSES.join(', ')} — treating as "needs-confirmation".`);
    status = 'needs-confirmation';
  }

  const hasBlockingIssue = issues.some((message) => message.startsWith(`${file}:`));
  if (hasBlockingIssue && status === 'current') {
    status = 'needs-confirmation';
  }

  const blocks = parseBlocks(content, file);

  return { ...data, status, blocks };
}

function compileSection(sectionDir) {
  const dirPath = join(SOURCE_DIR, sectionDir);
  const files = readdirSync(dirPath).filter((name) => name.endsWith('.md'));
  let items = files.map((name) => ({
    file: name,
    entry: compileFile(join(dirPath, name), `content-md/${sectionDir}/${name}`)
  }));

  // `order` (optional, in frontmatter) controls display order, since directory listings are not
  // guaranteed to come back in the order a human wrote the files. Entries without it sort after
  // the ones that have it, alphabetically by filename, rather than in filesystem-dependent order.
  items = items
    .map((item, index) => ({ ...item, index }))
    .sort((a, b) => {
      const orderA = typeof a.entry.order === 'number' ? a.entry.order : Infinity;
      const orderB = typeof b.entry.order === 'number' ? b.entry.order : Infinity;
      if (orderA !== orderB) return orderA - orderB;
      return a.file.localeCompare(b.file);
    });

  const seenIds = new Map();
  items.forEach(({ entry, file }) => {
    if (!entry.id) return;
    if (seenIds.has(entry.id)) {
      issue(file, `duplicate id "${entry.id}", already used by ${seenIds.get(entry.id)}.`);
    } else {
      seenIds.set(entry.id, file);
    }
  });

  return items.map(({ entry }) => {
    const { order, ...rest } = entry;
    return rest;
  });
}

function writeSection(sectionDir, entries) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const exportName = sectionDir;
  const header = [
    '// AUTO-GENERATED by scripts/compile-content.mjs — do not edit this file directly.',
    `// Edit the source files in content-md/${sectionDir}/ instead, then run:`,
    '//   npm run compile:content',
    '// (this also happens automatically before `npm run dev` and `npm run build`).'
  ].join('\n');
  const body = `${header}\n\nexport const ${exportName} = ${JSON.stringify(entries, null, 2)};\n`;
  writeFileSync(join(OUTPUT_DIR, `${sectionDir}.js`), body, 'utf8');
}

function compileAll() {
  issues.length = 0;
  const sectionDirs = readdirSync(SOURCE_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  sectionDirs.forEach((sectionDir) => {
    const entries = compileSection(sectionDir);
    writeSection(sectionDir, entries);
  });

  if (issues.length) {
    console.warn(`\n[compile-content] ${issues.length} issue(s) found — pages affected were marked "needs-confirmation" rather than failing the build:\n`);
    issues.forEach((message) => console.warn(`  - ${message}`));
    console.warn('');
  } else {
    console.log(`[compile-content] compiled ${sectionDirs.join(', ')} — no issues.`);
  }
}

// Only compile when run directly (`node compile-content.mjs`) — importing it just for
// `escapeAttr` (as migrate-to-md.mjs and verify scripts do) shouldn't trigger a full compile.
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const watchMode = process.argv.includes('--watch');
  compileAll();

  if (watchMode) {
    console.log('[compile-content] watching content-md/ for changes...');
    watch(SOURCE_DIR, { recursive: true }, (_event, filename) => {
      if (filename && filename.endsWith('.md')) {
        compileAll();
      }
    });
  }
}
