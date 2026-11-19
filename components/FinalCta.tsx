import { site } from "@/lib/site";
import { PaperPlaneTrail } from "./Illustrations";
import { Reveal } from "./Reveal";
import { ZMark } from "./ZMark";

export function FinalCta() {
  return (
    <section className="final" aria-labelledby="final-title">
      <ZMark className="final-watermark" />
      <PaperPlaneTrail />
      <div className="shell final-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="final-mark" src="/zend-mark.png" alt="" width={72} height={72} />
        <Reveal as="h2" className="final-title">
          <span id="final-title">Go make someone&rsquo;s day.</span>
        </Reveal>
        <Reveal as="p" className="final-lede" delay={80}>
          Down the street or on the Moon. It takes a name, an amount and one tap.
        </Reveal>
        <Reveal className="final-actions" delay={140}>
          <a href={site.appUrl} className="pill pill-light">
            Open Zend
          </a>
          {site.playStoreUrl && (
            <a href={site.playStoreUrl} className="pill pill-ghost">
              Get it on Google Play
            </a>
          )}
          {site.appStoreUrl && (
            <a href={site.appStoreUrl} className="pill pill-ghost">
              Download on the App Store
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}
