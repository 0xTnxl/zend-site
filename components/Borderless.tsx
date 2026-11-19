"use client";

import { useEffect, useRef, useState } from "react";
import { convert, formatMoney, type Currency } from "@/lib/money";
import { FoldedMap } from "./Illustrations";
import { Reveal } from "./Reveal";

const BASE = { who: "Léa", amount: 50, currency: "EUR" as Currency };

const PLACES: { place: string; inCaption?: string; currency: Currency }[] = [
  { place: "Lisbon", currency: "EUR" },
  { place: "Tokyo", currency: "JPY" },
  { place: "New York", currency: "USD" },
  { place: "Mumbai", currency: "INR" },
  { place: "São Paulo", currency: "BRL" },
  { place: "Seoul", currency: "KRW" },
  { place: "Nairobi", currency: "KES" },
  { place: "London", currency: "GBP" },
  { place: "Manila", currency: "PHP" },
  { place: "Lagos", currency: "NGN" },
  // No local currency up there yet, so the person picks one, like anyone on Zend can.
  { place: "The Moon 🌕", inCaption: "the Moon", currency: "USD" },
];

const TICK_MS = 2000;

export function Borderless() {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    const id = window.setInterval(() => {
      if (visible && !document.hidden) setIndex((i) => (i + 1) % PLACES.length);
    }, TICK_MS);
    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, []);

  const p = PLACES[index];
  const value = convert(BASE.amount, BASE.currency, p.currency);

  return (
    <section className="borderless" ref={ref} aria-labelledby="borderless-title">
      <div className="shell borderless-grid">
        <div>
          <Reveal as="p" className="kicker">No borders</Reveal>
          <Reveal as="h2" className="section-title" delay={60}>
            <span id="borderless-title">Borders are for maps.</span>
          </Reveal>
          <Reveal as="p" className="lede" delay={120}>
            Send to a name, not a bank, a branch or a country. Léa sends euros, Kenji gets yen,
            and nobody does the maths. Even if they live nowhere on Earth.
          </Reveal>
          <Reveal delay={180}>
            <FoldedMap />
          </Reveal>
        </div>

        <div className="borderless-figure">
          <p className="borderless-amount" aria-live="off" suppressHydrationWarning>
            <span key={p.place} className="borderless-amount-value">
              {formatMoney(value, p.currency)}
            </span>
          </p>
          <p className="borderless-caption" suppressHydrationWarning>
            {BASE.who}&rsquo;s {formatMoney(BASE.amount, BASE.currency)}, as{" "}
            <strong key={`c-${p.place}`} className="borderless-city">
              {p.inCaption ?? p.place}
            </strong>{" "}
            sees it
          </p>

          <ul className="places" aria-label="The same amount around the world, and beyond it">
            {PLACES.map((x, i) => (
              <li key={x.place} className={i === index ? "place place-on" : "place"}>
                <span>{x.place}</span>
                <span className="place-dots" aria-hidden="true" />
                <span className="place-value" suppressHydrationWarning>
                  {formatMoney(convert(BASE.amount, BASE.currency, x.currency), x.currency)}
                </span>
              </li>
            ))}
          </ul>
          <p className="footnote">
            Example amounts at an example rate; Zend uses the day&rsquo;s. Nobody on the Moon has a
            local currency yet, so they pick one, like anyone on Zend can.
          </p>
        </div>
      </div>
    </section>
  );
}
