/*
  teams now lives as Markdown files in `content-md/teams/`, not here.

  `scripts/compile-content.mjs` compiles them into `./generated/teams.js` — the exact same
  plain-object shape this file used to define by hand. See content-md/README.md for the
  authoring format, and CLAUDE.md for the authorship/sourcing rules that still apply.
*/
export { teams } from './generated/teams.js';
