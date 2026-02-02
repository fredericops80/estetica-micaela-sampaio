"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
    className?: string;
}

export function ImageUpload({ value, onChange, label = "Imagem", className }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [errorState, setErrorState] = useState<{ open: boolean; message: string }>({ open: false, message: "" });

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                onChange(data.url);
            } else {
                const data = await res.json().catch(() => ({}));
                console.error("Upload failed", data);
                setErrorState({
                    open: true,
                    message: `Erro ao enviar imagem:\n${data.details || data.error || "Erro desconhecido"}\n${data.tried ? `Tentou pastas: ${JSON.stringify(data.tried)}` : ""}`
                });
            }
        } catch (error) {
            console.error("Error uploading:", error);
            setErrorState({
                open: true,
                message: `Erro de conexão:\n${error instanceof Error ? error.message : String(error)}`
            });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className={`space-y-2 ${className}`}>
            <Label>{label}</Label>

            {!value ? (
                <div className="flex items-center gap-2">
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={isUploading}
                        className="cursor-pointer"
                    />
                    {isUploading && <Loader2 className="w-4 h-4 animate-spin" />}
                </div>
            ) : (
                <div className="relative aspect-video w-full rounded-lg overflow-hidden border bg-muted">
                    <Image
                        src={value}
                        alt="Upload preview"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                        <div className="relative">
                            <input
                                type="file"
                                id={`edit-${label}`}
                                className="hidden"
                                onChange={handleUpload}
                                accept="image/*"
                            />
                            <label
                                htmlFor={`edit-${label}`}
                                className="flex items-center justify-center p-2 bg-black/50 hover:bg-black/70 text-white rounded-md cursor-pointer transition-colors"
                            >
                                <Upload className="w-4 h-4" />
                            </label>
                        </div>
                        <Button
                            variant="destructive"
                            size="icon"
                            type="button"
                            className="bg-red-500/80 hover:bg-red-600"
                            onClick={() => onChange("")}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}

            <Dialog open={errorState.open} onOpenChange={(open) => setErrorState(prev => ({ ...prev, open }))}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-red-600">Erro no Upload</DialogTitle>
                        <DialogDescription className="pt-2">
                            <div className="max-h-[300px] overflow-auto rounded-md bg-muted p-2 font-mono text-sm select-text whitespace-pre-wrap">
                                {errorState.message}
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setErrorState(prev => ({ ...prev, open: false }))}>Fechar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
