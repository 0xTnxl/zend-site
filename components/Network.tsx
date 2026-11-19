import type { CSSProperties } from "react";
import { people, type Person } from "@/lib/people";
import { site } from "@/lib/site";
import { Avatar } from "./Avatar";
import { Reveal } from "./Reveal";

type Chip = { angle: number; label: string; kind: string; person?: Person; icon?: string };

// Accident and Owambe Rooms are real apps built on Zend. The agents are examples.
const INNER: Chip[] = [
  { angle: 20, label: "@kenji", kind: "Tokyo", person: people.kenji },
  { angle: 140, label: "Accident", kind: "a game", icon: "🎮" },
  { angle: 260, label: "@lea", kind: "Lisbon", person: people.lea },
];
const OUTER: Chip[] = [
  { angle: 70, label: "Tip jar", kind: "an agent", icon: "🤖" },
  { angle: 142, label: "@minji", kind: "Seoul", person: people.minji },
  { angle: 214, label: "Owambe Rooms", kind: "a party", icon: "🪩" },
  { angle: 286, label: "@rafa", kind: "São Paulo", person: people.rafa },
  { angle: 358, label: "Split helper", kind: "an agent", icon: "🧾" },
];

function Ring({ chips, className }: { chips: Chip[]; className: string }) {
  return (
    <div className={`orbit-ring ${className}`}>
      {chips.map((c) => (
        <span key={c.label} className="orbit-chip" style={{ "--a": `${c.angle}deg` } as CSSProperties}>
          <span className="orbit-chip-inner">
            <span className="chip">
              {c.person ? <Avatar person={c.person} size={28} /> : <span className="chip-icon">{c.icon}</span>}
              <span>
                <strong>{c.label}</strong>
                <small>{c.kind}</small>
              </span>
            </span>
          </span>
        </span>
      ))}
    </div>
  );
}

export function Network() {
  return (
    <section className="network" aria-labelledby="network-title">
      <div className="shell network-grid">
        <div>
          <Reveal as="p" className="kicker">The network</Reveal>
          <Reveal as="h2" className="section-title" delay={60}>
            <span id="network-title">People, apps and agents. One network.</span>
          </Reveal>
          <Reveal as="p" className="lede" delay={120}>
            Zend isn&rsquo;t only between people. Games and tools built on Zend can ask, pay and
            run fair draws, and they never see your balance or your friends list. Automated
            accounts you approve can move it for you, within limits.
          </Reveal>
          <Reveal className="network-cta" delay={180}>
            <a href={site.developersUrl} className="text-link">
              Build on Zend <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>

        <div className="orbit" aria-hidden="true">
          <Ring chips={OUTER} className="orbit-ring-2" />
          <Ring chips={INNER} className="orbit-ring-1" />
          <div className="orbit-core">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/zend-mark.png" alt="" width={92} height={92} />
          </div>
        </div>
      </div>
    </section>
  );
}
