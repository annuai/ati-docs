/*
  Where a page's content came from.

  Every entry names its source files. It is how a reader can tell documented fact from inference,
  and how the next author knows what to re-check.
*/
export function Sources({ sources = [] }) {
  if (!sources.length) return null;
  return (
    <p className="sources">
      <span className="sources__label">Source</span>{' '}
      {sources.map((source, index) => (
        <span key={source}>
          {index > 0 ? ' · ' : ''}
          <code>{source}</code>
        </span>
      ))}
    </p>
  );
}
