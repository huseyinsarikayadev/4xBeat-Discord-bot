import { Message } from "discord.js";
import { ExtendedClient } from "../structures/ExtendedClient.js";

export interface Command {
    name: string;
    description: string;
    aliases?: string[];

    execute(
        client: ExtendedClient,
        message: Message,
        args: string[]
    ): Promise<void>;
}