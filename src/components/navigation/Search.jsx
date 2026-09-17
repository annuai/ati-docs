import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { search } from '../../data/searchIndex.js';
import { Tag } from '../content/Tag.jsx';
import { Icon } from '../content/Icon.jsx';

/*
  Global search.

  Local, structured and lightweight: it reads the search index built from the content registry.
  There is no AI and no backend. Results say what kind of content was found.
*/

export function Search({ placeholder = 'Search documentation', autoFocusKey = true }) {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const listId = useId();

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => (query.trim() ? search(query, 8) : []), [query]);

  useEffect(() => setActiveIndex(0), [query]);

  useEffect(() => {
    if (!autoFocusKey) return undefined;
    const onKeyDown = (event) => {
      const tag = document.activeElement?.tagName;
      const typing = tag === 'INPUT' || tag === 'TEXTAREA';
      if (event.key === '/' && !typing) {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [autoFocusKey]);

  useEffect(() => {
    const onClick = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const go = (path) => {
    setOpen(false);
    setQuery('');
    inputRef.current?.blur();
    navigate(path);
  };

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      setOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (!results.length) {
      if (event.key === 'Enter' && query.trim()) go(`/search?q=${encodeURIComponent(query.trim())}`);
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + results.length) % results.length);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      go(results[activeIndex]?.path || `/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="search" ref={containerRef}>
      <div className="search__field">
        <span className="search__icon">
          <Icon name="search" size={16} />
        </span>
        <label className="visually-hidden" htmlFor={listId}>
          Search the Ati Documentation System
        </label>
        <input
          id={listId}
          ref={inputRef}
          className="search__input"
          type="search"
          autoComplete="off"
          placeholder={placeholder}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded={open && Boolean(query.trim())}
          aria-controls={`${listId}-results`}
          aria-autocomplete="list"
        />
        {!query ? (
          <kbd className="search__hint" aria-hidden="true">
            /
          </kbd>
        ) : null}
      </div>

      {open && query.trim() ? (
        <div className="search__results" id={`${listId}-results`} role="listbox" aria-label="Search results">
          {results.length ? (
            <>
              {results.map((result, index) => (
                <a
                  key={result.id}
                  href={result.path}
                  role="option"
                  aria-selected={index === activeIndex}
                  className={`search__result ${index === activeIndex ? 'search__result--active' : ''}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={(event) => {
                    event.preventDefault();
                    go(result.path);
                  }}
                >
                  <span className="search__result-title">
                    {result.title}
                    <Tag>{result.typeLabel}</Tag>
                  </span>
                  <span className="search__result-summary">{result.summary}</span>
                </a>
              ))}
              <a
                className="search__all"
                href={`/search?q=${encodeURIComponent(query.trim())}`}
                onClick={(event) => {
                  event.preventDefault();
                  go(`/search?q=${encodeURIComponent(query.trim())}`);
                }}
              >
                See all results for &ldquo;{query.trim()}&rdquo;
              </a>
            </>
          ) : (
            <p className="search__empty">No documentation found for &ldquo;{query.trim()}&rdquo;.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
