"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChatScene } from "./ChatScene";
import { GameScene, InboxScene, LinkScene, MoonScene, PaperScene } from "./Scenes";

const ITEMS: { phrase: string; body: string; scene: ReactNode }[] = [
  {
    phrase: "a chat.",
    body: "Ask, pay and reply in the same thread. It sits right next to the words it came with.",
    scene: <ChatScene />,
  },
  {
    phrase: "a link.",
    body: "Anyone can collect it, on Zend or not. They sign in with Google and it's theirs. If nobody does in time, it comes back to you.",
    scene: <LinkScene />,
  },
  {
    phrase: "an inbox.",
    body: "Type an email instead of a name. If they have an inbox, they can have it.",
    scene: <InboxScene />,
  },
  {
    phrase: "a scrap of paper.",
    body: "Turn any amount into a code you can read out, write down or stick on a fridge. Whoever holds the code can collect it.",
    scene: <PaperScene />,
  },
  {
    phrase: "a game.",
    body: "Apps built on Zend use it for prizes, and for draws nobody can rig. Not the players, not the app, not us.",
    scene: <GameScene />,
  },
  {
    phrase: "the Moon.",
    body: "We haven't checked. We're confident.",
    scene: <MoonScene />,
  },
];

/** "Zend works in…" with the heading pinned and each ending taking its turn. */
export function WorksIn() {
  const [active, setActive] = useState<number | null>(null);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    for (const el of rows.current) if (el) io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="anywhere" className="anywhere" aria-labelledby="anywhere-title">
      <div className="shell anywhere-grid">
        <div className="anywhere-head">
          <p className="kicker">Where it works</p>
          <h2 id="anywhere-title" className="anywhere-title">
            Zend works in
          </h2>
          <p className="anywhere-hint">…and wherever you take it next.</p>
        </div>

        <ol className="anywhere-list">
          {ITEMS.map((it, i) => (
            <li
              key={it.phrase}
              ref={(el) => {
                rows.current[i] = el;
              }}
              data-index={i}
              className={
                active === null ? "anywhere-item" : active === i ? "anywhere-item is-active" : "anywhere-item is-dim"
              }
            >
              <div className="anywhere-copy">
                <span className="anywhere-prefix">Zend works in</span>
                <h3 className="anywhere-phrase">{it.phrase}</h3>
                <p className="anywhere-body">{it.body}</p>
              </div>
              <div className="anywhere-scene" aria-hidden="true">
                {it.scene}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
