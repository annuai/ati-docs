/*
  Who may be credited as the author of a documentation entry.

  Every entry in `src/content/` carries `author` and `added`. This list is the set of valid
  authors — adding a contributor means adding a line here first, so a typo in a content file
  cannot quietly create a second "person".

  See CLAUDE.md for the rule: never guess an author. Ask.
*/

export const authors = [
  {
    id: 'annuai',
    name: 'Annuai',
    note: 'Built the initial documentation system and audited the original source material.'
  },
  {
    id: 'akankshya',
    name: 'Akankshya'
  },
  {
    id: 'krishna',
    name: 'Krishna'
  }
];

export const authorNames = authors.map((author) => author.name);

export const authorsByName = new Map(authors.map((author) => [author.name, author]));

/** True when a name is a registered contributor. */
export const isKnownAuthor = (name) => authorsByName.has(name);

/** A date the contributors page can sort and display consistently. */
export function formatDate(iso) {
  if (!iso) return 'Unknown';
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
