import { Tag } from './Tag.jsx';
import { Badge } from './Badge.jsx';
import { InlineText } from './InlineText.jsx';

export function PageHeader({ eyebrow, title, summary, status, meta }) {
  return (
    <header className="page-header">
      {eyebrow ? (
        <div className="page-header__eyebrow">
          <Tag tone="primary">{eyebrow}</Tag>
          <Badge status={status} />
        </div>
      ) : null}
      <h1>{title}</h1>
      {summary ? (
        <p className="page-header__summary">
          <InlineText text={summary} />
        </p>
      ) : null}
      {meta ? <div className="page-header__meta">{meta}</div> : null}
    </header>
  );
}
