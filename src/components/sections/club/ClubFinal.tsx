import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { clinic } from "@/data/clinic";
import { localePath, type Dictionary, type Locale } from "@/i18n";
import { TextReveal } from "@/components/motion/TextReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";

export function ClubFinal({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const c = dict.clubPage;
  return (
    <section className="grain relative overflow-hidden border-t border-porcelain/10 py-28 md:py-44">
      <div aria-hidden className="drift pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,151,158,0.28),rgba(217,179,106,0.12)_45%,transparent_65%)] blur-3xl" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 text-center md:px-10">
        <TextReveal as="h2" text={c.finalTitle} italic={["propósito.", "purpose."]} className="font-display text-balance text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.95] text-porcelain" />
        <FadeIn delay={0.2}>
          <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-porcelain/65 md:text-lg">{c.finalText}</p>
        </FadeIn>
        <FadeIn delay={0.3} className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href={clinic.clubGroupUrl} external variant="light" size="lg" icon>{c.ctaJoin}</Button>
          <Button href={clinic.whatsappUrl(dict.whatsappMessages.club)} external variant="outline" size="lg" className="border-porcelain/30 text-porcelain hover:border-porcelain hover:text-night [&>span:first-child]:bg-porcelain">
            {dict.nav.whatsapp}
          </Button>
        </FadeIn>
        <FadeIn delay={0.4}>
          <Link href={localePath(locale, "/")} className="mt-14 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-porcelain/50 transition-colors hover:text-porcelain" data-cursor="hover">
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
            {c.backHome}
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
