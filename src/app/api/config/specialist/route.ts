import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

// Initial Default Config
const defaultSpecialistConfig = {
    title: "A Especialista",
    description1: "Com vasta experiência internacional entre Brasil e Portugal, Micaela Sampaio traz uma abordagem única que une ciência e cuidado humanizado.",
    description2: "Especialista em tratamentos faciais avançados e terapias corporais, sua missão é proporcionar resultados visíveis em um ambiente de profundo relaxamento. Cada protocolo é desenhado exclusivamente para as necessidades da sua pele.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
};

export async function GET() {
    try {
        const config = await prisma.siteConfig.findUnique({
            where: { key: "specialist_config" }
        });

        if (!config) {
            console.log("Specialist config not found, returning default");
            return NextResponse.json(defaultSpecialistConfig);
        }

        console.log("Fetched specialist config:", config.value);
        return NextResponse.json(JSON.parse(config.value));
    } catch (error) {
        console.error("Failed to fetch specialist config:", error);
        return NextResponse.json(defaultSpecialistConfig);
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();

        console.log("Data to update:", body);

        const result = await prisma.siteConfig.upsert({
            where: { key: "specialist_config" },
            update: { value: JSON.stringify(body) },
            create: { key: "specialist_config", value: JSON.stringify(body) }
        });

        console.log("Upsert result:", result);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to update specialist config:", error);
        return NextResponse.json({ error: "Failed to update config" }, { status: 500 });
    }
}
