import { Breadcrumbs } from '../components/navigation/Breadcrumbs.jsx';
import { PageHeader } from '../components/content/PageHeader.jsx';
import { SimpleExplanation } from '../components/content/SimpleExplanation.jsx';
import { RelatedKnowledge } from '../components/content/RelatedKnowledge.jsx';
import { Sources } from '../components/content/Sources.jsx';
import { Comments } from '../components/content/Comments.jsx';
import { relatedEntries } from '../content/index.js';

/*
  The shared shape of every documentation page:

    breadcrumb → title → one-sentence explanation → in simple terms → detail → related knowledge
    → discussion

  Every template (Concept, Glossary, Workflow, UI Screen, Decision) renders through here, and
  Open Questions renders through ConceptPage too — so this one file is where comments live for
  every entry and Open Questions in one place.
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
      <Comments />
    </article>
  );
}
