"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { useSiteConfig } from "@/providers/SiteConfigProvider";
import { Service } from "@/data/services";

export function Services() {
    const { services } = useSiteConfig();
    const facialServices = services.filter(s => s.category === "Facial");
    const corporalServices = services.filter(s => s.category === "Corporal");

    return (
        <section id="servicos" className="py-24 md:py-32 bg-background relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <FadeIn>
                    <div className="text-center mb-20 space-y-4">
                        <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Menu de Serviços</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground">Tratamentos Exclusivos</h2>
                        <p className="max-w-xl mx-auto text-muted-foreground font-light">Protocolos desenhados para resultados visíveis e relaxamento profundo.</p>
                    </div>
                </FadeIn>

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Facial Column */}
                    <div className="space-y-12">
                        <FadeIn delay={0.1}>
                            <h3 className="text-3xl font-serif text-foreground/80 italic mb-8">Facial</h3>
                            <div className="space-y-8">
                                {facialServices.map((service, idx) => (
                                    <ServiceItem key={service.id} service={service} />
                                ))}
                            </div>
                        </FadeIn>
                    </div>

                    {/* Corporal Column */}
                    <div className="space-y-12">
                        <FadeIn delay={0.2}>
                            <h3 className="text-3xl font-serif text-foreground/80 italic mb-8">Corporal & Spa</h3>
                            <div className="space-y-8">
                                {corporalServices.map((service, idx) => (
                                    <ServiceItem key={service.id} service={service} />
                                ))}
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ServiceItem({ service }: { service: Service }) {
    const message = encodeURIComponent(`Olá! Gostaria de agendar o procedimento ${service.name}.`);
    const whatsappUrl = `https://wa.me/351912420210?text=${message}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block cursor-pointer"
        >
            <div className="flex items-baseline justify-between mb-2">
                <h4 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                    {service.name}
                </h4>
                <div className="flex-1 mx-4 h-px bg-border/50 group-hover:bg-primary/30 transition-colors duration-300"></div>
                <span className="text-lg font-medium text-foreground/80 font-serif">{service.price}€</span>
            </div>
            <div className="flex justify-between items-start">
                <p className="text-sm text-muted-foreground max-w-[90%] leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                    {service.description}
                </p>
                <span className="text-xs text-primary/60 whitespace-nowrap ml-4">{service.duration}</span>
            </div>
        </a>
    );
}
