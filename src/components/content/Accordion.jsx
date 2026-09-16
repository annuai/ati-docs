import { Tag } from './Tag.jsx';

export function Accordion({ title, tag, children }) {
  return (
    <details className="accordion">
      <summary>
        <span>{title}</span>
        {tag ? <Tag>{tag}</Tag> : null}
      </summary>
      <div className="accordion__body">{children}</div>
    </details>
  );
}
