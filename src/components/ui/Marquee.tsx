import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Marquee({ children, className, duration = 40, reverse }: { children: ReactNode; className?: string; duration?: number; reverse?: boolean }) {
  return (
    <div className={cn("marquee relative flex w-full overflow-hidden", className)} aria-hidden>
      <div
        className="marquee-track flex w-max shrink-0 items-center"
        style={{ ["--marquee-duration" as string]: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">{children}</div>
      </div>
    </div>
  );
}
