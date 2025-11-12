import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, degrees } from "pdf-lib";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { pdfBytes: pdfBytesBase64, rotation, filename, pageNumber } = body;

        if (!pdfBytesBase64 || !filename) {
            return NextResponse.json(
                { message: "Missing required parameters." },
                { status: 400 }
            );
        }

        // Convert rotation to number and validate
        const rotationValue = Number(rotation);
        if (isNaN(rotationValue)) {
            return NextResponse.json(
                { message: "Rotation must be a valid number." },
                { status: 400 }
            );
        }

        // Decode Base64 → Buffer → Uint8Array
        const pdfBuffer = Buffer.from(pdfBytesBase64, "base64");
        const pdfDoc = await PDFDocument.load(pdfBuffer);

        const pages = pdfDoc.getPages();

        // Determine if single page rotation or all pages
        let targetPageIndex: number | undefined;
        if (pageNumber !== undefined && pageNumber !== null && !isNaN(Number(pageNumber))) {
            targetPageIndex = Number(pageNumber) - 1; // Convert 1-based to 0-based
            if (targetPageIndex < 0 || targetPageIndex >= pages.length) {
                return NextResponse.json(
                    { message: `Page number out of range. PDF has ${pages.length} pages.` },
                    { status: 400 }
                );
            }
        }

        if (targetPageIndex !== undefined) {
            // Rotate only the requested page
            const page = pages[targetPageIndex];
            const currentRotation = page.getRotation().angle;
            page.setRotation(degrees((currentRotation + rotationValue) % 360));
        } else {
            // Rotate all pages
            pages.forEach((page) => {
                const currentRotation = page.getRotation().angle;
                page.setRotation(degrees((currentRotation + rotationValue) % 360));
            });
        }

        // Save updated PDF
        const rotatedPdfBytes = await pdfDoc.save();
        const rotatedPdfBytesBase64 = Buffer.from(rotatedPdfBytes).toString("base64");

        return NextResponse.json({
            rotatedPdfBytesBase64,
            filename: `${filename.replace(/\.pdf$/, "")}-rotated.pdf`,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Unknown server error" }, { status: 500 });
    }
}
