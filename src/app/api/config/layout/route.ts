import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

const defaultLayoutConfig = {
    logoUrl: "", // Empty means use text "Micaela Sampaio"
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

export async function GET() {
    try {
        const config = await prisma.siteConfig.findUnique({
            where: { key: "layout_config" }
        });

        if (!config) {
            return NextResponse.json(defaultLayoutConfig);
        }

        return NextResponse.json(JSON.parse(config.value));
    } catch (error) {
        console.error("Failed to fetch layout config:", error);
        return NextResponse.json(defaultLayoutConfig);
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();

        // Validate structure if needed, but for now we trust the admin panel
        await prisma.siteConfig.upsert({
            where: { key: "layout_config" },
            update: { value: JSON.stringify(body) },
            create: { key: "layout_config", value: JSON.stringify(body) }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to update layout config:", error);
        return NextResponse.json({ error: "Failed to update config" }, { status: 500 });
    }
}
