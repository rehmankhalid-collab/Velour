import { NextResponse } from "next/server";

import { FLAVORS, SIZES, priceOf, type Size } from "@/lib/catalog";

type Body = { lines?: { flavorId: string; size: Size; qty: number }[] };

export async function POST(request: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Online checkout is not configured yet." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as Body;
  const lines = Array.isArray(body.lines) ? body.lines : [];
  if (lines.length === 0 || lines.length > 20) {
    return NextResponse.json({ error: "Your order is empty." }, { status: 400 });
  }

  // Prices always come from the server-side catalogue, never from the client.
  const form = new URLSearchParams();
  form.set("mode", "payment");
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;
  form.set("success_url", `${origin}/?order=success#shop`);
  form.set("cancel_url", `${origin}/#shop`);

  for (const [i, l] of lines.entries()) {
    const cents = priceOf(l.flavorId, l.size);
    const qty = Math.floor(Number(l.qty));
    if (cents === null || !(qty >= 1 && qty <= 50)) {
      return NextResponse.json({ error: "Invalid item." }, { status: 400 });
    }
    const flavor = FLAVORS.find((f) => f.id === l.flavorId)!;
    const p = `line_items[${i}]`;
    form.set(`${p}[quantity]`, String(qty));
    form.set(`${p}[price_data][currency]`, "usd");
    form.set(`${p}[price_data][unit_amount]`, String(cents));
    form.set(
      `${p}[price_data][product_data][name]`,
      `${flavor.name} — ${SIZES[l.size].label}`,
    );
  }

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form,
  });
  const session = (await res.json()) as { url?: string };
  if (!res.ok || !session.url) {
    return NextResponse.json({ error: "Could not start checkout." }, { status: 502 });
  }
  return NextResponse.json({ url: session.url });
}
