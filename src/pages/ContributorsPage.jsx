import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs.jsx';
import { PageHeader } from '../components/content/PageHeader.jsx';
import { SectionHeader } from '../components/content/SectionHeader.jsx';
import { Tag } from '../components/content/Tag.jsx';
import { entries, revisionLog } from '../content/index.js';
import { authors, formatDate } from '../data/authors.js';

/*
  Who wrote what, and when.

  Authorship is recorded on every entry but deliberately not shown on the entries themselves —
  a byline on every page would compete with the content. It is collected here instead, so any
  statement in the system can be traced back to a person and a date.
*/

const UNKNOWN = 'Unattributed';

export function ContributorsPage() {
  const [filter, setFilter] = useState('all');

  const rows = useMemo(
    () =>
      entries
        .map((entry) => ({
          id: entry.id,
          title: entry.title,
          path: entry.path,
          typeLabel: entry.typeLabel,
          sectionTitle: entry.sectionTitle,
          author: entry.author || UNKNOWN,
          added: entry.added || ''
        }))
        .sort((a, b) => b.added.localeCompare(a.added) || a.title.localeCompare(b.title)),
    []
  );

  const counts = useMemo(() => {
    const map = new Map();
    rows.forEach((row) => map.set(row.author, (map.get(row.author) || 0) + 1));
    return map;
  }, [rows]);

  const revisionCounts = useMemo(() => {
    const map = new Map();
    revisionLog.forEach((revision) => map.set(revision.author, (map.get(revision.author) || 0) + 1));
    return map;
  }, []);

  const visible = filter === 'all' ? rows : rows.filter((row) => row.author === filter);
  const unattributed = counts.get(UNKNOWN) || 0;

  return (
    <div>
      <Breadcrumbs trail={[{ title: 'Home', to: '/' }, { title: 'Contributors' }]} />
      <PageHeader
        eyebrow="Contributors"
        title="Who wrote what"
        summary="Every entry in this system records who added it and when, so any statement can be traced back to a person. This page is that record."
      />

      <SectionHeader title="Contributors" description={`${rows.length} entries across ${counts.size} ${counts.size === 1 ? 'contributor' : 'contributors'}.`} />
      <div className="card-grid">
        {authors.map((author) => (
          <div className="card" key={author.id}>
            <p className="card__title">{author.name}</p>
            <p className="card__summary">
              {counts.get(author.name) || 0} {counts.get(author.name) === 1 ? 'entry' : 'entries'}
              {revisionCounts.get(author.name)
                ? ` · ${revisionCounts.get(author.name)} ${
                    revisionCounts.get(author.name) === 1 ? 'revision' : 'revisions'
                  }`
                : ''}
              {author.note ? ` · ${author.note}` : ''}
            </p>
          </div>
        ))}
      </div>

      {unattributed ? (
        <p className="sources" style={{ marginTop: 'var(--space-md)' }}>
          {unattributed} {unattributed === 1 ? 'entry has' : 'entries have'} no author recorded. See{' '}
          <code>CLAUDE.md</code>.
        </p>
      ) : null}

      {revisionLog.length ? (
        <>
          <SectionHeader
            title="Revisions"
            description="Entries changed since they were first written. The author of an entry is whoever introduced it; this is what has happened to it since."
          />
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Entry</th>
                  <th scope="col">What changed</th>
                  <th scope="col">By</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {revisionLog.map((revision, index) => (
                  <tr key={`${revision.entryId}-${index}`}>
                    <th scope="row">
                      <Link to={revision.path}>{revision.title}</Link>
                    </th>
                    <td>{revision.note}</td>
                    <td>{revision.author}</td>
                    <td>
                      <time dateTime={revision.date}>{formatDate(revision.date)}</time>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}

      <SectionHeader title="Every entry" description="When each entry was first written, and by whom." />
      <div className="glossary-controls">
        <div className="filter-group" role="group" aria-label="Filter by contributor">
          <button type="button" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
            All
          </button>
          {authors
            .filter((author) => counts.get(author.name))
            .map((author) => (
              <button
                key={author.id}
                type="button"
                aria-pressed={filter === author.name}
                onClick={() => setFilter(author.name)}
              >
                {author.name}
              </button>
            ))}
        </div>
        <p className="sources" style={{ margin: 0 }}>
          {visible.length} of {rows.length}
        </p>
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Entry</th>
              <th scope="col">Kind</th>
              <th scope="col">Section</th>
              <th scope="col">Added by</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr key={row.id}>
                <th scope="row">
                  <Link to={row.path}>{row.title}</Link>
                </th>
                <td>
                  <Tag tone="primary">{row.typeLabel}</Tag>
                </td>
                <td>{row.sectionTitle}</td>
                <td>{row.author}</td>
                <td>
                  <time dateTime={row.added}>{formatDate(row.added)}</time>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
