/** The Zend glyph on its own (the Z with its two marks), for watermarks and small badges. */
export function ZMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <g
        transform="translate(7 0) skewX(-7)"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      >
        <path d="M24 22 H78 V35 L42 64 H76 V77 H22 V64 L58 35 H24 Z" />
        <rect x="47" y="8" width="10" height="11" />
        <rect x="42" y="80" width="10" height="11" />
      </g>
    </svg>
  );
}
