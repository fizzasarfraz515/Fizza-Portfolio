const items = [
  "Machine Learning",
  "Deep Learning",
  "Computer Vision",
  "NLP",
  "Generative AI",
  "Explainable AI",
  "Python",
  "FastAPI",
  "React",
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-8 font-serif text-2xl italic text-cream md:text-3xl">{item}</span>
          <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-ink/60" />
        </li>
      ))}
    </ul>
  );
}

/** Slow ticker between the hero and About. Duplicated row is hidden from assistive tech. */
export function Marquee() {
  return (
    <div className="relative overflow-hidden bg-olive py-5" role="region" aria-label="Areas of focus">
      <div className="marquee-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
