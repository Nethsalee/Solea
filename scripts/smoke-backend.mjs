import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import assert from "node:assert/strict";
const require = createRequire(import.meta.url);
const port = 3148;
const server = spawn(process.execPath, [require.resolve("next/dist/bin/next"), "start", "-p", String(port), "-H", "127.0.0.1"], { cwd: process.cwd(), env: { ...process.env, CATALOG_SOURCE: "local" }, stdio: ["ignore", "pipe", "pipe"], windowsHide: true });
try {
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Test server did not become ready.")), 25000);
    server.once("error", () => { clearTimeout(timeout); reject(new Error("Unable to start test server.")); });
    server.once("exit", () => { clearTimeout(timeout); reject(new Error("Test server exited before readiness.")); });
    server.stdout.on("data", chunk => { if (chunk.toString().includes("Ready")) { clearTimeout(timeout); resolve(); } });
  });
  const base = `http://127.0.0.1:${port}`;
  for (const [route, method] of [["/api/me", "GET"], ["/api/admin/products", "GET"], ["/api/admin/products", "POST"], ["/api/admin/products/aero-runner", "PUT"]]) {
    const response = await fetch(base + route, { method, ...(method === "POST" || method === "PUT" ? { body: "{}", headers: { "Content-Type": "application/json" } } : {}) });
    assert.equal(response.status, 401, route + " " + method);
    console.log(`${method} ${route}: unauthenticated request denied (401)`);
  }
  const response = await fetch(base + "/api/products");
  assert.equal(response.status, 200);
  const products = await response.json();
  assert.equal(products.length, 26);
  assert.equal(new Set(products.map(p => p.images[0].split("?")[0])).size, 26);
  assert(products.every(p => p.status === "active" && Number.isInteger(p.priceMinor)));
  for (const route of ["/", "/men", "/women", "/kids", "/search?q=mint", "/product/aria-knit", "/kids/hop-mini-cream", "/admin/products"]) assert.equal((await fetch(base + route)).status, 200, route);
  console.log("Catalog integrity, storefront, search, product details, and admin page passed.");
} catch (error) { console.error(error.message, error.cause?.code ?? ""); process.exitCode = 1; }
finally { server.kill(); }
