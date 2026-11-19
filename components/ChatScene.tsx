"use client";

import { useEffect, useRef, useState } from "react";
import { convert, formatMoney } from "@/lib/money";
import { people } from "@/lib/people";
import { Avatar } from "./Avatar";
import { ZMark } from "./ZMark";

type Msg = { id: string; from: "them" | "me"; text?: string; pay?: boolean };

// A chat with Rafa in São Paulo. You're in Lisbon, so the payment leaves in euros and
// lands in reais.
const THREAD: Msg[] = [
  { id: "a", from: "them", text: "dinner was unreal 🍝" },
  { id: "b", from: "them", text: "you still owe me for Saturday tho 😅" },
  { id: "c", from: "me", text: "omg yes. sending now" },
  { id: "d", from: "me", pay: true },
  { id: "e", from: "them", text: "finally 😂" },
  { id: "f", from: "them", text: "next round's on me 🍻" },
];

type State = { count: number; typing: boolean; reacted: boolean; tap: boolean };

/** The finished conversation: what shows without JS, with reduced motion, and on the server. */
const FULL: State = { count: THREAD.length, typing: false, reacted: true, tap: false };
const EMPTY: State = { count: 0, typing: false, reacted: false, tap: false };

// Each step changes the scene, then waits.
const SCRIPT: [Partial<State>, number][] = [
  [{ typing: true }, 1000],
  [{ typing: false, count: 1 }, 650],
  [{ typing: true }, 950],
  [{ typing: false, count: 2 }, 1100],
  [{ count: 3 }, 900],
  [{ tap: true }, 320],
  [{ tap: false, count: 4 }, 1400],
  [{ reacted: true }, 900],
  [{ typing: true }, 1000],
  [{ typing: false, count: 5 }, 700],
  [{ typing: true }, 900],
  [{ typing: false, count: 6 }, 0],
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** "Zend works in a chat": a conversation that plays out when it scrolls into view. */
export function ChatScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState<State>(FULL);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let run = 0;
    let playing = false;

    const play = async () => {
      const id = ++run;
      let st = EMPTY;
      setLive(true);
      setS(st);
      await sleep(350);
      for (const [patch, ms] of SCRIPT) {
        if (id !== run) return;
        st = { ...st, ...patch };
        setS(st);
        await sleep(ms);
      }
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && e.intersectionRatio >= 0.45) {
          if (!playing) {
            playing = true;
            void play();
          }
        } else if (!e.isIntersecting) {
          // Out of sight: stop, and start clean next time it comes back.
          run++;
          playing = false;
          setS(EMPTY);
        }
      },
      { threshold: [0, 0.45] },
    );
    io.observe(el);
    return () => {
      run++;
      io.disconnect();
    };
  }, []);

  const shown = THREAD.slice(0, s.count);
  const lastFrom = shown[shown.length - 1]?.from;
  const lands = formatMoney(convert(40, "EUR", "BRL"), "BRL");

  return (
    <div className={live ? "chat is-live" : "chat"} ref={ref}>
      <div className="chat-head">
        <Avatar person={people.rafa} size={38} />
        <div>
          <p className="chat-name">Rafa</p>
          <p className="chat-status">
            <span className="chat-online" />
            {s.typing ? "typing…" : "São Paulo · online"}
          </p>
        </div>
      </div>

      <div className="chat-body">
        {shown.map((m, i) => {
          const prev = shown[i - 1]?.from;
          const next = i < shown.length - 1 ? shown[i + 1].from : s.typing ? "them" : undefined;
          const cls = [
            "msg",
            m.from === "me" ? "msg-me" : "msg-them",
            prev !== m.from ? "is-first" : "",
            next !== m.from ? "is-last" : "",
          ].join(" ");
          return (
            <div key={m.id} className={cls}>
              {m.pay ? (
                <div className="bubble bubble-pay">
                  <span className="pay-label">↑ sent</span>
                  <span className="pay-amount" suppressHydrationWarning>
                    {formatMoney(40, "EUR")}
                  </span>
                  <span className="pay-note">Saturday 🍝</span>
                  <span className="pay-meta" suppressHydrationWarning>
                    lands as {lands} · 21:04 <span className={s.reacted ? "ticks ticks-read" : "ticks"}>✓✓</span>
                  </span>
                  {s.reacted && <span className="bubble-reaction">❤️</span>}
                </div>
              ) : (
                <div className="bubble">{m.text}</div>
              )}
            </div>
          );
        })}
        {s.typing && (
          <div className={lastFrom === "them" ? "msg msg-them is-last" : "msg msg-them is-first is-last"}>
            <div className="bubble bubble-typing" aria-label="typing">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
      </div>

      <div className="chat-compose">
        <span className="compose-field">Message</span>
        <span className={s.tap ? "compose-z is-tap" : "compose-z"}>
          <ZMark className="compose-z-mark" />
        </span>
      </div>
    </div>
  );
}
