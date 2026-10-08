"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/types";

const whatsapp = "93707763729";
const waLink = (text: string) => `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;

export default function Storefront({ initialProducts }: { initialProducts: Product[] }) {
  const [menu, setMenu] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const featureSectionRef = useRef<HTMLElement>(null);
  const featureVideoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    }), { threshold: .12 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    const progress = () => {
      document.documentElement.style.setProperty("--scroll", `${scrollY / (document.documentElement.scrollHeight - innerHeight) * 100}%`);
      document.querySelector(".site-header")?.classList.toggle("is-scrolled", scrollY > 24);
    };
    const pointer = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
      const card = (event.target as Element).closest<HTMLElement>(".tilt");
      if (!card || matchMedia("(pointer: coarse)").matches) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--tilt-x", `${((event.clientY - rect.top) / rect.height - .5) * -7}deg`);
      card.style.setProperty("--tilt-y", `${((event.clientX - rect.left) / rect.width - .5) * 7}deg`);
    };
    const resetTilt = (event: PointerEvent) => {
      const card = (event.target as Element).closest<HTMLElement>(".tilt");
      if (!card || (event.relatedTarget instanceof Node && card.contains(event.relatedTarget))) return;
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    };
    addEventListener("scroll", progress, { passive: true });
    addEventListener("pointermove", pointer, { passive: true });
    addEventListener("pointerout", resetTilt);
    progress();
    return () => {
      observer.disconnect();
      removeEventListener("scroll", progress);
      removeEventListener("pointermove", pointer);
      removeEventListener("pointerout", resetTilt);
    };
  }, []);
  useEffect(() => {
    const hero = heroRef.current;
    const video = heroVideoRef.current;
    if (!hero || !video) return;

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = matchMedia("(min-width: 921px)");
    let frame = 0;
    const syncVideo = () => {
      frame = 0;
      if (!desktop.matches || !video.duration || reducedMotion.matches) return;
      const scrollRange = Math.max(hero.offsetHeight - innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / scrollRange));
      hero.style.setProperty("--hero-progress", String(progress));
      hero.querySelector(".hero-copy")?.classList.toggle("is-exiting", progress > .48);
      hero.querySelector(".hero-scroll-copy")?.classList.toggle("is-visible", progress > .48);
      const targetTime = progress * Math.max(video.duration - 0.05, 0);
      if (Math.abs(video.currentTime - targetTime) > 0.025) video.currentTime = targetTime;
    };
    const queueSync = () => {
      if (!frame) frame = requestAnimationFrame(syncVideo);
    };
    const updatePlaybackMode = () => {
      video.pause();
      if (reducedMotion.matches) {
        video.currentTime = 0;
      } else if (desktop.matches) {
        video.loop = false;
        queueSync();
      } else {
        video.loop = true;
        void video.play().catch(() => undefined);
      }
    };

    video.addEventListener("loadedmetadata", queueSync);
    addEventListener("scroll", queueSync, { passive: true });
    addEventListener("resize", queueSync);
    reducedMotion.addEventListener("change", updatePlaybackMode);
    desktop.addEventListener("change", updatePlaybackMode);
    updatePlaybackMode();
    queueSync();
    return () => {
      if (frame) cancelAnimationFrame(frame);
      video.removeEventListener("loadedmetadata", queueSync);
      removeEventListener("scroll", queueSync);
      removeEventListener("resize", queueSync);
      reducedMotion.removeEventListener("change", updatePlaybackMode);
      desktop.removeEventListener("change", updatePlaybackMode);
    };
  }, []);
  useEffect(() => {
    const section = featureSectionRef.current;
    const video = featureVideoRef.current;
    if (!section || !video) return;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = matchMedia("(min-width: 921px)");
    let frame = 0;
    const syncVideo = () => {
      frame = 0;
      if (!desktop.matches || !video.duration || reducedMotion.matches) return;
      const scrollRange = Math.max(section.offsetHeight - innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / scrollRange));
      section.style.setProperty("--feature-progress", String(progress));
      section.style.setProperty("--video-progress", `${progress * 100}%`);
      section.querySelector(".video-feature-head")?.classList.toggle("is-exiting", progress > .42);
      section.querySelector(".video-scroll-chapter")?.classList.toggle("is-visible", progress > .42);
      const targetTime = progress * Math.max(video.duration - .05, 0);
      if (Math.abs(video.currentTime - targetTime) > .025) video.currentTime = targetTime;
    };
    const queueSync = () => {
      if (!frame) frame = requestAnimationFrame(syncVideo);
    };
    const updatePlaybackMode = () => {
      video.pause();
      if (reducedMotion.matches) {
        video.currentTime = 0;
      } else if (desktop.matches) {
        video.loop = false;
        queueSync();
      } else {
        video.loop = true;
        void video.play().catch(() => undefined);
      }
    };
    video.addEventListener("loadedmetadata", queueSync);
    addEventListener("scroll", queueSync, { passive: true });
    addEventListener("resize", queueSync);
    reducedMotion.addEventListener("change", updatePlaybackMode);
    desktop.addEventListener("change", updatePlaybackMode);
    updatePlaybackMode();
    queueSync();
    return () => {
      if (frame) cancelAnimationFrame(frame);
      video.removeEventListener("loadedmetadata", queueSync);
      removeEventListener("scroll", queueSync);
      removeEventListener("resize", queueSync);
      reducedMotion.removeEventListener("change", updatePlaybackMode);
      desktop.removeEventListener("change", updatePlaybackMode);
    };
  }, []);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const d = new FormData(event.currentTarget);
    const message = `سلام و وقت بخیر. برای خرید عمده از برادران سرچشمه درخواست دارم.\n\nنام خریدار: ${d.get("name")}\nشماره تماس: ${d.get("phone")}\nمحصول موردنظر: ${d.get("product")}\nمقدار تقریبی: ${d.get("amount") || "هنوز مشخص نشده"}\nمقصد ارسال: ${d.get("destination")}\nتوضیحات تکمیلی: ${d.get("details") || "توضیحی ثبت نشده است"}`;
    window.open(waLink(message), "_blank", "noopener,noreferrer");
  };
  const galleries = [
    { src: "/products/web/selected.jpg", title: "گلچین تازه از باغ" },
    { src: "/products/web/packed.jpg", title: "آماده‌سازی منظم سفارش" },
    { src: "/products/web/storage.jpg", title: "نگهداری تا زمان بارگیری" },
    { src: "/products/web/wholesale.jpg", title: "محصول آمادهٔ عرضه عمده" }
  ];
  return <>
    <div className="scroll-progress" />
    <header className="site-header"><div className="container header-inner">
      <a className="brand" href="#top"><img src="/brand/logo.jpeg" alt="نشان تجارت‌خانه برادران سرچشمه" /><div><strong>برادران سرچشمه</strong><small>ریشه در باغ · استوار بر اعتماد</small></div></a>
      <button className="menu-button" aria-expanded={menu} aria-label="باز کردن فهرست سایت" onClick={() => setMenu(v => !v)}>{menu ? "×" : "☰"}</button>
      <nav className={menu ? "open" : ""} onClick={() => setMenu(false)}><a href="#products">محصولات</a><a href="#story">داستان ما</a><a href="#gallery">نگارخانه</a><a href="#contact">ارتباط با ما</a><a className="nav-cta" href="#order">ثبت سفارش عمده</a></nav>
    </div></header>

    <main id="top">
      <section className="hero" ref={heroRef}>
        <div className="hero-noise" />
        <div className="hero-orbit one" /><div className="hero-orbit two" />
        <div className="container hero-grid">
          <div className="hero-copy reveal">
            <div className="kicker">از قلب باغ‌های درهٔ سرچشمه، میدان وردک</div>
            <h1>تازگیِ باغ،<br /><em>پشتوانهٔ تجارت شما</em></h1>
            <p>سیب‌های سرخ و زرد را از باغ‌های خودمان گلچین می‌کنیم و برای سفارش‌های عمده در افغانستان و بازارهای بیرون از کشور آماده می‌سازیم.</p>
            <div className="hero-actions"><a className="button primary" href="#products">مشاهده محصولات <span>←</span></a><a className="button ghost" href={waLink("سلام و وقت بخیر. برای خرید عمده سیب از برادران سرچشمه معلومات می‌خواهم.")} target="_blank">مشاوره در واتس‌اپ</a></div>
            <div className="hero-facts"><span><b>از ۱۳۸۷</b> تجربه و اعتماد</span><span><b>فروش عمده</b> تخصص ما</span><span><b>۵ صبح تا ۱۰ شب</b> پاسخ‌گوی شما</span></div>
          </div>
          <div className="hero-scroll-copy">
            <span>محصول واقعی، مستقیم از باغ</span>
            <h2>هر فریم، روایتِ<br />تازگی و کیفیت</h2>
            <p>ادامه دهید و محصولی را ببینید که برای تجارت شما آماده شده است.</p>
          </div>
          <div className="hero-visual reveal">
            <div className="hero-image hero-video-shell"><video ref={heroVideoRef} src="/media/hero-scroll.mp4" poster="/products/web/super-lux.jpg" muted playsInline preload="auto" aria-label="ویدیوی معرفی محصولات باغی برادران سرچشمه" /></div>
            <div className="hero-image"><img src="/products/web/super-lux.jpg" alt="سیب سرخ سوپر لوکس برادران سرچشمه" /></div>
            <div className="brand-seal"><img src="/brand/logo.jpeg" alt="" /></div>
            <div className="float-card"><span>از باغ‌های خودمان</span><strong>تازه، گلچین‌شده، آمادهٔ سفارش</strong></div>
          </div>
        </div>
        <a className="scroll-cue" href="#products"><span>محصولات را ببینید</span><i /></a>
      </section>

      <section className="products section" id="products"><div className="container">
        <div className="section-head reveal"><div><span className="eyebrow">محصولات برادران سرچشمه</span><h2>برای هر بازار، انتخابی شایسته</h2></div><p>قیمت روز هر محصول با توجه به مقدار سفارش، نوع بسته‌بندی و مقصد ارسال برای شما محاسبه می‌شود.</p></div>
        <div className="product-grid">{initialProducts.map((product, i) => <article className="product-card reveal tilt" style={{ transitionDelay: `${i * 90}ms` }} key={product.id}>
          <div className="product-photo"><img src={product.image} alt={product.name} /><span>{product.badge}</span></div>
          <div className="product-body"><small>محصول باغی برادران سرچشمه</small><h3>{product.name}</h3><p>{product.short}</p><div className="product-price">{product.price}</div>
          <a href={waLink(`سلام و وقت بخیر. برای خرید عمده «${product.name}» و دریافت قیمت روز معلومات می‌خواهم.`)} target="_blank">دریافت قیمت و ثبت سفارش <span>←</span></a></div>
        </article>)}</div>
      </div></section>

      <section className="story section" id="story"><div className="container story-grid">
        <div className="story-collage reveal"><img className="story-main" src="/products/web/wholesale.jpg" alt="سیب‌های تازه باغی برای سفارش عمده" /><img className="story-small" src="/products/web/storage.jpg" alt="صندوق‌های محصول آمادهٔ بارگیری" /><div className="experience"><b>از ۱۳۸۷</b><span>همراه مطمئن تجارت میوه</span></div><span className="story-line" aria-hidden="true" /></div>
        <div className="story-copy reveal"><span className="eyebrow">داستان برادران سرچشمه</span><h2>ریشه در سرچشمه، همراهِ تجارت شما</h2><p>تجارت‌خانه برادران سرچشمه از ۱۵ قوس ۱۳۸۷ در ولسوالی جلریز ولایت میدان وردک فعالیت می‌کند. سیب‌های ما در باغ‌های درهٔ سرچشمه پرورش می‌یابند، با دقت گلچین می‌شوند و برای فروش عمده آماده می‌گردند.</p><p>ما کیفیت محصول را از باغ تا زمان تحویل دنبال می‌کنیم تا تاجران و خریداران عمده، همکاری روشن، منظم و قابل اعتماد را تجربه کنند.</p>
        <div className="values"><div><b>گلچین دقیق</b><span>انتخاب محصول مناسب</span></div><div><b>آماده‌سازی منظم</b><span>متناسب با سفارش شما</span></div><div><b>هماهنگی ارسال</b><span>برای داخل و خارج کشور</span></div></div></div>
      </div></section>

      <section className="video-feature section" id="video" ref={featureSectionRef}>
        <div className="video-marquee" aria-hidden="true"><div>تازه از باغ · گلچین با دقت · آماده برای تجارت · اعتماد در همکاری · تازه از باغ · گلچین با دقت · آماده برای تجارت · اعتماد در همکاری ·</div></div>
        <div className="video-feature-sticky"><div className="container">
        <div className="video-feature-head reveal">
          <span className="eyebrow">از باغ تا بازار شما</span>
          <h2>تازگی را ببینید؛ کیفیت را انتخاب کنید</h2>
          <p>نگاهی نزدیک به محصول واقعی و روند آماده‌سازی آن برای سفارش‌های عمده.</p>
        </div>
        <div className="video-feature-frame reveal tilt">
          <video ref={featureVideoRef} src="/media/orchard-showcase.mp4" poster="/products/web/wholesale.jpg" muted playsInline preload="auto" aria-label="ویدیوی محصول تازه و آماده‌سازی سفارش در برادران سرچشمه" />
          <div className="video-vignette" />
          <span className="video-feature-label">برادران سرچشمه · تازگی از دل باغ</span>
          <div className="video-controls"><div className="video-progress"><i /></div><span>برای ادامهٔ روایت، اسکرول کنید</span></div>
        </div>
        <div className="video-scroll-chapter"><span>پیش از انتخاب، از نزدیک ببینید</span><h3>رنگ، تازگی و کیفیت؛<br />همان‌گونه که هست</h3><p>تصویری روشن از محصولی که برای سفارش عمدهٔ شما آماده می‌شود.</p></div>
        <div className="video-feature-stats reveal"><span><i>01</i><b>مستقیم از باغ</b></span><span><i>02</i><b>تصاویر واقعی محصول</b></span><span><i>03</i><b>آماده برای سفارش عمده</b></span></div>
      </div></div></section>

      <section className="gallery section" id="gallery"><div className="container">
        <div className="section-head reveal"><div><span className="eyebrow">نگارخانهٔ سرچشمه</span><h2>آنچه می‌بینید، محصول واقعی ماست</h2></div><p>نگاهی بی‌واسطه به محصولات، بسته‌بندی و فضای آماده‌سازی سفارش‌ها در تجارت‌خانه.</p></div>
        <div className="gallery-grid">{galleries.map((item, i) => <button className={`gallery-item g${i + 1} reveal tilt`} key={item.src} onClick={() => setActiveImage(item.src)}><img src={item.src} alt={item.title} /><span>{item.title}<i>↗</i></span></button>)}</div>
      </div></section>

      <section className="order section" id="order"><div className="container order-shell">
        <div className="order-copy reveal"><span className="eyebrow">شروع یک همکاری مطمئن</span><h2>سفارش عمدهٔ شما، تنها چند قدم فاصله دارد</h2><p>مشخصات درخواست خود را وارد کنید؛ پیام آماده در واتس‌اپ باز می‌شود تا قیمت روز، بسته‌بندی و ارسال را مستقیم با ما هماهنگ کنید.</p><div className="contact-pills"><a href="tel:+93707763729">+93 70 776 3729</a><a href="tel:+93706446080">+93 70 644 6080</a></div></div>
        <form className="order-form reveal" onSubmit={submit}>
          <label>نام خریدار<input name="name" required placeholder="نام و نام خانوادگی شما" /></label>
          <label>شماره تماس<input name="phone" required type="tel" placeholder="شماره‌ای که پاسخ‌گو هستید" /></label>
          <label>محصول موردنظر<select name="product">{initialProducts.map(p => <option key={p.id}>{p.name}</option>)}</select></label>
          <label>مقدار تقریبی سفارش<input name="amount" placeholder="برای نمونه: ۱۰۰ صندوق" /></label>
          <label className="wide">مقصد ارسال<input name="destination" required placeholder="ولایت، شهر یا کشور مقصد" /></label>
          <label className="wide">جزئیات سفارش<textarea name="details" placeholder="نوع بسته‌بندی، زمان موردنظر یا هر توضیح دیگر" /></label>
          <button className="button primary wide" type="submit">ارسال درخواست در واتس‌اپ <span>←</span></button>
        </form>
      </div></section>

      <section className="contact section" id="contact"><div className="container contact-grid">
        <div className="contact-copy reveal"><span className="eyebrow">در تماس باشیم</span><h2>برای یک همکاری پربار، با ما گفت‌وگو کنید</h2><p>هر روز از ساعت ۵ صبح تا ۱۰ شب آمادهٔ پاسخ‌گویی و هماهنگی سفارش شما هستیم.</p></div>
        <div className="contact-list reveal"><a href="https://maps.google.com/?q=Jalrez+Maidan+Wardak+Afghanistan" target="_blank"><span>نشانی تجارت‌خانه</span><b>افغانستان، میدان وردک، جلریز، سرچشمه، قلعه سبز</b></a><a href="mailto:rohullahr914@gmail.com"><span>ارتباط از طریق ایمیل</span><b dir="ltr">rohullahr914@gmail.com</b></a><a href={waLink("سلام و وقت بخیر. می‌خواهم با برادران سرچشمه در ارتباط باشم.")} target="_blank"><span>گفت‌وگوی مستقیم در واتس‌اپ</span><b dir="ltr">+93 70 776 3729</b></a></div>
      </div></section>
    </main>

    <footer><div className="container footer-inner"><div className="footer-brand"><img src="/brand/logo.jpeg" alt="" /><div><b>برادران سرچشمه</b><small>تازگی · اعتماد · همکاری</small></div></div><p>© ۱۴۰۵ — همهٔ حقوق برای برادران سرچشمه محفوظ است.</p><a href="/admin">ورود به بخش مدیریت</a></div></footer>
    <a className="whatsapp-float" href={waLink("سلام و وقت بخیر. برای خرید عمده سیب و دریافت قیمت روز معلومات می‌خواهم.")} target="_blank" aria-label="گفت‌وگو با برادران سرچشمه در واتس‌اپ">گفت‌وگو در واتس‌اپ <span>●</span></a>
    {activeImage && <div className="lightbox" onClick={() => setActiveImage(null)}><button aria-label="بستن تصویر">×</button><img src={activeImage} alt="نمای بزرگ محصول برادران سرچشمه" /></div>}
  </>;
}
