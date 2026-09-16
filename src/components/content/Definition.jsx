import { InlineText } from './InlineText.jsx';

/** The "What does this mean?" pattern: a term and a short plain explanation, inline in a page. */
export function Definition({ term, children }) {
  return (
    <div className="definition">
      <p className="definition__term">
        <InlineText text={term} />
      </p>
      <p className="definition__body">{typeof children === 'string' ? <InlineText text={children} /> : children}</p>
    </div>
  );
}
