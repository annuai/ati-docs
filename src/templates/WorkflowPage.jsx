import { EntryLayout } from './EntryLayout.jsx';
import { BlockRenderer } from '../components/content/BlockRenderer.jsx';

/** A workflow: start, steps, decisions, outcome. The flow blocks carry the diagram. */
export function WorkflowPage({ entry }) {
  return (
    <EntryLayout entry={entry}>
      <BlockRenderer blocks={entry.blocks} />
    </EntryLayout>
  );
}
