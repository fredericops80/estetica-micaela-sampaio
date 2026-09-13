export const clinic = {
  name: "Estética Micaela Sampaio",
  shortName: "Micaela Sampaio",
  tagline: "Estética Científica & Bem-Estar",
  founder: {
    name: "Micaela Sampaio",
    role: { pt: "Estetocosmetóloga", en: "Aesthetic Cosmetologist" },
  },
  address: {
    street: "Praceta 25 de Abril, 140",
    postal: "4400-401",
    city: "Vila Nova de Gaia",
    country: "Portugal",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Praceta+25+de+Abril+140+Vila+Nova+de+Gaia",
    // Google Maps embed — no API key needed for the basic "place" embed
    embedUrl:
      "https://www.google.com/maps?q=Praceta+25+de+Abril+140,+4400-401+Vila+Nova+de+Gaia&z=16&output=embed",
  },
  phone: "+351 912 420 210",
  phoneRaw: "351912420210",
  email: "geral@esteticamicaelasampaio.com",
  instagram: "esteticamicaelasampaio",
  instagramUrl: "https://www.instagram.com/esteticamicaelasampaio/",
  whatsappUrl: (text: string) =>
    `https://wa.me/351912420210?text=${encodeURIComponent(text)}`,
  clubGroupUrl: "https://chat.whatsapp.com/HLl2BPrzpwKF2bsqWIQ0Ro?mode=gi_t",
  bookrUrl: "https://estetica-micaela-sampaio.bookr.pt/",
  siteUrl: "https://esteticamicaelasampaio.com",
  clubUrl: "https://club.esteticamicaelasampaio.com",
  /** ISO weekday 1 = Monday … 7 = Sunday */
  hours: [
    { days: [2, 3, 4, 5], open: "09:30", close: "19:30" },
    { days: [6], open: "09:00", close: "14:00" },
  ],
  closedDays: [1, 7],
  timezone: "Europe/Lisbon",
  /** Optional promo. Set `until` in the past (or null) to hide. */
  promo: {
    until: "2026-09-30",
    pt: {
      label: "Condição especial de setembro",
      text: "A sua primeira experiência de Drenagem Linfática por 40€ em vez de 50€.",
      cta: "Quero marcar",
    },
    en: {
      label: "September special",
      text: "Your first Lymphatic Drainage experience for €40 instead of €50.",
      cta: "Book it",
    },
  },
} as const;

export function formatHours(locale: "pt" | "en") {
  const names =
    locale === "pt"
      ? ["", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]
      : ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return clinic.hours.map((h) => {
    const first = names[h.days[0]];
    const last = names[h.days[h.days.length - 1]];
    const range = h.days.length > 1 ? `${first} – ${last}` : first;
    return { range, time: `${h.open} – ${h.close}` };
  });
}
