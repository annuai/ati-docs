import { GlossaryCard } from './GlossaryCard.jsx';

/** An A–Z list of vocabulary entries, grouped by first letter. */
export function GlossaryList({ entries }) {
  if (!entries.length) {
    return <p className="search__empty">No terms match that filter.</p>;
  }

  const groups = [];
  entries
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title))
    .forEach((entry) => {
      const letter = entry.title[0].toUpperCase();
      const last = groups[groups.length - 1];
      if (last && last.letter === letter) last.items.push(entry);
      else groups.push({ letter, items: [entry] });
    });

  return (
    <div className="glossary-list">
      {groups.map((group) => (
        <section key={group.letter}>
          <h2 className="glossary-letter">{group.letter}</h2>
          {group.items.map((entry) => (
            <GlossaryCard entry={entry} key={entry.id} />
          ))}
        </section>
      ))}
    </div>
  );
}
