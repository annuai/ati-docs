import { InlineText } from './InlineText.jsx';
import { Callout } from './Callout.jsx';
import { Definition } from './Definition.jsx';
import { ImageBlock } from './ImageBlock.jsx';
import { Table } from './Table.jsx';
import { CodeBlock } from './CodeBlock.jsx';
import { Accordion } from './Accordion.jsx';
import { ContentCard } from './ContentCard.jsx';
import { Chain, Relationship } from './DiagramBlock.jsx';
import { Workflow } from '../workflows/Workflow.jsx';
import { MermaidBlock } from './MermaidBlock.jsx';

/*
  Turns content data into markup.

  Every block type lives here, so content files stay free of JSX and a documentation author only
  has to know the helpers in `src/content/blocks.js`.
*/

const WIDE = new Set(['table', 'chain', 'flow', 'figure', 'cards', 'relationship', 'mermaid']);

function Block({ block }) {
  switch (block.t) {
    case 'p':
      return (
        <p>
          <InlineText text={block.text} />
        </p>
      );

    case 'h':
      return <h2>{block.text}</h2>;

    case 'h3':
      return <h3>{block.text}</h3>;

    case 'list': {
      const List = block.ordered ? 'ol' : 'ul';
      return (
        <List>
          {block.items.map((item, index) => (
            <li key={index}>
              <InlineText text={item} />
            </li>
          ))}
        </List>
      );
    }

    case 'table':
      return <Table head={block.head} rows={block.rows} caption={block.caption} />;

    case 'callout':
      return <Callout title={block.title} tone={block.tone} body={block.body} />;

    case 'chain':
      return <Chain steps={block.steps} caption={block.caption} />;

    case 'flow':
      return <Workflow steps={block.steps} caption={block.caption} />;

    case 'relationship':
      return <Relationship nodes={block.nodes} caption={block.caption} />;

    case 'figure':
      return <ImageBlock src={block.src} alt={block.alt} caption={block.caption} />;

    case 'mermaid':
      return <MermaidBlock code={block.code} caption={block.caption} />;

    case 'defs':
      return (
        <div>
          {block.title ? <h3>{block.title}</h3> : null}
          {block.items.map((item) => (
            <Definition key={item.term} term={item.term}>
              {item.text}
            </Definition>
          ))}
        </div>
      );

    case 'accordions':
      return (
        <div>
          {block.items.map((item) => (
            <Accordion key={item.title} title={item.title} tag={item.tag}>
              {item.body.map((child, index) => (
                <Block block={child} key={index} />
              ))}
            </Accordion>
          ))}
        </div>
      );

    case 'cards':
      return (
        <div className="card-grid">
          {block.items.map((item) => (
            <ContentCard key={item.title} title={item.title} summary={item.text} tag={item.tag} to={item.to} />
          ))}
        </div>
      );

    case 'code':
      return <CodeBlock>{block.text}</CodeBlock>;

    default:
      return null;
  }
}

export function BlockRenderer({ blocks = [] }) {
  return (
    <>
      {blocks.map((block, index) => (
        <div className={WIDE.has(block.t) ? 'block--wide' : undefined} key={index}>
          <Block block={block} />
        </div>
      ))}
    </>
  );
}
