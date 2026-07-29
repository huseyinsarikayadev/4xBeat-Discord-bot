import { search, video_info  } from "play-dl";
import { Song } from "../Song.js";
import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";
const execFileAsync = promisify(execFile);
const ytdlpPath = path.join(
    process.cwd(),
    "node_modules",
    "youtube-dl-exec",
    "bin",
    "yt-dlp.exe"
);

export class YouTubeService {

    public async resolve(query: string): Promise<Song> {

        if (this.isUrl(query)) {
            return await this.resolveFromUrl(query);
        }

        return await this.resolveFromSearch(query);

    }

    private isUrl(query: string): boolean {

        return (
            query.includes("youtube.com") ||
            query.includes("youtu.be")
        );

    }
    private async search(query: string) {

        return await search(query, {
            limit: 1,
            source: {
                youtube: "video"
            }
        });

    }
   private async searchWithYtdlp(query: string) {

        const { stdout } = await execFileAsync(
            ytdlpPath,
            [
                `ytsearch1:${query}`,
                "--skip-download",
                "--print",
                "%(id)s",
                "--print",
                "%(title)s",
                "--print",
                "%(duration)s",
                "--print",
                "%(thumbnail)s",
            ]
        );

        const lines = stdout.trim().split("\n");

        return {
            id: lines[0],
            title: lines[1],
            duration: Number(lines[2] ?? 0),
            thumbnail: lines[3] ?? ""
        };

    }
    private async resolveFromUrl(query: string): Promise<Song> {
        console.log("URL:", query);
        const info = await video_info(query);
        console.log("VIDEO URL:", info.video_details.url);
        console.log("TITLE:", info.video_details.title);
        const video = info.video_details;

        return {
            title: video.title ?? "Bilinmeyen",
            url: query,
            duration: Number(video.durationInSec ?? 0),
            thumbnail: video.thumbnails?.[0]?.url ?? ""
        };

    }

    private async resolveFromSearch(query: string): Promise<Song> {

        let results: Awaited<ReturnType<typeof this.search>>;

        try {
            results = await this.search(query);

            console.log("PLAY-DL RESULT:", results.length);

        } catch (error) {

            console.log("PLAY-DL ERROR:", error);

            results = [];
        }

        if (!results.length) {

            console.log("play-dl sonuç bulamadı, yt-dlp deneniyor.");

            const video = await this.searchWithYtdlp(query);

            console.log("YT-DLP ID:", video.id);

            if (!video.id) {
                throw new Error("Şarkı bulunamadı.");
            }

            return {
                title: video.title,
                url: `https://www.youtube.com/watch?v=${video.id}`,
                duration: video.duration,
                thumbnail: video.thumbnail
            };
        }

        const video = results[0];

        if (!video.url) {
            throw new Error("Video URL bulunamadı.");
        }

        return {
            title: video.title ?? "Bilinmeyen",
            url: video.url,
            duration: video.durationInSec ?? 0,
            thumbnail: video.thumbnails?.[0]?.url ?? ""
        };

    }

}