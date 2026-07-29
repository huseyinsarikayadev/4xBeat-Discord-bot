import { Message } from "discord.js";
import { Command } from "../../types/Command.js";
import { ExtendedClient } from "../../structures/ExtendedClient.js";
import { NotificationService} from "../../music/services/NotificationService.js";

const command: Command = {

    name: "queue",
    description: "Müzik kuyruğunu gösterir.",
    aliases: ["q"],

    async execute(
        client: ExtendedClient,
        message: Message
    ) {

        const queue = client.music.getQueue(message.guild!.id);
        if (!queue.hasPlayer()) {
            await message.reply("> ❌ Bot şu anda herhangi bir ses kanalında değil.");
            return;
        }
        if (queue.isEmpty()) {
            await message.reply("> 🎶 Müzik kuyruğu şu anda boş.");
            return;
        }

        await message.reply({
            embeds: [
                NotificationService.queue(queue.getSongs())
            ]
        });

    }

};

export default command;