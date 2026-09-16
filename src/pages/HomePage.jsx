import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/content/SectionHeader.jsx';
import { ContentCard } from '../components/content/ContentCard.jsx';
import { Relationship } from '../components/content/DiagramBlock.jsx';
import { sections, entriesBySection, learningPath, getEntry } from '../content/index.js';

const startHere = [
  { id: 'gs-what-are-we-building', label: 'What is Ati?' },
  { id: 'gs-what-is-ati-flow', label: 'What is Ati Flow?' },
  { id: 'architecture', label: 'How does the system work?' },
  { id: 'gs-what-is-orchestration', label: 'What does orchestration mean?' }
];

const browse = [
  { to: '/vocabulary', title: 'Explore the vocabulary', text: 'Every term, acronym and piece of jargon Ati uses — with a plain-language meaning first.' },
  { to: '/workflows', title: 'Understand the workflows', text: 'How a request becomes a robot journey, and how a site is deployed in nine stages.' },
  { to: '/ui', title: 'Browse the UI', text: 'What each screen is for, who uses it, and what the things on it mean.' },
  { to: '/concepts', title: 'Read the concepts', text: 'Robots, fleets, zones, maps, missions, trips — and how they fit together.' },
  { to: '/decisions', title: 'See the decisions', text: 'Why the product uses the words and structures it does.' },
  { to: '/open-questions', title: 'Check what is still open', text: 'What this documentation cannot answer yet, and where the sources disagree.' }
];

export function HomePage() {
  const path = learningPath;

  return (
    <div>
      <header className="home-hero">
        <p className="eyebrow">Ati Documentation System</p>
        <h1>Make Ati understandable</h1>
        <p>
          A shared place to understand what Ati is building — from robots and orchestration to the language
          we use to describe them.
        </p>
      </header>

      <SectionHeader
        title="Start here"
        description="If you are new, read these in order. Each one is short and hands off to the detail."
      />
      <ol className="start-list">
        {path.map((entry) => (
          <li className="start-list__item" key={entry.id}>
            <Link className="start-list__link" to={entry.path}>
              <span className="start-list__index">{String(entry.step).padStart(2, '0')}</span>
              <span>
                <span className="start-list__title">{entry.title}</span>
                <span className="start-list__summary">{entry.summary}</span>
              </span>
              <span className="start-list__chevron" aria-hidden="true">
                &rsaquo;
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <SectionHeader title="Answer a question" description="The questions this documentation exists to answer." />
      <div className="card-grid">
        {startHere.map((item) => {
          const entry = getEntry(item.id);
          return entry ? (
            <ContentCard key={item.id} to={entry.path} title={item.label} summary={entry.summary} tag={entry.typeLabel} tone="primary" />
          ) : null;
        })}
      </div>

      <SectionHeader
        title="How the pieces fit together"
        description="The relationship this documentation keeps coming back to."
      />
      <Relationship
        nodes={[
          { label: 'Robot', to: 'robot', note: 'belongs to' },
          { label: 'Fleet', to: 'fleet', note: 'managed by' },
          { label: 'Orchestration', to: 'orchestration', note: 'coordinates' },
          { label: 'Tasks and trips', to: 'task', note: 'which move' },
          { label: 'Material', to: 'material-flow' }
        ]}
        caption="Follow any node to read about it."
      />

      <SectionHeader title="Explore" />
      <div className="card-grid card-grid--wide">
        {browse.map((item) => (
          <ContentCard key={item.to} to={item.to} title={item.title} summary={item.text} />
        ))}
      </div>

      <SectionHeader title="Everything in here" description="Eight sections, all built from Ati's own material." />
      <div className="card-grid">
        {sections.map((section) => (
          <ContentCard
            key={section.id}
            to={`/${section.id}`}
            title={section.title}
            summary={section.description}
            tag={`${(entriesBySection.get(section.id) || []).length} ${
              (entriesBySection.get(section.id) || []).length === 1 ? 'page' : 'pages'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
