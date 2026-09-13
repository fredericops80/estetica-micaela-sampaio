import { clubTreatments } from "@/data/club";
import type { Dictionary } from "@/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";

function Col({ title, items, offset }: { title: string; items: string[]; offset: number }) {
  return (
    <div>
      <p className="eyebrow mb-6 text-porcelain/40">{title}</p>
      <ul>
        {items.map((it, i) => (
          <FadeIn key={it} delay={0.04 * i + offset} y={14}>
            <li className="group flex items-baseline justify-between border-b border-porcelain/10 py-4" data-cursor="hover">
              <span className="font-display text-[clamp(1.4rem,2.4vw,2.2rem)] text-porcelain/85 transition-colors group-hover:text-porcelain">{it}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-porcelain/20 transition-all duration-500 group-hover:scale-150 group-hover:bg-gold" />
            </li>
          </FadeIn>
        ))}
      </ul>
    </div>
  );
}

export function ClubMenu({ dict }: { dict: Dictionary }) {
  const c = dict.clubPage;
  return (
    <section className="relative bg-night-2 py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading dark eyebrow={c.treatmentsEyebrow} title={c.treatmentsTitle} italic={["escolher.", "choose."]} />
          </div>
          <div className="grid gap-12 md:grid-cols-2 lg:col-span-8">
            <Col title={c.facial} items={clubTreatments.facial} offset={0} />
            <Col title={c.advanced} items={clubTreatments.advanced} offset={0.2} />
          </div>
        </div>
      </div>
    </section>
  );
}
