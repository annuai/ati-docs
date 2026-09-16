import { entries } from '../content/index.js';

/*
  A small local search index. No server, no AI — a scored substring match over titles, aliases,
  summaries and body text. It is rebuilt from the content registry at module load, so any entry
  added to `src/content/` is searchable immediately.
*/

function blockText(block) {
  if (!block || typeof block !== 'object') return '';
  const parts = [];
  const push = (value) => {
    if (typeof value === 'string') parts.push(value);
    else if (Array.isArray(value)) value.forEach(push);
    else if (value && typeof value === 'object') parts.push(blockText(value));
  };
  Object.entries(block).forEach(([key, value]) => {
    if (key === 't' || key === 'src' || key === 'to' || key === 'kind') return;
    push(value);
  });
  return parts.join(' ');
}

/** Plain text for one entry, with markup and link syntax stripped. */
export function entryText(entry) {
  const fields = [
    entry.title,
    entry.term,
    entry.expansion,
    entry.summary,
    entry.simple,
    entry.technical,
    entry.note,
    entry.purpose,
    entry.context,
    entry.decision,
    entry.why,
    entry.category,
    ...(entry.aliases || []),
    ...(entry.usedIn || []),
    ...(entry.users || []),
    ...(entry.see || []),
    ...(entry.do || []),
    ...(entry.states || []),
    ...(entry.alternatives || []),
    ...(entry.blocks || []).map(blockText)
  ];
  return fields
    .filter(Boolean)
    .join(' ')
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/[*`]/g, '');
}

export const searchIndex = entries.map((entry) => ({
  id: entry.id,
  path: entry.path,
  title: entry.title,
  type: entry.type,
  typeLabel: entry.typeLabel,
  section: entry.section,
  sectionTitle: entry.sectionTitle,
  status: entry.status,
  summary: entry.simple || entry.summary,
  aliases: entry.aliases,
  haystack: entryText(entry).toLowerCase(),
  titleLower: entry.title.toLowerCase(),
  aliasLower: (entry.aliases || []).map((alias) => alias.toLowerCase())
}));

function scoreOne(record, term) {
  if (record.titleLower === term) return 120;
  if (record.titleLower.startsWith(term)) return 80;
  if (record.aliasLower.some((alias) => alias === term)) return 70;
  if (record.titleLower.includes(term)) return 50;
  if (record.aliasLower.some((alias) => alias.includes(term))) return 40;
  const at = record.haystack.indexOf(term);
  if (at === -1) return 0;
  return at < 200 ? 20 : 10;
}

/**
 * Search every documentation entry.
 * All query terms must match somewhere; scores are summed so exact title hits rank first.
 */
export function search(query, limit = 20) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];

  return searchIndex
    .map((record) => {
      let total = 0;
      for (const term of terms) {
        const score = scoreOne(record, term);
        if (!score) return null;
        total += score;
      }
      return { record, score: total };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || a.record.title.localeCompare(b.record.title))
    .slice(0, limit)
    .map(({ record }) => record);
}
