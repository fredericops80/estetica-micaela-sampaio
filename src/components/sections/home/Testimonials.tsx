"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import type { Dictionary, Locale } from "@/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Monogram } from "@/components/ui/Logo";

export function Testimonials({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const track = useRef<HTMLDivElement>(null);
  return (
    <section className="relative overflow-hidden bg-sand py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeading eyebrow={dict.testimonials.eyebrow} title={dict.testimonials.title} italic={["delas.", "words."]} />
      </div>
      <div className="mt-14 overflow-hidden" data-cursor="hover" data-cursor-label={dict.results.drag}>
        <motion.div
          ref={track}
          drag="x"
          dragConstraints={{ left: -(testimonials.length - 1) * 440, right: 0 }}
          dragElastic={0.08}
          className="flex cursor-grab gap-6 px-5 active:cursor-grabbing md:px-10"
        >
          {testimonials.map((q, i) => (
            <motion.figure
              key={q.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex w-[82vw] shrink-0 flex-col justify-between rounded-[2rem] bg-porcelain p-8 sm:w-[420px] md:p-10"
            >
              <Monogram size={28} className="opacity-60" />
              <blockquote className="font-display display-italic mt-10 text-pretty text-[clamp(1.4rem,2.2vw,1.9rem)] leading-snug text-ink">“{q[locale]}”</blockquote>
              <figcaption className="mt-10 flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.22em] text-mute">
                <span className="h-px w-8 bg-rose" />
                {q.author}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
