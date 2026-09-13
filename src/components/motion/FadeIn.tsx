"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props extends HTMLMotionProps<"div"> {
  delay?: number;
  y?: number;
  blur?: boolean;
  amount?: number;
  once?: boolean;
}

export function FadeIn({ delay = 0, y = 28, blur = false, amount = 0.3, once = true, className, children, ...rest }: Props) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y, filter: blur ? "blur(8px)" : "none" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
