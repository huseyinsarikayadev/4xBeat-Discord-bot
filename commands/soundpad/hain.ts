import { Message } from "discord.js";
import { NotificationService } from "../../music/services/NotificationService.js";
import { Command } from "../../types/Command.js";
import { ExtendedClient } from "../../structures/ExtendedClient.js";
import { Player } from "../../music/Player.js";

const command: Command = {

    name: "hain",
    description: "Hain Olalım!",
    aliases: [],

    async execute(
        client: ExtendedClient,
        message: Message
    ) {

        const channel = message.member?.voice.channel;

        if (!channel) {

            await message.reply(
                "> ❌ Önce bir ses kanalına katıl."
            );

            return;

        }

        const player = new Player();

        await player.connect(channel);
        await message.reply({
            embeds: [
                NotificationService.soundPadPlayed(
                    "😈",
                    "hain!"
                )
            ]
        });
        player.once("idle", () => {

            player.stop();

        });

        await player.play(
            "https://youtu.be/BNc99KSLpeM?si=vOJjRGH8spMn2Mno"
        );

    }

};

export default command;