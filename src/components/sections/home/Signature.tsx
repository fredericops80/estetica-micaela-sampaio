"use client";

import { motion } from "framer-motion";
import { services, formatPrice } from "@/data/services";
import { localePath, type Dictionary, type Locale } from "@/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { Monogram } from "@/components/ui/Logo";

export function Signature({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const items = services.filter((s) => s.category === "signature");
  return (
    <section className="relative overflow-hidden bg-sand py-24 md:py-36">
      <div aria-hidden className="drift pointer-events-none absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(227,167,143,0.35),transparent_65%)] blur-2xl" />
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeading eyebrow={dict.signature.eyebrow} title={dict.signature.title} italic={["inteiro", "whole"]} text={dict.signature.text} />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {items.map((s, i) => (
            <FadeIn key={s.id} delay={i * 0.12}>
              <motion.article
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] bg-porcelain p-8 md:p-12"
                data-cursor="hover"
              >
                <motion.div
                  aria-hidden
                  variants={{ rest: { scale: 0.9, opacity: 0.5 }, hover: { scale: 1.15, opacity: 0.9 } }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="pointer-events-none absolute -bottom-32 -right-24 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(212,151,158,0.45),rgba(217,179,106,0.2)_50%,transparent_70%)] blur-xl"
                />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <span className="eyebrow">{String(i + 1).padStart(2, "0")} · {dict.signature.eyebrow}</span>
                    <Monogram size={34} className="opacity-70" />
                  </div>
                  <h3 className="font-display mt-10 text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.95] text-ink">{s.name}</h3>
                  <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-ink-soft">{s.description[locale]}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.benefits[locale].map((b) => (
                      <li key={b} className="rounded-full border border-ink/10 px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-ink/70">{b}</li>
                    ))}
                  </ul>
                </div>
                <div className="relative mt-12 flex flex-wrap items-end justify-between gap-6">
                  <div className="flex items-baseline gap-6">
                    <span className="font-display text-5xl text-ink">{s.durationMin / 60}<span className="ml-1 text-lg text-mute">{dict.signature.hours}</span></span>
                    <span className="font-display text-5xl text-ink">{formatPrice(s.price)}</span>
                  </div>
                  <Button href={`${localePath(locale, "/agendar")}?servico=${s.id}`} icon size="md">{dict.signature.cta}</Button>
                </div>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
