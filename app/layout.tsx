import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import CatalogProvider from "@/components/CatalogProvider";
import { getCatalog } from "@/lib/server/catalog";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", weight: ["300","400","500","600","700","800","900"] });

export const metadata: Metadata = {
  title: "SOLEA — Step Into Your Style | Premium Footwear",
  description: "Contemporary footwear designed for everyday movement and aesthetic clarity. Discover the new 2026 collection — engineered in Stockholm.",
  keywords: "SOLEA, premium footwear, shoes, sneakers, contemporary, Stockholm",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const catalog = await getCatalog();
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} ${inter.className} antialiased`}>
        <AuthProvider><CatalogProvider products={catalog}>
        <Header />
        <main>{children}</main>
        <Footer />
        </CatalogProvider></AuthProvider>
      </body>
    </html>
  );
}
