import { Link } from "@tanstack/react-router";
import { site } from "@/lib/site";

const explore = [
  { to: "/services", label: "Vastu services" },
  { to: "/shop", label: "Crystal shop" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About the studio" },
  { to: "/contact", label: "Contact" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-line bg-ivory-deep">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="font-serif text-3xl text-forest">{site.name}</p>
          <p className="mt-4 max-w-sm text-muted">
            Vastu guidance for homes and workspaces, held with the same care as a quiet room. Crystal pieces are
            optional, and everything in the shop is sample data for now.
          </p>
        </div>
        <div className="md:col-span-3">
          <h2 className="text-sm font-medium tracking-wide text-forest">Explore</h2>
          <ul className="mt-4 space-y-2">
            {explore.map((link) => (
              <li key={link.to}>
                <Link to={link.to} search={link.to === "/shop" ? { category: "all" } : undefined} className="text-muted hover:text-forest">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <h2 className="text-sm font-medium tracking-wide text-forest">Visit</h2>
          <p className="mt-4 text-sm text-terracotta-ink">{site.contactNote}</p>
          <ul className="mt-4 space-y-2 text-muted">
            <li>
              <a className="hover:text-forest" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>
              <a className="hover:text-forest" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                {site.phone}
              </a>
            </li>
            <li>{site.location}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-sm text-muted md:flex-row md:justify-between md:px-10">
          <p>© {new Date().getFullYear()} {site.name}. Demonstration website.</p>
          <p>No payments are collected in this version.</p>
        </div>
      </div>
    </footer>
  );
}
