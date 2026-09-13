"use client";

import { useInView, useMotionValue, useSpring, motion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function Counter({ value, suffix = "", className }: { value: string; suffix?: string; className?: string }) {
  const num = parseFloat(value.replace(/[^\d.]/g, ""));
  const tail = value.replace(/[\d.]/g, "");
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });
  const text = useTransform(spring, (v) => `${Math.round(v)}${tail}${suffix}`);

  useEffect(() => {
    if (inView) mv.set(num);
  }, [inView, mv, num]);

  return <motion.span ref={ref} className={className}>{text}</motion.span>;
}
