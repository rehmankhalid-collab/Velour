import Image from "next/image";

import { Newsletter } from "./newsletter";

export function Story() {
  return (
    <section id="story" aria-labelledby="story-title" className="bg-cup-vanilla text-cocoa">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 id="story-title" className="text-[28px] font-bold leading-[34px]">
          Our story
        </h2>
        <p className="mt-6 text-[22px] italic leading-[1.5]">
          Velour began with a simple idea: soft-serve made slowly, from real
          ingredients, and served unhurried.
        </p>
        <p className="mt-6">
          Vanilla bean, fresh strawberry, crushed pistachio and shaved
          chocolate, swirled tall and handed over in a cup of its own colour.
        </p>
      </div>
    </section>
  );
}

export function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-title">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-3">
        <div>
          <h2 id="visit-title" className="text-[28px] font-bold leading-[34px]">
            Visit
          </h2>
          <p className="mt-3 text-ink-muted">Your address here</p>
        </div>
        <div>
          <h3 className="font-bold">Hours</h3>
          <p className="mt-3 text-ink-muted">Daily, 11:00 – 22:00</p>
        </div>
        <div>
          <h3 className="font-bold">Say hello</h3>
          <p className="mt-3 text-ink-muted">hello@velour.example</p>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-velour-red text-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-6 py-12 md:flex-row md:items-start">
        <div className="text-center md:text-left">
          <Image
            src="/logo/velour-logo-horizontal-light.svg"
            alt="Velour"
            width={977}
            height={450}
            className="-mt-6 mb-3 h-[100px] w-auto"
          />
          <p className="text-[14px] italic">
            Pure indulgence, one scoop at a time.
          </p>
        </div>
        <Newsletter />
      </div>
    </footer>
  );
}
