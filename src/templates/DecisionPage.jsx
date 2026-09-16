import { EntryLayout } from './EntryLayout.jsx';
import { BlockRenderer } from '../components/content/BlockRenderer.jsx';
import { InlineText } from '../components/content/InlineText.jsx';
import { Tag } from '../components/content/Tag.jsx';

/** A recorded decision: context, what was decided, why, alternatives considered. */
export function DecisionPage({ entry }) {
  return (
    <EntryLayout entry={entry}>
      {entry.category ? (
        <p>
          <Tag tone="primary">{entry.category}</Tag>
        </p>
      ) : null}

      <h2>Context</h2>
      <p>
        <InlineText text={entry.context} />
      </p>

      <h2>What was decided</h2>
      <p>
        <InlineText text={entry.decision} />
      </p>

      <h2>Why</h2>
      <p>
        <InlineText text={entry.why} />
      </p>

      {entry.alternatives?.length ? (
        <>
          <h2>Alternatives considered</h2>
          <ul>
            {entry.alternatives.map((alternative) => (
              <li key={alternative}>
                <InlineText text={alternative} />
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <BlockRenderer blocks={entry.blocks} />
    </EntryLayout>
  );
}
