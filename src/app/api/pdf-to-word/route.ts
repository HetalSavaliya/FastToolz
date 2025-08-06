import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
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

        const tempDir = path.join(process.cwd(), "tmp");
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

        const inputPath = path.join(tempDir, `${uuidv4()}.pdf`);
        const outputPath = inputPath.replace(".pdf", ".docx");

        fs.writeFileSync(inputPath, Buffer.from(pdfBytes, "base64"));

        const command = `soffice --headless --convert-to docx --outdir "${tempDir}" "${inputPath}"`;
        console.log("🔧 Executing:", command);
        await execAsync(command);

        const wordBuffer = fs.readFileSync(outputPath);
        const wordBase64 = wordBuffer.toString("base64");

        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);

        console.log("✅ Conversion successful");
        return NextResponse.json({
            wordBytesBase64: wordBase64,
            filename: filename.replace(/\.pdf$/, "") + ".docx",
        });
    } catch (err) {
        console.error("❌ Conversion failed:", err);
        return NextResponse.json({ message: "Failed to convert PDF to Word" }, { status: 500 });
    }
}
