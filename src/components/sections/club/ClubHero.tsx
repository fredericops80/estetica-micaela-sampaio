"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Monogram } from "@/components/ui/Logo";
import { clinic } from "@/data/clinic";
import type { Dictionary, Locale } from "@/i18n";

export function ClubHero({ dict }: { dict: Dictionary; locale: Locale }) {
  const c = dict.clubPage;
  return (
    <section className="grain relative flex min-h-screen items-end overflow-hidden pb-16 pt-40 md:pb-24">
      <div aria-hidden className="drift pointer-events-none absolute -left-40 top-10 h-[50rem] w-[50rem] rounded-full bg-[radial-gradient(circle,rgba(212,151,158,0.32),transparent_62%)] blur-3xl" />
      <div aria-hidden className="drift pointer-events-none absolute -right-52 -top-40 h-[52rem] w-[52rem] rounded-full bg-[radial-gradient(circle,rgba(217,179,106,0.22),transparent_62%)] blur-3xl [animation-delay:-9s]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-6%] top-[8%] hidden opacity-[0.07] lg:block"
        initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
        animate={{ opacity: 0.07, scale: 1, rotate: 0 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Monogram light size={720} />
      </motion.div>

      <div className="relative mx-auto w-full max-w-[1600px] px-5 md:px-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="flex flex-wrap items-center gap-4">
          <p className="eyebrow text-porcelain/50">{c.heroEyebrow}</p>
          <span className="flex items-center gap-2 rounded-full border border-gold/40 px-3 py-1 text-[0.6rem] uppercase tracking-[0.22em] text-gold">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
            {c.limited}
          </span>
        </motion.div>

        <h1 className="font-display mt-8 text-[clamp(3.4rem,11vw,11rem)] leading-[0.9] text-porcelain">
          {[c.heroTitle1, c.heroTitle2].map((line, i) => (
            <span key={line} className="line-mask">
              <motion.span
                className={i === 1 ? "display-italic brand-gradient-text block pr-3" : "block"}
                initial={{ y: "105%", rotate: 1.5 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ delay: 0.5 + i * 0.12, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-pretty text-base leading-relaxed text-porcelain/70 md:col-span-7 md:text-lg"
          >
            {c.heroSub}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-3 md:col-span-5 md:justify-end"
          >
            <Button href="#planos" variant="light" size="lg" icon>{c.ctaPlans}</Button>
            <Button href={clinic.clubGroupUrl} external variant="outline" size="lg" className="border-porcelain/30 text-porcelain hover:border-porcelain hover:text-night [&>span:first-child]:bg-porcelain">
              {c.ctaJoin}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
