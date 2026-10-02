import type { Metadata } from "next";
import { Lora } from "next/font/google";

import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Velour — Premium Soft-Serve",
  description: "Pure indulgence, one scoop at a time.",
  icons: { icon: "/logo/velour-logo-mark-color.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={lora.variable}>
      <body>{children}</body>
    </html>
  );
}
