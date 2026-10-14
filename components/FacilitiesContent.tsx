"use client";

import { ArrowUpRight, Boxes, MapPin, PackageCheck, Snowflake, Sprout, Truck } from "lucide-react";
import type { Localized, SiteSettings } from "@/lib/types";
import useSiteLocale from "@/components/useSiteLocale";

const copy = {
  fa: { eyebrow:"تأسیسات و روند کار", title:"از باغ تا بارگیری، با دقت در هر مرحله", intro:"یک روند روشن برای تهیه، سورت، بسته‌بندی، نگهداری و هماهنگی تحویل سیب‌های عمدهٔ سرچشمه.", process:"روند آماده‌سازی", processTitle:"پنج مرحله برای یک سفارش منظم", processText:"هر سفارش بر اساس نوع محصول، مقدار، بسته‌بندی و مقصد خریدار بررسی و آماده می‌شود.", gallery:"نمای نزدیک از کار", galleryTitle:"محصول و تأسیسات واقعی", location:"موقعیت کارخانه", order:"ثبت سفارش عمده", ctaTitle:"برای سفارش بعدی شما آماده‌ایم", ctaText:"نوع سیب، مقدار و مقصد را بفرستید تا شرایط بسته‌بندی و تحویل بررسی شود.", cta:"شروع سفارش", note:"ظرفیت، زمان و شرایط نهایی پس از بررسی سفارش تأیید می‌شود." },
  ps: { eyebrow:"تاسیسات او کاري بهیر", title:"له بڼ څخه تر بارولو، په هر پړاو کې پاملرنه", intro:"د سرچشمې د عمده مڼو د اخیستلو، درجه‌بندۍ، بسته‌بندۍ، ساتنې او سپارنې روښانه بهیر.", process:"د چمتووالي بهیر", processTitle:"د منظم فرمایش لپاره پنځه پړاوونه", processText:"هر فرمایش د محصول ډول، مقدار، بسته‌بندۍ او د پېرودونکي منزل له مخې ارزول او چمتو کېږي.", gallery:"زموږ د کار نږدې لید", galleryTitle:"ریښتینی محصول او تاسیسات", location:"د فابریکې موقعیت", order:"عمده فرمایش", ctaTitle:"ستاسو راتلونکي فرمایش ته چمتو یو", ctaText:"د مڼو ډول، مقدار او منزل راولېږئ، څو د بسته‌بندۍ او سپارنې شرایط وارزول شي.", cta:"فرمایش پیل کړئ", note:"ظرفیت، وخت او وروستي شرایط د فرمایش تر ارزونې وروسته تاییدېږي." },
  en: { eyebrow:"Facilities & handling", title:"Care at every step, from orchard to loading", intro:"A clear process for sourcing, grading, packing, storing, and coordinating wholesale apple deliveries from Sarchashma.", process:"Preparation process", processTitle:"Five steps toward an organized order", processText:"Each order is reviewed and prepared according to product, volume, packaging, and buyer destination.", gallery:"A closer look", galleryTitle:"Real produce and facilities", location:"Factory location", order:"Place a wholesale order", ctaTitle:"Ready to discuss your next order", ctaText:"Share the apple variety, quantity, and destination so packaging and delivery terms can be reviewed.", cta:"Start an order", note:"Capacity, timing, and final terms are confirmed after order review." }
};

const steps = [
  { icon:Sprout, title:{fa:"تهیه از باغدار",ps:"له بڼوال څخه اخیستل",en:"Farmer sourcing"}, text:{fa:"خرید مستقیم سیب از باغداران محلی اطراف سرچشمه.",ps:"د سرچشمې شاوخوا له ځايي بڼوالو څخه مستقیم پېرود.",en:"Apples sourced directly from local orchard farmers around Sarchashma."} },
  { icon:PackageCheck, title:{fa:"سورت و انتخاب",ps:"درجه‌بندي او ټاکنه",en:"Grading & selection"}, text:{fa:"بررسی و جداسازی محصول برای آماده‌سازی سفارش‌های یک‌دست.",ps:"د یوشان فرمایشونو لپاره د محصول کتنه او درجه‌بندي.",en:"Produce inspected and sorted to prepare consistent wholesale orders."} },
  { icon:Boxes, title:{fa:"بسته‌بندی",ps:"بسته‌بندي",en:"Packaging"}, text:{fa:"آماده‌سازی در کارتن ۱۰ کیلوگرمی یا سبد ۹ کیلوگرمی.",ps:"په ۱۰ کیلو کارتن یا ۹ کیلو ټوکرۍ کې چمتو کول.",en:"Prepared in 10 kg cardboard cartons or 9 kg baskets."} },
  { icon:Snowflake, title:{fa:"انبار و سردخانه",ps:"ګودام او سړه خونه",en:"Warehouse & cold storage"}, text:{fa:"نگهداری محصول بر اساس نوع سفارش و زمان‌بندی تأییدشده.",ps:"د تایید شوي فرمایش او مهال‌وېش له مخې د محصول ساتنه.",en:"Produce stored according to the confirmed order and handling schedule."} },
  { icon:Truck, title:{fa:"بارگیری و ارسال",ps:"بارول او سپارنه",en:"Loading & delivery"}, text:{fa:"بارگیری و هماهنگی تحویل برای سفارش‌های تأییدشده.",ps:"د تایید شویو فرمایشونو بارول او د سپارنې همغږي.",en:"Loading and delivery coordinated for confirmed orders."} }
];

export default function FacilitiesContent({ settings }: { settings: SiteSettings }) {
  const locale = useSiteLocale(); const t = copy[locale]; const dir = locale === "en" ? "ltr" : "rtl";
  return <div className="inner-page facilities-page" dir={dir} lang={locale}>
    <section className="inner-hero facilities-hero"><img src="/products/web/storage.jpg" alt=""/><div className="inner-hero-shade"/><div className="wrap inner-hero-content"><span>{t.eyebrow}</span><h1>{t.title}</h1><p>{t.intro}</p><div className="inner-hero-actions"><a className="btn btn-red" href="#facility-process">{t.process}<ArrowUpRight aria-hidden="true"/></a><a className="btn btn-glass" href="/#order">{t.order}</a></div></div><div className="inner-hero-index" aria-hidden="true">01 — 05</div></section>
    <main className="inner-main">
      <section className="facility-process section" id="facility-process"><div className="wrap"><header className="inner-section-head"><div><span>{t.process}</span><h2>{t.processTitle}</h2></div><p>{t.processText}</p></header><div className="facility-steps">{steps.map((step,index)=>{const Icon=step.icon;return <article key={step.title.en}><div className="facility-step-number">{String(index+1).padStart(2,"0")}</div><Icon aria-hidden="true"/><h3>{step.title[locale]}</h3><p>{step.text[locale]}</p></article>})}</div><p className="facility-note">{t.note}</p></div></section>
      <section className="facility-gallery section"><div className="wrap"><header className="inner-section-head light"><div><span>{t.gallery}</span><h2>{t.galleryTitle}</h2></div><a href="/#location"><MapPin aria-hidden="true"/>{t.location}</a></header><div className="facility-mosaic">{settings.gallery.map((item,index)=><figure className={`facility-shot facility-shot-${index+1}`} key={item.src}><img src={item.src} alt={item.alt[locale]}/><figcaption><small>{String(index+1).padStart(2,"0")}</small>{item.alt[locale]}</figcaption></figure>)}</div></div></section>
      <section className="inner-cta"><div className="wrap"><span>{t.order}</span><h2>{t.ctaTitle}</h2><p>{t.ctaText}</p><a className="btn btn-red" href="/#order">{t.cta}<ArrowUpRight aria-hidden="true"/></a></div></section>
    </main>
  </div>;
}
