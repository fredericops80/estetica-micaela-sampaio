"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { useSiteConfig } from "@/providers/SiteConfigProvider";

export function Navbar() {
    const { layoutConfig } = useSiteConfig();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out py-6 px-6 md:px-12 flex items-center justify-between",
                isScrolled ? "bg-white/70 backdrop-blur-xl shadow-sm py-4 border-b border-white/20" : "bg-transparent"
            )}
        >
            <div className="flex items-center gap-2">
                <Link href="/" className="text-3xl font-serif font-light tracking-wide text-foreground hover:opacity-80 transition-opacity">
                    {layoutConfig.logoUrl ? (
                        <div className="relative h-12 w-auto aspect-[3/1]">
                            <img
                                src={layoutConfig.logoUrl}
                                alt="Micaela Sampaio"
                                className="h-full w-auto object-contain"
                            />
                        </div>
                    ) : (
                        "Micaela Sampaio"
                    )}
                </Link>
            </div>

            <div className="hidden md:flex gap-10 items-center text-sm font-medium uppercase tracking-widest text-foreground/80">
                <Link href="#servicos" className="hover:text-primary transition-colors hover:underline underline-offset-4 decoration-1">Tratamentos</Link>
                <Link href="#especialista" className="hover:text-primary transition-colors hover:underline underline-offset-4 decoration-1">A Especialista</Link>
                <Link href="#contato" className="hover:text-primary transition-colors hover:underline underline-offset-4 decoration-1">Contato</Link>
            </div>

            <Button
                className="bg-primary hover:bg-primary/90 text-white rounded-none px-8 py-6 shadow-none hover:shadow-lg transition-all font-medium tracking-wide text-xs uppercase"
                onClick={() => window.open("https://wa.me/351912420210", "_blank")}
            >
                <MessageCircle className="w-4 h-4 mr-2" />
                Agendar Consulta
            </Button>
        </nav>
    );
}
