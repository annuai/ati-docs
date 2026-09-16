import { Link } from 'react-router-dom';
import { InlineText } from './InlineText.jsx';
import { Tag } from './Tag.jsx';

export function ContentCard({ title, summary, tag, to, tone = 'default' }) {
  const body = (
    <>
      {tag ? (
        <div className="card__eyebrow">
          <Tag tone={tone}>{tag}</Tag>
        </div>
      ) : null}
      <p className="card__title">{title}</p>
      {summary ? (
        <p className="card__summary">
          <InlineText text={summary} />
        </p>
      ) : null}
    </>
  );

  return to ? (
    <Link className="card" to={to}>
      {body}
    </Link>
  ) : (
    <div className="card">{body}</div>
  );
}
