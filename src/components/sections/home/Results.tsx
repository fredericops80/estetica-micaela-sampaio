"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { beforeAfter } from "@/data/testimonials";
import type { Dictionary } from "@/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";

export function Results({ dict }: { dict: Dictionary }) {
  const [index, setIndex] = useState(0);
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const item = beforeAfter[index];

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <section id="resultados" className="relative scroll-mt-20 border-t border-ink/10 py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow={dict.results.eyebrow} title={dict.results.title} italic={["filtros.", "filters."]} text={dict.results.text} />
            <FadeIn delay={0.2} className="mt-10 flex flex-col">
              {beforeAfter.map((b, i) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    setIndex(i);
                    setPos(50);
                  }}
                  data-cursor="hover"
                  className={cn("flex items-center justify-between border-b border-ink/10 py-4 text-left transition-colors", i === index ? "text-ink" : "text-ink/45 hover:text-ink")}
                >
                  <span className="font-display text-xl">{b.treatment}</span>
                  <span className="text-[0.62rem] uppercase tracking-[0.22em]">{String(i + 1).padStart(2, "0")}</span>
                </button>
              ))}
            </FadeIn>
          </div>

          <FadeIn className="lg:col-span-8" y={40}>
            <div
              ref={ref}
              data-cursor="hover"
              data-cursor-label={dict.results.drag}
              className="relative aspect-square w-full touch-pan-y select-none overflow-hidden rounded-[2rem] bg-sand md:aspect-[4/3]"
              onPointerDown={(e) => {
                dragging.current = true;
                setIsDragging(true);
                (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
                update(e.clientX);
              }}
              onPointerMove={(e) => dragging.current && update(e.clientX)}
              onPointerUp={() => {
                dragging.current = false;
                setIsDragging(false);
              }}
              onPointerCancel={() => {
                dragging.current = false;
                setIsDragging(false);
              }}
            >
              <Image key={`a-${item.id}`} src={item.after} alt={dict.results.after} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
              <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
                <Image key={`b-${item.id}`} src={item.before} alt={dict.results.before} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
              </div>
              {/* handle */}
              <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
                <div className="absolute inset-y-0 -left-px w-px bg-porcelain/90 mix-blend-difference" />
                <motion.div
                  className="absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-porcelain/60 bg-ink/70 text-porcelain backdrop-blur"
                  animate={{ scale: isDragging ? 0.9 : 1 }}
                >
                  <svg width="18" height="10" viewBox="0 0 18 10" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M5 1 1 5l4 4M13 1l4 4-4 4" /></svg>
                </motion.div>
              </div>
              <span className="absolute left-5 top-5 rounded-full bg-porcelain/80 px-3 py-1 text-[0.6rem] uppercase tracking-[0.22em] text-ink backdrop-blur">{dict.results.before}</span>
              <span className="absolute right-5 top-5 rounded-full bg-ink/70 px-3 py-1 text-[0.6rem] uppercase tracking-[0.22em] text-porcelain backdrop-blur">{dict.results.after}</span>
              <input
                type="range"
                min={0}
                max={100}
                value={pos}
                onChange={(e) => setPos(Number(e.target.value))}
                aria-label={dict.results.drag}
                className="absolute inset-x-0 bottom-0 h-6 w-full cursor-ew-resize opacity-0"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
