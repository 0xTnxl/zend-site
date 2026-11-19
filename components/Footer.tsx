import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-row">
        <p className="footer-brand">
          Zend <span className="v-muted">· works anywhere</span>
        </p>
        <nav className="footer-nav" aria-label="Footer">
          <a href={site.appUrl}>Open Zend</a>
          <a href={site.developersUrl}>Build on Zend</a>
        </nav>
        <p className="footer-legal">© {new Date().getFullYear()} Zend</p>
      </div>
    </footer>
  );
}
