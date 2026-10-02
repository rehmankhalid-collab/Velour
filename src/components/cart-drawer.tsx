"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { FLAVORS, SIZES, money } from "@/lib/catalog";
import { useCart } from "./cart";

export function CartDrawer() {
  const { lines, totalCents, open, setOpen, setQty } = useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  async function checkout() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error ?? "Checkout failed");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed");
      setBusy(false);
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-cocoa/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-label="Your order"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-surface-raised text-ink shadow-[var(--shadow-raised)] transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="text-[28px] font-bold leading-[34px]">Your order</h2>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full px-3 py-1 text-ink-muted hover:text-ink"
            tabIndex={open ? 0 : -1}
          >
            Close
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <p className="italic text-ink-muted">
              Your order is empty. Pick a flavor to begin.
            </p>
          ) : (
            <ul className="divide-y divide-line">
              {lines.map((l) => {
                const f = FLAVORS.find((x) => x.id === l.flavorId)!;
                return (
                  <li key={`${l.flavorId}:${l.size}`} className="flex items-center gap-4 py-4">
                    <div
                      className="relative h-16 w-16 shrink-0"
                      style={{ background: f.panel }}
                    >
                      <Image src={f.cup} alt="" fill sizes="64px" className="object-contain" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold leading-tight">{f.name}</p>
                      <p className="text-[14px] italic leading-5 text-ink-muted">
                        {SIZES[l.size].label} · {money(SIZES[l.size].cents)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        aria-label={`Remove one ${f.name}`}
                        onClick={() => setQty(l.flavorId, l.size, l.qty - 1)}
                        className="h-8 w-8 rounded-full border border-line-strong"
                        tabIndex={open ? 0 : -1}
                      >
                        −
                      </button>
                      <span className="w-5 text-center">{l.qty}</span>
                      <button
                        aria-label={`Add one ${f.name}`}
                        onClick={() => setQty(l.flavorId, l.size, l.qty + 1)}
                        className="h-8 w-8 rounded-full border border-line-strong"
                        tabIndex={open ? 0 : -1}
                      >
                        +
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <footer className="border-t border-line px-6 py-5">
          <div className="mb-1 flex justify-between text-[17px] font-bold">
            <span>Total</span>
            <span>{money(totalCents)}</span>
          </div>
          <p className="mb-4 text-[14px] italic leading-5 text-ink-muted">
            Collect in store. Taxes are added at checkout.
          </p>
          {error && (
            <p role="alert" className="mb-3 text-[14px] leading-5 text-action">
              {error}
            </p>
          )}
          <button
            onClick={checkout}
            disabled={lines.length === 0 || busy}
            tabIndex={open ? 0 : -1}
            className="w-full rounded-full bg-action px-6 py-3 font-bold text-on-action disabled:opacity-50"
          >
            {busy ? "Redirecting…" : "Checkout"}
          </button>
        </footer>
      </aside>
    </div>
  );
}
