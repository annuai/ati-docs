import { Link, Navigate, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs.jsx';
import { PageHeader } from '../components/content/PageHeader.jsx';
import { ConceptCard } from '../components/content/ConceptCard.jsx';
import { NotFoundPage } from './NotFoundPage.jsx';
import { entriesBySection, sectionsById } from '../content/index.js';
import { Icon } from '../components/content/Icon.jsx';

/** The index for one documentation section. Built entirely from the content registry. */
export function SectionPage() {
  const { sectionId } = useParams();
  const section = sectionsById.get(sectionId);

  if (!section) return <NotFoundPage />;
  if (sectionId === 'vocabulary') return <Navigate to="/vocabulary" replace />;

  const entries = entriesBySection.get(sectionId) || [];
  const ordered = section.ordered ? entries.slice().sort((a, b) => (a.step || 99) - (b.step || 99)) : entries;

  return (
    <div>
      <Breadcrumbs trail={[{ title: 'Home', to: '/' }, { title: section.title }]} />
      <PageHeader eyebrow="Section" title={section.title} summary={section.description} />

      {section.ordered ? (
        <ol className="start-list">
          {ordered.map((entry) => (
            <li className="start-list__item" key={entry.id}>
              <Link className="start-list__link" to={entry.path}>
                <span className="start-list__index">{entry.step ? String(entry.step).padStart(2, '0') : '—'}</span>
                <span>
                  <span className="start-list__title">{entry.title}</span>
                  <span className="start-list__summary">{entry.summary}</span>
                </span>
                <span className="start-list__chevron">
                  <Icon name="chevron-right" size={16} />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <div className="card-grid card-grid--wide">
          {ordered.map((entry) => (
            <ConceptCard entry={entry} key={entry.id} />
          ))}
        </div>
      )}
    </div>
  );
}
