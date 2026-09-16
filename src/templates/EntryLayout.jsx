import { Breadcrumbs } from '../components/navigation/Breadcrumbs.jsx';
import { PageHeader } from '../components/content/PageHeader.jsx';
import { SimpleExplanation } from '../components/content/SimpleExplanation.jsx';
import { RelatedKnowledge } from '../components/content/RelatedKnowledge.jsx';
import { Sources } from '../components/content/Sources.jsx';
import { relatedEntries } from '../content/index.js';

/*
  The shared shape of every documentation page:

    breadcrumb → title → one-sentence explanation → in simple terms → detail → related knowledge
*/
export function EntryLayout({ entry, children, trail }) {
  return (
    <article>
      <Breadcrumbs
        trail={trail || [{ title: entry.sectionTitle, to: `/${entry.section}` }, { title: entry.title }]}
      />
      <PageHeader eyebrow={entry.typeLabel} title={entry.title} summary={entry.summary} status={entry.status} />
      <div className="prose">
        {entry.simple ? <SimpleExplanation>{entry.simple}</SimpleExplanation> : null}
        {children}
      </div>
      <RelatedKnowledge entries={relatedEntries(entry)} />
      <Sources sources={entry.sources} />
    </article>
  );
}
