import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, text, rating } = body;

        const newTestimonial = await prisma.testimonial.create({
            data: {
                name,
                text,
                rating
            }
        });

        return NextResponse.json(newTestimonial);
    } catch (error) {
        console.error("Error creating testimonial:", error);
        return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
    }
}
