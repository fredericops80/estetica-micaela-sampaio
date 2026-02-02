"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useSiteConfig } from "@/providers/SiteConfigProvider";

export function Hero() {
    const { heroConfig } = useSiteConfig();

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-accent/30 pt-20">
            {/* Background Image with Slow Zoom */}
            <motion.div
                initial={{ scale: 1.0 }}
                animate={{ scale: 1.1 }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-10"></div>
                <Image
                    src={heroConfig.backgroundImage || "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop"}
                    alt="Background Spa Texture"
                    fill
                    className="object-cover opacity-40"
                    priority
                />
            </motion.div>

            <div className="container relative z-10 mx-auto px-6 text-center max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="inline-block py-1 px-3 border border-primary/20 rounded-full text-xs uppercase tracking-[0.2em] text-primary/80 mb-6 bg-white/40 backdrop-blur-sm">
                        Estética Científica & Bem-Estar
                    </span>
                </motion.div>

                <motion.h1
                    className="font-serif text-6xl md:text-8xl lg:text-9xl font-light text-foreground leading-[0.9] tracking-tight mb-8"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                >
                    Arte & <span className="italic text-primary">Cuidar</span>
                    <br />
                    de Você.
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-12 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    Tratamentos personalizados que unem ciência e delicadeza para revelar sua melhor versão. Uma experiência exclusiva em Vila Nova de Gaia.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Button
                        size="lg"
                        className="rounded-none px-10 py-7 text-sm uppercase tracking-widest bg-foreground hover:bg-foreground/90 text-white min-w-[200px]"
                        onClick={() => document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Nossos Tratamentos
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="rounded-none px-10 py-7 text-sm uppercase tracking-widest border-foreground/20 hover:bg-white/50 bg-transparent text-foreground min-w-[200px] group"
                        onClick={() => window.open("https://wa.me/351912420210", "_blank")}
                    >
                        Agendar Agora
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 animate-pulse" />
            </motion.div>
        </section>
    );
}
