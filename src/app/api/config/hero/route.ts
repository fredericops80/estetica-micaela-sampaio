import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, ...data } = body; // Destructure ID to avoid updating it if sent, or rely on updateMany/upsert

        // Assuming we always update ID 1
        const updatedConfig = await prisma.heroConfig.update({
            where: { id: 1 },
            data: data,
        });

        return NextResponse.json(updatedConfig);
    } catch (error) {
        console.error("Error updating hero config:", error);
        return NextResponse.json({ error: "Failed to update hero config" }, { status: 500 });
    }
}
