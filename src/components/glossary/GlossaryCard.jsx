import { Link } from 'react-router-dom';
import { Badge } from '../content/Badge.jsx';
import { InlineText } from '../content/InlineText.jsx';

export function GlossaryCard({ entry }) {
  return (
    <Link className="glossary-item" to={entry.path}>
      <span className="glossary-item__head">
        <span className="glossary-item__term">{entry.title}</span>
        {entry.expansion ? <span className="glossary-item__expansion">{entry.expansion}</span> : null}
        <Badge status={entry.status} />
      </span>
      <span className="glossary-item__body">
        <InlineText text={entry.simple || entry.summary} />
      </span>
    </Link>
  );
}
