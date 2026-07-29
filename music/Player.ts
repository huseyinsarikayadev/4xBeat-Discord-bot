import {
    AudioPlayer,
    VoiceConnection,
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
    StreamType,
    AudioPlayerStatus,
    VoiceConnectionStatus,
    entersState
} from "@discordjs/voice";

import { spawn, ChildProcess } from "child_process";
import path from "path";
import ffmpegStatic from "ffmpeg-static";
import { Song } from "./Song.js";
import { VoiceBasedChannel } from "discord.js";
import { EventEmitter } from "events";
const ffmpegPath = ffmpegStatic as unknown as string;

const ytdlpPath = path.join(
    process.cwd(),
    "node_modules",
    "youtube-dl-exec",
    "bin",
    "yt-dlp.exe"
);
export class Player extends EventEmitter {

    public audioPlayer: AudioPlayer;
    public voiceConnection: VoiceConnection | null = null;

    private ytdlpProcess: ChildProcess | null = null;
    private ffmpegProcess: ChildProcess | null = null;

    constructor() {
        
        super();
        this.audioPlayer = createAudioPlayer();

        this.audioPlayer.on("error", (error) => {
            console.error("AudioPlayer hata:", error);
        });

        this.audioPlayer.on(AudioPlayerStatus.Playing, () => {
            console.log("🎶 Şarkı çalmaya başladı");

            this.emit("playing");
        });

        this.audioPlayer.on(AudioPlayerStatus.Idle, () => {

            this.killCurrentProcesses();

            this.emit("idle");

        });
    }

    public async connect(
        channel: VoiceBasedChannel
    ): Promise<void> {

        this.voiceConnection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator
        });

        this.voiceConnection.on(
            VoiceConnectionStatus.Disconnected,
            () => {

                console.log("🔌 VoiceConnection: Disconnected");

                this.killCurrentProcesses();

                this.emit("disconnected");

                this.voiceConnection = null;

            }
        );

        this.voiceConnection.on(
            VoiceConnectionStatus.Destroyed,
            () => {

                console.log("💥 VoiceConnection: Destroyed");

            }
        );

        try {

            await entersState(
                this.voiceConnection,
                VoiceConnectionStatus.Ready,
                20_000
            );

        } catch (error) {

            console.error(
                "❌ VoiceConnection Ready timeout:",
                error
            );

            this.voiceConnection.destroy();
            this.voiceConnection = null;

            throw error;

        }

        this.voiceConnection.subscribe(
            this.audioPlayer
        );

    }


    private killCurrentProcesses(): void {
        if (this.ytdlpProcess) {
            this.ytdlpProcess.kill();
            this.ytdlpProcess = null;
        }
        if (this.ffmpegProcess) {
            this.ffmpegProcess.kill();
            this.ffmpegProcess = null;
        }
    }

    public async play(
        song: Song | string
    ): Promise<void> {

        this.killCurrentProcesses();

        const url =
            typeof song === "string"
                ? song
                : song.url;

        const ytdlp = spawn(ytdlpPath, [
            "-f",
            "bestaudio/best",
            "-o",
            "-",
            "--no-playlist",
            "--extractor-args",
            "youtube:player_client=android,tv_embedded",
            url
        ], {
            stdio: ["ignore", "pipe", "pipe"]
        });

        const ffmpeg = spawn(ffmpegPath, [
            "-i", "pipe:0",
            "-f", "s16le",
            "-ar", "48000",
            "-ac", "2",
            "-loglevel", "error",
            "pipe:1"
        ], {
            stdio: ["pipe", "pipe", "pipe"]
        });

        this.ytdlpProcess = ytdlp;
        this.ffmpegProcess = ffmpeg;

        ytdlp.stdout!.pipe(ffmpeg.stdin!);

        ytdlp.stderr!.on("data", (data: Buffer) => {
            const msg = data.toString();

            if (msg.includes("ERROR")) {
                console.error("❌ yt-dlp hata:", msg);
            }
        });

        ffmpeg.stderr!.on("data", (data: Buffer) => {
            const msg = data.toString();

            if (msg.toLowerCase().includes("error")) {
                console.error("❌ ffmpeg hata:", msg);
            }
        });

        ytdlp.stdout!.on("error", (e: NodeJS.ErrnoException) => {
            if (e.code !== "EPIPE") {
                console.error("❌ yt-dlp stdout hata:", e);
            }
        });

        ffmpeg.stdin!.on("error", (e: NodeJS.ErrnoException) => {
            if (e.code !== "EPIPE") {
                console.error("❌ ffmpeg stdin hata:", e);
            }
        });

        ytdlp.on("error", err =>
            console.error("❌ yt-dlp process:", err)
        );

        ffmpeg.on("error", err =>
            console.error("❌ ffmpeg process:", err)
        );

        const resource = createAudioResource(
            ffmpeg.stdout!,
            {
                inputType: StreamType.Raw
            }
        );

        this.audioPlayer.play(resource);

    }
    public stop(): void {

        if (!this.voiceConnection) return;

        this.killCurrentProcesses();

        this.voiceConnection.destroy();

        this.voiceConnection = null;

    }
    public skip(): void {

        this.audioPlayer.stop();
    }

}