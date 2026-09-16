import { Fragment } from 'react';
import { Link } from 'react-router-dom';

/** Trail: an array of { title, to }. The last item is rendered as the current page. */
export function Breadcrumbs({ trail = [] }) {
  if (!trail.length) return null;
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <Fragment key={crumb.title + index}>
              <li>
                {isLast || !crumb.to ? (
                  <span className="breadcrumbs__current" aria-current="page">
                    {crumb.title}
                  </span>
                ) : (
                  <Link to={crumb.to}>{crumb.title}</Link>
                )}
              </li>
              {!isLast ? (
                <li className="breadcrumbs__sep" aria-hidden="true">
                  /
                </li>
              ) : null}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
