import type { ReactNode } from "react";
import { LuggageTag, NameSticker, PriceTag, SealedEnvelope } from "./Illustrations";
import { Reveal } from "./Reveal";

const PROMISES: { title: string; body: string; art: ReactNode }[] = [
  {
    title: "Works anywhere.",
    body: "No home country and no “international” setting. If you can send them a link, they can get it.",
    art: <LuggageTag />,
  },
  {
    title: "Free between people.",
    body: "Sending to someone on Zend costs nothing, whatever the amount and however far it goes.",
    art: <PriceTag />,
  },
  {
    title: "Sign in with Google.",
    body: "No new password to invent, and no long code to write down and hide in a drawer.",
    art: <NameSticker />,
  },
  {
    title: "Private until you say so.",
    body: "Payments start private. Block or report anyone, any time.",
    art: <SealedEnvelope />,
  },
];

export function Promises() {
  return (
    <section className="promises" aria-labelledby="promises-title">
      <div className="shell">
        <Reveal as="h2" className="section-title promises-title">
          <span id="promises-title">Easy to start. Easy to trust.</span>
        </Reveal>
        <dl className="promise-list">
          {PROMISES.map((p, i) => (
            <Reveal key={p.title} className="promise" delay={i * 70}>
              <div className="promise-art" aria-hidden="true">
                {p.art}
              </div>
              <dt>{p.title}</dt>
              <dd>{p.body}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
