"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import Image from "next/image";

import { useSiteConfig } from "@/providers/SiteConfigProvider";

export function Specialist() {
    const { specialistConfig } = useSiteConfig();

    return (
        <section id="especialista" className="py-24 bg-background overflow-hidden relative">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <FadeIn className="relative">
                    <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src={specialistConfig.imageUrl}
                            alt="Micaela Sampaio"
                            fill
                            className="object-cover"
                        />
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full -z-10 blur-2xl"></div>
                </FadeIn>

                <div className="space-y-6">
                    <FadeIn delay={0.2}>
                        <h2 className="text-4xl font-serif text-foreground">{specialistConfig.title}</h2>
                        <div className="w-16 h-1 bg-primary rounded-full"></div>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            {specialistConfig.description1}
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <p className="text-muted-foreground leading-relaxed">
                            {specialistConfig.description2}
                        </p>
                    </FadeIn>
                </div>
            </div>
        </section>
    )
}
