import { Link } from 'react-router-dom';
import { Tag } from './Tag.jsx';

/** "You might also want to understand" — real links, never a dead-end page. */
export function RelatedKnowledge({ entries = [], title = 'You might also want to understand' }) {
  if (!entries.length) return null;
  return (
    <nav className="related" aria-label="Related knowledge">
      <h2 className="related__title">{title}</h2>
      <ul className="related__list">
        {entries.map((entry) => (
          <li key={entry.id}>
            <Link className="related__link" to={entry.path}>
              {entry.title}
              <Tag>{entry.typeLabel}</Tag>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
