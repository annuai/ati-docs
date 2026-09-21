import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forceSimulation, forceLink, forceManyBody, forceCenter, forceCollide } from 'd3-force';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs.jsx';
import { PageHeader } from '../components/content/PageHeader.jsx';
import { sections, entries, entriesById, entriesBySection } from '../content/index.js';

/*
  The map.

  Every entry and section already lives in the content registry (`src/content/index.js`), so this
  page reads straight from `entries`/`sections` rather than keeping its own list — a new
  content-md file appears here the moment it is compiled, with no further wiring.

  Sections start collapsed into a single cluster node (224 entries is too many to show flat and
  stay legible); clicking a cluster expands it into its individual entries. Edges come from the
  `related` field only. An edge between two collapsed clusters is the aggregate of every `related`
  link that crosses between their entries.
*/

const WIDTH = 1400;
const HEIGHT = 900;

const PALETTE = [
  'var(--color-primary)',
  'var(--color-amber)',
  'var(--color-danger)',
  'var(--color-primary-bright)',
  'var(--color-text-secondary)',
  'var(--color-primary-strong)',
  'var(--color-muted)',
  'var(--color-border-strong)',
  'var(--color-faint)'
];

const sectionColor = new Map(sections.map((section, index) => [section.id, PALETTE[index % PALETTE.length]]));

const clusterId = (sectionId) => `cluster:${sectionId}`;

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

/** Every `related` pair, deduplicated regardless of direction. */
const baseEdges = (() => {
  const seen = new Set();
  const list = [];
  entries.forEach((entry) => {
    entry.related.forEach((targetId) => {
      if (targetId === entry.id || !entriesById.has(targetId)) return;
      const key = [entry.id, targetId].sort().join('::');
      if (seen.has(key)) return;
      seen.add(key);
      list.push([entry.id, targetId]);
    });
  });
  return list;
})();

function buildVisibleGraph(expanded) {
  const nodes = [];

  sections.forEach((section) => {
    if (expanded.has(section.id)) {
      (entriesBySection.get(section.id) || []).forEach((entry) => {
        nodes.push({ id: entry.id, label: entry.title, kind: 'entry', section: section.id, path: entry.path });
      });
    } else {
      nodes.push({
        id: clusterId(section.id),
        label: section.title,
        kind: 'cluster',
        section: section.id,
        count: (entriesBySection.get(section.id) || []).length
      });
    }
  });

  const visibleIdFor = (entry) => (expanded.has(entry.section) ? entry.id : clusterId(entry.section));

  const weights = new Map();
  baseEdges.forEach(([a, b]) => {
    const entryA = entriesById.get(a);
    const entryB = entriesById.get(b);
    const from = visibleIdFor(entryA);
    const to = visibleIdFor(entryB);
    if (from === to) return; // both inside the same collapsed cluster
    const key = [from, to].sort().join('::');
    weights.set(key, (weights.get(key) || 0) + 1);
  });

  const links = [...weights.entries()].map(([key, weight]) => {
    const [source, target] = key.split('::');
    return { source, target, weight };
  });

  return { nodes, links };
}

function nodeRadius(node) {
  return node.kind === 'cluster' ? 20 + Math.sqrt(node.count || 1) * 4 : 9;
}

export function MapPage() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(() => new Set());
  const [tick, setTick] = useState(0);
  const [view, setView] = useState({ x: 0, y: 0, scale: 1 });
  const [hoveredId, setHoveredId] = useState(null);

  const graph = useMemo(() => buildVisibleGraph(expanded), [expanded]);

  const nodesRef = useRef([]);
  const linksRef = useRef([]);
  const simulationRef = useRef(null);
  const svgRef = useRef(null);
  const panRef = useRef(null);
  const dragRef = useRef(null);

  useEffect(() => {
    const previousPositions = new Map(nodesRef.current.map((node) => [node.id, { x: node.x, y: node.y }]));

    const nodes = graph.nodes.map((node) => {
      const previous = previousPositions.get(node.id);
      return {
        ...node,
        x: previous?.x ?? WIDTH / 2 + (Math.random() - 0.5) * 400,
        y: previous?.y ?? HEIGHT / 2 + (Math.random() - 0.5) * 400
      };
    });
    const byId = new Map(nodes.map((node) => [node.id, node]));
    const links = graph.links
      .map((link) => ({ ...link, source: byId.get(link.source), target: byId.get(link.target) }))
      .filter((link) => link.source && link.target);

    nodesRef.current = nodes;
    linksRef.current = links;

    const simulation = forceSimulation(nodes)
      .force(
        'link',
        forceLink(links)
          .id((node) => node.id)
          .distance(220)
          .strength(0.15)
      )
      .force('charge', forceManyBody().strength(-620))
      .force('center', forceCenter(WIDTH / 2, HEIGHT / 2))
      .force('collide', forceCollide((node) => nodeRadius(node) + 26))
      .on('tick', () => setTick((count) => count + 1));

    simulationRef.current = simulation;
    return () => simulation.stop();
  }, [graph]);

  function toClientToGraph(clientX, clientY) {
    const rect = svgRef.current.getBoundingClientRect();
    return {
      x: (clientX - rect.left - view.x) / view.scale,
      y: (clientY - rect.top - view.y) / view.scale
    };
  }

  function handleNodePointerDown(event, node) {
    event.stopPropagation();
    const start = toClientToGraph(event.clientX, event.clientY);
    dragRef.current = { node, startX: start.x, startY: start.y, moved: false };
    node.fx = node.x;
    node.fy = node.y;
    simulationRef.current?.alphaTarget(0.3).restart();
  }

  useEffect(() => {
    function handlePointerMove(event) {
      if (dragRef.current) {
        const { node } = dragRef.current;
        const point = toClientToGraph(event.clientX, event.clientY);
        node.fx = point.x;
        node.fy = point.y;
        dragRef.current.moved = true;
        setTick((count) => count + 1);
        return;
      }
      if (panRef.current) {
        const dx = event.clientX - panRef.current.x;
        const dy = event.clientY - panRef.current.y;
        panRef.current = { x: event.clientX, y: event.clientY };
        setView((current) => ({ ...current, x: current.x + dx, y: current.y + dy }));
      }
    }

    function handlePointerUp() {
      if (dragRef.current) {
        const { node, moved } = dragRef.current;
        node.fx = null;
        node.fy = null;
        simulationRef.current?.alphaTarget(0);
        if (!moved) activateNode(node);
        dragRef.current = null;
      }
      panRef.current = null;
    }

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view.x, view.y, view.scale]);

  function activateNode(node) {
    if (node.kind === 'cluster') {
      setExpanded((current) => {
        const next = new Set(current);
        next.add(node.section);
        return next;
      });
    } else {
      navigate(node.path);
    }
  }

  function collapseSection(sectionId) {
    setExpanded((current) => {
      const next = new Set(current);
      next.delete(sectionId);
      return next;
    });
  }

  function handleBackgroundPointerDown(event) {
    panRef.current = { x: event.clientX, y: event.clientY };
  }

  useEffect(() => {
    const svg = svgRef.current;
    function handleWheel(event) {
      event.preventDefault();
      setView((current) => ({
        ...current,
        scale: clamp(current.scale * (event.deltaY < 0 ? 1.08 : 0.93), 0.3, 2.5)
      }));
    }
    // React attaches onWheel as a passive listener, which cannot call preventDefault — attach
    // this one natively instead so scrolling over the canvas zooms rather than scrolls the page.
    svg.addEventListener('wheel', handleWheel, { passive: false });
    return () => svg.removeEventListener('wheel', handleWheel);
  }, []);

  const nodes = nodesRef.current;
  const links = linksRef.current;

  return (
    <div className="map-page">
      <Breadcrumbs trail={[{ title: 'Map' }]} />
      <PageHeader
        eyebrow="Map"
        title="How everything connects"
        summary="Every documentation entry and how it relates to the others. Click a cluster to expand it into its entries, click an entry to open its page, drag to rearrange, scroll to zoom, drag the background to pan."
      />

      <div className="map-page__toolbar filter-group" role="group" aria-label="Expand or collapse sections">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            aria-pressed={expanded.has(section.id)}
            onClick={() =>
              expanded.has(section.id)
                ? collapseSection(section.id)
                : setExpanded((current) => new Set(current).add(section.id))
            }
          >
            <span className="map-page__swatch" style={{ background: sectionColor.get(section.id) }} aria-hidden="true" />
            {section.title}
          </button>
        ))}
      </div>

      <svg
        ref={svgRef}
        className="map-page__canvas"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        onPointerDown={handleBackgroundPointerDown}
        role="img"
        aria-label="Graph of every documentation entry and how it relates to the others"
      >
        <g transform={`translate(${view.x} ${view.y}) scale(${view.scale})`}>
          {links.map((link) => {
            const touchesHovered = hoveredId && (link.source.id === hoveredId || link.target.id === hoveredId);
            const dimmed = hoveredId && !touchesHovered;
            return (
              <line
                key={`${link.source.id}::${link.target.id}`}
                className={`map-page__edge ${touchesHovered ? 'map-page__edge--active' : ''} ${
                  dimmed ? 'map-page__edge--dim' : ''
                }`}
                x1={link.source.x}
                y1={link.source.y}
                x2={link.target.x}
                y2={link.target.y}
                strokeWidth={Math.min(0.75 + link.weight * 0.35, 4)}
              />
            );
          })}
          {nodes.map((node) => (
            <g
              key={node.id}
              className={`map-page__node map-page__node--${node.kind}`}
              transform={`translate(${node.x} ${node.y})`}
              onPointerDown={(event) => handleNodePointerDown(event, node)}
              onPointerEnter={() => setHoveredId(node.id)}
              onPointerLeave={() => setHoveredId((current) => (current === node.id ? null : current))}
            >
              <title>{node.kind === 'cluster' ? `${node.label} (${node.count})` : node.label}</title>
              <circle r={nodeRadius(node)} fill={sectionColor.get(node.section)} />
              <text className="map-page__label" dy={nodeRadius(node) + 12}>
                {node.kind === 'cluster' ? `${node.label} (${node.count})` : truncate(node.label)}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

function truncate(text, max = 22) {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}
