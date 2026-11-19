import { Borderless } from "@/components/Borderless";
import { Feed } from "@/components/Feed";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Network } from "@/components/Network";
import { Promises } from "@/components/Promises";
import { Ribbons } from "@/components/Ribbons";
import { Statement } from "@/components/Statement";
import { WorksIn } from "@/components/WorksIn";
import { ZendNote } from "@/components/ZendNote";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-glow" aria-hidden="true" />
          <div className="shell hero-grid">
            <div className="hero-copy">
              <h1 id="hero-title" className="hero-title">
                <span className="hero-line">Cash that works</span>
                <span className="hero-line hero-line-soft">
                  <span className="hero-any">
                    anywhere.
                    <svg className="swoosh" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                      <path d="M4 18 C 70 6, 190 2, 296 12" pathLength={1} />
                    </svg>
                  </span>
                </span>
              </h1>
              <p className="hero-lede">
                Social, borderless and as easy as a text. Hand it to a name, drop it in a chat or
                leave it as a link. It lands in their currency, wherever they are.
              </p>
              <div className="hero-actions">
                <a href={site.appUrl} className="pill pill-ink">
                  Open Zend
                </a>
                <a href="#anywhere" className="text-link">
                  Where it works <span aria-hidden="true">↓</span>
                </a>
              </div>
              <p className="hero-note">Free between people. Sign in with Google.</p>
            </div>
            <div className="hero-visual">
              <ZendNote />
            </div>
          </div>
        </section>

        <Ribbons />
        <Statement />
        <WorksIn />
        <Feed />
        <Borderless />
        <Network />
        <Promises />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
