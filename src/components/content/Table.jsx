import { InlineText } from './InlineText.jsx';

export function Table({ head, rows, caption }) {
  return (
    <div className="table-wrap">
      <table className="table">
        {caption ? <caption>{caption}</caption> : null}
        {head ? (
          <thead>
            <tr>
              {head.map((cell) => (
                <th key={cell} scope="col">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) =>
                cellIndex === 0 ? (
                  <th key={cellIndex} scope="row">
                    <InlineText text={cell} />
                  </th>
                ) : (
                  <td key={cellIndex}>
                    <InlineText text={cell} />
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
