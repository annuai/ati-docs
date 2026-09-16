import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs.jsx';
import { PageHeader } from '../components/content/PageHeader.jsx';
import { Tag } from '../components/content/Tag.jsx';
import { search } from '../data/searchIndex.js';

export function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get('q') || '';
  const results = query ? search(query, 40) : [];

  return (
    <div>
      <Breadcrumbs trail={[{ title: 'Home', to: '/' }, { title: 'Search' }]} />
      <PageHeader
        eyebrow="Search"
        title={query ? `Results for “${query}”` : 'Search'}
        summary={query ? `${results.length} ${results.length === 1 ? 'result' : 'results'}.` : 'Use the search field in the sidebar, or press / anywhere.'}
      />

      <div className="search-page__results">
        {results.map((result) => (
          <Link className="search-page__result" to={result.path} key={result.id}>
            <span className="search__result-title">
              {result.title}
              <Tag tone="primary">{result.typeLabel}</Tag>
              {result.sectionTitle !== result.typeLabel ? <Tag>{result.sectionTitle}</Tag> : null}
            </span>
            <span className="card__summary">{result.summary}</span>
          </Link>
        ))}
        {query && !results.length ? (
          <p className="search__empty">
            Nothing matches &ldquo;{query}&rdquo;. Try a single word, or browse the <Link to="/vocabulary">vocabulary</Link>.
          </p>
        ) : null}
      </div>
    </div>
  );
}
