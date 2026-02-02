import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const heroConfig = await prisma.heroConfig.findFirst();
        const testimonials = await prisma.testimonial.findMany();

        return NextResponse.json({
            heroConfig,
            testimonials
        });
    } catch (error) {
        console.error("Error fetching config:", error);
        return NextResponse.json({ error: "Failed to fetch config" }, { status: 500 });
    }
}
