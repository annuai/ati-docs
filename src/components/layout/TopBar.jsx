import { Link } from 'react-router-dom';
import { Icon } from '../content/Icon.jsx';

/** Shown only on narrow screens, where the sidebar becomes a drawer. */
export function TopBar({ onOpenNav, navId, navOpen }) {
  return (
    <header className="topbar">
      <Link className="topbar__brand" to="/">
        <img src="/assets/Ati-Docs-Logo.svg" alt="" width="84" height="27" />
        <span className="visually-hidden">Ati Documentation System</span>
      </Link>
      <button className="topbar__button" type="button" onClick={onOpenNav} aria-expanded={navOpen} aria-controls={navId}>
        <Icon name="menu" size={18} /> Menu
      </button>
    </header>
  );
}
