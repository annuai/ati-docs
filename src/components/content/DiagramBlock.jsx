import { Link } from 'react-router-dom';
import { InlineText } from './InlineText.jsx';
import { resolveTarget } from '../../content/index.js';

/** A wrapper giving every diagram the same frame and caption treatment. */
export function DiagramBlock({ label, caption, children }) {
  return (
    <figure className="diagram" aria-label={label}>
      {children}
      {caption ? (
        <figcaption className="diagram__caption">
          <InlineText text={caption} />
        </figcaption>
      ) : null}
    </figure>
  );
}

/** A left-to-right chain, used for the demand → robot sequence. */
export function Chain({ steps, caption }) {
  return (
    <DiagramBlock label="Sequence diagram" caption={caption}>
      <ol className="chain">
        {steps.map((step) => (
          <li className="chain__step" key={step.title}>
            <b>{step.title}</b>
            <span>{step.note}</span>
          </li>
        ))}
      </ol>
    </DiagramBlock>
  );
}

/** A top-to-bottom "A belongs to B managed by C" diagram. */
export function Relationship({ nodes, caption }) {
  return (
    <DiagramBlock label="Relationship diagram" caption={caption}>
      <div className="relationship">
        {nodes.map((node, index) => {
          const target = node.to ? resolveTarget(node.to) : null;
          return (
            <div key={node.label}>
              {target ? (
                <Link className="relationship__node" to={target.path}>
                  {node.label}
                </Link>
              ) : (
                <span className="relationship__node">{node.label}</span>
              )}
              {node.note && index < nodes.length ? <p className="relationship__edge">{node.note}</p> : null}
            </div>
          );
        })}
      </div>
    </DiagramBlock>
  );
}
