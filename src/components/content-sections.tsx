const WHY = [
  {
    title: "Real ingredients",
    body: "Vanilla bean, fresh strawberry, crushed pistachio and shaved chocolate. Nothing artificial.",
  },
  {
    title: "Slow-churned",
    body: "Small batches, churned slowly for a dense, velvety texture.",
  },
  {
    title: "Swirled to order",
    body: "Every cup is swirled fresh at the counter and finished by hand.",
  },
  {
    title: "Served unhurried",
    body: "Order ahead, collect when you are ready, and take your time.",
  },
];

export function Why() {
  return (
    <section aria-labelledby="why-title" className="border-y border-line bg-surface-raised">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <h2 id="why-title" className="text-center text-[28px] font-bold leading-[34px]">
          Why Velour
        </h2>
        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w) => (
            <li key={w.title} className="text-center">
              <h3 className="text-[22px] font-bold leading-7">{w.title}</h3>
              <p className="mt-3 text-ink-muted">{w.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// PLACEHOLDER quotes: replace with real customer reviews before launch.
const REVIEWS = [
  { quote: "The creamiest soft-serve I have had. The chocolate is unreal.", who: "Sample customer" },
  { quote: "Real vanilla bean, you can taste it. I order ahead every Friday.", who: "Sample customer" },
  { quote: "Beautiful cups, and the pistachio is quietly perfect.", who: "Sample customer" },
];

export function Reviews() {
  return (
    <section
      aria-labelledby="reviews-title"
      className="bg-flavor-strawberry text-cream"
    >
      <div className="mx-auto max-w-6xl px-6 py-24">
        <h2 id="reviews-title" className="text-center text-[28px] font-bold leading-[34px]">
          Loved by our guests
        </h2>
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <li key={i}>
              <figure className="h-full border-t-2 border-cream pt-6">
                <blockquote className="text-[22px] italic leading-[1.4]">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-4 text-[14px]">{r.who}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center text-[14px] italic">
          Placeholder quotes. Replace with real reviews.
        </p>
      </div>
    </section>
  );
}

const STEPS = [
  { n: "1", title: "Choose", body: "Pick your flavors and sizes in the shop." },
  { n: "2", title: "Pay", body: "Check out securely online." },
  { n: "3", title: "Collect", body: "We swirl it fresh. Pick it up in store." },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <h2 id="how-title" className="text-center text-[28px] font-bold leading-[34px]">
          How ordering works
        </h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="text-center">
              <span
                aria-hidden
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-velour-red text-[22px] font-bold italic text-cream"
              >
                {s.n}
              </span>
              <h3 className="mt-4 text-[22px] font-bold leading-7">{s.title}</h3>
              <p className="mt-2 text-ink-muted">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-center text-[14px] italic text-ink-muted">
          Collection only. We do not deliver.
        </p>
      </div>
    </section>
  );
}

// Answers are placeholders: confirm allergen and dietary details before launch.
const FAQ = [
  {
    q: "When can I collect my order?",
    a: "As soon as it is ready, during opening hours. We swirl everything fresh when you arrive.",
  },
  {
    q: "Do you have vegan or dairy-free options?",
    a: "Please check with us for the current range. Details to be confirmed.",
  },
  {
    q: "What about allergens?",
    a: "Our flavors may contain milk, nuts and traces of other allergens. Ask us before ordering if you have an allergy.",
  },
  {
    q: "Can I change or cancel my order?",
    a: "Contact us as soon as possible and we will do our best to help.",
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line bg-surface-raised">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <h2 id="faq-title" className="text-center text-[28px] font-bold leading-[34px]">
          Questions
        </h2>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                {f.q}
                <span aria-hidden className="text-action transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-ink-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
