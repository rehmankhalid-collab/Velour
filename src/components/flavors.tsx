import Image from "next/image";

import { FLAVORS } from "@/lib/catalog";

export function Flavors() {
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
        <div className="flex min-h-[640px] flex-col md:-mx-[4%] md:w-[108%] md:flex-row">
          {FLAVORS.map((f, i) => {
            const featured = i === 0;
            const [first, ...rest] = f.name.split(" ");
            return (
              <div
                key={f.id}
                className={`relative md:origin-center md:-skew-x-[15deg] md:border-l-2 md:border-cream md:first:border-l-0 ${featured ? "md:flex-[1.7]" : "md:flex-1"}`}
                style={{ background: f.panel }}
              >
                <div
                  className={`flex h-full flex-col items-center justify-center gap-6 px-6 py-12 text-center md:px-12 md:skew-x-[15deg] ${f.ink === "cocoa" ? "text-cocoa" : "text-cream"}`}
                >
                  {featured ? (
                    <h3 className="text-[56px] font-bold leading-[0.98] md:text-[88px]">
                      {first}
                      <br />
                      {rest.join(" ")}
                    </h3>
                  ) : (
                    <h3 className="text-[34px] font-bold leading-none">{f.name}</h3>
                  )}
                  <Image
                    src={f.cup}
                    alt={`${f.name} cup`}
                    width={640}
                    height={640}
                    className={`h-auto drop-shadow-[0_24px_24px_rgba(41,21,11,0.35)] ${featured ? "w-[280px] md:w-[360px]" : "w-[200px] md:w-[210px]"}`}
                  />
                  <p className="max-w-[220px] text-[14px] italic leading-5">{f.garnish}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
