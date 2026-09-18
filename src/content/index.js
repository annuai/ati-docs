import { gettingStarted } from './gettingStarted.js';
import { atiRobotics } from './atiRobotics.js';
import { atiFlow } from './atiFlow.js';
import { concepts } from './concepts.js';
import { vocabulary } from './vocabulary.js';
import { workflows } from './workflows.js';
import { ui } from './ui.js';
import { decisions } from './decisions.js';
import { openQuestions } from './openQuestions.js';
import { isKnownAuthor } from '../data/authors.js';

/*
  The content registry.

  Everything the application knows about comes from here. A new page is a new object in one of the
  files above — it then appears in navigation, in search and in related-knowledge links with no
  further wiring.
*/

export const sections = [
  {
    id: 'start',
    title: 'Getting Started',
    description: 'A short path through the product for someone encountering Ati for the first time.',
    defaultType: 'guide',
    entries: gettingStarted,
    ordered: true
  },
  {
    id: 'ati-robotics',
    title: 'Ati Robotics',
    description: 'The company behind Ati Flow — an OEM that builds both the robots and the software.',
    defaultType: 'product',
    entries: atiRobotics,
    standalone: true
  },
  {
    id: 'ati-flow',
    title: 'Ati Flow',
    description: 'What Ati Flow is, how it is structured, and who uses each part of it.',
    defaultType: 'product',
    entries: atiFlow
  },
  {
    id: 'concepts',
    title: 'Concepts',
    description: 'The ideas the product is built from, and how they relate to each other.',
    defaultType: 'concept',
    entries: concepts
  },
  {
    id: 'vocabulary',
    title: 'Vocabulary',
    description: 'Every term, acronym and piece of jargon that appears in Ati’s own material.',
    defaultType: 'term',
    entries: vocabulary
  },
  {
    id: 'workflows',
    title: 'Workflows',
    description: 'How work actually runs, from a single dispatch to a nine-stage site deployment.',
    defaultType: 'workflow',
    entries: workflows
  },
  {
    id: 'ui',
    title: 'UI',
    description: 'The product’s screens, components, patterns and states — documented as knowledge.',
    defaultType: 'reference',
    entries: ui
  },
  {
    id: 'decisions',
    title: 'Decisions',
    description: 'Terminology, UX and product-principle decisions the source material records.',
    defaultType: 'decision',
    entries: decisions
  },
  {
    id: 'open-questions',
    title: 'Open questions',
    description: 'What is still undecided, and where the sources contradict each other.',
    defaultType: 'reference',
    entries: openQuestions,
    standalone: true
  }
];

export const typeLabels = {
  guide: 'Guide',
  product: 'Product',
  concept: 'Concept',
  term: 'Vocabulary',
  acronym: 'Vocabulary',
  jargon: 'Vocabulary',
  workflow: 'Workflow',
  screen: 'Screen',
  decision: 'Decision',
  reference: 'Reference'
};

export const statusLabels = {
  current: 'Current',
  draft: 'Draft',
  'needs-confirmation': 'Needs confirmation',
  deprecated: 'Deprecated'
};

const slugFor = (entry) => entry.slug || entry.id.replace(/^(v|gs|wf|ui|d)-/, '');

function normalise(entry, section) {
  const slug = slugFor(entry);
  const type = entry.kind || section.defaultType;
  return {
    ...entry,
    slug,
    type,
    typeLabel: typeLabels[type] || 'Reference',
    section: section.id,
    sectionTitle: section.title,
    title: entry.title || entry.term,
    // Vocabulary headers show the expansion; the plain meaning belongs in the explanation block.
    summary: entry.summary || (section.id === 'vocabulary' ? entry.expansion || '' : entry.simple || ''),
    status: entry.status || 'draft',
    aliases: entry.aliases || [],
    related: entry.related || [],
    sources: entry.sources || [],
    blocks: entry.blocks || [],
    author: entry.author,
    added: entry.added,
    revisions: entry.revisions || [],
    path: section.standalone ? `/${section.id}` : `/${section.id}/${slug}`
  };
}

export const entries = sections.flatMap((section) => section.entries.map((entry) => normalise(entry, section)));

export const entriesById = new Map(entries.map((entry) => [entry.id, entry]));

/*
  Authorship is not optional. An entry with a missing or unregistered author would disappear from
  the contributors page, so the mistake is surfaced loudly in development instead.
*/
if (import.meta.env?.DEV) {
  entries.forEach((entry) => {
    if (!entry.author || !entry.added) {
      console.warn(`[content] "${entry.id}" is missing author or added date. See CLAUDE.md.`);
    } else if (!isKnownAuthor(entry.author)) {
      console.warn(`[content] "${entry.id}" credits "${entry.author}", who is not in src/data/authors.js.`);
    }
  });
}

export const entriesBySection = new Map(
  sections.map((section) => [section.id, entries.filter((entry) => entry.section === section.id)])
);

export const sectionsById = new Map(sections.map((section) => [section.id, section]));

export function getEntry(id) {
  return entriesById.get(id);
}

/** Resolve an inline [[link]] target, which may be an entry id or a section id. */
export function resolveTarget(id) {
  const entry = entriesById.get(id);
  if (entry) return { path: entry.path, title: entry.title, type: entry.typeLabel };
  const section = sectionsById.get(id);
  if (section) return { path: `/${section.id}`, title: section.title, type: 'Section' };
  return null;
}

/** True for vocabulary entries, which use a dedicated template. */
export const isVocabulary = (entry) => ['term', 'acronym', 'jargon'].includes(entry.type);

export function getSectionEntry(sectionId, slug) {
  return entries.find((entry) => entry.section === sectionId && entry.slug === slug);
}

/** Entries listed as related, plus anything that lists this entry as related. Deduplicated. */
export function relatedEntries(entry) {
  const ids = new Set(entry.related);
  entries.forEach((other) => {
    if (other.id !== entry.id && other.related.includes(entry.id)) ids.add(other.id);
  });
  return [...ids].map((id) => entriesById.get(id)).filter(Boolean);
}

/*
  Every revision recorded across the system, newest first.

  `author` and `added` say who introduced an entry. This says who has changed it since, and why.
  Both feed the contributors page.
*/
export const revisionLog = entries
  .flatMap((entry) =>
    entry.revisions.map((revision) => ({
      ...revision,
      entryId: entry.id,
      title: entry.title,
      path: entry.path,
      typeLabel: entry.typeLabel,
      sectionTitle: entry.sectionTitle
    }))
  )
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));

/** Ordered learning-path steps, used by Getting Started for previous/next navigation. */
export const learningPath = entries
  .filter((entry) => typeof entry.step === 'number')
  .sort((a, b) => a.step - b.step);
