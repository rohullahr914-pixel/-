"use client";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";

const blank: Product = { id: "", name: "", short: "", description: "", image: "/products/web/", badge: "", price: "قیمت روز، متناسب با مقدار و مقصد سفارش", available: true };
export default function AdminPanel() {
  const [key, setKey] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState("");
  useEffect(() => { fetch("/api/products").then(r => r.json()).then(setProducts); }, []);
  const change = (i: number, field: keyof Product, value: string | boolean) => setProducts(v => v.map((p, n) => n === i ? { ...p, [field]: value } : p));
  const save = async () => {
    setStatus("در حال ذخیره‌سازی تغییرات…");
    const res = await fetch("/api/products", { method: "PUT", headers: { "content-type": "application/json", authorization: `Bearer ${key}` }, body: JSON.stringify(products) });
    const body = await res.json();
    setStatus(res.ok ? "همهٔ تغییرات با موفقیت ذخیره شد." : body.error || "ذخیره‌سازی انجام نشد؛ دوباره تلاش کنید.");
  };
  return <main className="admin">
    <div className="admin-head"><div><span>مدیریت محصولات</span><h1>پنل مدیریت برادران سرچشمه</h1></div><a href="/">بازگشت به سایت ←</a></div>
    <section className="admin-auth"><label>رمز ورود مدیریت<input type="password" value={key} onChange={e => setKey(e.target.value)} placeholder="رمز مدیریت را وارد کنید" /></label><button onClick={save}>ذخیرهٔ همهٔ تغییرات</button><b>{status}</b></section>
    <div className="admin-list">{products.map((p, i) => <article className="admin-card" key={p.id || i}>
      <img src={p.image} alt="" />
      <div className="admin-fields">
        <label>نام محصول<input value={p.name} onChange={e => change(i, "name", e.target.value)} /></label>
        <label>شناسهٔ محصول<input value={p.id} onChange={e => change(i, "id", e.target.value)} /></label>
        <label>معرفی کوتاه محصول<input value={p.short} onChange={e => change(i, "short", e.target.value)} /></label>
        <label>نشان روی تصویر<input value={p.badge} onChange={e => change(i, "badge", e.target.value)} /></label>
        <label>متن قیمت<input value={p.price} onChange={e => change(i, "price", e.target.value)} /></label>
        <label>مسیر تصویر<input value={p.image} onChange={e => change(i, "image", e.target.value)} /></label>
        <label className="wide">توضیحات کامل محصول<textarea value={p.description} onChange={e => change(i, "description", e.target.value)} /></label>
        <label className="check"><input type="checkbox" checked={p.available} onChange={e => change(i, "available", e.target.checked)} /> محصول موجود است</label>
        <button className="danger" onClick={() => setProducts(v => v.filter((_, n) => n !== i))}>حذف محصول</button>
      </div>
    </article>)}</div>
    <button className="add" onClick={() => setProducts(v => [...v, { ...blank, id: `product-${Date.now()}` }])}>+ افزودن محصول تازه</button>
  </main>;
}
