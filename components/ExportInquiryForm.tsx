"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { Locale, Product } from "@/lib/types";

const copy = {
  fa: { company: "نام شرکت خریدار", contact: "نام مسئول تماس", email: "ایمیل تجارتی", whatsapp: "شماره واتس‌اپ", country: "کشور مقصد", volume: "حجم درخواستی (تن متریک)", product: "نوع سیب", packaging: "نوع بسته‌بندی", carton: "کارتن ۱۰ کیلوگرمی", basket: "سبد ۹ کیلوگرمی", notes: "شرایط یا نیازهای اضافی", send: "ارسال درخواست صادرات", sending: "در حال ارسال…", success: "درخواست دریافت و در سیستم ثبت شد.", reference: "شماره پیگیری", invalid: "لطفاً همه اطلاعات ضروری را درست تکمیل کنید." },
  ps: { company: "د پېرودونکي شرکت نوم", contact: "د اړیکې مسئول نوم", email: "سوداګریز برېښنالیک", whatsapp: "واټس‌اپ شمېره", country: "د منزل هېواد", volume: "غوښتل شوی حجم (متریک ټن)", product: "د مڼو ډول", packaging: "د بسته‌بندۍ ډول", carton: "۱۰ کیلو کارتن", basket: "۹ کیلو ټوکرۍ", notes: "اضافي شرایط یا اړتیاوې", send: "د صادراتو غوښتنه ولېږئ", sending: "لېږل کېږي…", success: "غوښتنه ترلاسه او په سیستم کې ثبت شوه.", reference: "د تعقیب شمېره", invalid: "اړین سوداګریز معلومات په سمه توګه بشپړ کړئ." },
  en: { company: "Buyer company name", contact: "Contact name", email: "Business email", whatsapp: "WhatsApp number", country: "Country of destination", volume: "Requested volume (metric tons)", product: "Apple variety", packaging: "Packaging", carton: "10 kg cardboard cartons", basket: "9 kg baskets", notes: "Additional requirements", send: "Send export inquiry", sending: "Sending…", success: "Your inquiry was received and stored.", reference: "Reference number", invalid: "Please complete all required business details." },
};

export default function ExportInquiryForm({ locale, products }: { locale: Locale; products: Product[] }) {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const t = copy[locale];

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setResult(null);
    setError("");
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/export-inquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const body = await response.json();
      if (!response.ok) {
        setError(t.invalid);
        return;
      }
      setResult(body.inquiryNumber);
      form.reset();
    } catch {
      setError(t.invalid);
    } finally {
      setBusy(false);
    }
  }

  return <form className="export-form" onSubmit={submit}>
    <label>{t.company}<input name="company" autoComplete="organization" required /></label>
    <label>{t.contact}<input name="contactName" autoComplete="name" required /></label>
    <label>{t.email}<input type="email" name="email" autoComplete="email" dir="ltr" required /></label>
    <label>{t.whatsapp}<input name="whatsapp" type="tel" autoComplete="tel" dir="ltr" required /></label>
    <label>{t.country}<input name="country" autoComplete="country-name" required /></label>
    <label>{t.volume}<input name="volumeMt" type="number" min="0.1" step="0.1" dir="ltr" required /></label>
    <label>{t.product}<select name="product">{products.map((product) => <option key={product.id} value={product.name.en}>{product.name[locale]}</option>)}</select></label>
    <label>{t.packaging}<select name="packaging"><option value="10 kg cardboard cartons">{t.carton}</option><option value="9 kg baskets">{t.basket}</option></select></label>
    <label className="full">{t.notes}<textarea name="notes" maxLength={1000} /></label>
    {error && <p className="export-form-message error full" role="alert">{error}</p>}
    {result && <div className="export-form-message success full" role="status"><CheckCircle2 aria-hidden="true" /><span><b>{t.success}</b><small>{t.reference}: <strong dir="ltr">{result}</strong></small></span></div>}
    <button className="export-submit full" disabled={busy}>{busy ? t.sending : t.send}<ArrowUpRight aria-hidden="true" /></button>
  </form>;
}
