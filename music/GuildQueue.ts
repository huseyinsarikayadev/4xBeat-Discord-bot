import { Song } from "./Song.js";
import { Player } from "./Player.js";
import { AddSongResult } from "./enums/AddSongResult.js";

export class GuildQueue {

    public songs: Song[] = [];

    public currentSong: Song | null = null;

    private loop = false;

    public toggleLoop(): boolean {

        this.loop = !this.loop;

        return this.loop;

    }
    public player: Player;
    private disconnectTimer: NodeJS.Timeout | null = null;
    constructor() {

        this.player = new Player();

        this.player.on("disconnected", () => {

            console.log("🗑️ Queue temizleniyor.");

            this.clear();

        });
        

        this.player.on("idle", async () => {

            const nextSong = this.nextSong();

            if (!nextSong) {
                console.log("Queue boş.");
                this.startDisconnectTimer();
                return;
            }

            await this.player.play(nextSong);

        });
    }

    public async addSong(song: Song): Promise<AddSongResult> {

        this.cancelDisconnectTimer();

        this.songs.push(song);

        if (!this.currentSong) {

            this.currentSong = song;

            this.player.play(song).catch((error) => {
                console.error("Player başlatma hatası:", error);
            });

            return AddSongResult.STARTED;

        }

        return AddSongResult.QUEUED;

    }
    public getCurrentSong(): Song | null {
        return this.currentSong;
    }

    public nextSong(): Song | null {

        if (this.loop) {
            return this.currentSong;
        }

        this.songs.shift();

        this.currentSong = this.songs[0] ?? null;

        return this.currentSong;

    }

    public clear(): void {

        if (this.currentSong) {

            this.songs = [this.currentSong];

        } else {

            this.songs = [];

        }

    }

    public isEmpty(): boolean {
        return this.songs.length === 0;
    }

    public async skip(): Promise<void> {

        this.player.skip();

    }
    public stop(): void {

        this.songs = [];
        this.currentSong = null;

        this.player.stop();

    }
    public getSongs(): Song[] {

        return this.songs;

    }
    public getSize(): number {

        return this.songs.length;

    }
    public removeSong(position: number): Song | null {
        if(position === 1){
            return null;
        }
        const index = position - 1;

        if (position > this.songs.length || position <= 0){
            return null;
        }
        const removed = this.songs.splice(index,1);
        return removed[0];
    }
    public shuffle(): void {
        const queue = this.songs.slice(1);
        for (let i = queue.length - 1; i > 0; i--) {

            const random = Math.floor(Math.random() * (i + 1));

            [queue[i], queue[random]] = [queue[random], queue[i]];

        }
        this.songs = [
            this.currentSong!,
            ...queue
        ];
    }
    private startDisconnectTimer(): void {
        console.log("Timer oluşturuldu:", Date.now());

        this.disconnectTimer = setTimeout(() => {
            console.log("Timer tetiklendi:", Date.now());

            this.stop();
            this.clear();

            console.log("⏱️ Auto disconnect çalıştı.");
        }, 5 * 60 * 1000);
    }


private cancelDisconnectTimer(): void {

    if (!this.disconnectTimer) return;

    clearTimeout(this.disconnectTimer);

    this.disconnectTimer = null;

}
    public hasPlayer(): boolean {
    return this.player.voiceConnection !== null;
    }

    public isPlaying(): boolean {
        return this.currentSong !== null;
    }
}