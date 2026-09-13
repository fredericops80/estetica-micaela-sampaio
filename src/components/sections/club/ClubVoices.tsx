import { testimonials } from "@/data/testimonials";
import type { Dictionary, Locale } from "@/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";

export function ClubVoices({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section className="relative border-t border-porcelain/10 bg-night-2 py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeading dark eyebrow={dict.testimonials.eyebrow} title={dict.clubPage.testimonialsTitle} italic={["parte.", "members."]} />
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((q, i) => (
            <FadeIn key={q.id} delay={i * 0.08} className="h-full">
              <figure className="flex h-full flex-col justify-between rounded-[1.5rem] border border-porcelain/10 p-7">
                <blockquote className="font-display display-italic text-pretty text-xl leading-snug text-porcelain/90">“{q[locale]}”</blockquote>
                <figcaption className="mt-8 flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.22em] text-porcelain/45">
                  <span className="h-px w-6 bg-gold" />
                  {q.author}
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
