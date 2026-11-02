import { Link } from "@tanstack/react-router";
import { site } from "@/lib/site";

const explore = [
  { to: "/services", label: "Vastu services" },
  { to: "/shop", label: "Crystal shop" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About the studio" },
  { to: "/contact", label: "Contact" },
] as const;

const ticker = ["Home Vastu", "Office Vastu", "Factory Vastu", "Crystal studio", "A quieter room"];

export function Footer() {
  return (
    <footer className="site-foot">
      <div className="site-foot-glow" aria-hidden="true" />
      <div className="site-foot-line" aria-hidden="true" />
      <div className="site-foot-marquee" aria-hidden="true">
        <div>
          {[...ticker, ...ticker].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>
      <div className="site-foot-grid">
        <div>
          <p className="site-foot-mark">P</p>
          <p className="site-foot-name">{site.name}</p>
          <p className="site-foot-copy">
            Guidance for the rooms you live and work in. The shop on this site is still a demonstration.
          </p>
        </div>
        <div>
          <h2>Explore</h2>
          <ul>
            {explore.map((link) => (
              <li key={link.to}>
                <Link to={link.to} search={link.to === "/shop" ? { category: "all" } : undefined}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Visit</h2>
          <p className="site-foot-note">{site.contactNote}</p>
          <ul>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
            </li>
            <li>{site.location}</li>
          </ul>
        </div>
        <div>
          <h2>Policies</h2>
          <ul>
            <li>
              <Link to="/privacy">Privacy</Link>
            </li>
            <li>
              <Link to="/terms">Terms</Link>
            </li>
            <li>
              <Link to="/contact">Write to the studio</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="site-foot-base">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p>Demonstration website · no payment is taken</p>
      </div>
    </footer>
  );
}
