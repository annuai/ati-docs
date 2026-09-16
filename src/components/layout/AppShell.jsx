import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar.jsx';
import { TopBar } from './TopBar.jsx';

const NAV_ID = 'documentation-navigation';

export function AppShell({ children }) {
  const [navOpen, setNavOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setNavOpen(false);
    window.scrollTo({ top: 0 });
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setNavOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Sidebar id={NAV_ID} open={navOpen} onNavigate={() => setNavOpen(false)} />
      {navOpen ? (
        <button className="sidebar__scrim" type="button" aria-label="Close navigation" onClick={() => setNavOpen(false)} />
      ) : null}

      <div className="shell__main">
        <TopBar navId={NAV_ID} navOpen={navOpen} onOpenNav={() => setNavOpen((open) => !open)} />
        <main className="shell__content" id="main-content" tabIndex={-1}>
          {children}
        </main>
        <footer className="shell__footer">
          Ati Documentation System &middot; one source of truth for everything Ati builds. Content is
          human-authored and traced to source material &mdash; see <Link to="/contributors">contributors</Link>{' '}
          and <code>docs/source-audit.md</code>.
        </footer>
      </div>
    </div>
  );
}
