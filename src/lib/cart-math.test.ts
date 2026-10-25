import assert from "node:assert/strict";
import test from "node:test";
import { sanitizeCartItems, subtotalInr } from "./cart-math.ts";

const known = (slug: string) => slug === "amethyst-cluster" || slug === "citrine";
const maxFor = (slug: string) => (slug === "citrine" ? 2 : 5);

test("drops invalid stored cart data", () => {
  const lines = sanitizeCartItems(
    [
      null,
      { slug: "missing", qty: 1 },
      { slug: "amethyst-cluster", qty: 0 },
      { slug: "amethyst-cluster", qty: 2.5 },
      { slug: "amethyst-cluster", qty: 9 },
      { slug: "citrine", qty: 1 },
      { slug: "citrine", qty: 4 },
      "nope",
    ],
    known,
    maxFor,
  );
  assert.deepEqual(lines, [
    { slug: "amethyst-cluster", qty: 5 },
    { slug: "citrine", qty: 2 },
  ]);
});

test("non-arrays become an empty cart", () => {
  assert.deepEqual(sanitizeCartItems({ items: [] }, known, maxFor), []);
  assert.deepEqual(sanitizeCartItems("amethyst", known, maxFor), []);
});

test("subtotal multiplies sample prices", () => {
  assert.equal(
    subtotalInr([
      { priceInr: 2400, qty: 2 },
      { priceInr: 1800, qty: 1 },
    ]),
    6600,
  );
  assert.equal(subtotalInr([]), 0);
});
