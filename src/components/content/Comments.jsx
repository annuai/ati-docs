import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Configured once giscus is connected to the repository. See docs/comments-setup.md.
const REPO = import.meta.env.VITE_GISCUS_REPO;
const REPO_ID = import.meta.env.VITE_GISCUS_REPO_ID;
const CATEGORY = import.meta.env.VITE_GISCUS_CATEGORY;
const CATEGORY_ID = import.meta.env.VITE_GISCUS_CATEGORY_ID;

const READY = Boolean(REPO && REPO_ID && CATEGORY && CATEGORY_ID);

/*
  Per-page discussion thread, backed by GitHub Discussions via giscus.

  One discussion per route (`data-mapping="pathname"`) — every entry gets its own thread with no
  manual wiring. Commenting requires a GitHub account; identity, threaded replies and moderation
  all come from GitHub itself rather than anything built here.

  React Router doesn't remount this component when navigating between two entry pages (same route
  shape, different params), so the script is injected once and later navigations tell the existing
  giscus iframe to switch threads via postMessage — the pattern giscus documents for SPAs.
*/
export function Comments() {
  const containerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (!READY) return;
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', REPO);
    script.setAttribute('data-repo-id', REPO_ID);
    script.setAttribute('data-category', CATEGORY);
    script.setAttribute('data-category-id', CATEGORY_ID);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '1');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', 'en');
    container.appendChild(script);

    // Without this, React 18 StrictMode's dev-only mount→cleanup→mount cycle (and any real
    // remount) appends a second script into the same container, producing two giscus iframes.
    return () => {
      container.innerHTML = '';
    };
  }, []);

  useEffect(() => {
    if (!READY) return;
    const iframe = containerRef.current?.querySelector('iframe.giscus-frame');
    if (!iframe) return;
    iframe.contentWindow.postMessage({ giscus: { setConfig: { term: location.pathname } } }, 'https://giscus.app');
  }, [location.pathname]);

  if (!READY) return null;

  return (
    <section className="comments" aria-label="Discussion">
      <h2 className="comments__heading">Discussion</h2>
      <p className="comments__note">
        Flag a discrepancy or ask a question. Comments use your GitHub account and are visible to
        anyone with access to this documentation.
      </p>
      <div ref={containerRef} />
    </section>
  );
}
