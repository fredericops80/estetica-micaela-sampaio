import Image from "next/image";
import { Parallax } from "@/components/motion/Parallax";
import { FadeIn } from "@/components/motion/FadeIn";
import { TextReveal } from "@/components/motion/TextReveal";
import { Button } from "@/components/ui/Button";
import { Monogram } from "@/components/ui/Logo";
import { localePath, type Dictionary, type Locale } from "@/i18n";

export function About({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section id="micaela" className="relative scroll-mt-20 overflow-hidden py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Portraits */}
          <div className="relative lg:col-span-6">
            <FadeIn y={40} className="relative ml-auto w-[88%] md:w-[78%] lg:w-[82%]">
              <Parallax speed={0.08} scale className="aspect-[3/4] overflow-hidden rounded-[2rem]">
                <Image src="/assets/micaela/portrait-1.jpg" alt={dict.about.title} fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" priority={false} />
              </Parallax>
            </FadeIn>
            <FadeIn delay={0.25} y={60} className="absolute -bottom-10 left-0 w-[46%] md:w-[40%] lg:-bottom-16">
              <Parallax speed={-0.12} className="aspect-[3/4] overflow-hidden rounded-[1.5rem] shadow-[0_30px_60px_-30px_rgba(43,36,32,0.4)]">
                <Image src="/assets/micaela/portrait-2.jpg" alt="" fill sizes="30vw" className="object-cover" />
              </Parallax>
            </FadeIn>
            <div aria-hidden className="absolute left-0 top-4 hidden lg:block">
              <Monogram size={120} className="opacity-60" />
            </div>
          </div>

          {/* Copy */}
          <div className="flex flex-col justify-center pt-10 lg:col-span-6 lg:pl-12">
            <FadeIn y={12}>
              <p className="eyebrow">{dict.about.eyebrow}</p>
            </FadeIn>
            <TextReveal as="h2" text={dict.about.title} className="font-display mt-5 text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] text-ink" />
            <FadeIn delay={0.15}>
              <p className="mt-3 text-[0.7rem] uppercase tracking-[0.28em] text-rose-deep">{dict.about.role}</p>
            </FadeIn>
            <FadeIn delay={0.2} className="mt-10 flex flex-col gap-5 text-pretty text-base leading-relaxed text-ink-soft md:text-lg">
              <p>{dict.about.p1}</p>
              <p>{dict.about.p2}</p>
            </FadeIn>
            <FadeIn delay={0.3} className="mt-10 border-l-2 border-rose pl-6">
              <p className="font-display display-italic text-[clamp(1.5rem,2.6vw,2.2rem)] leading-snug text-ink">“{dict.about.quote}”</p>
            </FadeIn>
            <FadeIn delay={0.35} className="mt-12 grid gap-4 border-t border-ink/10 pt-8 sm:grid-cols-3">
              {dict.about.facts.map((f) => (
                <div key={f.label} className="flex flex-col gap-1">
                  <span className="text-[0.6rem] uppercase tracking-[0.22em] text-mute">{f.label}</span>
                  <span className="text-sm text-ink">{f.value}</span>
                </div>
              ))}
            </FadeIn>
            <FadeIn delay={0.4} className="mt-10">
              <Button href={`${localePath(locale, "/agendar")}?servico=consulta`} icon>{dict.about.cta}</Button>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
