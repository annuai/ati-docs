import {
  Check,
  Menu,
  NavArrowLeft,
  NavArrowRight,
  QuestionMark,
  Search as SearchGlyph
} from 'iconoir-react';

/*
  The icon set.

  Every icon in the application comes from here, referenced by a semantic name rather than by the
  library's own name. Swapping icon libraries, or changing which glyph a role uses, is a change to
  this one file.

  Icons are decorative by default: they are hidden from assistive technology, because every place
  one is used already carries a visible or screen-reader label.
*/

const glyphs = {
  search: SearchGlyph,
  menu: Menu,
  'chevron-right': NavArrowRight,
  'arrow-left': NavArrowLeft,
  'arrow-right': NavArrowRight,
  check: Check,
  question: QuestionMark
};

export function Icon({ name, size = 16, strokeWidth = 2, className, label }) {
  const Glyph = glyphs[name];
  if (!Glyph) return null;

  return (
    <Glyph
      className={className}
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      aria-hidden={label ? undefined : 'true'}
      aria-label={label}
      role={label ? 'img' : undefined}
      focusable="false"
    />
  );
}

export const iconNames = Object.keys(glyphs);
