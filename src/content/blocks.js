/*
  Block primitives used by every content file.

  Content is data, never JSX. `src/components/content/BlockRenderer.jsx` turns these objects into
  markup, so a new documentation page never requires a new React component.

  Inline text supports three markers:
    **bold**            emphasis
    `code`              monospace
    [[entry-id]]        a link to another documentation entry, labelled with its title
    [[entry-id|label]]  the same link with custom label text
*/

export const p = (text) => ({ t: 'p', text });
export const h = (text) => ({ t: 'h', text });
export const h3 = (text) => ({ t: 'h3', text });
export const list = (items) => ({ t: 'list', items });
export const ordered = (items) => ({ t: 'list', items, ordered: true });
export const table = (head, rows, caption) => ({ t: 'table', head, rows, caption });
export const code = (text) => ({ t: 'code', text });

export const callout = (title, body, tone = 'note') => ({
  t: 'callout',
  title,
  body: Array.isArray(body) ? body : [body],
  tone
});

/** A gap in the source material. Used instead of inventing an answer. */
export const gap = (body, title = 'Not yet documented') => callout(title, body, 'gap');

/** A left-to-right chain of stages, e.g. demand → integrations → workflows → fleet → robot. */
export const chain = (steps, caption) => ({ t: 'chain', steps, caption });

/** A top-to-bottom workflow. Each step: { title, note, points, kind, tag } */
export const flow = (steps, caption) => ({ t: 'flow', steps, caption });

/** A vertical "A belongs to B managed by C" relationship diagram. */
export const relationship = (nodes, caption) => ({ t: 'relationship', nodes, caption });

export const figure = (src, alt, caption) => ({ t: 'figure', src, alt, caption });

/** A Mermaid diagram, for structure too large or branching for chain/flow/relationship. */
export const mermaid = (code, caption) => ({ t: 'mermaid', code, caption });

/** Short term/meaning pairs inside a page. Renders the "What does this mean?" pattern. */
export const defs = (items, title) => ({ t: 'defs', items, title });

/** Collapsed detail, for long reference material that should not dominate a page. */
export const accordions = (items) => ({ t: 'accordions', items });

/** A grid of small cards. Each item: { title, text, tag, to } */
export const cards = (items) => ({ t: 'cards', items });
