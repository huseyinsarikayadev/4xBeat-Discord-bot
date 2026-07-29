import { Message } from "discord.js";
import { Command } from "../../types/Command.js";
import { ExtendedClient } from "../../structures/ExtendedClient.js";
import { NotificationService } from "../../music/services/NotificationService.js";
import { MusicValidator } from "../../music/utils/MusicValidator.js";


const command: Command = {

    name: "clear",
    description: "Kuyruktaki şarkıları temizler.",
    aliases: ["cl"],

    async execute(
        client: ExtendedClient,
        message: Message
    ) {

        const queue = client.music.getQueue(message.guild!.id);
        if (!(await MusicValidator.validate(message, queue))) {
            return;
        }

        if (queue.isEmpty()) {

            await message.reply("> 🎶 Müzik kuyruğu boş.");
            return;

        }

        queue.clear();

        await message.reply({
            embeds: [
                NotificationService.clear()
            ]
        });

    }

};

export default command;