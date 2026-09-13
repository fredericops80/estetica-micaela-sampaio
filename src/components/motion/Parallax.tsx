"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  /** positive moves slower than scroll (background feel), negative faster */
  speed?: number;
  className?: string;
  scale?: boolean;
}

export function Parallax({ children, speed = 0.15, className, scale = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const raw = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);
  const y = useSpring(raw, { stiffness: 80, damping: 25, mass: 0.4 });
  const s = useTransform(scrollYProgress, [0, 1], scale ? [1.15, 1] : [1, 1]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y, scale: s }} className="relative h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
