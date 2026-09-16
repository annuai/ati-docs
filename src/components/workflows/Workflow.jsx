import { WorkflowStep } from './WorkflowStep.jsx';
import { DiagramBlock } from '../content/DiagramBlock.jsx';

export function Workflow({ steps, caption }) {
  return (
    <DiagramBlock label="Workflow diagram" caption={caption}>
      <ol className="workflow">
        {steps.map((step, index) => (
          <WorkflowStep key={step.title} step={step} index={index} isLast={index === steps.length - 1} />
        ))}
      </ol>
    </DiagramBlock>
  );
}
