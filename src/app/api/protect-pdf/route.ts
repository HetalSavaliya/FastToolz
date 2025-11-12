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
        const outputPath = path.join(tempDir, `${uuidv4()}-protected.pdf`);

        // Write uploaded PDF to disk
        const pdfBuffer = Buffer.from(pdfBytesBase64, "base64");
        fs.writeFileSync(inputPath, pdfBuffer);

        // Protect with qpdf
        const command = `qpdf "${inputPath}" "${outputPath}" --encrypt "${password}" "${password}" 256 --`;
        await execAsync(command);

        const protectedPdfBuffer = fs.readFileSync(outputPath);
        const encryptedPdfBytesBase64 = protectedPdfBuffer.toString("base64");

        // Cleanup
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);

        return NextResponse.json({
            encryptedPdfBytesBase64,
            filename: `${filename.replace(/\.pdf$/, "")}-protected.pdf`,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Unknown server error" }, { status: 500 });
    }
}
