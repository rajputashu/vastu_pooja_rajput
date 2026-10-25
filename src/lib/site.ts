/** Edit this file to rename the studio, swap contact placeholders, or set the real domain. */
export const site = {
  name: "Pooja Rajput Vastu",
  shortName: "Pooja Rajput",
  description:
    "Vastu guidance for homes, offices, and factories, with a small studio of crystal specimens. A demonstration website — contact details and catalogue are placeholders.",
  url: "https://poojarajputvastu.example",
  email: "hello@poojarajputvastu.example",
  phone: "+91 00000 00000",
  location: "City, India — edit this address",
  contactNote: "Placeholder contact details. Replace them before you share this site.",
};

export function pageHead(title: string, description: string, path: string) {
  const pageTitle = path === "/" ? title : `${title} — ${site.name}`;
  return {
    meta: [
      { title: pageTitle },
      { name: "description", content: description },
    ],
    links: [{ rel: "canonical", href: `${site.url}${path}` }],
  };
}

export function apiUrl(path: string) {
  const base = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");
  return `${base}${path}`;
}
