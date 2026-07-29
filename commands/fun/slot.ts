import { Message } from "discord.js";

import { Command } from "../../types/Command.js";
import { ExtendedClient } from "../../structures/ExtendedClient.js";
import { FunEmbedService } from "../../music/services/FunEmbedService.js";

const command: Command = {

    name: "slot",
    description: "Slot makinesini çevir.",
    aliases: ["sl"],

    async execute(
        client: ExtendedClient,
        message: Message
    ) {

        const loading = await message.reply("> 🎰 Slot dönüyor...");

        await new Promise(resolve => setTimeout(resolve, 1500));

        const pool = [
            "🍒",
            "🍋",
            "🍇",
            "⭐",
            "💎",
            "7️⃣"
        ];

        const roll = [
            pool[Math.floor(Math.random() * pool.length)],
            pool[Math.floor(Math.random() * pool.length)],
            pool[Math.floor(Math.random() * pool.length)]
        ];

        let result = "> 😢 Kaybettin!";

        if (roll[0] === roll[1] && roll[1] === roll[2]) {

            switch (roll[0]) {

                case "7️⃣":
                    result = "> 💰 **ULTRA JACKPOT!**";
                    break;

                case "💎":
                    result = "> 💎 **DIAMOND JACKPOT!**";
                    break;

                case "⭐":
                    result = "> ⭐ **LUCKY JACKPOT!**";
                    break;

                default:
                    result = "> 🎉 **JACKPOT!**";
                    break;

            }

        }

        await loading.edit({
            content: "",
            embeds: [
                FunEmbedService.slot(roll, result)
            ]
        });

    }

};

export default command;