"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import Image from "next/image";
import { BeforeAfter } from "@/components/ui/before-after";
import { useSiteConfig } from "@/providers/SiteConfigProvider";

export function Gallery() {
    const { galleryItems, beforeAfterItems } = useSiteConfig();

    return (
        <section className="py-24 bg-background relative overflow-hidden">

            {/* Results Section */}
            {beforeAfterItems.length > 0 && (
                <div className="container mx-auto px-6 mb-32">
                    <FadeIn>
                        <div className="text-center mb-16 space-y-4">
                            <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Transformações</span>
                            <h2 className="text-4xl md:text-5xl font-serif text-foreground">Resultados Reais</h2>
                            <p className="max-w-xl mx-auto text-muted-foreground font-light">Deslize para ver a diferença dos nossos protocolos exclusivos.</p>
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {beforeAfterItems.map((item, i) => (
                            <FadeIn key={item.id} delay={0.1 * (i + 1)}>
                                <div className="space-y-4">
                                    <BeforeAfter
                                        beforeImage={item.beforeImage}
                                        afterImage={item.afterImage}
                                    />
                                    <div className="text-center">
                                        <h3 className="font-serif text-xl">{item.title}</h3>
                                        <p className="text-muted-foreground text-sm">{item.description}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            )}

            {/* Space Gallery */}
            {galleryItems.length > 0 && (
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <div className="flex items-end justify-between mb-12 border-b border-border/40 pb-6">
                            <div>
                                <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">O Espaço</span>
                                <h2 className="text-3xl font-serif text-foreground mt-2">Um Refúgio de Paz</h2>
                            </div>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-[500px]">
                        {galleryItems.map((item, i) => (
                            <FadeIn
                                key={item.id}
                                delay={0.1 * i}
                                className={`relative rounded-lg overflow-hidden group ${i === 0 || i === 3 ? 'col-span-2' : ''} ${i === 0 ? 'row-span-2' : ''}`}
                            >
                                <Image
                                    src={item.imageUrl}
                                    alt={item.altText || "Galeria Micaela Sampaio"}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </FadeIn>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}
