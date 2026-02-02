"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Loader2 } from "lucide-react";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
    className?: string;
}

export function ImageUpload({ value, onChange, label = "Imagem", className }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);

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
                console.error("Upload failed");
                alert("Erro ao enviar imagem.");
            }
        } catch (error) {
            console.error("Error uploading:", error);
            alert("Erro ao enviar imagem.");
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
        </div>
    );
}
