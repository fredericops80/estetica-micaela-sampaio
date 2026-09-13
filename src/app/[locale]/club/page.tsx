import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, localePath } from "@/i18n";
import { ClubHero } from "@/components/sections/club/ClubHero";
import { HowItWorks } from "@/components/sections/club/HowItWorks";
import { ClubMenu } from "@/components/sections/club/ClubMenu";
import { Plans } from "@/components/sections/club/Plans";
import { ClubVoices } from "@/components/sections/club/ClubVoices";
import { ClubFaq } from "@/components/sections/club/ClubFaq";
import { ClubFinal } from "@/components/sections/club/ClubFinal";
import { Footer } from "@/components/layout/Footer";

export async function generateMetadata({ params }: PageProps<"/[locale]/club">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.meta.clubTitle,
    description: dict.meta.clubDescription,
    alternates: { canonical: localePath(locale, "/club"), languages: { "pt-PT": "/club", en: "/en/club" } },
  };
}

export default async function ClubPage({ params }: PageProps<"/[locale]/club">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <div className="dark bg-night text-porcelain" data-theme="dark">
      <ClubHero dict={dict} locale={locale} />
      <HowItWorks dict={dict} />
      <ClubMenu dict={dict} />
      <Plans dict={dict} locale={locale} />
      <ClubVoices dict={dict} locale={locale} />
      <ClubFaq dict={dict} locale={locale} />
      <ClubFinal dict={dict} locale={locale} />
      <Footer dict={dict} locale={locale} dark />
    </div>
  );
}
