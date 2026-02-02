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

    // Load initial data from API
    useEffect(() => {
        setMounted(true);
        const fetchData = async () => {
            try {
                // Fetch Config & Testimonials (Old Endpoint)
                const configRes = await fetch("/api/config", { cache: "no-store" });
                if (configRes.ok) {
                    const data = await configRes.json();
                    if (data.heroConfig) {
                        const { id, ...config } = data.heroConfig;
                        setHeroConfig(prev => ({ ...prev, ...config })); // Merge to keep default fields if missing
                    }
                    if (data.testimonials) setTestimonials(data.testimonials);
                }

                // Fetch Gallery
                const galleryRes = await fetch("/api/gallery", { cache: "no-store" });
                if (galleryRes.ok) {
                    setGalleryItems(await galleryRes.json());
                }

                // Fetch Before/After
                const beforeAfterRes = await fetch("/api/before-after", { cache: "no-store" });
                if (beforeAfterRes.ok) {
                    setBeforeAfterItems(await beforeAfterRes.json());
                }

                // Fetch Services
                const servicesRes = await fetch("/api/services", { cache: "no-store" });
                if (servicesRes.ok) {
                    setServices(await servicesRes.json());
                }

                // Fetch Specialist Config
                const specialistRes = await fetch("/api/config/specialist", { cache: "no-store" });
                if (specialistRes.ok) {
                    setSpecialistConfig(await specialistRes.json());
                }

                // Fetch Layout Config
                const layoutRes = await fetch("/api/config/layout", { cache: "no-store" });
                if (layoutRes.ok) {
                    const data = await layoutRes.json();
                    setLayoutConfig(prev => ({
                        ...prev,
                        ...data,
                        sectionOrder: data.sectionOrder?.length ? data.sectionOrder : prev.sectionOrder
                    }));
                }

            } catch (error) {
                console.error("Failed to fetch site config", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const updateHeroConfig = (newConfig: Partial<HeroConfig>) => {
        setHeroConfig((prev) => ({ ...prev, ...newConfig }));
    };

    const saveHeroConfig = async () => {
        try {
            await fetch("/api/config/hero", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(heroConfig),
            });
            showDialog("Sucesso", "Configurações salvas com sucesso!");
        } catch (error) {
            console.error("Error saving config:", error);
            showDialog("Erro", "Erro ao salvar configurações.", true);
        }
    };

    const addTestimonial = async (t: Omit<Testimonial, "id">) => {
        const tempId = Math.random().toString(36).substr(2, 9);
        setTestimonials((prev) => [...prev, { ...t, id: tempId }]);

        try {
            const response = await fetch("/api/testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(t),
            });
            if (response.ok) {
                const saved = await response.json();
                setTestimonials((prev) => prev.map(item => item.id === tempId ? saved : item));
            }
        } catch (error) {
            console.error("Error adding testimonial:", error);
        }
    };

    const removeTestimonial = async (id: string) => {
        const previous = testimonials;
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
        try {
            await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
        } catch (error) {
            console.error("Error removing testimonial:", error);
            setTestimonials(previous);
        }
    };

    // Gallery Actions
    const addGalleryItem = async (item: Omit<GalleryItem, "id">) => {
        const tempId = Math.random().toString(36).substr(2, 9);
        setGalleryItems(prev => [...prev, { ...item, id: tempId }]);
        try {
            const res = await fetch("/api/gallery", {
                method: "POST",
                body: JSON.stringify(item)
            });
            if (res.ok) {
                const saved = await res.json();
                setGalleryItems(prev => prev.map(i => i.id === tempId ? saved : i));
            }
        } catch (e) {
            console.error(e);
        }
    };

    const removeGalleryItem = async (id: string) => {
        setGalleryItems(prev => prev.filter(i => i.id !== id));
        await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
    };

    // Before/After Actions
    const addBeforeAfterItem = async (item: Omit<BeforeAfterItem, "id">) => {
        const tempId = Math.random().toString(36).substr(2, 9);
        setBeforeAfterItems(prev => [...prev, { ...item, id: tempId }]);
        try {
            const res = await fetch("/api/before-after", {
                method: "POST",
                body: JSON.stringify(item)
            });
            if (res.ok) {
                const saved = await res.json();
                setBeforeAfterItems(prev => prev.map(i => i.id === tempId ? saved : i));
            }
        } catch (e) {
            console.error(e);
        }
    };

    const removeBeforeAfterItem = async (id: string) => {
        setBeforeAfterItems(prev => prev.filter(i => i.id !== id));
        await fetch(`/api/before-after?id=${id}`, { method: "DELETE" });
    };


    const addService = async (item: Omit<Service, "id">) => {
        try {
            const res = await fetch('/api/services', {
                method: 'POST',
                body: JSON.stringify(item),
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.ok) {
                const newItem = await res.json();
                setServices(prev => [...prev, newItem]);
                showDialog("Sucesso", "Serviço adicionado com sucesso!");
            } else {
                const errText = await res.text();
                console.error("Failed to add service:", res.status, errText);
                showDialog("Erro", `Falha ao adicionar serviço: ${errText}`, true);
            }
        } catch (error) {
            console.error("Error adding service:", error);
            showDialog("Erro", `Erro ao conectar com o servidor: ${error}`, true);
        }
    };

    const updateService = async (item: Service) => {
        try {
            const res = await fetch('/api/services', {
                method: 'PUT',
                body: JSON.stringify(item),
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.ok) {
                setServices(prev => prev.map(s => s.id === item.id ? item : s));
                showDialog("Sucesso", "Serviço atualizado com sucesso!");
            } else {
                const errText = await res.text();
                console.error("Failed to update service:", res.status, errText);
                showDialog("Erro", `Falha ao atualizar serviço: ${errText}`, true);
            }
        } catch (error) {
            console.error("Error updating service:", error);
            showDialog("Erro", `Erro ao conectar com o servidor: ${error}`, true);
        }
    };

    const removeService = async (id: string) => {
        try {
            const res = await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setServices(prev => prev.filter(i => i.id !== id));
                showDialog("Sucesso", "Serviço removido com sucesso!");
            } else {
                const errText = await res.text();
                console.error("Failed to remove service:", res.status, errText);
                showDialog("Erro", `Falha ao remover serviço: ${errText}`, true);
            }
        } catch (error) {
            console.error("Error removing service:", error);
            showDialog("Erro", `Erro ao conectar com o servidor: ${error}`, true);
        }
    };

    const updateSpecialistConfig = (newConfig: Partial<SpecialistConfig>) => {
        setSpecialistConfig(prev => ({ ...prev, ...newConfig }));
    };

    const saveSpecialistConfig = async () => {
        try {
            await fetch("/api/config/specialist", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(specialistConfig)
            });
            showDialog("Sucesso", "Configurações da especialista salvas com sucesso!");
        } catch (error) {
            console.error("Error saving specialist config:", error);
            showDialog("Erro", "Erro ao salvar configurações.", true);
        }
    };

    const updateLayoutConfig = (newConfig: Partial<LayoutConfig>) => {
        setLayoutConfig(prev => ({ ...prev, ...newConfig }));
    };

    const saveLayoutConfig = async () => {
        try {
            const res = await fetch("/api/config/layout", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(layoutConfig)
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.details || data.error || "Failed to update");
            }

            showDialog("Sucesso", "Layout salvo com sucesso!");
        } catch (error) {
            console.error("Error saving layout config:", error);
            showDialog("Erro", `Erro ao salvar layout: ${error instanceof Error ? error.message : String(error)}`, true);
        }
    };

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
            {mounted && (
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
            )}
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
