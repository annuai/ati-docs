#!/usr/bin/env node
// One-off verification: diffs generated/<section>.js against the original src/content/<section>.js,
// field by field, entry by entry. Not part of the normal workflow.
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const sections = process.argv.slice(2);

// Mirrors the defaults src/content/index.js's normalise() applies at runtime, so an absent
// field (orig) and its default value (gen) don't get flagged as a real difference.
const DEFAULTS = { status: 'draft', aliases: [], related: [], sources: [], blocks: [], revisions: [] };
function withDefaults(entry) {
  const copy = { ...entry };
  Object.entries(DEFAULTS).forEach(([key, def]) => {
    if (copy[key] === undefined) copy[key] = def;
  });
  return copy;
}

let totalDiffs = 0;
for (const section of sections) {
  const orig = (await import(join(ROOT, 'src', 'content', `${section}.js`)))[section];
  const gen = (await import(join(ROOT, 'src', 'content', 'generated', `${section}.js`)))[section];
  const byId = new Map(gen.map((e) => [e.id, e]));

  if (orig.length !== gen.length) {
    console.log(`${section}: COUNT MISMATCH orig=${orig.length} gen=${gen.length}`);
    totalDiffs += 1;
  }

  orig.forEach((origEntry, index) => {
    const genEntry = byId.get(origEntry.id);
    if (!genEntry) {
      console.log(`${section}: MISSING id "${origEntry.id}"`);
      totalDiffs += 1;
      return;
    }
    if (gen[index]?.id !== origEntry.id) {
      console.log(`${section}: ORDER MISMATCH at ${index}: expected "${origEntry.id}", got "${gen[index]?.id}"`);
      totalDiffs += 1;
    }
    const origD = withDefaults(origEntry);
    const genD = withDefaults(genEntry);
    const keys = new Set([...Object.keys(origD), ...Object.keys(genD)]);
    keys.forEach((key) => {
      const a = JSON.stringify(origD[key]);
      const b = JSON.stringify(genD[key]);
      if (a !== b) {
        console.log(`${section}:${origEntry.id} FIELD [${key}]\n  orig: ${a}\n  gen:  ${b}`);
        totalDiffs += 1;
      }
    });
  });
}
console.log(totalDiffs === 0 ? 'ALL CLEAN' : `${totalDiffs} diff(s) found`);
