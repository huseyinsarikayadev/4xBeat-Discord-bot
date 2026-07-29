import { Message } from "discord.js";
import { Command } from "../../types/Command.js";
import { ExtendedClient } from "../../structures/ExtendedClient.js";
import { NotificationService} from "../../music/services/NotificationService.js";
import { MusicValidator } from "../../music/utils/MusicValidator.js";

const command: Command = {

    name: "skip",
    description: "Geçerli şarkıyı atlar.",
    aliases: ["s"],

    async execute(
        client: ExtendedClient,
        message: Message
    ) {

        const queue = client.music.getQueue(message.guild!.id);
        if (!(await MusicValidator.validate(message, queue))) {
            return;
        }

        if (queue.isEmpty()) {
            await message.reply("> 📭 Geçilecek bir şarkı bulunmuyor.");
            return;
        }

        const currentSong = queue.getCurrentSong();

        await queue.skip();

        if (currentSong) {
            await message.reply({
                embeds: [
                    NotificationService.skipped(currentSong)
                ]
            });
        }

    }

};

export default command;