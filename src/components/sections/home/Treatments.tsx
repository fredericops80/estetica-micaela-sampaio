"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { categories, formatDuration, formatPrice, services, type ServiceCategory } from "@/data/services";
import { clinic } from "@/data/clinic";
import { localePath, t, type Dictionary, type Locale } from "@/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Filter = ServiceCategory | "all";

export function Treatments({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [activeId, setActiveId] = useState<string>(services[1].id);
  const [expanded, setExpanded] = useState<string | null>(null);

  const list = useMemo(() => (filter === "all" ? services : services.filter((s) => s.category === filter)), [filter]);
  const active = services.find((s) => s.id === activeId) ?? services[0];

  return (
    <section id="tratamentos" className="relative scroll-mt-20 border-t border-ink/10 py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading eyebrow={dict.treatments.eyebrow} title={dict.treatments.title} italic={["protocolo.", "protocol."]} text={dict.treatments.intro} className="lg:col-span-8" />
          <div className="flex flex-wrap gap-2 lg:col-span-4 lg:justify-end" role="tablist" aria-label={dict.treatments.eyebrow}>
            {(["all", ...categories.map((c) => c.id)] as Filter[]).map((f) => {
              const label = f === "all" ? dict.treatments.all : categories.find((c) => c.id === f)!.label[locale];
              const on = filter === f;
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setFilter(f)}
                  data-cursor="hover"
                  className={cn(
                    "rounded-full border px-4 py-2 text-[0.65rem] font-medium uppercase tracking-[0.2em] transition-all duration-500",
                    on ? "border-ink bg-ink text-porcelain" : "border-ink/15 text-ink/60 hover:border-ink/40 hover:text-ink"
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* List */}
          <ul className="lg:col-span-7" onMouseLeave={() => undefined}>
            <AnimatePresence initial={false}>
              {list.map((s, i) => {
                const isActive = s.id === activeId;
                const isOpen = expanded === s.id;
                return (
                  <motion.li
                    key={s.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.02 }}
                    className="border-b border-ink/10"
                  >
                    <button
                      type="button"
                      onMouseEnter={() => setActiveId(s.id)}
                      onFocus={() => setActiveId(s.id)}
                      onClick={() => {
                        setActiveId(s.id);
                        setExpanded((v) => (v === s.id ? null : s.id));
                      }}
                      aria-expanded={isOpen}
                      data-cursor="hover"
                      className="group relative flex w-full items-baseline gap-4 py-5 text-left md:gap-8 md:py-6"
                    >
                      <span
                        aria-hidden
                        className={cn("absolute inset-x-[-1rem] inset-y-0 -z-10 origin-left scale-x-0 rounded-2xl bg-sand transition-transform duration-500 ease-[var(--ease-out-expo)]", isActive && "scale-x-100")}
                      />
                      <span className="w-7 shrink-0 font-display text-sm text-mute md:text-base">{String(i + 1).padStart(2, "0")}</span>
                      <span className="flex flex-1 flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
                        <span className={cn("font-display text-[clamp(1.35rem,2.6vw,2.2rem)] leading-tight transition-colors duration-500", isActive ? "text-ink" : "text-ink/80")}>
                          {s.name}
                        </span>
                        <span className="text-[0.62rem] uppercase tracking-[0.22em] text-mute">{categories.find((c) => c.id === s.category)!.label[locale]}</span>
                      </span>
                      <span className="hidden shrink-0 items-center gap-2 text-sm text-ink-soft sm:flex">
                        <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
                        {formatDuration(s.durationMin, locale)}
                      </span>
                      <span className="shrink-0 font-display text-lg text-ink md:text-xl">{formatPrice(s.price)}</span>
                      <ArrowUpRight className={cn("hidden h-5 w-5 shrink-0 self-center text-ink transition-all duration-500 md:block", isActive ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0")} strokeWidth={1.25} />
                    </button>

                    {/* Mobile / tap detail */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="detail"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden lg:hidden"
                        >
                          <div className="pb-7 pl-11 md:pl-15">
                            <p className="text-pretty text-sm leading-relaxed text-ink-soft">{s.description[locale]}</p>
                            <ul className="mt-4 flex flex-wrap gap-2">
                              {s.benefits[locale].map((b) => (
                                <li key={b} className="rounded-full border border-ink/10 px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-ink/70">{b}</li>
                              ))}
                            </ul>
                            <div className="mt-6 flex flex-wrap gap-3">
                              <Button href={`${localePath(locale, "/agendar")}?servico=${s.id}`} size="sm" magnetic={false}>{dict.treatments.book}</Button>
                              <Button href={clinic.whatsappUrl(t(dict.whatsappMessages.service, { service: s.name }))} external variant="outline" size="sm" magnetic={false}>{dict.nav.whatsapp}</Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </AnimatePresence>
            <p className="mt-6 text-[0.65rem] uppercase tracking-[0.2em] text-mute">{dict.treatments.fromBookr} · {dict.treatments.consultNote}</p>
          </ul>

          {/* Sticky detail panel (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <AnimatePresence mode="wait">
                <motion.article
                  key={active.id}
                  initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden rounded-[2rem] border border-ink/10 bg-porcelain"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                    <Image
                      src={`/assets/skin/${String(active.frame).padStart(3, "0")}.webp`}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(250,246,242,0.9)_100%)]" />
                    <div className="absolute bottom-5 left-6 flex items-center gap-3">
                      <span className="rounded-full bg-ink px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-porcelain">{categories.find((c) => c.id === active.category)!.label[locale]}</span>
                      <span className="rounded-full border border-ink/15 bg-porcelain/70 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-ink backdrop-blur">{formatDuration(active.durationMin, locale)}</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-3xl leading-tight text-ink">{active.name}</h3>
                      <span className="font-display text-2xl text-ink">{formatPrice(active.price)}</span>
                    </div>
                    <p className="mt-4 text-pretty text-sm leading-relaxed text-ink-soft">{active.description[locale]}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {active.benefits[locale].map((b) => (
                        <li key={b} className="rounded-full border border-ink/10 px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-ink/70">{b}</li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button href={`${localePath(locale, "/agendar")}?servico=${active.id}`} size="sm" icon>{dict.treatments.book}</Button>
                      <Button href={clinic.whatsappUrl(t(dict.whatsappMessages.service, { service: active.name }))} external variant="ghost" size="sm">{dict.treatments.ask}</Button>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
