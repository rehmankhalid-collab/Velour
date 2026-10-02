"use client";

import { useState } from "react";

export function Newsletter() {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setState("busy");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Could not subscribe.");
      setState("done");
      setMessage("Thank you. You are on the list.");
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Could not subscribe.");
    }
  }

  return (
    <form onSubmit={submit} className="w-full max-w-sm">
      <label htmlFor="newsletter-email" className="block text-[14px] italic">
        News of new flavors and offers
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="min-w-0 flex-1 rounded-full border border-cream bg-transparent px-4 py-2 text-cream placeholder:text-cream/70"
        />
        <button
          disabled={state === "busy"}
          className="rounded-full bg-cream px-5 py-2 font-bold text-cocoa disabled:opacity-60"
        >
          Join
        </button>
      </div>
      {message && (
        <p role="status" className="mt-2 text-[14px]">
          {message}
        </p>
      )}
    </form>
  );
}
