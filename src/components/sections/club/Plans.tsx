import { Check } from "lucide-react";
import { clubPlans } from "@/data/club";
import { clinic } from "@/data/clinic";
import type { Dictionary, Locale } from "@/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Plans({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const c = dict.clubPage;
  return (
    <section id="planos" className="relative scroll-mt-20 py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeading dark eyebrow={c.plansEyebrow} title={c.plansTitle} italic={["ritmo.", "rhythm."]} align="center" />

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {clubPlans.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.12} className="h-full">
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-[2rem] p-[1px]",
                  p.highlight ? "bg-[linear-gradient(160deg,#d4979e,#e3a78f,#d9b36a)]" : "bg-porcelain/10"
                )}
              >
                <div className="flex h-full flex-col rounded-[calc(2rem-1px)] bg-night p-8 md:p-10">
                  <div className="flex items-center justify-between">
                    <p className="eyebrow text-porcelain/50">{p.name}</p>
                    {p.highlight && <span className="rounded-full bg-porcelain px-3 py-1 text-[0.58rem] uppercase tracking-[0.2em] text-night">{c.popular}</span>}
                  </div>
                  <div className="mt-8 flex items-baseline gap-3">
                    <span className={cn("font-display text-7xl leading-none", p.highlight ? "brand-gradient-text" : "text-porcelain")}>{p.sessionsPerMonth}</span>
                    <span className="text-sm text-porcelain/60">{c.perMonth}</span>
                  </div>

                  <dl className="mt-10 flex flex-col divide-y divide-porcelain/10 text-sm">
                    {[
                      [c.reschedules, p.reschedules[locale]],
                      [c.extras, `${p.extrasDiscount}%`],
                      [c.vouchers, p.giftVouchers[locale]],
                      [c.giftCards, `${p.giftCardDiscount}%`],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                        <dt className="text-porcelain/55">{k}</dt>
                        <dd className="text-right text-porcelain">{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <ul className="mt-6 flex flex-col gap-3">
                    {p.perks[locale].map((perk) => (
                      <li key={perk} className="flex items-start gap-3 text-sm text-porcelain/80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-10">
                    <Button
                      href={clinic.whatsappUrl(`${dict.whatsappMessages.club} (${p.name})`)}
                      external
                      variant={p.highlight ? "light" : "outline"}
                      className={cn("w-full", !p.highlight && "border-porcelain/30 text-porcelain hover:border-porcelain hover:text-night [&>span:first-child]:bg-porcelain")}
                      magnetic={false}
                      icon
                    >
                      {c.choose}
                    </Button>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <p className="mt-8 text-center text-xs text-porcelain/40">{c.plansNote}</p>
        </FadeIn>
      </div>
    </section>
  );
}
