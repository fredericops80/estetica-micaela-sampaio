
import { Metadata } from 'next';
import { HomePageContent } from '@/components/home/HomePageContent';

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

export default function Home() {
  return <HomePageContent />;
}
