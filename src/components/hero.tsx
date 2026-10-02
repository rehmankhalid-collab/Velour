import Image from "next/image";

export function Hero() {
  return (
    <section
      id="top"
      className="bg-velour-red text-cream"
      aria-label="Velour"
    >
      <div className="mx-auto grid min-h-[560px] max-w-6xl items-center gap-8 px-6 py-16 md:grid-cols-[1fr_1.9fr]">
        <div>
          <h1 className="text-[64px] font-bold italic leading-none tracking-[0.01em] md:text-[120px]">
            Velour
          </h1>
          <p className="mt-6 text-[22px] italic leading-[1.3] tracking-[0.06em]">
            Pure indulgence, one scoop at a time.
          </p>
          <a
            href="#shop"
            className="mt-8 inline-block rounded-full bg-cream px-8 py-3 text-[17px] font-bold text-cocoa"
          >
            Shop now
          </a>
        </div>
        <Image
          src="/hero/hero-cups.png"
          alt="Four Velour soft-serve cups: vanilla, chocolate, strawberry and pistachio"
          width={1320}
          height={1080}
          priority
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}
