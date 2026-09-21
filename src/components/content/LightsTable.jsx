import { InlineText } from './InlineText.jsx';

const PATTERNS = new Set(['steady', 'split', 'pulse-slow', 'pulse-fast', 'sweep-slow', 'sweep-fast', 'off']);

function LightSwatch({ color, secondary, pattern }) {
  const className = ['light-swatch', PATTERNS.has(pattern) ? `light-swatch--${pattern}` : null]
    .filter(Boolean)
    .join(' ');
  const style = secondary ? { '--light-color': color, '--light-color-2': secondary } : { '--light-color': color };
  return <span className={className} style={style} aria-hidden="true" />;
}

/** A table whose first column pairs an animated colour swatch with its label — see blocks.js `lights()`. */
export function LightsTable({ items = [], caption }) {
  return (
    <div className="table-wrap">
      <table className="table table--lights">
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          <tr>
            <th scope="col">Light</th>
            <th scope="col">Sound or voice message</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <th scope="row">
                <span className="light-cell">
                  <LightSwatch color={item.color} secondary={item.secondary} pattern={item.pattern} />
                  <InlineText text={item.label} />
                </span>
              </th>
              <td>
                <InlineText text={item.sound} />
              </td>
              <td>
                <InlineText text={item.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
