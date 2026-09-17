import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs.jsx';
import { PageHeader } from '../components/content/PageHeader.jsx';
import { GlossaryList } from '../components/glossary/GlossaryList.jsx';
import { entriesBySection } from '../content/index.js';
import { Icon } from '../components/content/Icon.jsx';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'term', label: 'Terms' },
  { id: 'acronym', label: 'Acronyms' },
  { id: 'jargon', label: 'Jargon' }
];

/** The searchable vocabulary. One of the most used pages, so it filters in place. */
export function VocabularyPage() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const kind = params.get('kind') || 'all';
  const all = entriesBySection.get('vocabulary') || [];

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return all.filter((entry) => {
      if (kind !== 'all' && entry.kind !== kind) return false;
      if (!needle) return true;
      return [entry.title, entry.expansion, entry.simple, entry.technical, ...(entry.aliases || [])]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(needle));
    });
  }, [all, kind, query]);

  return (
    <div>
      <Breadcrumbs trail={[{ title: 'Home', to: '/' }, { title: 'Vocabulary' }]} />
      <PageHeader
        eyebrow="Section"
        title="Vocabulary"
        summary="Every term, acronym and piece of jargon that appears in Ati's own material — with a plain meaning first. Terms with no source are deliberately absent."
      />

      <div className="glossary-controls">
        <div className="search">
          <div className="search__field">
            <span className="search__icon">
              <Icon name="search" size={16} />
            </span>
            <label className="visually-hidden" htmlFor="vocabulary-filter">
              Filter vocabulary
            </label>
            <input
              id="vocabulary-filter"
              className="search__input"
              type="search"
              placeholder="Filter terms and definitions"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>

        <div className="filter-group" role="group" aria-label="Filter by kind">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              aria-pressed={kind === filter.id}
              onClick={() => setParams(filter.id === 'all' ? {} : { kind: filter.id })}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <p className="sources" style={{ margin: 0 }}>
          {visible.length} of {all.length}
        </p>
      </div>

      <GlossaryList entries={visible} />
    </div>
  );
}
