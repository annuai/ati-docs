import { EntryLayout } from './EntryLayout.jsx';
import { BlockRenderer } from '../components/content/BlockRenderer.jsx';
import { InlineText } from '../components/content/InlineText.jsx';

function ListSection({ title, items }) {
  if (!items?.length) return null;
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <InlineText text={item} />
          </li>
        ))}
      </ul>
    </>
  );
}

/*
  A product screen, documented as knowledge rather than displayed:
  purpose, who uses it, what you can see, what you can do, states.
*/
export function UIScreenPage({ entry }) {
  return (
    <EntryLayout entry={entry}>
      {entry.purpose ? (
        <>
          <h2>Purpose</h2>
          <p>
            <InlineText text={entry.purpose} />
          </p>
        </>
      ) : null}

      <ListSection title="Who uses it" items={entry.users} />
      <ListSection title="What you can see" items={entry.see} />
      <ListSection title="What you can do" items={entry.do} />
      <ListSection title="States" items={entry.states} />

      <BlockRenderer blocks={entry.blocks} />
    </EntryLayout>
  );
}
