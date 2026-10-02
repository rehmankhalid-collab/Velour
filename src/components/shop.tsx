"use client";

import Image from "next/image";
import { useState } from "react";

import { FLAVORS, SIZES, money, type Size } from "@/lib/catalog";
import { useCart } from "./cart";

function Card({ id }: { id: string }) {
  const f = FLAVORS.find((x) => x.id === id)!;
  const { add } = useCart();
  const [size, setSize] = useState<Size>("regular");

  return (
    <article className="flex flex-col overflow-hidden rounded-[12px] border border-line bg-surface-raised">
      <div
        className="flex items-center justify-center py-6"
        style={{ background: f.panel }}
      >
        <Image
          src={f.cup}
          alt={`${f.name} cup`}
          width={400}
          height={400}
          className="h-auto w-[170px] drop-shadow-[0_24px_24px_rgba(41,21,11,0.35)]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-[22px] font-bold leading-7">{f.name}</h3>
        <p className="flex-1 text-ink-muted">{f.note}</p>
        <div role="group" aria-label={`${f.name} size`} className="flex gap-2">
          {(Object.keys(SIZES) as Size[]).map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              aria-pressed={size === s}
              className={`rounded-full border px-4 py-1 text-[14px] ${size === s ? "border-action bg-action text-on-action" : "border-line-strong"}`}
            >
              {SIZES[s].label}
            </button>
          ))}
        </div>
        <button
          onClick={() => add(f.id, size)}
          className="mt-1 rounded-full bg-action px-6 py-3 font-bold text-on-action"
        >
          Add · {money(SIZES[size].cents)}
        </button>
      </div>
    </article>
  );
}

export function Shop() {
  return (
    <section id="shop" aria-labelledby="shop-title" className="bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <h2 id="shop-title" className="text-[28px] font-bold leading-[34px]">
          Shop now
        </h2>
        <p className="mt-3 max-w-xl text-ink-muted">
          Order ahead and collect in store, freshly swirled.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FLAVORS.map((f) => (
            <Card key={f.id} id={f.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
