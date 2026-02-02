"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

export function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-secondary/30 p-8 rounded-lg text-center space-y-4"
            >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                    <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif text-foreground">Mensagem Enviada!</h3>
                <p className="text-muted-foreground">Obrigado pelo contato. Responderemos em breve.</p>
                <Button variant="outline" onClick={() => setIsSuccess(false)} className="mt-4">
                    Enviar nova mensagem
                </Button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm uppercase tracking-wide text-muted-foreground">Nome</label>
                    <Input required placeholder="Seu nome" className="bg-white/50 border-primary/20 focus:border-primary h-12 rounded-none" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm uppercase tracking-wide text-muted-foreground">Email</label>
                    <Input required type="email" placeholder="seu@email.com" className="bg-white/50 border-primary/20 focus:border-primary h-12 rounded-none" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm uppercase tracking-wide text-muted-foreground">Telefone</label>
                <Input placeholder="+351 912 420 210" className="bg-white/50 border-primary/20 focus:border-primary h-12 rounded-none" />
            </div>

            <div className="space-y-2">
                <label className="text-sm uppercase tracking-wide text-muted-foreground">Mensagem</label>
                <Textarea required placeholder="Como podemos ajudar?" className="bg-white/50 border-primary/20 focus:border-primary min-h-[150px] rounded-none resize-none" />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full h-14 rounded-none bg-foreground text-white hover:bg-foreground/90 uppercase tracking-widest">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Enviar Mensagem"}
            </Button>
        </form>
    );
}
