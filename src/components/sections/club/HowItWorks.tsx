"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import type { Dictionary } from "@/i18n";

export function HowItWorks({ dict }: { dict: Dictionary }) {
  const c = dict.clubPage;
  return (
    <section id="como-funciona" className="relative scroll-mt-20 border-t border-porcelain/10 py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeading dark eyebrow={c.howEyebrow} title={c.howTitle} italic={["Todos", "Every"]} />
        <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          <motion.div
            aria-hidden
            className="absolute left-0 top-9 hidden h-px w-full origin-left bg-[linear-gradient(90deg,#d4979e,#e3a78f,#d9b36a)] md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
          {c.steps.map((s, i) => (
            <FadeIn key={s.n} delay={0.15 * i} className="relative">
              <div className="flex h-[4.6rem] w-[4.6rem] items-center justify-center rounded-full border border-porcelain/15 bg-night font-display text-2xl text-porcelain">
                {s.n}
              </div>
              <h3 className="font-display mt-8 text-3xl leading-tight text-porcelain md:text-4xl">{s.title}</h3>
              <p className="mt-4 max-w-sm text-pretty text-base leading-relaxed text-porcelain/60">{s.text}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
