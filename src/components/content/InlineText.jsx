import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { resolveTarget } from '../../content/index.js';

/*
  Inline markup for content strings.

    **bold**            strong emphasis
    *italic*            emphasis
    `code`              monospace
    [[entry-id]]        a link, labelled with the target's own title
    [[entry-id|label]]  a link with custom label text

  An unresolved [[link]] renders as plain text rather than breaking the page, so content can be
  written before its target exists.
*/

const PATTERN = /(\[\[[^\]]+\]\]|\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`)/g;

function renderToken(token, key) {
  if (token.startsWith('[[')) {
    const body = token.slice(2, -2);
    const [id, label] = body.split('|').map((part) => part.trim());
    const target = resolveTarget(id);
    if (!target) return <Fragment key={key}>{label || id}</Fragment>;
    return (
      <Link key={key} to={target.path}>
        {label || target.title}
      </Link>
    );
  }
  if (token.startsWith('**')) return <strong key={key}>{token.slice(2, -2)}</strong>;
  if (token.startsWith('*')) return <em key={key}>{token.slice(1, -1)}</em>;
  if (token.startsWith('`')) return <code key={key}>{token.slice(1, -1)}</code>;
  return <Fragment key={key}>{token}</Fragment>;
}

export function InlineText({ text }) {
  if (!text) return null;
  const tokens = String(text).split(PATTERN).filter(Boolean);
  return <>{tokens.map((token, index) => renderToken(token, index))}</>;
}
