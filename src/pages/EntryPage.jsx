import { Link, useParams } from 'react-router-dom';
import { ConceptPage } from '../templates/ConceptPage.jsx';
import { GlossaryPage } from '../templates/GlossaryPage.jsx';
import { WorkflowPage } from '../templates/WorkflowPage.jsx';
import { UIScreenPage } from '../templates/UIScreenPage.jsx';
import { DecisionPage } from '../templates/DecisionPage.jsx';
import { NotFoundPage } from './NotFoundPage.jsx';
import { getSectionEntry, isVocabulary, learningPath } from '../content/index.js';
import { Icon } from '../components/content/Icon.jsx';

/*
  One route for every documentation entry.

  The template is chosen from the entry's type, so adding a page means adding content — never a
  new route and never a new component.
*/
const templates = {
  workflow: WorkflowPage,
  screen: UIScreenPage,
  decision: DecisionPage
};

function PathNav({ entry }) {
  const index = learningPath.findIndex((step) => step.id === entry.id);
  if (index === -1) return null;
  const previous = learningPath[index - 1];
  const next = learningPath[index + 1];
  if (!previous && !next) return null;

  return (
    <nav className="page-nav" aria-label="Learning path">
      {previous ? (
        <Link className="page-nav__link" to={previous.path}>
          <span>
            <Icon name="arrow-left" size={13} /> Previous
          </span>
          <b>{previous.title}</b>
        </Link>
      ) : null}
      {next ? (
        <Link className="page-nav__link page-nav__link--next" to={next.path}>
          <span>
            Next <Icon name="arrow-right" size={13} />
          </span>
          <b>{next.title}</b>
        </Link>
      ) : null}
    </nav>
  );
}

export function EntryPage() {
  const { sectionId, slug } = useParams();
  const entry = getSectionEntry(sectionId, slug);

  if (!entry) return <NotFoundPage />;

  const Template = isVocabulary(entry) ? GlossaryPage : templates[entry.type] || ConceptPage;

  return (
    <>
      <Template entry={entry} />
      <PathNav entry={entry} />
    </>
  );
}
