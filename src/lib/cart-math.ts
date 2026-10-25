export type CartLine = { slug: string; qty: number };

export function sanitizeCartItems(
  input: unknown,
  isKnown: (slug: string) => boolean,
  maxFor: (slug: string) => number,
): CartLine[] {
  if (!Array.isArray(input)) return [];
  const out: CartLine[] = [];
  for (const item of input) {
    if (!item || typeof item !== "object") continue;
    const slug = (item as { slug?: unknown }).slug;
    const qty = (item as { qty?: unknown }).qty;
    if (typeof slug !== "string" || !isKnown(slug)) continue;
    if (typeof qty !== "number" || !Number.isInteger(qty) || qty < 1) continue;
    const max = maxFor(slug);
    if (max < 1) continue;
    const bounded = Math.min(max, qty);
    const existing = out.find((line) => line.slug === slug);
    if (existing) existing.qty = Math.min(max, existing.qty + bounded);
    else out.push({ slug, qty: bounded });
  }
  return out;
}

export function subtotalInr(lines: { priceInr: number; qty: number }[]) {
  return lines.reduce((sum, line) => sum + line.priceInr * line.qty, 0);
}
