"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Specialist } from "@/components/home/Specialist";
import { Services } from "@/components/home/Services";
import { Differentials } from "@/components/home/Differentials";
import { Testimonials } from "@/components/home/Testimonials";
import { Gallery } from "@/components/home/Gallery";
import { ContactSection } from "@/components/home/ContactSection";
import { useSiteConfig } from "@/providers/SiteConfigProvider";

export function HomePageContent() {
    const { layoutConfig, loading } = useSiteConfig();

    if (loading) {
        return <div className="min-h-screen bg-background flex items-center justify-center">Carregando...</div>;
    }

    const sections: Record<string, React.ReactNode> = {
        hero: <Hero key="hero" />,
        specialist: <Specialist key="specialist" />,
        services: <Services key="services" />,
        differentials: <Differentials key="differentials" />,
        testimonials: <Testimonials key="testimonials" />,
        gallery: <Gallery key="gallery" />,
        contact: <ContactSection key="contact" />
    };

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {layoutConfig.sectionOrder
                .filter(section => section.visible)
                .map(section => sections[section.id] || null)}

            <Footer />
        </main>
    );
}
