import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { getProduct } from "@/data/products";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-store";
import { subtotalInr } from "@/lib/cart-math";
import { cn } from "@/lib/cn";
import { formatInr } from "@/lib/format";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/checkout")({
  head: () =>
    pageHead(
      "Demo checkout",
      "A demonstration of shipping and payment screens. Razorpay, Cashfree, and Shiprocket are not connected. Nothing is charged.",
      "/checkout",
    ),
  component: CheckoutPage,
});

type Step = "ship" | "pay" | "done";
type Method = "upi" | "card" | "netbanking";

const couriers = [
  { id: "surface", name: "Surface courier", eta: "5–7 days", fee: 90 },
  { id: "express", name: "Express courier", eta: "2–3 days", fee: 180 },
];

function CheckoutPage() {
  const items = useCart((state) => state.items);
  const clear = useCart((state) => state.clear);
  const [step, setStep] = useState<Step>("ship");
  const [pin, setPin] = useState("110001");
  const [courier, setCourier] = useState(couriers[0].id);
  const [method, setMethod] = useState<Method>("upi");
  const lines = items.flatMap((item) => {
    const product = getProduct(item.slug);
    return product ? [{ item, product }] : [];
  });
  const subtotal = subtotalInr(lines.map(({ item, product }) => ({ priceInr: product.priceInr, qty: item.qty })));
  const pinOk = /^[1-9][0-9]{5}$/.test(pin);
  const fee = couriers.find((item) => item.id === courier)?.fee ?? 0;
  const total = subtotal + (pinOk ? fee : 0);
  const preview = useMemo(() => (pinOk ? `Demo: ${pin} looks serviceable. Shiprocket was not asked.` : ""), [pin, pinOk]);

  return (
    <main className="mx-auto max-w-3xl px-5 py-12 md:px-10 md:py-16">
      <p className="text-sm font-medium text-terracotta-ink">
        Demo checkout — Razorpay, Cashfree, and Shiprocket are not connected. Nothing is charged.
      </p>
      <h1 className="mt-3 font-serif text-4xl text-forest md:text-5xl">Review the sample selection.</h1>
      <ol className="mt-6 flex gap-3 text-sm">
        <li className={step === "ship" ? "font-medium text-peacock" : "text-muted"}>1. Shipping</li>
        <li className={step === "pay" ? "font-medium text-peacock" : "text-muted"}>2. Payment screen</li>
        <li className={step === "done" ? "font-medium text-peacock" : "text-muted"}>3. Result</li>
      </ol>

      {lines.length === 0 ? (
        <div className="mt-12 rounded-lg border border-line bg-paper p-8">
          <p className="text-forest">There is nothing to review.</p>
          <Link to="/shop" search={{ category: "all" }} className={cn(buttonVariants(), "mt-6")}>
            Return to the shop
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {lines.map(({ item, product }) => (
              <li key={item.slug} className="flex items-baseline justify-between gap-4 py-4">
                <span>
                  <span className="text-forest">{product.name}</span>
                  <span className="text-muted"> × {item.qty}</span>
                </span>
                <span className="tabular-nums text-forest">{formatInr(product.priceInr * item.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-baseline justify-between">
            <span className="text-muted">Sample subtotal</span>
            <span className="font-serif text-3xl text-forest tabular-nums">{formatInr(subtotal)}</span>
          </div>

          {step !== "done" ? (
            <section className="mt-8 rounded-lg border border-gold/40 bg-marigold-soft/60 p-6">
              <h2 className="font-serif text-2xl text-forest">Shipping preview</h2>
              <p className="mt-2 text-sm text-muted">
                This imitates a Shiprocket rate check. No courier is booked, and no address is stored.
              </p>
              <label className="mt-5 block text-sm font-medium text-forest" htmlFor="pin">
                Indian pincode
              </label>
              <input
                id="pin"
                inputMode="numeric"
                maxLength={6}
                value={pin}
                onChange={(event) => setPin(event.target.value.replace(/\D/g, "").slice(0, 6))}
                className="mt-2 w-full rounded-md border border-line bg-paper px-3 py-3 text-forest"
                placeholder="110001"
              />
              {pin.length === 6 && !pinOk ? (
                <p className="mt-2 text-sm text-terracotta-ink">Enter a 6-digit pincode that does not start with 0.</p>
              ) : null}
              {pinOk ? <p className="mt-2 text-sm text-peacock">{preview}</p> : null}
              <fieldset className="mt-5 space-y-2" disabled={!pinOk}>
                <legend className="text-sm font-medium text-forest">Demo courier</legend>
                {couriers.map((option) => (
                  <label key={option.id} className="mt-2 flex items-center justify-between gap-3 rounded-md bg-paper px-3 py-3">
                    <span className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="courier"
                        checked={courier === option.id}
                        onChange={() => setCourier(option.id)}
                      />
                      <span>
                        {option.name}
                        <span className="block text-sm text-muted">{option.eta}</span>
                      </span>
                    </span>
                    <span className="tabular-nums text-forest">{formatInr(option.fee)}</span>
                  </label>
                ))}
              </fieldset>
              {pinOk ? (
                <p className="mt-4 text-forest">
                  Sample total with shipping <span className="font-serif text-2xl tabular-nums">{formatInr(total)}</span>
                </p>
              ) : null}
              <Button className="mt-6" disabled={!pinOk} onClick={() => setStep("pay")}>
                Open demo payment screen
              </Button>
            </section>
          ) : null}

          {step === "pay" || step === "ship" ? null : null}

          {step === "pay" ? (
            <section className="mt-8 overflow-hidden rounded-lg border border-peacock/30 bg-paper shadow-soft">
              <div className="bg-peacock px-6 py-4 text-ivory">
                <p className="text-xs tracking-widest uppercase">Demo payment screen</p>
                <p className="mt-1 font-serif text-2xl">Stand-in for Razorpay or Cashfree</p>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted">
                  Do not type a real card, UPI PIN, or bank password. These controls stay on this page and are not sent.
                </p>
                <p className="mt-4 font-serif text-3xl text-forest tabular-nums">{formatInr(total)}</p>
                <div className="mt-5 grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label="Demo payment method">
                  {(
                    [
                      ["upi", "UPI"],
                      ["card", "Card"],
                      ["netbanking", "Netbanking"],
                    ] as const
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      role="radio"
                      aria-checked={method === id}
                      onClick={() => setMethod(id)}
                      className={cn(
                        "rounded-md px-3 py-3 text-sm",
                        method === id ? "bg-lotus text-ivory" : "bg-peacock-soft text-forest",
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {method === "upi" ? (
                  <div className="mt-5 rounded-md bg-lotus-soft p-4">
                    <p className="text-sm font-medium text-forest">Sample UPI panel</p>
                    <div
                      className="mt-3 grid size-28 grid-cols-5 gap-1 bg-paper p-2"
                      aria-hidden="true"
                    >
                      {Array.from({ length: 25 }, (_, index) => (
                        <span key={index} className={index % 3 === 0 ? "bg-forest" : "bg-gold/70"} />
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-muted">Not a scannable code. Paying here does nothing.</p>
                  </div>
                ) : null}
                {method === "card" ? (
                  <div className="mt-5 rounded-md bg-marigold-soft p-4 text-sm text-forest">
                    Demo card shown as •••• 4242. The number is an example only and is not collected.
                  </div>
                ) : null}
                {method === "netbanking" ? (
                  <p className="mt-5 text-sm text-muted">A bank list would appear here on a real gateway. None is loaded.</p>
                ) : null}
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button onClick={() => setStep("done")}>Simulate demo payment</Button>
                  <Button variant="secondary" onClick={() => setStep("ship")}>
                    Back to shipping
                  </Button>
                </div>
              </div>
            </section>
          ) : null}

          {step === "done" ? (
            <div className="mt-8 rounded-lg bg-sage-soft p-6" role="status">
              <h2 className="font-serif text-2xl text-forest">Nothing was paid. Nothing was shipped.</h2>
              <p className="mt-3 text-muted">
                The payment screen closed on purpose. Razorpay and Cashfree were not contacted, and Shiprocket did not
                create a shipment. A real checkout would create the order on the server and confirm payment there
                before treating it as paid.
              </p>
              <Button
                className="mt-6"
                variant="secondary"
                onClick={() => {
                  clear();
                  setStep("ship");
                  setPin("");
                }}
              >
                Clear the demo cart
              </Button>
            </div>
          ) : null}
        </>
      )}
    </main>
  );
}
