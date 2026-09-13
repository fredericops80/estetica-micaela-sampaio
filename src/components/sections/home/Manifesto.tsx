import { TextReveal } from "@/components/motion/TextReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { Counter } from "@/components/motion/Counter";
import type { Dictionary } from "@/i18n";

export function Manifesto({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <FadeIn y={12} className="md:col-span-3">
            <p className="eyebrow">{dict.manifesto.eyebrow}</p>
          </FadeIn>
          <div className="md:col-span-9">
            <TextReveal
              as="p"
              text={dict.manifesto.text}
              italic={["paciência", "patience", "sua", "seu", "yours", "todas"]}
              stagger={0.018}
              className="font-display text-balance text-[clamp(1.8rem,3.6vw,3.4rem)] leading-[1.15] text-ink"
            />
            <div className="mt-16 grid grid-cols-3 gap-6 border-t border-ink/10 pt-8">
              {dict.manifesto.stats.map((s, i) => (
                <FadeIn key={s.label} delay={0.1 * i} className="flex flex-col gap-2">
                  <Counter value={s.value} className="font-display text-[clamp(2rem,4vw,3.6rem)] leading-none text-ink" />
                  <span className="text-[0.65rem] uppercase tracking-[0.22em] text-mute">{s.label}</span>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
