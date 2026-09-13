import Link from "next/link";
import { pt } from "@/i18n/dictionaries/pt";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="eyebrow">404</p>
      <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-none">{pt.notFound.title}</h1>
      <p className="text-ink-soft">{pt.notFound.text}</p>
      <Link href="/" className="mt-4 text-[0.7rem] uppercase tracking-[0.22em] underline underline-offset-4">
        {pt.notFound.cta}
      </Link>
    </section>
  );
}
