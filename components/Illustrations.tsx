import { formatMoney } from "@/lib/money";

// Drawn objects for the sections that are otherwise only type. Same family as the scenes:
// real things (a statement, a map, tags, an envelope), flat warm colours, soft shadows.
// Everything is visible in its resting state; motion only adds to it.

// ── Statement: what the bank kept of the moment ────────────────────────────────────

const ROWS: [string, string, string][] = [
  ["02 MAR", "POS 7781 SUPERMKT", "-23.10"],
  ["03 MAR", "TRF IN REF 88213", "+40.00"],
  ["03 MAR", "SMS ALERT CHG", "-0.25"],
  ["04 MAR", "TRF 00502/WEB", "-15.00"],
  ["05 MAR", "TRF 00417/INTL/LDN", "-50.00"],
];
const MARKED = ROWS.length - 1;

export function BankStatement() {
  return (
    <div className="receipt-wrap" aria-hidden="true">
      <div className="receipt">
        <p className="receipt-head">ACCOUNT STATEMENT</p>
        <p className="receipt-sub">Page 3 of 7</p>
        <div className="receipt-rows">
          {ROWS.map(([date, ref, amt], i) => (
            <p key={ref} className={i === MARKED ? "receipt-row is-marked" : "receipt-row"}>
              <span>{date}</span>
              <span className="receipt-ref">{ref}</span>
              <span>{amt}</span>
              {i === MARKED && (
                <svg className="scribble" viewBox="0 0 300 40" preserveAspectRatio="none">
                  <path
                    d="M14 22 C 20 4, 270 2, 290 16 C 302 30, 210 38, 120 37 C 50 36, 2 32, 10 16"
                    pathLength={1}
                  />
                </svg>
              )}
            </p>
          ))}
        </div>
      </div>
      <div className="receipt-sticky">
        that one was Mum&rsquo;s birthday 🎂
        <svg className="sticky-arrow" viewBox="0 0 60 40">
          <path d="M4 34 C 20 30, 40 22, 52 6" />
          <path d="M42 8 L52 6 L50 16" />
        </svg>
      </div>
    </div>
  );
}

// ── Borders are for maps: a folded paper map, and a route that ignores the lines ──

const ROUTE = "M62 138 C110 70 170 210 205 160 S300 70 330 110 S378 52 386 26";

export function FoldedMap() {
  return (
    <div className="map" aria-hidden="true">
      <svg viewBox="0 0 400 262" className="map-svg">
        <polygon points="0,50 120,40 120,250 0,260" fill="#f6f1e4" />
        <polygon points="120,40 240,50 240,260 120,250" fill="#ebe4d2" />
        <polygon points="240,50 360,40 360,250 240,260" fill="#f3ede0" />
        <path d="M30 110 C40 80 90 80 105 105 C120 130 95 160 70 170 C45 180 20 140 30 110Z" className="land" />
        <path d="M150 140 C165 110 215 115 225 145 C235 175 205 205 175 200 C150 196 140 165 150 140Z" className="land" />
        <path d="M265 105 C280 80 330 85 340 110 C350 135 330 160 300 158 C275 156 255 130 265 105Z" className="land" />
        <path d="M60 85 C70 120 55 150 75 175" className="map-border" />
        <path d="M180 115 C195 145 175 170 200 202" className="map-border" />
        <path d="M300 82 C292 110 315 130 305 160" className="map-border" />
        <path d="M0 200 C60 190 90 215 150 205 S260 180 360 196" className="map-border" />

        <path id="map-route" d={ROUTE} className="map-route" />

        {[
          [62, 138, "Lisbon"],
          [205, 160, "Lagos"],
          [330, 110, "Tokyo"],
        ].map(([x, y, name]) => (
          <g key={name as string} transform={`translate(${x} ${y})`}>
            <circle r="9" className="pin-halo" />
            <circle r="4.5" className="pin" />
            <text x="0" y="22" className="map-label">
              {name}
            </text>
          </g>
        ))}

        <g transform="translate(386 22)">
          <circle r="14" fill="#efebe0" stroke="#d8d2c2" />
          <circle cx="-4" cy="-3" r="3" fill="rgba(15,15,14,0.08)" />
          <circle cx="5" cy="5" r="2" fill="rgba(15,15,14,0.08)" />
        </g>

        <g className="plane-fly">
          <path d="M-12 -8 L14 0 L-12 8 L-7 0 Z" fill="#0F0F0E" />
          <animateMotion dur="7s" repeatCount="indefinite" rotate="auto">
            <mpath href="#map-route" />
          </animateMotion>
        </g>
      </svg>
      <p className="map-caption">The lines are still on the map. Zend just doesn&rsquo;t stop at them.</p>
    </div>
  );
}

// ── Promises: one small object each ─────────────────────────────────────────────

export function LuggageTag() {
  return (
    <svg viewBox="0 0 150 100" className="obj-svg">
      <path d="M8 26 C 28 6, 40 38, 54 52" className="obj-string" />
      <path
        d="M52 34 L128 24 Q137 23 138 32 L143 74 Q144 83 135 84 L60 92 L44 72 L42 50 Z"
        fill="#F3D46A"
      />
      <circle cx="54" cy="61" r="4.5" fill="#F2F1ED" stroke="#C9AE43" />
      <text x="96" y="64" className="obj-text" transform="rotate(-6 96 64)">
        ANYWHERE
      </text>
    </svg>
  );
}

export function PriceTag() {
  return (
    <svg viewBox="0 0 150 100" className="obj-svg">
      <g transform="rotate(-8 75 55)">
        <path d="M30 30 L104 30 L130 56 L104 82 L30 82 Q22 82 22 74 L22 38 Q22 30 30 30Z" fill="#FFFEFC" stroke="#E2E0DA" />
        <circle cx="110" cy="56" r="4.5" fill="#F2F1ED" stroke="#C9C6BE" />
        <text x="64" y="64" className="obj-price" suppressHydrationWarning>
          {formatMoney(0, "USD")}
        </text>
      </g>
      <path d="M118 52 C 134 30, 128 14, 146 8" className="obj-string" />
    </svg>
  );
}

export function NameSticker() {
  return (
    <svg viewBox="0 0 150 100" className="obj-svg">
      <g transform="rotate(-5 75 50)">
        <rect x="14" y="12" width="122" height="80" rx="10" fill="#FFFEFC" />
        <path d="M14 22 Q14 12 24 12 H126 Q136 12 136 22 V38 H14 Z" fill="#052F26" />
        <text x="75" y="28" className="obj-hello">
          HELLO
        </text>
        <text x="75" y="35.5" className="obj-small">
          my name is
        </text>
        <text x="75" y="72" className="obj-hand">
          @you
        </text>
      </g>
    </svg>
  );
}

export function SealedEnvelope() {
  return (
    <svg viewBox="0 0 150 100" className="obj-svg">
      <g transform="rotate(4 75 55)">
        <rect x="18" y="22" width="114" height="70" rx="6" fill="#E6DECB" />
        <path d="M18 28 L75 66 L132 28" fill="#EFE8D6" stroke="#DDD4BF" />
        <circle cx="75" cy="64" r="16" fill="#052F26" />
        <circle cx="75" cy="64" r="11.5" fill="none" stroke="rgba(247,246,243,0.35)" />
        <text x="75" y="70" className="obj-seal">
          Z
        </text>
      </g>
    </svg>
  );
}

// ── Final: a paper plane looping over the green ─────────────────────────────────

// Stays in the left gutter and above the logo so it never crosses the headline.
const FLIGHT =
  "M-60 880 C 120 800, 170 600, 200 470 C 230 350, 110 300, 100 390 C 90 480, 260 470, 280 320 C 300 170, 600 50, 900 62 S 1300 150, 1480 50";

export function PaperPlaneTrail() {
  return (
    <svg className="flight" viewBox="0 0 1400 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <path id="flight-path" d={FLIGHT} className="flight-trail" />
      <g className="plane-fly">
        <path d="M-22 -14 L26 0 L-22 14 L-12 0 Z" fill="#F7F6F3" />
        <path d="M-12 0 L26 0" stroke="#052F26" strokeWidth="1.5" />
        <animateMotion dur="14s" repeatCount="indefinite" rotate="auto">
          <mpath href="#flight-path" />
        </animateMotion>
      </g>
    </svg>
  );
}
