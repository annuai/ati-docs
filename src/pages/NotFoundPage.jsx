import { Link } from 'react-router-dom';
import { PageHeader } from '../components/content/PageHeader.jsx';

export function NotFoundPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Not found"
        title="This page does not exist"
        summary="The documentation entry you followed is not in the content registry."
      />
      <p className="prose">
        Try the <Link to="/">home page</Link>, the <Link to="/vocabulary">vocabulary</Link>, or{' '}
        <Link to="/open-questions">what is still open</Link>.
      </p>
    </div>
  );
}
