"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { convert, formatMoney, type Currency } from "@/lib/money";
import { people, type Person } from "@/lib/people";
import { Avatar } from "./Avatar";
import { ZMark } from "./ZMark";

const FROM = people.amara;
const BASE = { amount: 25, currency: "USD" as Currency };

// Where the note lands next. Each stop shows the same amount in that person's money.
const STOPS: { place: string; person: Person }[] = [
  { place: "Lisbon", person: people.lea },
  { place: "Tokyo", person: people.kenji },
  { place: "Mumbai", person: people.mum },
  { place: "São Paulo", person: people.rafa },
  { place: "Lagos", person: people.kemi },
  { place: "Seoul", person: people.minji },
  { place: "Nairobi", person: people.wanjiru },
  { place: "The Moon", person: people.yuri },
];

const TICK_MS = 2600;

// Fine engraved lines, like the print on a banknote. Deterministic, so server and client agree.
const GUILLOCHE = Array.from({ length: 16 }, (_, k) => {
  let d = "";
  for (let x = 0; x <= 600; x += 6) {
    const y = 160 + Math.sin(x / 36 + k * 0.42) * (34 + k * 6) * Math.cos(x / 220 + k * 0.18);
    d += `${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)} `;
  }
  return d;
});

/** The hero: a Zend note that tilts under the pointer and lands somewhere new every few seconds. */
export function ZendNote() {
  const [i, setI] = useState(0);
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (scene.current) io.observe(scene.current);
    const id = window.setInterval(() => {
      if (visible && !document.hidden) setI((n) => (n + 1) % STOPS.length);
    }, TICK_MS);
    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, []);

  const tilt = (e: PointerEvent<HTMLDivElement>) => {
    const el = scene.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${((0.5 - y) * 12).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((x - 0.5) * 16).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
  };
  const rest = () => {
    const el = scene.current;
    if (!el) return;
    for (const p of ["--rx", "--ry", "--mx", "--my"]) el.style.removeProperty(p);
  };

  const stop = STOPS[i];
  const currency = stop.person.currency ?? "USD";
  const amount = formatMoney(convert(BASE.amount, BASE.currency, currency), currency);
  const where = stop.place === "The Moon" ? "on the Moon" : `in ${stop.place}`;

  return (
    <div className="note-scene" ref={scene} onPointerMove={tilt} onPointerLeave={rest} aria-hidden="true">
      <div className="note-float">
        <div className="note-stack note-stack-2" />
        <div className="note-stack note-stack-1" />
        <div className="note">
          <svg className="note-guilloche" viewBox="0 0 600 320" preserveAspectRatio="none">
            {GUILLOCHE.map((d, k) => (
              <path key={k} d={d} />
            ))}
          </svg>
          <ZMark className="note-watermark" />
          <span className="note-foil" />

          <div className="note-top">
            <span className="note-brand">
              <ZMark className="note-brand-mark" />
              ZEND
            </span>
            <span className="note-serial">No. 000417</span>
          </div>

          <div className="note-main">
            <p className="note-amount" suppressHydrationWarning>
              <span key={stop.place}>{amount}</span>
            </p>
            <p className="note-from">
              From {FROM.name} · &ldquo;first round&rsquo;s on me 🍻&rdquo;
            </p>
          </div>

          <div className="note-bottom">
            <span className="note-code">7KQ M3TX 9PZR WD4H</span>
            <span className="note-legal">Works anywhere</span>
          </div>

          <div className="stamp" key={`stamp-${stop.place}`}>
            <svg viewBox="0 0 120 120">
              <defs>
                <path id="stamp-ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
              </defs>
              <circle cx="60" cy="60" r="57" />
              <circle cx="60" cy="60" r="33" />
              <text>
                <textPath href="#stamp-ring" textLength="272" lengthAdjust="spacing">
                  WORKS ANYWHERE ✦ WORKS ANYWHERE ✦
                </textPath>
              </text>
            </svg>
            <span className="stamp-place">{stop.place}</span>
          </div>
        </div>
      </div>

      <p className="note-landed" key={`landed-${stop.place}`} suppressHydrationWarning>
        <Avatar person={stop.person} size={28} />
        <span>
          Landed with <strong>{stop.person.name}</strong> {where}
        </span>
      </p>
    </div>
  );
}
