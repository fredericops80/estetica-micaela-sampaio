"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ElementType } from "react";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  /** words to render in italic display style */
  italic?: string[];
  amount?: number;
}

/** Reveals a sentence word by word from behind a line mask. */
export function TextReveal({ text, as: Tag = "p", className, delay = 0, stagger = 0.035, once = true, italic = [], amount = 0.5 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, amount });
  const words = text.split(" ");
  const Comp = Tag as ElementType;

  return (
    <Comp ref={ref} className={cn("inline-block", className)} aria-label={text}>
      {words.map((w, i) => {
        const isItalic = italic.some((it) => w.replace(/[.,;:!?]/g, "") === it);
        return (
          <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]" aria-hidden>
            <motion.span
              className={cn("inline-block will-change-transform", isItalic && "display-italic brand-gradient-text")}
              initial={{ y: "110%", rotate: 2, opacity: 0 }}
              animate={inView ? { y: 0, rotate: 0, opacity: 1 } : undefined}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay + i * stagger }}
            >
              {w}
            </motion.span>
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </Comp>
  );
}
