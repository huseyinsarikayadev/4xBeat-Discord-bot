import { Message } from "discord.js";
import { Command } from "../../types/Command.js";
import { ExtendedClient } from "../../structures/ExtendedClient.js";
import { NotificationService } from "../../music/services/NotificationService.js";
import { MusicValidator } from "../../music/utils/MusicValidator.js";
const command: Command = {

    name: "shuffle",
    description: "Kuyruktaki şarkıları karıştırır.",
    aliases: ["sh"],

    async execute(
        client: ExtendedClient,
        message: Message
    ) {

        const queue = client.music.getQueue(message.guild!.id);
        if (!(await MusicValidator.validate(message, queue))) {
            return;
        }
        if (queue.isEmpty() || queue.getSize() === 1){
            await message.reply("> 🎵 Karıştırılacak yeterli şarkı yok.");
            return;
        }
        queue.shuffle()
        await message.reply({
            embeds: [
                NotificationService.shuffle()
            ]
        });
    }

};

export default command;