"use client";

import Image from "next/image";

import { useCart } from "./cart";

const LINKS = [
  { href: "#flavors", label: "Flavors" },
  { href: "#shop", label: "Shop" },
  { href: "#story", label: "Story" },
  { href: "#faq", label: "FAQ" },
  { href: "#visit", label: "Visit" },
];

export function Header() {
  const { count, setOpen } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
        <a href="#top" aria-label="Velour home">
          <Image
            src="/logo/velour-logo-horizontal-color.svg"
            alt="Velour"
            width={977}
            height={450}
            className="-my-3 h-[84px] w-auto dark:hidden"
            priority
          />
          <Image
            src="/logo/velour-logo-horizontal-ondark.svg"
            alt=""
            width={977}
            height={450}
            className="hidden -my-3 h-[84px] w-auto dark:block"
            priority
          />
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Sections">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-action">
              {l.label}
            </a>
          ))}
        </nav>
        <button
          onClick={() => setOpen(true)}
          className="rounded-full bg-action px-5 py-2 font-bold text-on-action"
        >
          Order{count > 0 ? ` (${count})` : ""}
        </button>
      </div>
    </header>
  );
}
