import { Message } from "discord.js";
import { GuildQueue } from "../GuildQueue.js";

export class MusicValidator {

    public static async validate(
        message: Message,
        queue: GuildQueue
    ): Promise<boolean> {

        if (!queue.hasPlayer()) {
            await message.reply(
                "❌ Bot şu anda herhangi bir ses kanalında değil."
            );
            return false;
        }

        if (!queue.isPlaying()) {
            await message.reply(
                "❌ Şu anda çalan bir şarkı bulunmuyor."
            );
            return false;
        }

        return true;
    }

}