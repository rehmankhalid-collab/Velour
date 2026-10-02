import { NextResponse } from "next/server";

// Forwards the address to NEWSLETTER_WEBHOOK_URL (e.g. a Zapier or Mailchimp
// webhook). Without it, nothing is stored and the form says so.
export async function POST(request: Request) {
  const hook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!hook) {
    return NextResponse.json(
      { error: "Sign-up is not available yet." },
      { status: 503 },
    );
  }
  const { email } = (await request.json().catch(() => ({}))) as { email?: unknown };
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  const res = await fetch(hook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source: "velour-website" }),
  });
  if (!res.ok) {
    return NextResponse.json({ error: "Could not subscribe." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
