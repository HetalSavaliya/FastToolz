import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { url } = await req.json();

    if (!url) {
        return NextResponse.json({ error: "URL is required." }, { status: 400 });
    }

    try {
        const videoId = extractVideoId(url);
        if (!videoId) {
            return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
        }

        const res = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!, // Your key in .env
                "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
            },
        });

        const data = await res.json();
        if (data.status === "ok") {
            return NextResponse.json({ downloadLink: data.link, title: data.title });
        } else {
            return NextResponse.json({ error: "Download failed" }, { status: 500 });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Unknown server error" }, { status: 500 });
    }

}

// Helper to extract YouTube video ID
function extractVideoId(url: string): string | null {
    const regex = /(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}
