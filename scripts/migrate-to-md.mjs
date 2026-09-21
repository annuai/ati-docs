#!/usr/bin/env node
/*
  One-time migration: reads the hand-authored arrays in src/content/*.js and writes the
  equivalent content-md/<section>/*.md files. Run once per section, then that section's
  src/content/<name>.js is replaced with a re-export from the compiled output.

  Not part of the normal workflow — scripts/compile-content.mjs (Markdown -> JS) is what
  contributors use day to day. This is the inverse (JS -> Markdown), used only to bootstrap
  a section into the new format.

  Usage: node scripts/migrate-to-md.mjs <section>  (section = the exported array's name)
*/

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dump } from 'js-yaml';
import { escapeAttr } from './compile-content.mjs';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

function slugify(entry) {
  return (entry.slug || entry.id).replace(/[^a-z0-9-]/gi, '-');
}

function mdList(items, ordered) {
  return items.map((item, i) => `${ordered ? `${i + 1}.` : '-'} ${item}`).join('\n');
}

function escapeCell(cell) {
  return String(cell).replace(/\|/g, '\\|');
}

function mdTable(head, rows) {
  const sep = head.map(() => '---');
  return [head, sep, ...rows]
    .map((row) => `| ${row.map(escapeCell).join(' | ')} |`)
    .join('\n');
}

function yamlBody(obj) {
  const clean = Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
  return dump(clean, { lineWidth: -1 }).trimEnd();
}

function blockToMarkdown(block) {
  switch (block.t) {
    case 'h':
      return `## ${block.text}`;
    case 'h3':
      return `### ${block.text}`;
    case 'p':
      return block.text;
    case 'list':
      return mdList(block.items, block.ordered);
    case 'table':
      return mdTable(block.head, block.rows);
    case 'code':
      return `\`\`\`\n${block.text}\n\`\`\``;
    case 'mermaid': {
      const captionAttr = block.caption ? ` caption="${escapeAttr(block.caption)}"` : '';
      return `\`\`\`mermaid${captionAttr}\n${block.code}\n\`\`\``;
    }
    case 'callout': {
      if (block.tone === 'gap') {
        const attr = block.title && block.title !== 'Not yet documented' ? ` title="${escapeAttr(block.title)}"` : '';
        return `:::gap${attr}\n${block.body.join('\n\n')}\n:::`;
      }
      const toneAttr = block.tone && block.tone !== 'note' ? ` tone="${block.tone}"` : '';
      return `:::callout title="${escapeAttr(block.title)}"${toneAttr}\n${block.body.join('\n\n')}\n:::`;
    }
    case 'defs':
      return `:::defs\n${yamlBody({ title: block.title, items: block.items })}\n:::`;
    case 'chain':
      return `:::chain\n${yamlBody({ caption: block.caption, steps: block.steps })}\n:::`;
    case 'flow':
      return `:::flow\n${yamlBody({ caption: block.caption, steps: block.steps })}\n:::`;
    case 'relationship':
      return `:::relationship\n${yamlBody({ caption: block.caption, nodes: block.nodes })}\n:::`;
    case 'cards':
      return `:::cards\n${yamlBody({ items: block.items })}\n:::`;
    case 'accordions':
      return `:::accordions\n${yamlBody({ items: block.items })}\n:::`;
    case 'figure':
      return `:::figure\n${yamlBody({ src: block.src, alt: block.alt, caption: block.caption })}\n:::`;
    default:
      throw new Error(`No serializer for block type "${block.t}"`);
  }
}

function entryToMarkdown(entry, order) {
  const { blocks, ...rest } = entry;
  const frontmatter = yamlBody({ ...rest, order });
  const body = (blocks || []).map(blockToMarkdown).join('\n\n');
  return `---\n${frontmatter}\n---\n\n${body}\n`;
}

async function migrate(section) {
  const mod = await import(join(ROOT, 'src', 'content', `${section}.js`));
  const entries = mod[section];
  const outDir = join(ROOT, 'content-md', section);
  mkdirSync(outDir, { recursive: true });
  entries.forEach((entry, index) => {
    const md = entryToMarkdown(entry, index + 1);
    writeFileSync(join(outDir, `${slugify(entry)}.md`), md, 'utf8');
  });
  console.log(`[migrate-to-md] wrote ${entries.length} file(s) to content-md/${section}/`);
}

const section = process.argv[2];
if (!section) {
  console.error('Usage: node scripts/migrate-to-md.mjs <section>');
  process.exit(1);
}
await migrate(section);
