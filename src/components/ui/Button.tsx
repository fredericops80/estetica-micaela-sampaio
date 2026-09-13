"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/motion/Magnetic";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "light" | "dark";
type Size = "sm" | "md" | "lg";

interface Props {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
  icon?: boolean;
  magnetic?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
}

const base =
  "group relative inline-flex items-center justify-center gap-3 rounded-full font-sans font-medium tracking-[0.08em] uppercase transition-all duration-500 ease-[var(--ease-out-expo)] overflow-hidden select-none disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-porcelain hover:text-ink",
  outline: "border border-ink/25 text-ink hover:border-ink hover:text-porcelain",
  ghost: "text-ink hover:text-rose-deep",
  light: "bg-porcelain text-ink hover:text-porcelain",
  dark: "bg-night text-porcelain hover:text-night",
};
const sweeps: Record<Variant, string> = {
  primary: "bg-[linear-gradient(120deg,#d4979e,#e3a78f,#d9b36a)]",
  outline: "bg-ink",
  ghost: "",
  light: "bg-ink",
  dark: "bg-[linear-gradient(120deg,#d4979e,#e3a78f,#d9b36a)]",
};
const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.65rem]",
  md: "h-12 px-7 text-[0.7rem]",
  lg: "h-14 px-9 text-[0.75rem]",
};

export function Button({ href, onClick, children, variant = "primary", size = "md", className, external, icon, magnetic = true, type = "button", disabled }: Props) {
  const content = (
    <>
      {variant !== "ghost" && (
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 -z-0 origin-left scale-x-0 rounded-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100",
            sweeps[variant]
          )}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (
          <ArrowUpRight className="h-[1.1em] w-[1.1em] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
        )}
      </span>
    </>
  );
  const cls = cn(base, variants[variant], sizes[size], className);

  const el = href ? (
    external ? (
      <a href={href} target="_blank" rel="noreferrer" className={cls} data-cursor="hover">
        {content}
      </a>
    ) : (
      <Link href={href} className={cls} data-cursor="hover">
        {content}
      </Link>
    )
  ) : (
    <button type={type} onClick={onClick} className={cls} data-cursor="hover" disabled={disabled}>
      {content}
    </button>
  );

  return magnetic ? <Magnetic className="inline-block">{el}</Magnetic> : el;
}
