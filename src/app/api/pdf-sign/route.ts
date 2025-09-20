import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Buffer } from "buffer";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { pdfBytes: pdfBytesBase64, signatureText, pageNumber, x, y, filename } = body;

        if (!pdfBytesBase64 || !signatureText || !filename) {
            return NextResponse.json({ message: "Missing required parameters." }, { status: 400 });
        }

        const pdfBytes = Buffer.from(pdfBytesBase64, "base64");
        const pdfDoc = await PDFDocument.load(pdfBytes);

        const pages = pdfDoc.getPages();
        const page = pages[pageNumber] || pages[0]; // default first page

        const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        page.drawText(signatureText, {
            x,
            y,
            size: 24,
            font,
            color: rgb(0, 0, 0),
        });

        const signedPdfBytes = await pdfDoc.save();
        const signedPdfBytesBase64 = Buffer.from(signedPdfBytes).toString("base64");

        return NextResponse.json({
            signedPdfBytesBase64,
            filename: `${filename.replace(/\.pdf$/, "")}-signed.pdf`,
        });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message || "Unknown error" }, { status: 500 });
    }
}
