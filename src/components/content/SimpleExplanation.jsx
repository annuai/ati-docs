import { InlineText } from './InlineText.jsx';

/*
  The plain-language explanation that opens most pages.

  Simplifying Ati's language is the point of this system, so this block is visually distinct from
  the technical detail that follows it.
*/
export function SimpleExplanation({ children, label = 'In simple terms' }) {
  return (
    <section className="simple" aria-label={label}>
      <span className="simple__label">{label}</span>
      <p className="simple__body">{typeof children === 'string' ? <InlineText text={children} /> : children}</p>
    </section>
  );
}
