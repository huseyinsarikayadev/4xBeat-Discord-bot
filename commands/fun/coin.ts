import { Message } from "discord.js";

import { Command } from "../../types/Command.js";
import { ExtendedClient } from "../../structures/ExtendedClient.js";
import { FunEmbedService } from "../../music/services/FunEmbedService.js";

const command: Command = {

    name: "coin",
    description: "Yazı tura atar.",
    aliases: ["flip"],

    async execute(
        client: ExtendedClient,
        message: Message
    ) {

        const loading = await message.reply("> 🪙 Coin havaya atılıyor...");

        await new Promise(resolve => setTimeout(resolve, 1200));

        const result = Math.random() < 0.5
            ? "> 🟡 **YAZI!**\nŞans bugün senden yana."
            : "> ⚪ **TURA!**\nBu sefer tura geldi.";

        await loading.edit({
            content: "",
            embeds: [
                FunEmbedService.coin(result)
            ]
        });

    }

};

export default command;