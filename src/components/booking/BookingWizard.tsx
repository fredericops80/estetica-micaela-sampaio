"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { categories, formatDuration, formatPrice, services, type Service, type ServiceCategory } from "@/data/services";
import { clinic } from "@/data/clinic";
import { localePath, type Dictionary, type Locale } from "@/i18n";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Slot = { start: string; end: string };
type Step = 0 | 1 | 2 | 3;

const pad = (n: number) => String(n).padStart(2, "0");
const toISODate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const isoWeekday = (d: Date) => ((d.getDay() + 6) % 7) + 1;

export function BookingWizard({ dict, locale, preselected, demo }: { dict: Dictionary; locale: Locale; preselected?: string; demo: boolean }) {
  const b = dict.booking;
  const [step, setStep] = useState<Step>(preselected && services.some((s) => s.id === preselected) ? 1 : 0);
  const [service, setService] = useState<Service | null>(services.find((s) => s.id === preselected) ?? null);
  const [filter, setFilter] = useState<ServiceCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [day, setDay] = useState<string | null>(null);
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "", consent: false });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ok: true; ref: string } | { ok: false } | null>(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => (filter === "all" || s.category === filter) && (!q || s.name.toLowerCase().includes(q)));
  }, [filter, query]);

  // Calendar grid
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const days = useMemo(() => {
    const first = new Date(month);
    const offset = isoWeekday(first) - 1;
    const cells: (Date | null)[] = Array(offset).fill(null);
    const n = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= n; i++) cells.push(new Date(month.getFullYear(), month.getMonth(), i));
    return cells;
  }, [month]);
  const isClosed = (d: Date) => (clinic.closedDays as readonly number[]).includes(isoWeekday(d));
  const isPast = (d: Date) => d < today;

  const abortRef = useRef<AbortController | null>(null);
  const selectDay = (iso: string) => {
    if (!service) return;
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setDay(iso);
    setSlots(null);
    setSlot(null);
    setLoading(true);
    fetch(`/api/bookr/slots?serviceId=${service.bookrId}&date=${iso}`, { signal: ctrl.signal })
      .then((r) => r.json())
      .then((j) => setSlots(j.slots ?? []))
      .catch((e) => e?.name !== "AbortError" && setSlots([]))
      .finally(() => !ctrl.signal.aborted && setLoading(false));
  };

  const submit = async () => {
    if (!service || !slot) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookr/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId: service.bookrId, start: slot.start, client: { name: form.name, phone: form.phone, email: form.email }, notes: form.notes, consent: form.consent, locale }),
      });
      const j = await res.json();
      setResult(res.ok ? { ok: true, ref: j.appointment.reference } : { ok: false });
      setStep(3);
    } catch {
      setResult({ ok: false });
      setStep(3);
    } finally {
      setSubmitting(false);
    }
  };

  const fmtDay = (iso: string) => {
    const d = new Date(`${iso}T00:00:00`);
    return `${b.weekdays[isoWeekday(d) - 1]}, ${d.getDate()} ${b.months[d.getMonth()]}`;
  };
  const fmtTime = (iso: string) => iso.slice(11, 16);
  const canSubmit = form.name.trim().length >= 3 && /^\+?[0-9 ]{9,16}$/.test(form.phone) && form.consent && !submitting;

  const variants = { enter: { opacity: 0, x: 24 }, center: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -24 } };

  return (
    <section className="relative min-h-screen pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">{b.eyebrow}</p>
            <h1 className="font-display mt-4 text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] text-ink">{b.title}</h1>
          </div>
          <ol className="flex flex-wrap items-center gap-3 text-[0.62rem] uppercase tracking-[0.22em]">
            {b.steps.map((s, i) => (
              <li key={s} className={cn("flex items-center gap-2", i <= step ? "text-ink" : "text-ink/35")}>
                <span className={cn("flex h-6 w-6 items-center justify-center rounded-full border text-[0.6rem]", i < step ? "border-ink bg-ink text-porcelain" : i === step ? "border-ink" : "border-ink/20")}>
                  {i < step ? <Check className="h-3 w-3" strokeWidth={2} /> : i + 1}
                </span>
                {s}
                {i < b.steps.length - 1 && <span className="mx-1 h-px w-6 bg-ink/15" />}
              </li>
            ))}
          </ol>
        </div>

        {demo && <p className="mt-6 inline-block rounded-full border border-gold/50 bg-gold/10 px-4 py-2 text-xs text-ink-soft">{b.demoNotice}</p>}

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {/* Step 0: service */}
              {step === 0 && (
                <motion.div key="s0" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}>
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap gap-2">
                      {(["all", ...categories.map((c) => c.id)] as const).map((f) => (
                        <button key={f} type="button" onClick={() => setFilter(f)} data-cursor="hover" className={cn("rounded-full border px-4 py-2 text-[0.62rem] uppercase tracking-[0.2em] transition-all", filter === f ? "border-ink bg-ink text-porcelain" : "border-ink/15 text-ink/60 hover:border-ink/40")}>
                          {b.categories[f]}
                        </button>
                      ))}
                    </div>
                    <label className="relative">
                      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mute" strokeWidth={1.5} />
                      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={b.searchPlaceholder} className="h-11 w-full rounded-full border border-ink/15 bg-transparent pl-11 pr-5 text-sm outline-none transition-colors focus:border-ink md:w-64" />
                    </label>
                  </div>
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {list.map((s) => (
                      <li key={s.id}>
                        <button
                          type="button"
                          data-cursor="hover"
                          onClick={() => {
                            setService(s);
                            setDay(null);
                            setSlot(null);
                            setStep(1);
                          }}
                          className={cn("group flex w-full flex-col gap-3 rounded-[1.5rem] border p-6 text-left transition-all duration-500 hover:-translate-y-0.5 hover:border-ink hover:shadow-[0_20px_40px_-25px_rgba(43,36,32,0.35)]", service?.id === s.id ? "border-ink bg-sand" : "border-ink/10")}
                        >
                          <span className="text-[0.6rem] uppercase tracking-[0.22em] text-mute">{categories.find((c) => c.id === s.category)!.label[locale]}</span>
                          <span className="font-display text-2xl leading-tight text-ink">{s.name}</span>
                          <span className="mt-auto flex items-center justify-between text-sm text-ink-soft">
                            <span>{formatDuration(s.durationMin, locale)}</span>
                            <span className="font-display text-lg text-ink">{formatPrice(s.price)}</span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Step 1: date & time */}
              {step === 1 && service && (
                <motion.div key="s1" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }} className="grid gap-10 md:grid-cols-2">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="eyebrow">{b.pickDay}</p>
                      <div className="flex items-center gap-2">
                        <button type="button" aria-label="prev" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} disabled={month <= new Date(today.getFullYear(), today.getMonth(), 1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 disabled:opacity-30" data-cursor="hover"><ChevronLeft className="h-4 w-4" strokeWidth={1.5} /></button>
                        <span className="w-32 text-center text-sm capitalize">{b.months[month.getMonth()]} {month.getFullYear()}</span>
                        <button type="button" aria-label="next" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15" data-cursor="hover"><ChevronRight className="h-4 w-4" strokeWidth={1.5} /></button>
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-7 gap-1 text-center text-[0.6rem] uppercase tracking-[0.18em] text-mute">
                      {b.weekdays.map((w) => <span key={w} className="py-2">{w}</span>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {days.map((d, i) =>
                        d ? (
                          <button
                            key={i}
                            type="button"
                            disabled={isClosed(d) || isPast(d)}
                            onClick={() => selectDay(toISODate(d))}
                            data-cursor="hover"
                            className={cn(
                              "aspect-square rounded-full text-sm transition-all duration-300 disabled:cursor-not-allowed disabled:text-ink/20",
                              day === toISODate(d) ? "bg-ink text-porcelain" : "hover:bg-sand",
                              toISODate(d) === toISODate(today) && day !== toISODate(d) && "font-medium text-rose-deep"
                            )}
                          >
                            {d.getDate()}
                          </button>
                        ) : (
                          <span key={i} />
                        )
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="eyebrow">{b.pickTime}</p>
                    <div className="mt-6 min-h-[12rem]">
                      {!day && <p className="text-sm text-mute">{b.pickDay}.</p>}
                      {day && loading && <p className="text-sm text-mute">{b.loadingSlots}</p>}
                      {day && !loading && slots && slots.length === 0 && <p className="text-sm text-mute">{b.noSlots}</p>}
                      {day && !loading && slots && slots.length > 0 && (
                        <motion.div className="grid grid-cols-3 gap-2 sm:grid-cols-4" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.03 } } }}>
                          {slots.map((s) => (
                            <motion.button
                              key={s.start}
                              type="button"
                              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                              onClick={() => setSlot(s)}
                              data-cursor="hover"
                              className={cn("rounded-full border py-2.5 text-sm transition-all", slot?.start === s.start ? "border-ink bg-ink text-porcelain" : "border-ink/15 hover:border-ink")}
                            >
                              {fmtTime(s.start)}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                    <div className="mt-8 flex items-center gap-3">
                      <Button variant="ghost" onClick={() => setStep(0)} magnetic={false}><ArrowLeft className="h-4 w-4" strokeWidth={1.5} />{b.back}</Button>
                      <Button onClick={() => setStep(2)} disabled={!slot} magnetic={false} icon>{b.next}</Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: details */}
              {step === 2 && (
                <motion.form
                  key="s2"
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                  }}
                  className="grid gap-6 md:grid-cols-2"
                >
                  {(
                    [
                      ["name", b.name, "text", true],
                      ["phone", b.phone, "tel", true],
                      ["email", b.email, "email", false],
                    ] as const
                  ).map(([k, label, type, req]) => (
                    <label key={k} className={cn("flex flex-col gap-2", k === "email" && "md:col-span-2")}>
                      <span className="text-[0.62rem] uppercase tracking-[0.22em] text-mute">{label}{req && " *"}</span>
                      <input
                        type={type}
                        required={req}
                        value={form[k]}
                        onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                        className="h-12 border-b border-ink/20 bg-transparent text-base outline-none transition-colors focus:border-ink"
                      />
                    </label>
                  ))}
                  <label className="flex flex-col gap-2 md:col-span-2">
                    <span className="text-[0.62rem] uppercase tracking-[0.22em] text-mute">{b.notes}</span>
                    <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder={b.notesPlaceholder} className="resize-none border-b border-ink/20 bg-transparent py-2 text-base outline-none transition-colors focus:border-ink" />
                  </label>
                  <label className="flex items-start gap-3 text-sm text-ink-soft md:col-span-2">
                    <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1 h-4 w-4 accent-ink" />
                    {b.consent}
                  </label>
                  <div className="flex items-center gap-3 md:col-span-2">
                    <Button variant="ghost" onClick={() => setStep(1)} magnetic={false}><ArrowLeft className="h-4 w-4" strokeWidth={1.5} />{b.back}</Button>
                    <Button type="submit" disabled={!canSubmit} magnetic={false} icon>{submitting ? b.submitting : b.confirm}</Button>
                  </div>
                </motion.form>
              )}

              {/* Step 3: result */}
              {step === 3 && result && (
                <motion.div key="s3" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="rounded-[2rem] bg-sand p-10 md:p-14">
                  {result.ok ? (
                    <>
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }} className="brand-gradient-bg flex h-16 w-16 items-center justify-center rounded-full text-ink">
                        <Check className="h-7 w-7" strokeWidth={1.5} />
                      </motion.div>
                      <h2 className="font-display mt-8 text-4xl text-ink md:text-5xl">{b.successTitle}</h2>
                      <p className="mt-4 max-w-md text-ink-soft">{b.successText}</p>
                      <p className="mt-6 text-[0.62rem] uppercase tracking-[0.22em] text-mute">{b.successRef} · <span className="text-ink">{result.ref}</span></p>
                    </>
                  ) : (
                    <>
                      <h2 className="font-display text-4xl text-ink md:text-5xl">{b.errorTitle}</h2>
                      <p className="mt-4 max-w-md text-ink-soft">{b.errorText}</p>
                      <div className="mt-8 flex gap-3">
                        <Button onClick={() => setStep(2)} magnetic={false}>{b.back}</Button>
                        <Button href={clinic.whatsappUrl(dict.whatsappMessages.general)} external variant="outline" magnetic={false}>{dict.nav.whatsapp}</Button>
                      </div>
                    </>
                  )}
                  <Link href={localePath(locale, "/")} className="mt-10 inline-block text-[0.65rem] uppercase tracking-[0.22em] underline underline-offset-4">{dict.clubPage.backHome}</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 rounded-[2rem] border border-ink/10 p-8">
              <p className="eyebrow">{b.summary}</p>
              <AnimatePresence mode="popLayout">
                {service ? (
                  <motion.div key={service.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6">
                    <p className="font-display text-3xl leading-tight text-ink">{service.name}</p>
                    <p className="mt-1 text-sm text-mute">{b.with}</p>
                    <dl className="mt-6 flex flex-col divide-y divide-ink/10 text-sm">
                      <div className="flex justify-between py-3"><dt className="text-mute">{dict.treatments.duration}</dt><dd>{formatDuration(service.durationMin, locale)}</dd></div>
                      <div className="flex justify-between py-3"><dt className="text-mute">{dict.treatments.price}</dt><dd className="font-display text-lg">{formatPrice(service.price)}</dd></div>
                      {day && <div className="flex justify-between py-3"><dt className="text-mute">{b.steps[1]}</dt><dd className="text-right">{fmtDay(day)}{slot ? `, ${fmtTime(slot.start)}` : ""}</dd></div>}
                    </dl>
                  </motion.div>
                ) : (
                  <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 text-sm text-mute">{b.steps[0]}…</motion.p>
                )}
              </AnimatePresence>
              <p className="mt-8 border-t border-ink/10 pt-6 text-xs text-mute">
                {b.fallback}{" "}
                <a href={clinic.whatsappUrl(dict.whatsappMessages.general)} target="_blank" rel="noreferrer" className="text-ink underline underline-offset-4">WhatsApp</a>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
