import { sections, entriesBySection } from '../content/index.js';

/*
  Sidebar navigation, derived from the content registry.

  Adding an entry to a content file adds it here automatically. Vocabulary is the one exception:
  with more than fifty terms it links to its own browsable, filterable page instead of listing
  every term in the sidebar.
*/

const vocabularyChildren = [
  { id: 'vocabulary-all', title: 'Glossary', path: '/vocabulary' },
  { id: 'vocabulary-acronyms', title: 'Acronyms', path: '/vocabulary?kind=acronym' },
  { id: 'vocabulary-jargon', title: 'Jargon', path: '/vocabulary?kind=jargon' }
];

export const navigation = sections.map((section) => {
  if (section.standalone) {
    return { id: section.id, title: section.title, path: `/${section.id}`, children: [] };
  }

  const children =
    section.id === 'vocabulary'
      ? vocabularyChildren
      : (entriesBySection.get(section.id) || []).map((entry) => ({
          id: entry.id,
          title: entry.title,
          path: entry.path
        }));

  return {
    id: section.id,
    title: section.title,
    path: `/${section.id}`,
    count: (entriesBySection.get(section.id) || []).length,
    children
  };
});
