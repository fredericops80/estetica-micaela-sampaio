import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { clinic } from "@/data/clinic";
import { localePath, type Dictionary, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

export function Footer({ dict, locale, dark }: { dict: Dictionary; locale: Locale; dark?: boolean }) {
  const home = localePath(locale, "/");
  const p = home === "/" ? "" : home;
  const year = new Date().getFullYear();
  return (
    <footer className={cn("relative overflow-hidden", dark ? "bg-night text-porcelain" : "bg-sand text-ink")}>
      <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo href={home} light={dark} size={72} />
            <p className={cn("mt-6 max-w-sm text-pretty text-base leading-relaxed", dark ? "text-porcelain/60" : "text-ink-soft")}>{dict.footer.tagline}</p>
          </div>
          <div className="md:col-span-2">
            <p className={cn("eyebrow mb-5", dark && "text-porcelain/40")}>{dict.footer.navigate}</p>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                [dict.nav.treatments, `${p}/#tratamentos`],
                [dict.nav.about, `${p}/#micaela`],
                [dict.nav.results, `${p}/#resultados`],
                [dict.nav.club, localePath(locale, "/club")],
                [dict.nav.bookLong, localePath(locale, "/agendar")],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className={cn("transition-colors", dark ? "text-porcelain/70 hover:text-porcelain" : "text-ink/70 hover:text-ink")} data-cursor="hover">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className={cn("eyebrow mb-5", dark && "text-porcelain/40")}>{dict.visit.contactTitle}</p>
            <ul className={cn("flex flex-col gap-3 text-sm", dark ? "text-porcelain/70" : "text-ink/70")}>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rose-deep" strokeWidth={1.5} />
                <a href={clinic.address.mapsUrl} target="_blank" rel="noreferrer" className="hover:underline">
                  {clinic.address.street}
                  <br />
                  {clinic.address.postal} {clinic.address.city}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-rose-deep" strokeWidth={1.5} />
                <a href={`tel:+${clinic.phoneRaw}`} className="hover:underline">{clinic.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <InstagramIcon className="h-4 w-4 shrink-0 text-rose-deep" />
                <a href={clinic.instagramUrl} target="_blank" rel="noreferrer" className="hover:underline">@{clinic.instagram}</a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className={cn("eyebrow mb-5", dark && "text-porcelain/40")}>{dict.visit.hoursTitle}</p>
            <ul className={cn("flex flex-col gap-2 text-sm", dark ? "text-porcelain/70" : "text-ink/70")}>
              <li>{locale === "pt" ? "Ter – Sex" : "Tue – Fri"} · 09:30 – 19:30</li>
              <li>{locale === "pt" ? "Sáb" : "Sat"} · 09:00 – 14:00</li>
              <li className="opacity-60">{dict.visit.closed}</li>
            </ul>
          </div>
        </div>

        <div className={cn("mt-20 flex flex-col gap-4 border-t pt-6 text-[0.7rem] uppercase tracking-[0.18em] md:flex-row md:items-center md:justify-between", dark ? "border-porcelain/10 text-porcelain/40" : "border-ink/10 text-ink/50")}>
          <p>© {year} {clinic.name}. {dict.footer.rights}</p>
          <p>{dict.footer.made}</p>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className={cn("font-display -mb-[0.22em] whitespace-nowrap text-center text-[clamp(4rem,17vw,18rem)] leading-none", dark ? "text-porcelain/[0.04]" : "text-ink/[0.045]")}>
          Micaela Sampaio
        </p>
      </div>
    </footer>
  );
}
