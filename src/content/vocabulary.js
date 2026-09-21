/*
  vocabulary now lives as Markdown files in `content-md/vocabulary/`, not here.

  `scripts/compile-content.mjs` compiles them into `./generated/vocabulary.js` — the exact same
  plain-object shape this file used to define by hand. See content-md/README.md for the
  authoring format, and CLAUDE.md for the authorship/sourcing rules that still apply.
*/
export { vocabulary } from './generated/vocabulary.js';
