"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { WatchVideo } from "./LaunchVideo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "header header-scrolled" : "header"}>
      <div className="shell header-row">
        <a href="#top" className="brand" aria-label="Zend, back to top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/zend-mark.png" alt="" width={28} height={28} />
          <span>Zend</span>
        </a>
        <nav className="header-nav" aria-label="Main">
          <WatchVideo className="header-link" />
          <a href={site.developersUrl} className="header-link">Build on Zend</a>
          <a href={site.appUrl} className="pill pill-ink pill-sm">
            Open Zend
          </a>
        </nav>
      </div>
    </header>
  );
}
