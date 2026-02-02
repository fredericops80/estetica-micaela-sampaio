import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Prevent multiple instances in dev
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function GET() {
    try {
        // 1. Check Datasource Provider (Hack to read from runtime internal config if possible, 
        // usually difficult, so we infer from behavior or check process.env)

        // 2. Try to count rows - verifies connection
        const configCount = await prisma.siteConfig.count();
        const servicesCount = await prisma.service.count();

        // 3. Get first config to see what's in it
        const layoutConfig = await prisma.siteConfig.findUnique({
            where: { key: "layout_config" }
        });

        return NextResponse.json({
            status: "Online",
            provider: "Click 'Check' to infer", // Prisma doesn't easily expose this at runtime without internal access
            counts: {
                siteConfig: configCount,
                services: servicesCount
            },
            layoutConfigFound: !!layoutConfig,
            layoutConfigValue: layoutConfig ? "Present (Hidden)" : "Null",
            env: {
                // Return masked env vars to verifying they are set
                DATABASE_URL: process.env.DATABASE_URL ? "Set" : "Not Set",
                // Check if user set it in the new format
            }
        });
    } catch (error) {
        return NextResponse.json({
            status: "Error",
            error: error instanceof Error ? error.message : String(error),
            details: error
        }, { status: 500 });
    }
}
