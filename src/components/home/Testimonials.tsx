"use client";

import { useSiteConfig } from "@/providers/SiteConfigProvider";
import { FadeIn } from "@/components/animations/FadeIn";
import { Star } from "lucide-react";

export function Testimonials() {
    const { testimonials } = useSiteConfig();

    if (!testimonials.length) return null;

    return (
        <section className="py-32 bg-background relative overflow-hidden" id="depoimentos">
            <div className="container px-4 mx-auto">
                <FadeIn>
                    <div className="text-center mb-24 space-y-4">
                        <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Depoimentos</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground">Stories de Amor Próprio</h2>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {testimonials.map((testimonial, index) => (
                        <FadeIn key={testimonial.id} delay={index * 0.1}>
                            <div className="flex flex-col items-start space-y-6 group cursor-default">
                                <div className="flex gap-1 text-primary/60">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-3 h-3 ${i < testimonial.rating ? "fill-primary" : "text-border"}`}
                                        />
                                    ))}
                                </div>

                                <blockquote className="text-lg md:text-xl font-light text-foreground/80 leading-relaxed italic relative">
                                    &quot;{testimonial.text}&quot;
                                </blockquote>

                                <div className="pt-4 border-t border-border/30 w-full">
                                    <h4 className="font-serif font-medium text-foreground text-base tracking-wide">
                                        — {testimonial.name}
                                    </h4>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
