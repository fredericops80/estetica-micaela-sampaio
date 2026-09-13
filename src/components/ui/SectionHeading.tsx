import { cn } from "@/lib/utils";
import { TextReveal } from "@/components/motion/TextReveal";
import { FadeIn } from "@/components/motion/FadeIn";

interface Props {
  eyebrow?: string;
  title: string;
  italic?: string[];
  text?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
  size?: "md" | "lg";
}

export function SectionHeading({ eyebrow, title, italic = [], text, align = "left", className, dark, size = "md" }: Props) {
  return (
    <div className={cn("flex flex-col gap-5", align === "center" && "items-center text-center", className)}>
      {eyebrow && (
        <FadeIn y={12} className={cn("eyebrow", dark && "text-porcelain/50")}>
          {eyebrow}
        </FadeIn>
      )}
      <TextReveal
        as="h2"
        text={title}
        italic={italic}
        className={cn(
          "font-display text-balance leading-[1.02]",
          size === "md" ? "text-[clamp(2.4rem,5.2vw,4.6rem)]" : "text-[clamp(2.8rem,7vw,6.5rem)]",
          dark ? "text-porcelain" : "text-ink"
        )}
      />
      {text && (
        <FadeIn delay={0.25} className={cn("max-w-xl text-pretty text-base leading-relaxed md:text-lg", dark ? "text-porcelain/65" : "text-ink-soft")}>
          {text}
        </FadeIn>
      )}
    </div>
  );
}
