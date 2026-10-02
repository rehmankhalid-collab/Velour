import { CartProvider } from "@/components/cart";
import { CartDrawer } from "@/components/cart-drawer";
import { Flavors } from "@/components/flavors";
import { Announcement } from "@/components/announcement";
import { Faq, HowItWorks, Reviews, Why } from "@/components/content-sections";
import { Footer, Story, Visit } from "@/components/footer-sections";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Shop } from "@/components/shop";

export default function Home() {
  return (
    <CartProvider>
      <Announcement />
      <Header />
      <main>
        <Hero />
        <Flavors />
        <Shop />
        <Why />
        <Story />
        <Reviews />
        <HowItWorks />
        <Faq />
        <Visit />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
