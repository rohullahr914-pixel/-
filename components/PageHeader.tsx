"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/types";

const headerCopy = {
  fa: { products: "محصولات", facilities: "تأسیسات", exports: "صادرات", order: "سفارش", wholesale: "سفارش عمده" },
  ps: { products: "محصولات", facilities: "تاسیسات", exports: "صادرات", order: "فرمایش", wholesale: "عمده فرمایش" },
  en: { products: "Products", facilities: "Facilities", exports: "Exports", order: "Order", wholesale: "Order wholesale" },
};

export default function PageHeader() {
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>("fa");
  useEffect(() => {
    const saved = localStorage.getItem("sb_locale") as Locale | null;
    if (saved && headerCopy[saved]) setLocale(saved);
  }, []);
  const chooseLocale = (value: Locale) => {
    setLocale(value);
    localStorage.setItem("sb_locale", value);
    window.dispatchEvent(new CustomEvent("sb:locale", { detail: value }));
  };
  const t = headerCopy[locale];

  return <header className="topbar page-topbar" dir={locale === "en" ? "ltr" : "rtl"}><a className="brand" href="/"><img src="/brand/logo.png" alt="Sarchashma Brothers"/><span><b>{locale === "en" ? "Sarchashma Brothers" : "براداران سرچشمه"}</b><small>SARCHASHMA BROTHERS</small></span></a><nav><a href="/#products">{t.products}</a><a href="/facilities" className={pathname === "/facilities" ? "active" : undefined} aria-current={pathname === "/facilities" ? "page" : undefined}>{t.facilities}</a><a href="/exports" className={pathname === "/exports" ? "active" : undefined} aria-current={pathname === "/exports" ? "page" : undefined}>{t.exports}</a><a href="/#order">{t.order}</a></nav><div className="language-switch" aria-label="Language"><button className={locale === "fa" ? "active" : ""} onClick={() => chooseLocale("fa")}>دری</button><button className={locale === "ps" ? "active" : ""} onClick={() => chooseLocale("ps")}>پښتو</button><button className={locale === "en" ? "active" : ""} onClick={() => chooseLocale("en")}>EN</button></div><a className="header-cta" href="/#order">{t.wholesale}</a></header>;
}
