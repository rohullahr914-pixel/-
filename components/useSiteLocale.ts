"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/types";

export default function useSiteLocale() {
  const [locale, setLocale] = useState<Locale>("fa");

  useEffect(() => {
    const saved = localStorage.getItem("sb_locale") as Locale | null;
    if (saved === "fa" || saved === "ps" || saved === "en") setLocale(saved);
    const syncLocale = (event: Event) => {
      const next = (event as CustomEvent<Locale>).detail;
      if (next === "fa" || next === "ps" || next === "en") setLocale(next);
    };
    window.addEventListener("sb:locale", syncLocale);
    return () => window.removeEventListener("sb:locale", syncLocale);
  }, []);

  return locale;
}
