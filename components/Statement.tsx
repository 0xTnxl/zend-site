"use client";

import { useEffect, useRef, useState } from "react";
import { BankStatement } from "./Illustrations";

const TEXT =
  "Money was always social. The birthday gift at midnight. The split after dinner. The “I got you” to a cousin three timezones away. Banks turned all of it into statement lines. Zend gives it back to the people in it.";

const WORDS = TEXT.split(" ");

/** A paragraph that lights up word by word as it scrolls through the screen. */
export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [lit, setLit] = useState(WORDS.length);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Starts lighting when the paragraph's top reaches 80% of the screen, done at 35%.
      const start = vh * 0.8;
      const end = vh * 0.35 - r.height * 0.5;
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end)));
      setLit(Math.round(p * WORDS.length));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="statement" aria-label="Why Zend">
      <div className="shell statement-grid">
        <p ref={ref} className="statement-text">
          <span className="sr-only">{TEXT}</span>
          <span aria-hidden="true">
            {WORDS.map((w, i) => (
              <span key={i} className={i < lit ? "word word-lit" : "word"}>
                {w}{" "}
              </span>
            ))}
          </span>
        </p>
        <BankStatement />
      </div>
    </section>
  );
}
