"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useDictionary } from "@/components/providers/DictionaryProvider";
import { localePath, type Locale } from "@/i18n/config";
import { clinic } from "@/data/clinic";

export function Header() {
  const { dict, locale } = useDictionary();
  const pathname = usePathname();
  const isClub = pathname.includes("/club");
  const isBooking = pathname.includes("/agendar");
  const dark = isClub;
  const [scrolled, setScrolled] = useState(false);
  const [hiddenBar, setHiddenBar] = useState(false);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const setOpen = (v: boolean | ((prev: boolean) => boolean)) =>
    setOpenPath((prev) => ((typeof v === "function" ? v(prev === pathname) : v) ? pathname : null));
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
    const prev = scrollY.getPrevious() ?? 0;
    setHiddenBar(v > 600 && v > prev && !open);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const home = localePath(locale, "/");
  const links = [
    { label: dict.nav.treatments, href: `${home === "/" ? "" : home}/#tratamentos` },
    { label: dict.nav.about, href: `${home === "/" ? "" : home}/#micaela` },
    { label: dict.nav.results, href: `${home === "/" ? "" : home}/#resultados` },
    { label: dict.nav.club, href: localePath(locale, "/club") },
    { label: dict.nav.contact, href: `${home === "/" ? "" : home}/#visite` },
  ];

  const otherLocale: Locale = locale === "pt" ? "en" : "pt";
  // strip current locale prefix and re-prefix
  const bare = pathname.replace(/^\/(pt|en)(?=\/|$)/, "") || "/";
  const switchHref = localePath(otherLocale, bare);

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500",
          scrolled && !open
            ? dark
              ? "border-b border-porcelain/10 bg-night/70 backdrop-blur-xl"
              : "border-b border-ink/5 bg-porcelain/75 backdrop-blur-xl"
            : "border-b border-transparent"
        )}
        animate={{ y: hiddenBar ? -120 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto flex h-[var(--header-h)] max-w-[1600px] items-center justify-between px-5 md:px-10">
          <Logo href={home} light={dark || open} size={scrolled ? 44 : 54} />

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                data-cursor="hover"
                className={cn(
                  "group relative text-[0.7rem] font-medium uppercase tracking-[0.22em] transition-colors",
                  dark ? "text-porcelain/70 hover:text-porcelain" : "text-ink/70 hover:text-ink"
                )}
              >
                {l.label}
                <span className={cn("absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100", dark ? "bg-porcelain" : "bg-ink")} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            <Link
              href={switchHref}
              hrefLang={otherLocale}
              data-cursor="hover"
              aria-label={dict.nav.langLabel}
              className={cn("text-[0.7rem] font-medium uppercase tracking-[0.22em] transition-colors", dark || open ? "text-porcelain/70 hover:text-porcelain" : "text-ink/60 hover:text-ink")}
            >
              {otherLocale}
            </Link>
            {!isBooking && (
              <div className="hidden md:block">
                <Button href={localePath(locale, "/agendar")} size="sm" variant={dark ? "light" : "primary"}>
                  {dict.nav.bookLong}
                </Button>
              </div>
            )}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? dict.nav.close : dict.nav.menu}
              data-cursor="hover"
              className={cn("relative flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden", dark || open ? "border-porcelain/20 text-porcelain" : "border-ink/15 text-ink")}
            >
              <span className={cn("absolute h-px w-5 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]", open ? "rotate-45" : "-translate-y-[3px]")} />
              <span className={cn("absolute h-px w-5 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]", open ? "-rotate-45" : "translate-y-[3px]")} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            className="fixed inset-0 z-40 flex flex-col justify-end bg-night px-6 pb-12 pt-32 text-porcelain"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="grain pointer-events-none absolute inset-0" />
            <nav className="relative flex flex-col gap-2" aria-label="Mobile">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={l.href} onClick={() => setOpen(false)} className="font-display block text-[clamp(2.2rem,9vw,4rem)] leading-[1.05] text-porcelain">
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              className="relative mt-10 flex flex-col gap-4 border-t border-porcelain/10 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button href={localePath(locale, "/agendar")} variant="light" size="lg" magnetic={false} className="w-full">
                {dict.nav.bookLong}
              </Button>
              <a href={clinic.whatsappUrl(dict.whatsappMessages.general)} target="_blank" rel="noreferrer" className="text-center text-[0.7rem] uppercase tracking-[0.22em] text-porcelain/60">
                {dict.nav.whatsapp} · {clinic.phone}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
