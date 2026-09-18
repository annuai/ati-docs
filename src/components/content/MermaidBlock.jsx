import { useEffect, useId, useState } from 'react';
import { DiagramBlock } from './DiagramBlock.jsx';

let mermaidPromise = null;

// Mermaid's theme validator needs literal colour values, not var() references, so the design
// tokens are resolved from the page's own computed styles rather than duplicated as hex here.
function resolveToken(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

// Mermaid is a large, multi-diagram-type library. Load it only on pages that actually use it,
// rather than paying its weight on every page via BlockRenderer.
function loadMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid').then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        securityLevel: 'strict',
        themeVariables: {
          fontFamily: resolveToken('--font-sans'),
          primaryColor: resolveToken('--color-primary-pale'),
          primaryBorderColor: resolveToken('--color-primary-line'),
          primaryTextColor: resolveToken('--color-primary-strong'),
          lineColor: resolveToken('--color-border-strong'),
          textColor: resolveToken('--color-text'),
          mainBkg: resolveToken('--color-primary-pale'),
          nodeBorder: resolveToken('--color-primary-line'),
          clusterBkg: resolveToken('--color-surface-soft'),
          clusterBorder: resolveToken('--color-border')
        },
        mindmap: { padding: 12 }
      });
      return mermaid;
    });
  }
  return mermaidPromise;
}

/** Renders a Mermaid diagram from source text. Used for structure too large for the hand-rolled diagram blocks. */
export function MermaidBlock({ code, caption }) {
  const id = useId().replace(/:/g, '-');
  const [svg, setSvg] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    loadMermaid()
      .then((mermaid) => mermaid.render(`mermaid-${id}`, code))
      .then(({ svg }) => {
        if (!cancelled) setSvg(svg);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || 'Diagram failed to render.');
      });
    return () => {
      cancelled = true;
    };
  }, [id, code]);

  return (
    <DiagramBlock label="Diagram" caption={caption}>
      {error ? (
        <p className="diagram__error">{error}</p>
      ) : (
        <div className="diagram__mermaid" dangerouslySetInnerHTML={svg ? { __html: svg } : undefined} />
      )}
    </DiagramBlock>
  );
}
