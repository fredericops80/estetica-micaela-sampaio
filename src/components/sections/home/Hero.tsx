"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { localePath, type Dictionary, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

const FRAME_COUNT = 80;
const frameSrc = (i: number) => `/assets/skin/${String(i).padStart(3, "0")}.webp`;

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<(HTMLImageElement | null)[]>(Array(FRAME_COUNT).fill(null));
  const lastDrawn = useRef(-1);
  const [captionIndex, setCaptionIndex] = useState(0);
  const [layerIndex, setLayerIndex] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const frame = useTransform(smooth, [0.02, 0.9], [0, FRAME_COUNT - 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.08, 0.7, 0.95], [1, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.7, 0.95], [0, -60]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Draw a frame with "contain" fit, right-anchored on desktop.
  const draw = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let i = Math.round(index);
    // find nearest loaded frame at or below the requested one
    while (i >= 0 && !images.current[i]) i--;
    if (i < 0) return;
    const img = images.current[i]!;
    if (i === lastDrawn.current) return;
    lastDrawn.current = i;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width: cw, height: ch } = canvas;
    const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      lastDrawn.current = -1;
      draw(frame.get());
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Progressive preload: first frame, then coarse set, then everything.
    let cancelled = false;
    const load = (i: number) =>
      new Promise<void>((res) => {
        if (images.current[i]) return res();
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (!cancelled) {
            images.current[i] = img;
            lastDrawn.current = -1;
            draw(frame.get());
          }
          res();
        };
        img.onerror = () => res();
        img.src = frameSrc(i);
      });
    (async () => {
      await load(0);
      await Promise.all(Array.from({ length: FRAME_COUNT / 8 }, (_, k) => load(k * 8)));
      for (let i = 0; i < FRAME_COUNT && !cancelled; i++) await load(i);
    })();

    return () => {
      cancelled = true;
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(frame, "change", (v) => draw(v));
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setCaptionIndex(Math.min(3, Math.floor(v * 4.2)));
    setLayerIndex(Math.min(2, Math.floor(Math.max(0, v - 0.05) * 3.4)));
  });

  const lines = useMemo(() => [dict.hero.line1, dict.hero.line2, dict.hero.line3], [dict]);

  return (
    <section ref={ref} className="relative h-[340vh]" aria-label="Hero">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Skin block */}
        <div className="absolute inset-x-0 top-[calc(var(--header-h)+0.5rem)] h-[38vh] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-[62%]">
          <div className="absolute inset-0 [mask-image:radial-gradient(68%_66%_at_54%_50%,#000_42%,transparent_96%)]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
          {/* subtle ground */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_60%_60%,rgba(227,167,143,0.18),transparent_70%)]" />
        </div>

        {/* Layer labels */}
        <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-6 lg:flex xl:right-10">
          {dict.hero.layers.map((l, i) => (
            <div key={l} className="flex items-center justify-end gap-4">
              <span className={cn("text-[0.62rem] uppercase tracking-[0.3em] transition-colors duration-500", i === layerIndex ? "text-ink" : "text-ink/30")}>
                {l}
              </span>
              <span className={cn("h-px bg-ink transition-all duration-700 ease-[var(--ease-out-expo)]", i === layerIndex ? "w-14 opacity-100" : "w-6 opacity-30")} />
            </div>
          ))}
        </div>

        {/* Copy */}
        <motion.div style={{ opacity: textOpacity, y: textY }} className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-10 pt-32 md:px-10 lg:justify-center lg:pb-0">
          <motion.p
            className="eyebrow mb-4 lg:mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {dict.hero.eyebrow}
          </motion.p>
          <h1 className="font-display text-[clamp(2.9rem,10vw,9.5rem)] leading-[0.92] text-ink">
            {lines.map((line, i) => (
              <span key={i} className="line-mask">
                <motion.span
                  className={cn("block", i === 1 && "display-italic brand-gradient-text pr-2")}
                  initial={{ y: "105%", rotate: 1.5 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ delay: 0.55 + i * 0.12, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <div className="mt-5 grid max-w-2xl gap-8 md:grid-cols-[1fr_auto] md:items-end lg:mt-8">
            <div className="relative min-h-[4.5rem] lg:min-h-[3.5rem]">
              {dict.hero.captions.map((c, i) => (
                <motion.p
                  key={c}
                  className="absolute inset-0 max-w-md text-pretty text-[0.95rem] leading-relaxed text-ink-soft md:text-lg"
                  initial={false}
                  animate={{ opacity: captionIndex === i ? 1 : 0, y: captionIndex === i ? 0 : 10 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden={captionIndex !== i}
                >
                  {i === 0 ? dict.hero.sub : c}
                </motion.p>
              ))}
            </div>
          </div>

          <motion.div
            className="mt-6 flex flex-wrap items-center gap-4 lg:mt-10"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button href={localePath(locale, "/agendar")} size="lg" icon>
              {dict.hero.ctaPrimary}
            </Button>
            <Button href="#tratamentos" variant="ghost" size="lg" magnetic={false}>
              {dict.hero.ctaSecondary}
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll hint + progress */}
        <motion.div style={{ opacity: hintOpacity }} className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex">
          <span className="text-[0.6rem] uppercase tracking-[0.35em] text-ink/50">{dict.hero.scroll}</span>
          <motion.span className="block h-10 w-px bg-ink/30" animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }} />
        </motion.div>
        <motion.div style={{ scaleX: progressScale }} className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[linear-gradient(90deg,#d4979e,#e3a78f,#d9b36a)]" />
      </div>
    </section>
  );
}
