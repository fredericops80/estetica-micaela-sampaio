import { NextResponse } from "next/server";
import { writeFile, mkdir, access, constants } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file received." }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Create safe filename
        const timestamp = Date.now();
        const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
        const filename = `${timestamp}-${cleanName}`;

        // Try multiple possible upload directories
        const possibleDirs = [
            path.join(process.cwd(), "public/uploads"),
            path.join(process.cwd(), "uploads"),
            "/tmp/uploads"
        ];

        let uploadDir = "";
        let fileUrl = "";

        for (const dir of possibleDirs) {
            try {
                await mkdir(dir, { recursive: true });
                // Test if we can write to this directory
                const testPath = path.join(dir, ".write-test");
                await writeFile(testPath, "test");
                uploadDir = dir;

                // Determine the public URL based on directory
                if (dir.includes("public/uploads")) {
                    fileUrl = `/uploads/${filename}`;
                } else if (dir === "/tmp/uploads") {
                    fileUrl = `/api/uploads/${filename}`;
                } else {
                    fileUrl = `/uploads/${filename}`;
                }
                break;
            } catch {
                console.log(`Cannot write to ${dir}, trying next...`);
                continue;
            }
        }

        if (!uploadDir) {
            console.error("No writable upload directory found. Tried:", possibleDirs);
            return NextResponse.json({
                error: "Upload failed: No writable directory available.",
                tried: possibleDirs
            }, { status: 500 });
        }

        // Save file
        const filePath = path.join(uploadDir, filename);
        await writeFile(filePath, buffer);

        console.log(`File uploaded successfully to: ${filePath}`);

        return NextResponse.json({
            success: true,
            url: fileUrl,
            path: filePath
        });

    } catch (error) {
        console.error("Upload error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({
            error: "Upload failed.",
            details: errorMessage,
            cwd: process.cwd()
        }, { status: 500 });
    }
}
