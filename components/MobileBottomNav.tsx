"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Apple, BookOpen, Building2, House, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/types";

const labels = {
  fa: { home: "خانه", products: "محصولات", shipping: "ارسال", facilities: "تأسیسات", about: "درباره ما" },
  ps: { home: "کور", products: "محصولات", shipping: "سپارنه", facilities: "تاسیسات", about: "زموږ په اړه" },
  en: { home: "Home", products: "Products", shipping: "Shipping", facilities: "Facilities", about: "About us" },
};

type NavKey = keyof typeof labels.en;

const items = [
  { key: "home" as const, href: "/", icon: House },
  { key: "products" as const, href: "/#products", icon: Apple },
  { key: "shipping" as const, href: "/#delivery", icon: Truck },
  { key: "facilities" as const, href: "/facilities", icon: Building2 },
  { key: "about" as const, href: "/#story", icon: BookOpen },
];

function activeForPath(pathname: string): NavKey {
  if (pathname === "/facilities") return "facilities";
  if (pathname.startsWith("/products/")) return "products";
  return "home";
}

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>("fa");
  const [active, setActive] = useState<NavKey>(() => activeForPath(pathname));

  useEffect(() => {
    const saved = localStorage.getItem("sb_locale") as Locale | null;
    if (saved && labels[saved]) setLocale(saved);

    const syncLocale = (event: Event) => {
      const nextLocale = (event as CustomEvent<Locale>).detail;
      if (nextLocale && labels[nextLocale]) setLocale(nextLocale);
    };
    window.addEventListener("sb:locale", syncLocale);
    return () => window.removeEventListener("sb:locale", syncLocale);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActive(activeForPath(pathname));
      return;
    }

    const updateFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash === "products") setActive("products");
      else if (hash === "delivery") setActive("shipping");
      else if (hash === "story") setActive("about");
      else setActive("home");
    };
    updateFromHash();

    const sections = ["products", "delivery", "story"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        setActive(visible.target.id === "delivery" ? "shipping" : visible.target.id === "story" ? "about" : "products");
      },
      { rootMargin: "-25% 0px -60%", threshold: [0, 0.1, 0.25] },
    );
    sections.forEach((section) => observer.observe(section));
    window.addEventListener("hashchange", updateFromHash);
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", updateFromHash);
    };
  }, [pathname]);

  if (pathname.startsWith("/admin")) return null;

  const t = labels[locale];
  return (
    <nav className="mobile-bottom-nav" dir={locale === "en" ? "ltr" : "rtl"} aria-label={locale === "en" ? "Primary navigation" : "راهنمای اصلی"}>
      {items.map(({ key, href, icon: Icon }) => (
        <Link
          key={key}
          href={href}
          className={active === key ? "active" : undefined}
          aria-current={active === key ? "page" : undefined}
          onClick={() => setActive(key)}
        >
          <Icon aria-hidden="true" strokeWidth={active === key ? 2.25 : 1.8} />
          <span>{t[key]}</span>
        </Link>
      ))}
    </nav>
  );
}
