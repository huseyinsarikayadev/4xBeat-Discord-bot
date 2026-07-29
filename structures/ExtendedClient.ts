import { Client, ClientOptions, Collection } from "discord.js";
import { Command } from "../types/Command.js";
import { MusicManager } from "../music/MusicManager.js";

export class ExtendedClient extends Client {

    public commands: Collection<string, Command>;

    public music: MusicManager;

    constructor(options: ClientOptions) {
        super(options);

        this.commands = new Collection();

        this.music = new MusicManager();
    }

    public async start(token: string): Promise<void> {
        await this.login(token);
    }

}