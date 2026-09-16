import { EntryLayout } from './EntryLayout.jsx';
import { BlockRenderer } from '../components/content/BlockRenderer.jsx';

/** The default template: concepts, product pages, guides and reference entries. */
export function ConceptPage({ entry, trail }) {
  return (
    <EntryLayout entry={entry} trail={trail}>
      <BlockRenderer blocks={entry.blocks} />
    </EntryLayout>
  );
}
