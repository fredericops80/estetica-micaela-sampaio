"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { TextReveal } from "@/components/motion/TextReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { clubTreatments } from "@/data/club";
import { localePath, type Dictionary, type Locale } from "@/i18n";

export function ClubTeaser({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const items = [...clubTreatments.facial, ...clubTreatments.advanced];

  return (
    <section id="club" ref={ref} className="relative scroll-mt-20 py-6 md:py-10">
      <motion.div style={{ scale, borderRadius: radius }} className="grain relative mx-auto max-w-[1600px] overflow-hidden bg-night text-porcelain md:mx-10">
        <div aria-hidden className="drift pointer-events-none absolute -left-40 -top-52 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,rgba(212,151,158,0.35),transparent_65%)] blur-3xl" />
        <div aria-hidden className="drift pointer-events-none absolute -bottom-60 -right-40 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,rgba(217,179,106,0.28),transparent_65%)] blur-3xl [animation-delay:-8s]" />

        <div className="relative px-6 pb-16 pt-20 md:px-16 md:pb-24 md:pt-32">
          <FadeIn y={10}>
            <p className="eyebrow text-porcelain/50">{dict.club.eyebrow}</p>
          </FadeIn>
          <TextReveal
            as="h2"
            text={dict.club.title}
            italic={["contínuo.", "continuous"]}
            className="font-display mt-6 max-w-4xl text-[clamp(2.8rem,7vw,7rem)] leading-[0.95] text-porcelain"
          />
          <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
            <FadeIn delay={0.2} className="md:col-span-6">
              <p className="max-w-lg text-pretty text-base leading-relaxed text-porcelain/70 md:text-lg">{dict.club.text}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {[dict.club.plans, dict.club.sessions, dict.club.discount].map((s) => (
                  <span key={s} className="rounded-full border border-porcelain/15 px-4 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-porcelain/80">{s}</span>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.3} className="md:col-span-6 md:flex md:justify-end">
              <Button href={localePath(locale, "/club")} variant="light" size="lg" icon>{dict.club.cta}</Button>
            </FadeIn>
          </div>
        </div>

        <div className="relative border-t border-porcelain/10 py-6">
          <Marquee duration={55}>
            {items.map((i) => (
              <span key={i} className="font-display mx-8 flex items-center gap-8 whitespace-nowrap text-2xl text-porcelain/60 md:text-3xl">
                {i}
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              </span>
            ))}
          </Marquee>
        </div>
      </motion.div>
    </section>
  );
}
