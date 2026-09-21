/*
  openQuestions now lives as Markdown files in `content-md/openQuestions/`, not here.

  `scripts/compile-content.mjs` compiles them into `./generated/openQuestions.js` — the exact same
  plain-object shape this file used to define by hand. See content-md/README.md for the
  authoring format, and CLAUDE.md for the authorship/sourcing rules that still apply.
*/
export { openQuestions } from './generated/openQuestions.js';
