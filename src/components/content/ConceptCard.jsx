import { ContentCard } from './ContentCard.jsx';

/** A documentation entry rendered as a card, labelled with the kind of knowledge it holds. */
export function ConceptCard({ entry }) {
  return (
    <ContentCard
      to={entry.path}
      title={entry.title}
      summary={entry.summary}
      tag={entry.typeLabel}
      tone={entry.status === 'needs-confirmation' ? 'amber' : 'primary'}
    />
  );
}
