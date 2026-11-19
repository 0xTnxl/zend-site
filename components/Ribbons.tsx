const CONTEXTS = ["a chat", "a link", "an inbox", "a scrap of paper", "a game", "a group chat", "a birthday", "the Moon"];
const PLACES = ["Lagos", "Lisbon", "Tokyo", "São Paulo", "Seoul", "Nairobi", "Mumbai", "Manila", "Accra", "New York", "Berlin"];

function Track({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  // Two copies side by side, so moving by half the width loops without a seam.
  return (
    <div className={reverse ? "marquee-track marquee-track-reverse" : "marquee-track"}>
      {[...items, ...items].map((t, i) => (
        <span key={i} className="marquee-item">
          {t}
          <span className="marquee-star">✦</span>
        </span>
      ))}
    </div>
  );
}

/** Two crossing bands of everywhere Zend works. */
export function Ribbons() {
  return (
    <section className="ribbons" aria-label="Where Zend works">
      <p className="sr-only">
        Zend works in {CONTEXTS.join(", ")}, and in {PLACES.join(", ")}.
      </p>
      <div className="marquee marquee-green" aria-hidden="true">
        <Track items={CONTEXTS} />
      </div>
      <div className="marquee marquee-ink" aria-hidden="true">
        <Track items={PLACES} reverse />
      </div>
    </section>
  );
}
