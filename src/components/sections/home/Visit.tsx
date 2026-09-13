"use client";

import { useSyncExternalStore } from "react";
import { MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";
import { clinic, formatHours } from "@/data/clinic";
import { openStatus } from "@/lib/hours";
import { localePath, t, type Dictionary, type Locale } from "@/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

let cachedKey = "";
let cachedStatus: ReturnType<typeof openStatus> | null = null;
function getStatusSnapshot() {
  const key = new Date().toISOString().slice(0, 16); // per minute
  if (key !== cachedKey) {
    cachedKey = key;
    cachedStatus = openStatus();
  }
  return cachedStatus;
}
function subscribeMinute(cb: () => void) {
  const id = setInterval(cb, 60_000);
  return () => clearInterval(id);
}

export function Visit({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const status = useSyncExternalStore(subscribeMinute, getStatusSnapshot, () => null);
  const hours = formatHours(locale);
  const dayNames = locale === "pt" ? ["", "segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"] : ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <section id="visite" className="relative scroll-mt-20 py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={dict.visit.eyebrow} title={dict.visit.title} italic={["Gaia."]} />

            <FadeIn delay={0.2} className="mt-12 grid gap-10 sm:grid-cols-2">
              <div>
                <p className="eyebrow mb-4">{dict.visit.hoursTitle}</p>
                <ul className="flex flex-col gap-2 text-sm text-ink">
                  {hours.map((h) => (
                    <li key={h.range} className="flex justify-between gap-6 border-b border-ink/10 pb-2">
                      <span>{h.range}</span>
                      <span className="text-ink-soft">{h.time}</span>
                    </li>
                  ))}
                  <li className="pt-1 text-xs text-mute">{dict.visit.closed}</li>
                </ul>
                {status && (
                  <p className="mt-4 flex items-center gap-2 text-xs">
                    <span className={cn("h-2 w-2 rounded-full", status.open ? "bg-emerald-500" : "bg-rose-deep")} />
                    {status.open
                      ? dict.visit.openNow
                      : `${dict.visit.closedNow} · ${t(dict.visit.opensAt, { day: status.isToday ? (locale === "pt" ? "hoje" : "today") : dayNames[status.nextDay], time: status.nextOpen })}`}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-6">
                <div>
                  <p className="eyebrow mb-4">{dict.visit.addressTitle}</p>
                  <a href={clinic.address.mapsUrl} target="_blank" rel="noreferrer" className="flex items-start gap-3 text-sm text-ink hover:underline" data-cursor="hover">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rose-deep" strokeWidth={1.5} />
                    <span>
                      {clinic.address.street}
                      <br />
                      {clinic.address.postal} {clinic.address.city}
                    </span>
                  </a>
                </div>
                <div>
                  <p className="eyebrow mb-4">{dict.visit.contactTitle}</p>
                  <ul className="flex flex-col gap-2 text-sm text-ink">
                    <li>
                      <a href={`tel:+${clinic.phoneRaw}`} className="flex items-center gap-3 hover:underline" data-cursor="hover">
                        <Phone className="h-4 w-4 text-rose-deep" strokeWidth={1.5} />
                        {clinic.phone}
                      </a>
                    </li>
                    <li>
                      <a href={clinic.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:underline" data-cursor="hover">
                        <InstagramIcon className="h-4 w-4 text-rose-deep" />
                        @{clinic.instagram}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} className="mt-12 flex flex-wrap gap-3">
              <Button href={localePath(locale, "/agendar")} size="lg" icon>{dict.visit.cta}</Button>
              <Button href={clinic.whatsappUrl(dict.whatsappMessages.general)} external variant="outline" size="lg">{dict.visit.whatsapp}</Button>
            </FadeIn>
          </div>

          <FadeIn y={40} className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-sand md:aspect-[16/10]">
              <iframe
                title="Google Maps"
                src={clinic.address.embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.9] sepia-[0.25] contrast-[0.95] transition-all duration-700 hover:grayscale-0 hover:sepia-0"
              />
              <a
                href={clinic.address.mapsUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="absolute bottom-5 left-5 rounded-full bg-ink px-5 py-3 text-[0.65rem] uppercase tracking-[0.22em] text-porcelain"
              >
                {dict.visit.directions}
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
