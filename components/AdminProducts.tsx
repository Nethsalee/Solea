"use client";
import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { authenticatedFetch } from "@/lib/authenticated-fetch";
import type { CatalogProduct } from "@/lib/catalog-model";
const blank = { id: "", name: "", department: "men", category: "", description: "", price: "", sale: "", images: "", sizes: "38, 39, 40, 41, 42", colourName: "Cream", colourHex: "#f5f0e8", status: "draft", newArrival: false, featured: false, inStock: true };
export default function AdminProducts() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [items, setItems] = useState<CatalogProduct[]>([]);
  const [selected, setSelected] = useState("");
  const [form, setForm] = useState(blank);
  const [live, setLive] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    setAllowed(false); setItems([]); setError("");
    if (!user) return;
    let cancelled = false;
    authenticatedFetch("/api/admin/products").then(data => { if (!cancelled) { setItems(data.products); setLive(data.live); setAllowed(true); } }).catch(err => { if (!cancelled) setError(err.message); });
    return () => { cancelled = true; };
  }, [user]);
  function choose(id: string) {
    setSelected(id); setError(""); setMessage("");
    const p = items.find(p => p.id === id);
    setForm(p ? { id: p.id, name: p.name, department: p.department ?? "men", category: p.category, description: p.description, price: (p.priceMinor / 100).toFixed(2), sale: p.salePriceMinor ? (p.salePriceMinor / 100).toFixed(2) : "", images: p.images.join("\n"), sizes: p.sizes.join(", "), colourName: p.colors[0]?.name ?? "Cream", colourHex: p.colors[0]?.hex ?? "#f5f0e8", status: p.status, featured: !!p.featured, newArrival: !!p.newArrival, inStock: p.inStock } : blank);
  }
  async function save(event: FormEvent) {
    event.preventDefault(); if (busy) return;
    setBusy(true); setError(""); setMessage("");
    try {
      const money = (value: string) => { if (!/^\d+(?:\.\d{1,2})?$/.test(value)) throw new Error("Use a price with up to two decimal places."); return Math.round(Number(value) * 100); };
      const existing = items.find(p => p.id === selected);
      const payload = { ...existing, id: form.id, name: form.name, department: form.department, category: form.category, description: form.description, currency: "USD", priceMinor: money(form.price), salePriceMinor: form.sale ? money(form.sale) : null, images: form.images.split("\n").map(v => v.trim()).filter(Boolean), sizes: form.sizes.split(",").map(v => v.trim()).filter(Boolean), colors: existing?.colors ?? [{ name: form.colourName, value: form.colourName.toLowerCase().replaceAll(" ", "-"), hex: form.colourHex }], status: form.status, newArrival: form.newArrival, featured: form.featured, inStock: form.inStock };
      const saved = await authenticatedFetch(selected ? `/api/admin/products/${encodeURIComponent(selected)}` : "/api/admin/products", { method: selected ? "PUT" : "POST", body: JSON.stringify(payload) });
      setItems(previous => [...previous.filter(p => p.id !== saved.id), saved]); setSelected(saved.id);
      setMessage("Product saved."); router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to save product."); } finally { setBusy(false); }
  }
  const update = (key: keyof typeof blank, value: string | boolean) => setForm(previous => ({ ...previous, [key]: value }));
  return <div className="catalog-page admin-page"><div className="container"><p className="section-label">SOLEA Administration</p><h1 className="section-title">Product catalog</h1>
    {loading ? <p role="status">Checking your account…</p> : !user ? <p><Link href="/login" className="btn-primary">Sign in to continue ↗</Link></p> : !allowed ? <p role="status">{error || "Checking administrator access…"}</p> : <>
    <p className="admin-intro">{live ? "Changes to active products appear on the storefront after refreshing." : "Catalog preview mode is active. Saved products will appear on the storefront after Firestore mode is enabled."}</p>
    <label className="admin-picker">Choose a product<select value={selected} onChange={e => choose(e.target.value)} disabled={busy}><option value="">Create a new product</option>{items.map(p => <option key={p.id} value={p.id}>{p.name} ({p.status})</option>)}</select></label>
    <form className="admin-product-form" onSubmit={save}><fieldset disabled={busy}><div className="admin-form-grid">
      <label>Product ID<input value={form.id} required maxLength={100} pattern="[a-z0-9]+(-[a-z0-9]+)*" disabled={!!selected} onChange={e => update("id", e.target.value)} /></label>
      <label>Name<input value={form.name} required maxLength={120} onChange={e => update("name", e.target.value)} /></label>
      <label>Department<select value={form.department} onChange={e => update("department", e.target.value)}><option value="men">Men</option><option value="women">Women</option><option value="kids">Kids</option></select></label>
      <label>Collection / category<input value={form.category} required maxLength={80} onChange={e => update("category", e.target.value)} /></label>
      <label>Price (USD)<input value={form.price} type="number" min="0.01" step="0.01" required onChange={e => update("price", e.target.value)} /></label>
      <label>Sale price (USD, optional)<input value={form.sale} type="number" min="0.01" step="0.01" onChange={e => update("sale", e.target.value)} /></label>
      <label className="admin-full">Description<textarea value={form.description} required maxLength={2000} onChange={e => update("description", e.target.value)} /></label>
      <label className="admin-full">Images, one per line<textarea value={form.images} required onChange={e => update("images", e.target.value)} /><small>Use existing /images/ files or images.unsplash.com URLs.</small></label>
      <label>EU sizes, separated by commas<input value={form.sizes} required onChange={e => update("sizes", e.target.value)} /></label>
      <label>Status<select value={form.status} onChange={e => update("status", e.target.value)}><option value="draft">Draft — hidden</option><option value="active">Active — visible</option></select></label>
      {!selected && <><label>Colour name<input value={form.colourName} required onChange={e => update("colourName", e.target.value)} /></label><label>Colour<input type="color" value={form.colourHex} onChange={e => update("colourHex", e.target.value)} /></label></>}
    </div><div className="admin-flags">{([['newArrival', 'New arrival'], ['featured', 'Featured'], ['inStock', 'Available']] as const).map(([key, label]) => <label key={key}><input type="checkbox" checked={form[key]} onChange={e => update(key, e.target.checked)} />{label}</label>)}</div><button className="btn-primary" type="submit">{busy ? "Saving…" : selected ? "Save changes" : "Create product"}</button>{selected && <Link className="btn-ghost" href={form.department === "kids" ? `/kids/${selected}` : `/product/${selected}`}>View product ↗</Link>}</fieldset></form>
    {error && <p className="auth-error" role="alert">{error}</p>}{message && <p className="auth-notice" role="status">{message}</p>}
    </>}
  </div></div>;
}
