import { formatMoney } from "@/lib/money";
import { people } from "@/lib/people";
import { Avatar } from "./Avatar";

// Small illustrations for "Zend works in…". Their resting state is the finished picture;
// animations only play while their row is active, so nothing is hidden without JS.

export function LinkScene() {
  return (
    <div className="v-link">
      <p className="v-link-url">
        app.usezend.app/z/<span className="v-muted">k7Qm…</span>
      </p>
      <p className="v-link-amount" suppressHydrationWarning>
        {formatMoney(25, "USD")} <span className="v-muted">for whoever&rsquo;s first</span>
      </p>
      <div className="v-link-states">
        <p className="v-link-state v-link-waiting">
          <span className="signal-dot" /> Waiting to be collected
        </p>
        <p className="v-link-state v-link-done">
          <Avatar person={people.kenji} size={22} /> Collected by Kenji in Tokyo
        </p>
      </div>
    </div>
  );
}

export function InboxScene() {
  return (
    <div className="v-mail">
      <div className="mail-env">
        <div className="mail-letter">
          <p className="mail-from">
            <Avatar person={people.lea} size={22} /> Léa
          </p>
          <p className="mail-subject" suppressHydrationWarning>
            Léa sent you {formatMoney(20, "EUR")} on Zend
          </p>
          <span className="mail-button">Open Zend</span>
        </div>
        <div className="mail-front" />
      </div>
    </div>
  );
}

export function PaperScene() {
  return (
    <div className="v-paper">
      <div className="paper">
        <span className="paper-tape" />
        <p className="paper-line">for whoever finds this ♡</p>
        <p className="paper-code">7KQ·M3TX·9PZR·WD4H</p>
        <p className="paper-small" suppressHydrationWarning>
          {formatMoney(10, "GBP")} · app.usezend.app/cash
        </p>
      </div>
    </div>
  );
}

const PIPS: Record<number, number[]> = { 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] };

function Die({ value, className }: { value: 5 | 6; className: string }) {
  return (
    <span className={`die ${className}`}>
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} className={PIPS[value].includes(i) ? "pip pip-on" : "pip"} />
      ))}
    </span>
  );
}

export function GameScene() {
  return (
    <div className="v-game">
      <div className="dice">
        <Die value={5} className="die-a" />
        <Die value={6} className="die-b" />
      </div>
      <p className="game-result">
        <Avatar person={people.asha} size={26} />
        <span>
          <strong>Asha</strong> rolled 11 and took the prize
        </span>
      </p>
      <p className="game-check">
        <span className="game-tick">✓</span> Result checked
      </p>
    </div>
  );
}

const STARS = [
  [22, 30, 0], [58, 14, 1.2], [200, 26, 0.4], [222, 74, 2], [16, 96, 1.6],
  [36, 200, 0.8], [214, 188, 1.1], [190, 226, 2.4], [96, 18, 2.8], [8, 160, 0.2],
];

export function MoonScene() {
  return (
    <div className="v-moon">
      <svg viewBox="0 0 240 240" className="moon-svg">
        <defs>
          <radialGradient id="moon-shade" cx="36%" cy="34%" r="72%">
            <stop offset="0%" stopColor="#FCFBF7" />
            <stop offset="68%" stopColor="#E6E2D7" />
            <stop offset="100%" stopColor="#CBC6B8" />
          </radialGradient>
        </defs>
        {STARS.map(([x, y, d], k) => (
          <circle key={k} cx={x} cy={y} r={k % 3 === 0 ? 1.8 : 1.2} className="star" style={{ animationDelay: `${d}s` }} />
        ))}
        <g className="moon-body">
          <circle cx="120" cy="132" r="86" fill="url(#moon-shade)" />
          <circle cx="92" cy="112" r="15" className="crater" />
          <circle cx="146" cy="156" r="11" className="crater" />
          <circle cx="104" cy="176" r="7" className="crater" />
          <circle cx="164" cy="118" r="6" className="crater" />
          <circle cx="70" cy="150" r="5" className="crater" />
          <line x1="150" y1="8" x2="150" y2="52" stroke="#0F0F0E" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M151.5 10 h32 l-7 10 l7 10 h-32 z" fill="#052F26" className="flag" />
          <text x="164" y="25" fill="#F7F6F3" fontSize="13" fontWeight="800" fontFamily="inherit">
            Z
          </text>
        </g>
      </svg>
      <p className="moon-caption" suppressHydrationWarning>
        <Avatar person={people.yuri} size={24} />
        <span>
          <strong>Yuri</strong> collected {formatMoney(25, "USD")} · 384,400 km away
        </span>
      </p>
    </div>
  );
}
