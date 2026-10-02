"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { FLAVORS } from "@/lib/catalog";

const INTERVAL_MS = 3800;

export function Flavors() {
  const [active, setActive] = useState(0);
  // Widen the panels one by one: chocolate, vanilla, strawberry, pistachio, repeat.
  // The timer restarts after every change, so a click also resumes the loop.
  // (With reduced motion the CSS transitions are off, so panels swap instantly.)
  useEffect(() => {
    const id = window.setTimeout(
      () => setActive((i) => (i + 1) % FLAVORS.length),
      INTERVAL_MS,
    );
    return () => window.clearTimeout(id);
  }, [active]);

  return (
    <section id="flavors" aria-labelledby="flavors-title">
      <div className="mx-auto max-w-6xl px-6 pb-8 pt-24 text-center">
        <h2 id="flavors-title" className="text-[28px] font-bold leading-[34px]">
          Our flavors
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-ink-muted">
          Four signatures, each in its own cup. Slow-churned, deeply creamy and
          finished by hand.
        </p>
      </div>

      <div className="overflow-hidden">
        <div className="flex min-h-[640px] flex-col md:-mx-[4%] md:h-[640px] md:w-[108%] md:flex-row">
          {FLAVORS.map((f, i) => {
            const on = i === active;
            const [first, ...rest] = f.name.split(" ");
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={on}
                aria-label={f.name}
                className="relative cursor-pointer overflow-hidden text-left transition-[flex-grow] duration-[900ms] ease-in-out motion-reduce:transition-none md:origin-center md:-skew-x-[15deg] md:border-l-2 md:border-cream md:first:border-l-0"
                style={{ background: f.panel, flex: `${on ? 2.3 : 1} 1 0%` }}
              >
                <span
                  className={`flex h-full flex-col items-center justify-center gap-6 px-6 py-12 text-center md:px-8 md:skew-x-[15deg] ${f.ink === "cocoa" ? "text-cocoa" : "text-cream"}`}
                >
                  <span
                    className={`block font-bold leading-[0.98] transition-[font-size] duration-[900ms] ease-in-out motion-reduce:transition-none ${on ? "text-[56px] md:text-[88px]" : "text-[34px]"}`}
                  >
                    {first}
                    <br />
                    {rest.join(" ")}
                  </span>
                  <Image
                    src={f.cup}
                    alt=""
                    width={640}
                    height={640}
                    className={`h-auto transition-[width] duration-[900ms] ease-in-out motion-reduce:transition-none drop-shadow-[0_24px_24px_rgba(41,21,11,0.35)] ${on ? "w-[280px] md:w-[360px]" : "w-[200px] md:w-[200px]"}`}
                  />
                  <span className="block max-w-[220px] text-[14px] italic leading-5">
                    {f.garnish}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
