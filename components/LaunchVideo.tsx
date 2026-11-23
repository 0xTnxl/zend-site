"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// One player for the whole page. Any <WatchVideo> button opens it.
// Nothing downloads until someone asks: the <video> only gets a src when the dialog opens.

const OPEN_EVENT = "zend:watch-video";

const CUTS = {
  landscape: { src: "/zend-launch-16x9.mp4", poster: "/zend-launch-16x9.jpg" },
  portrait: { src: "/zend-launch-9x16.mp4", poster: "/zend-launch-9x16.jpg" },
} as const;

type Cut = keyof typeof CUTS;

function pickCut(): Cut {
  // Tall screens (phones held upright) get the vertical cut.
  return window.matchMedia("(max-aspect-ratio: 4/5)").matches ? "portrait" : "landscape";
}

export function WatchVideo({ className = "text-link" }: { className?: string }) {
  return (
    <button
      type="button"
      className={`watch ${className}`}
      aria-label="Watch the video"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
    >
      <span className="watch-play" aria-hidden="true">
        <svg viewBox="0 0 12 12">
          <path d="M3.5 2.2 L10 6 L3.5 9.8 Z" />
        </svg>
      </span>
      <span aria-hidden="true">
        Watch<span className="watch-rest"> the video</span>
      </span>
    </button>
  );
}

export function LaunchVideo() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cut, setCut] = useState<Cut | null>(null);

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const open = () => {
      setCut(pickCut());
      dialogRef.current?.showModal();
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  // Start playing once the right cut is mounted.
  useEffect(() => {
    if (cut && dialogRef.current?.open) videoRef.current?.play().catch(() => {});
  }, [cut]);

  return (
    <dialog
      ref={dialogRef}
      className={cut === "portrait" ? "film film-portrait" : "film"}
      aria-label="Zend launch video"
      onClose={() => videoRef.current?.pause()}
      onClick={(e) => {
        // A click on the dark backdrop (the dialog itself, not its contents) closes it.
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="film-frame">
        {cut && (
          <video
            key={cut}
            ref={videoRef}
            className="film-video"
            src={CUTS[cut].src}
            poster={CUTS[cut].poster}
            controls
            playsInline
            preload="auto"
          />
        )}
        <button type="button" className="film-close" onClick={close} aria-label="Close video">
          <svg viewBox="0 0 14 14" aria-hidden="true">
            <path d="M3 3 L11 11 M11 3 L3 11" />
          </svg>
        </button>
      </div>
    </dialog>
  );
}
