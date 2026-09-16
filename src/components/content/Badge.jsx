import { statusLabels } from '../../content/index.js';

/** Documentation status. Deliberately hidden for `current`, so badges stay meaningful. */
export function Badge({ status, always = false }) {
  if (!status || (status === 'current' && !always)) return null;
  return <span className={`badge badge--${status}`}>{statusLabels[status] || status}</span>;
}
