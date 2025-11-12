// src/app/api/pdf-unlock/route.ts

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { v4 as uuidv4 } from "uuid";

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { pdfBytes: pdfBytesBase64, password, filename } = body;

        if (!pdfBytesBase64 || !password || !filename) {
            return NextResponse.json(
                { message: "Missing required parameters." },
                { status: 400 }
            );
        }

        const tempDir = path.join(process.cwd(), "tmp");
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

        const inputPath = path.join(tempDir, `${uuidv4()}-input.pdf`);
        const outputPath = path.join(tempDir, `${uuidv4()}-unlocked.pdf`);

        // Write uploaded PDF to disk
        const pdfBuffer = Buffer.from(pdfBytesBase64, "base64");
        fs.writeFileSync(inputPath, pdfBuffer);

        // Unlock with qpdf
        // --password=<pw> sets the password to open the file
        // --decrypt outputs an unencrypted version
        const command = `qpdf --password="${password}" --decrypt "${inputPath}" "${outputPath}"`;
        await execAsync(command);

        const unlockedPdfBuffer = fs.readFileSync(outputPath);
        const unlockedPdfBytesBase64 = unlockedPdfBuffer.toString("base64");

        // Cleanup
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);

        return NextResponse.json({
            unlockedPdfBytesBase64,
            filename: `${filename.replace(/\.pdf$/, "")}-unlocked.pdf`,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Unknown server error" }, { status: 500 });
    }
}
