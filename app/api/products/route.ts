import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");

  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (featured === "true") {
    filteredProducts = filteredProducts.filter((p) => p.featured);
  }

  return NextResponse.json(filteredProducts);
}
