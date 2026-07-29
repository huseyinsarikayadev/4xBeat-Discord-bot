import { GuildQueue } from "./GuildQueue.js";

export class MusicManager {

    private queues = new Map<string, GuildQueue>();

    public getQueue(guildId: string): GuildQueue {

        if (!this.queues.has(guildId)) {
            this.queues.set(guildId, new GuildQueue());
        }

        return this.queues.get(guildId)!;
    }

}