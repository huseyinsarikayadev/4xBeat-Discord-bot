import { Message } from "discord.js";
import { Command } from "../../types/Command.js";
import { ExtendedClient } from "../../structures/ExtendedClient.js";
import { NotificationService } from "../../music/services/NotificationService.js";
import { MusicValidator } from "../../music/utils/MusicValidator.js";

const command: Command = {

    name: "loop",
    description: "Şarkı döngüsünü açar veya kapatır.",
    aliases: ["lp"],

    async execute(
        client: ExtendedClient,
        message: Message
    ) {

        const queue = client.music.getQueue(message.guild!.id);
        if (!(await MusicValidator.validate(message, queue))) {
            return;
        }

        if (queue.isEmpty()) {
            await message.reply("> 🔁 Döngüye alınacak bir şarkı bulunmuyor.");
            return;
        }

        const enabled = queue.toggleLoop();

        await message.reply({
            embeds: [
                NotificationService.loop(enabled)
            ]
        });

    }

};

export default command;