import assert from "node:assert/strict";
import test from "node:test";
import { searchProducts } from "../lib/product-search.ts";
const items = [
  { name: "Aero Runner", category: "PERFORMANCE SERIES", description: "Pure White", colors: [{ name: "Charcoal" }], price: 129, audience: "men mens", href: "/product/aero-runner" },
  { name: "Hop Mini", category: "PLAY CLUB", description: "Mint / Cream", colors: [{ name: "Mint" }], price: 58, audience: "kids children junior", href: "/kids/hop-mini" },
  { name: "Classic Low", category: "HERITAGE COURT", description: "Natural Tan", colors: [], price: 125, salePrice: 99, audience: "women womens", href: "/product/classic-low" },
];
test("matches names regardless of case and whitespace", () => assert.equal(searchProducts(items, "  AERO   runner ")[0]?.name, "Aero Runner"));
test("matches collections, colours, and audience together", () => assert.equal(searchProducts(items, "kids mint play club")[0]?.href, "/kids/hop-mini"));
test("matches colour options beyond the description", () => assert.equal(searchProducts(items, "charcoal")[0]?.name, "Aero Runner"));
test("finds discounted styles", () => assert.deepEqual(searchProducts(items, "sale").map(p => p.name), ["Classic Low"]));
test("normalises apostrophes in audience queries", () => assert.equal(searchProducts(items, "women’s")[0]?.name, "Classic Low"));
test("men does not accidentally match women", () => assert.deepEqual(searchProducts(items, "men").map(p => p.name), ["Aero Runner"]));
test("empty and unknown searches have no results", () => { assert.deepEqual(searchProducts(items, "  "), []); assert.deepEqual(searchProducts(items, "nonexistent"), []); });
