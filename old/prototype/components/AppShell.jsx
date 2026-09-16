import React from 'react';

export function AppShell({ logo, navigation, secondaryNavigation, activeNav, onNavigate, children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <img src={logo} alt="ATI Flow" className="brand-logo" />
        </div>

        <button className="mode-button" type="button">
          <span>◉</span><span>Supervisor Mode</span><span className="mode-arrow">⌄</span>
        </button>

        <div className="processing-label"><span>▦</span><span>Processing Zone</span></div>
        <button className="zone-select" type="button"><span>Zone 24</span><span>⌄</span></button>
        <div className="sidebar-divider" />

        <nav className="nav-section" aria-label="Primary navigation">
          {navigation.map((item, index) => (
            <React.Fragment key={item.label}>
              {item.section && index > 0 && <div className="nav-section-heading">{item.section}<span>⌄</span></div>}
              <button
                className={`nav-item ${activeNav === item.label ? 'active' : ''}`}
                type="button"
                onClick={() => onNavigate(item.label)}
              >
                <span className="nav-icon">{item.icon}</span><span>{item.label}</span>
              </button>
              {(item.label === 'Dashboard' || item.label === 'Analytics') && <div className="sidebar-divider" />}
            </React.Fragment>
          ))}
        </nav>

        <nav className="bottom-nav" aria-label="Secondary navigation">
          {secondaryNavigation.map(item => (
            <button className="nav-item" type="button" key={item.label} onClick={() => onNavigate(item.label)}>
              <span className="nav-icon">{item.icon}</span><span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="arrow-group">
            <button className="icon-button" type="button" aria-label="Back">‹</button>
            <button className="icon-button" type="button" aria-label="Forward">›</button>
          </div>
          <label className="global-search">
            <span>⌕</span><input type="search" placeholder="Search Ati Flow" aria-label="Search Ati Flow" />
          </label>
        </header>
        {children}
      </main>
    </div>
  );
}
