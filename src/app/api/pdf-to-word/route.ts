import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";
import { exec } from "child_process";
import { promisify } from "util";
import { v4 as uuidv4 } from "uuid";

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
    console.log("📄 PDF to Word conversion started");

    try {
        const body = await req.json();
        const { pdfBytes, filename } = body;

        if (!pdfBytes || !filename) {
            return NextResponse.json({ message: "Missing input" }, { status: 400 });
        }

        // Temporary folder
        const tempDir = os.tmpdir();
        const inputPath = path.join(tempDir, `${uuidv4()}.pdf`);
        const outputPath = inputPath.replace(".pdf", ".docx");

        // Save uploaded PDF
        fs.writeFileSync(inputPath, Buffer.from(pdfBytes, "base64"));

        // Convert PDF → DOCX
        const command = `pdf2docx convert "${inputPath}" "${outputPath}"`;
        console.log("🔧 Executing:", command);

        try {
            const { stdout, stderr } = await execAsync(command);
            console.log("📄 pdf2docx stdout:", stdout);
            if (stderr) console.error("⚠️ pdf2docx stderr:", stderr);
        } catch (cmdErr) {
            console.error("❌ CLI error:", cmdErr);
            throw new Error("Failed to run pdf2docx CLI. Is it installed?");
        }

        if (!fs.existsSync(outputPath)) {
            throw new Error(`Converted file not found: ${outputPath}`);
        }

        const wordBuffer = fs.readFileSync(outputPath);
        const wordBase64 = wordBuffer.toString("base64");

        // Clean up
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);

        console.log("✅ Conversion successful");
        return NextResponse.json({
            wordBytesBase64: wordBase64,
            filename: filename.replace(/\.pdf$/, "") + ".docx",
        });
    } catch (err: unknown) {
        console.error("❌ Conversion failed:", err);

        return NextResponse.json(
            { message: err instanceof Error ? err.message : "Failed to convert PDF" },
            { status: 500 }
        );
    }
}
