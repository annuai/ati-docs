export function ImageBlock({ src, alt, caption }) {
  return (
    <figure className="figure">
      <div className="figure__frame">
        <img src={src} alt={alt} loading="lazy" />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
