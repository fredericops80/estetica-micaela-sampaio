import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, localePath } from "@/i18n";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Footer } from "@/components/layout/Footer";

export async function generateMetadata({ params }: PageProps<"/[locale]/agendar">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.meta.bookingTitle,
    description: dict.meta.bookingDescription,
    alternates: { canonical: localePath(locale, "/agendar"), languages: { "pt-PT": "/agendar", en: "/en/agendar" } },
    robots: { index: false },
  };
}

export default async function BookingPage({ params, searchParams }: PageProps<"/[locale]/agendar">) {
  const { locale } = await params;
  const sp = await searchParams;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const preselected = typeof sp.servico === "string" ? sp.servico : undefined;
  const isDemo = !(process.env.BOOKR_API_URL && process.env.BOOKR_API_KEY);

  return (
    <>
      <BookingWizard dict={dict} locale={locale} preselected={preselected} demo={isDemo} />
      <Footer dict={dict} locale={locale} />
    </>
  );
}
