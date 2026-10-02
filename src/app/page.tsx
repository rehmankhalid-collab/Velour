import { CartProvider } from "@/components/cart";
import { CartDrawer } from "@/components/cart-drawer";
import { Flavors } from "@/components/flavors";
import { Footer, Story, Visit } from "@/components/footer-sections";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Shop } from "@/components/shop";

export default function Home() {
  return (
    <CartProvider>
      <Header />
      <main>
        <Hero />
        <Flavors />
        <Shop />
        <Story />
        <Visit />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
