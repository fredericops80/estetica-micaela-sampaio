import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      </body>
    </html>
  );
}
