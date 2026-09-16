import { EntryLayout } from './EntryLayout.jsx';
import { BlockRenderer } from '../components/content/BlockRenderer.jsx';
import { InlineText } from '../components/content/InlineText.jsx';
import { Callout } from '../components/content/Callout.jsx';

/** A single vocabulary entry: simple meaning, technical meaning, where it appears. */
export function GlossaryPage({ entry }) {
  const kindLabel = { acronym: 'Acronym', jargon: 'Jargon', term: 'Term' }[entry.kind] || 'Term';

  return (
    <EntryLayout
      entry={entry}
      trail={[
        { title: 'Vocabulary', to: '/vocabulary' },
        { title: kindLabel, to: entry.kind === 'term' ? '/vocabulary' : `/vocabulary?kind=${entry.kind}` },
        { title: entry.title }
      ]}
    >
      {entry.technical ? (
        <>
          <h2>More detail</h2>
          <p>
            <InlineText text={entry.technical} />
          </p>
        </>
      ) : null}

      {entry.note ? <Callout title="Worth knowing" body={[entry.note]} tone="gap" /> : null}

      {entry.usedIn?.length ? (
        <>
          <h2>Where it appears</h2>
          <ul>
            {entry.usedIn.map((where) => (
              <li key={where}>
                <InlineText text={where} />
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <BlockRenderer blocks={entry.blocks} />
    </EntryLayout>
  );
}
