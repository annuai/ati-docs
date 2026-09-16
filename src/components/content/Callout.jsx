import { InlineText } from './InlineText.jsx';

export function Callout({ title, tone = 'note', body = [], children }) {
  return (
    <aside className={`callout callout--${tone}`}>
      {title ? <p className="callout__title">{title}</p> : null}
      {body.map((paragraph, index) => (
        <p key={index}>
          <InlineText text={paragraph} />
        </p>
      ))}
      {children}
    </aside>
  );
}
