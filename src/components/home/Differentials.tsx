import { FadeIn } from "@/components/animations/FadeIn";
import { Sparkles, ShieldCheck, Heart } from "lucide-react";

export function Differentials() {
    return (
        <section className="py-24 bg-primary/5 relative overflow-hidden">
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-primary/20">
                    <FadeIn delay={0.1} className="h-full">
                        <div className="flex flex-col items-center text-center gap-6 px-4 h-full">
                            <Sparkles className="w-10 h-10 text-primary stroke-[1.5]" />
                            <div>
                                <h3 className="text-xl font-serif text-foreground mb-3">Protocolos Exclusivos</h3>
                                <p className="text-muted-foreground font-light leading-relaxed text-sm">
                                    Combinamos a mais alta tecnologia com técnicas manuais milenares.
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.2} className="h-full">
                        <div className="flex flex-col items-center text-center gap-6 px-4 h-full pt-12 md:pt-0">
                            <ShieldCheck className="w-10 h-10 text-primary stroke-[1.5]" />
                            <div>
                                <h3 className="text-xl font-serif text-foreground mb-3">Privacidade Absoluta</h3>
                                <p className="text-muted-foreground font-light leading-relaxed text-sm">
                                    Atendimento individualizado em ambiente seguro e acolhedor.
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.3} className="h-full">
                        <div className="flex flex-col items-center text-center gap-6 px-4 h-full pt-12 md:pt-0">
                            <Heart className="w-10 h-10 text-primary stroke-[1.5]" />
                            <div>
                                <h3 className="text-xl font-serif text-foreground mb-3">Cosmética Premium</h3>
                                <p className="text-muted-foreground font-light leading-relaxed text-sm">
                                    Curadoria das melhores marcas mundiais para sua pele.
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    )
}
