export function SectionHeader({ title, description, id }) {
  return (
    <div className="section-header">
      <h2 id={id}>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
