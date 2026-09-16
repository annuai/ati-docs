import { InlineText } from '../content/InlineText.jsx';
import { Tag } from '../content/Tag.jsx';

/** One step of a workflow. `kind` is 'step' (default), 'decision' or 'outcome'. */
export function WorkflowStep({ step, index, isLast }) {
  const kind = step.kind || 'step';
  const marker = kind === 'decision' ? '?' : kind === 'outcome' ? '✓' : index + 1;

  return (
    <li className={`workflow__step workflow__step--${kind}`}>
      <div className="workflow__rail" aria-hidden="true">
        <span className="workflow__marker">{marker}</span>
        {!isLast ? <span className="workflow__line" /> : null}
      </div>
      <div className="workflow__body">
        <p className="workflow__title">
          <InlineText text={step.title} />
          {step.tag ? (
            <span className="workflow__kind">
              <Tag>{step.tag}</Tag>
            </span>
          ) : null}
        </p>
        {step.note ? (
          <p className="workflow__note">
            <InlineText text={step.note} />
          </p>
        ) : null}
        {step.points ? (
          <ul className="workflow__points">
            {step.points.map((point) => (
              <li key={point}>
                <InlineText text={point} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  );
}
