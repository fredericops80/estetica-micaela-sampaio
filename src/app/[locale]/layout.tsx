import type { Metadata } from "next";
import { Fraunces, Jost } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDictionary, isLocale, locales, localePath, type Locale } from "@/i18n";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { DictionaryProvider } from "@/components/providers/DictionaryProvider";
import { Header } from "@/components/layout/Header";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { PromoBar } from "@/components/layout/PromoBar";
import { Cursor } from "@/components/ui/Cursor";
import { Analytics } from "@/components/Analytics";
import { clinic } from "@/data/clinic";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(clinic.siteUrl),
    title: { default: dict.meta.title, template: `%s | ${clinic.shortName}` },
    description: dict.meta.description,
    alternates: {
      canonical: localePath(locale, "/"),
      languages: { "pt-PT": "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      locale: locale === "pt" ? "pt_PT" : "en_GB",
      siteName: clinic.name,
      title: dict.meta.title,
      description: dict.meta.description,
      images: [{ url: "/assets/skin/poster.jpg", width: 1280, height: 720 }],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: clinic.name,
    url: clinic.siteUrl,
    telephone: clinic.phone,
    image: `${clinic.siteUrl}/assets/skin/poster.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address.street,
      postalCode: clinic.address.postal,
      addressLocality: clinic.address.city,
      addressCountry: "PT",
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:30", closes: "19:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "09:00", closes: "14:00" },
    ],
    sameAs: [clinic.instagramUrl],
    founder: { "@type": "Person", name: clinic.founder.name, jobTitle: clinic.founder.role[locale as Locale] },
  };

  return (
    <html lang={locale === "pt" ? "pt-PT" : "en"} className={`${fraunces.variable} ${jost.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <DictionaryProvider dict={dict} locale={locale as Locale}>
          <SmoothScroll>
            <Header />
            <main>{children}</main>
            <WhatsAppFab />
            <PromoBar />
            <Cursor />
          </SmoothScroll>
        </DictionaryProvider>
        <Analytics />
      </body>
    </html>
  );
}
