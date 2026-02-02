"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface Testimonial {
    id: string;
    name: string;
    text: string;
    rating: number;
}

export interface GalleryItem {
    id: string;
    imageUrl: string;
    altText?: string;
    category: string;
}

export interface BeforeAfterItem {
    id: string;
    beforeImage: string;
    afterImage: string;
    title: string;
    description: string;
}

export interface HeroConfig {
    subtitle: string;
    subtitleColor: string;
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    titleColor: string;
    highlightColor: string;
    ctaText: string;
    ctaColor: string;
    ctaTextColor: string;
    backgroundImage?: string;
}

export interface SpecialistConfig {
    title: string;
    description1: string;
    description2: string;
    imageUrl: string;
}

export interface LayoutConfig {
    logoUrl: string;
    googleAnalyticsId?: string;
    sectionOrder: { id: string; label: string; visible: boolean }[];
}

export interface Service {
    id: string;
    name: string;
    category: "Facial" | "Corporal";
    description: string;
    duration: string;
    price: number;
}

interface SiteConfigContextType {
    heroConfig: HeroConfig;
    updateHeroConfig: (newConfig: Partial<HeroConfig>) => void;
    saveHeroConfig: () => Promise<void>;
    testimonials: Testimonial[];
    addTestimonial: (t: Omit<Testimonial, "id">) => Promise<void>;
    removeTestimonial: (id: string) => Promise<void>;
    galleryItems: GalleryItem[];
    addGalleryItem: (item: Omit<GalleryItem, "id">) => Promise<void>;
    removeGalleryItem: (id: string) => Promise<void>;
    beforeAfterItems: BeforeAfterItem[];
    addBeforeAfterItem: (item: Omit<BeforeAfterItem, "id">) => Promise<void>;
    removeBeforeAfterItem: (id: string) => Promise<void>;
    services: Service[];
    addService: (item: Omit<Service, "id">) => Promise<void>;
    updateService: (item: Service) => Promise<void>;
    removeService: (id: string) => Promise<void>;
    specialistConfig: SpecialistConfig;
    updateSpecialistConfig: (newConfig: Partial<SpecialistConfig>) => void;
    saveSpecialistConfig: () => Promise<void>;
    layoutConfig: LayoutConfig;
    updateLayoutConfig: (newConfig: Partial<LayoutConfig>) => void;
    saveLayoutConfig: () => Promise<void>;
    loading: boolean;
}

const defaultHeroConfig: HeroConfig = {
    subtitle: "Tratamentos personalizados em Vila Nova de Gaia",
    subtitleColor: "#D99F7E",
    titlePrefix: "Onde a Estética encontra ",
    titleHighlight: "o Bem-Estar",
    titleSuffix: "",
    titleColor: "#845F58",
    highlightColor: "#D19198",
    ctaText: "Conheça Nossos Tratamentos",
    ctaColor: "#D19198",
    ctaTextColor: "#FFFFFF",
    backgroundImage: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop"
};

const defaultSpecialistConfig: SpecialistConfig = {
    title: "A Especialista",
    description1: "Com vasta experiência internacional entre Brasil e Portugal, Micaela Sampaio traz uma abordagem única que une ciência e cuidado humanizado.",
    description2: "Especialista em tratamentos faciais avançados e terapias corporais, sua missão é proporcionar resultados visíveis em um ambiente de profundo relaxamento. Cada protocolo é desenhado exclusivamente para as necessidades da sua pele.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
};

const defaultLayoutConfig: LayoutConfig = {
    logoUrl: "",
    googleAnalyticsId: "",
    sectionOrder: [
        { id: "hero", label: "Hero Banner", visible: true },
        { id: "specialist", label: "A Especialista", visible: true },
        { id: "services", label: "Serviços", visible: true },
        { id: "differentials", label: "Diferenciais", visible: true },
        { id: "testimonials", label: "Depoimentos", visible: true },
        { id: "gallery", label: "Galeria", visible: true },
        { id: "contact", label: "Contato", visible: true }
    ]
};

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
    const [heroConfig, setHeroConfig] = useState<HeroConfig>(defaultHeroConfig);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
    const [beforeAfterItems, setBeforeAfterItems] = useState<BeforeAfterItem[]>([]);
    const [services, setServices] = useState<Service[]>([]);

    const [specialistConfig, setSpecialistConfig] = useState<SpecialistConfig>(defaultSpecialistConfig);
    const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>(defaultLayoutConfig);
    const [loading, setLoading] = useState(true);

    const [dialogState, setDialogState] = useState<{ open: boolean; title: string; message: string; isError: boolean }>({
        open: false,
        title: "",
        message: "",
        isError: false
    });

    const showDialog = (title: string, message: string, isError: boolean = false) => {
        setDialogState({ open: true, title, message, isError });
    };

    const closeDialog = () => {
        setDialogState(prev => ({ ...prev, open: false }));
    };

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // ... previous fetchData logic
        const fetchData = async () => {
            // ... (keep existing fetch logic)
            // ...
        }, []);

    // ... (keep existing functions)

    if (!mounted) {
        // Return null or just children without the Dialog during SSR/Hydration to prevent mismatch
        return <SiteConfigContext.Provider value={{
            heroConfig, updateHeroConfig, saveHeroConfig,
            testimonials, addTestimonial, removeTestimonial,
            galleryItems, addGalleryItem, removeGalleryItem,
            beforeAfterItems, addBeforeAfterItem, removeBeforeAfterItem,
            services, addService, updateService, removeService,
            specialistConfig, updateSpecialistConfig, saveSpecialistConfig,
            layoutConfig, updateLayoutConfig, saveLayoutConfig,
            loading
        }}>
            {children}
        </SiteConfigContext.Provider>;
    }

    return (
        <SiteConfigContext.Provider value={{
            heroConfig, updateHeroConfig, saveHeroConfig,
            testimonials, addTestimonial, removeTestimonial,
            galleryItems, addGalleryItem, removeGalleryItem,
            beforeAfterItems, addBeforeAfterItem, removeBeforeAfterItem,
            services, addService, updateService, removeService,
            specialistConfig, updateSpecialistConfig, saveSpecialistConfig,
            layoutConfig, updateLayoutConfig, saveLayoutConfig,
            loading
        }}>
            {children}
            <Dialog open={dialogState.open} onOpenChange={(open) => !open && closeDialog()}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className={dialogState.isError ? "text-red-600" : "text-green-600"}>
                            {dialogState.title}
                        </DialogTitle>
                        <DialogDescription className="pt-2">
                            <div className="max-h-[300px] overflow-auto rounded-md bg-muted p-2 font-mono text-sm select-text">
                                {dialogState.message}
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={closeDialog}>Fechar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </SiteConfigContext.Provider>
    );
}

export function useSiteConfig() {
    const context = useContext(SiteConfigContext);
    if (context === undefined) {
        throw new Error("useSiteConfig must be used within a SiteConfigProvider");
    }
    return context;
}
