import { Tag } from './Tag.jsx';
import { Icon } from './Icon.jsx';

export function Accordion({ title, tag, children }) {
  return (
    <details className="accordion">
      <summary>
        <Icon name="chevron-right" size={16} className="accordion__caret" />
        <span>{title}</span>
        {tag ? <Tag>{tag}</Tag> : null}
      </summary>
      <div className="accordion__body">{children}</div>
    </details>
  );
}
