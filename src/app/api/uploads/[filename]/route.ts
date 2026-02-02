import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function GET(
    request: NextRequest,
    context: { params: { filename: string } }
) {
    const filename = context.params.filename;

    // Potential locations to check (prioritize persistent storage)
    const possiblePaths = [
        path.join(process.cwd(), "uploads", filename),      // Root uploads (persistent in some setups)
        path.join("/tmp/uploads", filename),                // Temp uploads (fallback)
        path.join(process.cwd(), "public", "uploads", filename) // Public uploads (fallback for API access)
    ];

    for (const filePath of possiblePaths) {
        if (existsSync(filePath)) {
            try {
                const fileBuffer = await readFile(filePath);

                // Determine content type
                const ext = path.extname(filename).toLowerCase();
                let contentType = "application/octet-stream";
                if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
                if (ext === ".png") contentType = "image/png";
                if (ext === ".webp") contentType = "image/webp";
                if (ext === ".gif") contentType = "image/gif";
                if (ext === ".svg") contentType = "image/svg+xml";

                return new NextResponse(fileBuffer, {
                    headers: {
                        "Content-Type": contentType,
                        "Cache-Control": "public, max-age=86400, immutable"
                    }
                });
            } catch (error) {
                console.error("Error reading file:", error);
                continue;
            }
        }
    }

    return new NextResponse("File not found", { status: 404 });
}
