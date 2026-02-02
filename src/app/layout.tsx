import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from "@next/third-parties/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Estética Micaela Sampaio | Estética Científica & Bem-Estar",
  description: "Clínica boutique em Vila Nova de Gaia. Tratamentos personalizados de estética facial e corporal.",
  openGraph: {
    title: "Estética Micaela Sampaio | Estética Científica & Bem-Estar",
    description: "Clínica boutique em Vila Nova de Gaia. Tratamentos personalizados de estética facial e corporal.",
    type: "website",
    locale: "pt_PT",
    url: "https://esteticamicaelasampaio.com",
    siteName: "Estética Micaela Sampaio",
  },
};

import { SiteConfigProvider } from "@/providers/SiteConfigProvider";
import prisma from "@/lib/prisma";

async function getGoogleAnalyticsId() {
  try {
    const config = await prisma.siteConfig.findUnique({
      where: { key: "layout_config" }
    });
    if (config?.value) {
      const parsed = JSON.parse(config.value);
      return parsed.googleAnalyticsId || process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "";
    }
  } catch (e) {
    console.error("Failed to fetch GA ID", e);
  }
  return process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = await getGoogleAnalyticsId();

  return (
    <html lang="pt">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        cormorant.variable,
        montserrat.variable
      )}>
        <SiteConfigProvider>
          {children}
        </SiteConfigProvider>
        <GoogleAnalytics gaId={gaId} />
      </body>
    </html>
  );
}
