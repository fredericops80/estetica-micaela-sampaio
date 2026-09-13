"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";

/**
 * Soft custom cursor. A small dot that follows instantly plus a lagging ring.
 * Elements with data-cursor="hover" grow it; data-cursor-label shows a word.
 */
function subscribePointer(cb: () => void) {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getFine = () => window.matchMedia("(pointer: fine)").matches;

export function Cursor() {
  const enabled = useSyncExternalStore(subscribePointer, getFine, () => false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hidden, setHidden] = useState(true);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.35 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.35 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setHover(!!t);
      setLabel(t?.dataset.cursorLabel ?? null);
    };
    const leave = () => setHidden(true);
    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink mix-blend-difference"
        style={{ x, y, opacity: hidden || label ? 0 : 1 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-rose-deep/70 bg-rose/10 backdrop-blur-[2px]"
        style={{ x: rx, y: ry }}
        animate={{
          width: label ? 88 : hover ? 56 : 32,
          height: label ? 88 : hover ? 56 : 32,
          opacity: hidden ? 0 : 1,
          backgroundColor: label ? "rgba(43,36,32,0.9)" : hover ? "rgba(212,151,158,0.18)" : "rgba(212,151,158,0.05)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        {label && <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-porcelain">{label}</span>}
      </motion.div>
    </>
  );
}
