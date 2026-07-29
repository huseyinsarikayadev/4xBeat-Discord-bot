import { Message } from "discord.js";
import { NotificationService } from "../../music/services/NotificationService.js";
import { Command } from "../../types/Command.js";
import { ExtendedClient } from "../../structures/ExtendedClient.js";
import { Player } from "../../music/Player.js";
import { GuildQueue } from "../../music/GuildQueue.js";

const command: Command = {

    name: "baba",
    description: "Kalkın laan!",
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
                            "😔",
                            "Baba!.."
                        )
                    ]
                });
        player.once("idle", () => {

            player.stop();

        });

        await player.play(
            "https://youtube.com/shorts/u7j54_3PnkU?si=mfxHBf23HWFtQdko"
        );

    }

};

export default command;