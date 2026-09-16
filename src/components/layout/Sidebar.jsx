import { Link, NavLink, useLocation } from 'react-router-dom';
import { navigation } from '../../data/navigation.js';
import { Search } from '../navigation/Search.jsx';

/*
  Persistent navigation.

  Groups come from `src/data/navigation.js`, which is derived from the content registry — a new
  documentation entry appears here without touching this component.
*/

function isSectionActive(section, pathname) {
  return pathname === section.path || pathname.startsWith(`${section.path}/`);
}

export function Sidebar({ id, open, onNavigate }) {
  const { pathname } = useLocation();

  return (
    <aside id={id} className={`sidebar ${open ? 'sidebar--open' : ''}`} aria-label="Documentation navigation">
      <Link className="sidebar__brand" to="/" onClick={onNavigate}>
        <img className="sidebar__logo" src="/assets/Ati-Docs-Logo.svg" alt="Ati Docs" width="101" height="32" />
        <span className="sidebar__product">Ati Documentation System</span>
        <span className="sidebar__description">
          One source of truth for everything Ati builds — software and hardware.
        </span>
      </Link>

      <Search />

      <nav className="sidebar__nav">
        {navigation.map((section) => {
          const active = isSectionActive(section, pathname);
          return (
            <div className="sidebar__group" key={section.id}>
              <NavLink
                to={section.path}
                end={!section.children.length}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `sidebar__link sidebar__link--section ${isActive ? 'sidebar__link--active' : ''}`
                }
              >
                {section.title}
                {section.count ? <span className="sidebar__count">{section.count}</span> : null}
              </NavLink>

              {active && section.children.length ? (
                <ul className="sidebar__sublist">
                  {section.children.map((child) => (
                    <li key={child.id}>
                      <NavLink
                        to={child.path}
                        onClick={onNavigate}
                        className={({ isActive }) =>
                          `sidebar__link ${isActive && child.path === `${pathname}` ? 'sidebar__link--active' : ''}`
                        }
                      >
                        {child.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          );
        })}
      </nav>

      <div className="sidebar__foot">
        <NavLink
          to="/contributors"
          onClick={onNavigate}
          className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
        >
          Contributors
        </NavLink>
      </div>
    </aside>
  );
}
