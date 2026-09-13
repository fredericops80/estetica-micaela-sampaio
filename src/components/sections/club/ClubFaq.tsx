"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { clubFaq } from "@/data/club";
import type { Dictionary, Locale } from "@/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function ClubFaq({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [open, setOpen] = useState<number | null>(0);
  const c = dict.clubPage;
  return (
    <section id="faq" className="relative scroll-mt-20 py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading dark eyebrow={c.faqEyebrow} title={c.faqTitle} italic={["saber.", "know."]} />
          </div>
          <ul className="lg:col-span-8">
            {clubFaq.map((f, i) => {
              const on = open === i;
              return (
                <li key={i} className="border-b border-porcelain/10">
                  <button
                    type="button"
                    onClick={() => setOpen(on ? null : i)}
                    aria-expanded={on}
                    data-cursor="hover"
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className={cn("font-display text-[clamp(1.25rem,2vw,1.8rem)] leading-snug transition-colors", on ? "text-porcelain" : "text-porcelain/70")}>{f.q[locale]}</span>
                    <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-porcelain/15 transition-transform duration-500 ease-[var(--ease-out-expo)]", on && "rotate-45 bg-porcelain text-night")}>
                      <Plus className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 text-pretty text-base leading-relaxed text-porcelain/60">{f.a[locale]}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
