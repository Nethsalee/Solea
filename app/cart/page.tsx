import ShoppingCart from "@/components/ShoppingCart";

export const metadata = {
  title: "Shopping Bag | SOLEA",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return <ShoppingCart />;
}
