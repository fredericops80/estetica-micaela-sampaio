import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/i18n";
import { Hero } from "@/components/sections/home/Hero";
import { Manifesto } from "@/components/sections/home/Manifesto";
import { Treatments } from "@/components/sections/home/Treatments";
import { Signature } from "@/components/sections/home/Signature";
import { About } from "@/components/sections/home/About";
import { ClubTeaser } from "@/components/sections/home/ClubTeaser";
import { Results } from "@/components/sections/home/Results";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { Visit } from "@/components/sections/home/Visit";
import { Footer } from "@/components/layout/Footer";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Hero dict={dict} locale={locale} />
      <Manifesto dict={dict} />
      <Treatments dict={dict} locale={locale} />
      <Signature dict={dict} locale={locale} />
      <About dict={dict} locale={locale} />
      <ClubTeaser dict={dict} locale={locale} />
      <Results dict={dict} />
      <Testimonials dict={dict} locale={locale} />
      <Visit dict={dict} locale={locale} />
      <Footer dict={dict} locale={locale} />
    </>
  );
}
