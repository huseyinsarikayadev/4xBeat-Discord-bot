import { Message } from "discord.js";
import { Command } from "../../types/Command.js";
import { ExtendedClient } from "../../structures/ExtendedClient.js";
import { NotificationService } from "../../music/services/NotificationService.js";

const command: Command = {

    name: "help",
    description: "Bot komutlarını gösterir.",
    aliases: ["h"],

    async execute(
        client: ExtendedClient,
        message: Message
    ) {

        await message.reply({
            embeds: [
                NotificationService.help()
            ]
        });

    }

};

export default command;