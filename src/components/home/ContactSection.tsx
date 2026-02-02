"use client";

import { ContactForm } from "@/components/contact/ContactForm";
import { FadeIn } from "@/components/animations/FadeIn";

export function ContactSection() {
    return (
        <section id="contato" className="py-24 bg-secondary/20 relative">
            <div className="container mx-auto px-6 max-w-4xl">
                <FadeIn>
                    <div className="text-center mb-16 space-y-4">
                        <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Contato</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-foreground">Agende sua Experiência</h2>
                        <p className="text-muted-foreground font-light">Estamos esperando por você para um momento de autocuidado.</p>
                    </div>
                    <ContactForm />
                </FadeIn>
            </div>
        </section>
    );
}
