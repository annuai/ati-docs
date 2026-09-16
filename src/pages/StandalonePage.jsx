import { ConceptPage } from '../templates/ConceptPage.jsx';
import { NotFoundPage } from './NotFoundPage.jsx';
import { entriesBySection } from '../content/index.js';

/** A section that is a single page, such as Open questions. */
export function StandalonePage({ sectionId }) {
  const entry = (entriesBySection.get(sectionId) || [])[0];
  if (!entry) return <NotFoundPage />;
  return <ConceptPage entry={entry} trail={[{ title: 'Home', to: '/' }, { title: entry.title }]} />;
}
