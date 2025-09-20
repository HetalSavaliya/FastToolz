import { NextResponse } from "next/server";
import ytdl from "ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import stream from "stream";
import { promisify } from "util";

const pipeline = promisify(stream.pipeline);

export async function POST(req: Request) {
    try {
        const { url } = await req.json();

        if (!url || !ytdl.validateURL(url)) {
            return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
        }

        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title.replace(/[^a-z0-9]/gi, "_").substring(0, 50);

        const videoStream = ytdl(url, { quality: "highestaudio" });
        const passThrough = new stream.PassThrough();

        ffmpeg(videoStream)
            .setFfmpegPath(ffmpegPath ?? "")
            .format("mp3")
            .audioBitrate(128)
            .pipe(passThrough);

        const headers = new Headers();
        headers.set("Content-Disposition", `attachment; filename="${title}.mp3"`);
        headers.set("Content-Type", "audio/mpeg");

        const readableStream = new ReadableStream({
            start(controller) {
                passThrough.on("data", (chunk) => controller.enqueue(chunk));
                passThrough.on("end", () => controller.close());
                passThrough.on("error", (err) => controller.error(err));
            },
        });

        return new Response(readableStream, { headers });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Conversion failed" }, { status: 500 });
    }
}
