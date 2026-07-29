import { Message, VoiceBasedChannel } from "discord.js";

import { Command } from "../../types/Command.js";
import { ExtendedClient } from "../../structures/ExtendedClient.js";
import { FunEmbedService } from "../../music/services/FunEmbedService.js";
import { VoiceFunService } from "../../music/services/VoiceFunService.js";
const command: Command = {

    name: "roulette",
    description: "Ses kanalında rulet oynatır.",
    aliases: ["r"],

    async execute(
        client: ExtendedClient,
        message: Message
    ) {

        const queue = client.music.getQueue(message.guild!.id);

        if (!queue.hasPlayer()) {
            await message.reply("> ❌ Bot şu anda herhangi bir ses kanalında değil.");
            return;
        }

        const channelId = queue.player.voiceConnection?.joinConfig.channelId;

        if (!channelId) {
            await message.reply("> ❌ Botun bulunduğu ses kanalı bulunamadı.");
            return;
        }

        const voiceChannel = message.guild?.channels.cache.get(channelId) as VoiceBasedChannel;

        if (!voiceChannel) {
            await message.reply("> ❌ Botun bulunduğu ses kanalı bulunamadı.");
            return;
        }

        const members = [...voiceChannel.members.values()]
            .filter(member => !member.user.bot);

        if (members.length < 2) {
            await message.reply("> ❌ Roulette oynayabilmek için botun bulunduğu ses kanalında en az 2 kişi olmalıdır.");
            return;
        }

        const loading = await message.reply(
            "> 🎲 Rulet dönüyor... Şansını deniyoruz!"
        );

        await new Promise(resolve =>
            setTimeout(resolve, 3000)
        );

        const target =
            members[Math.floor(Math.random() * members.length)];

        const chance = Math.floor(Math.random() * 100);

        try {
            // TOUR
            if (chance < 15) {

                const originalChannel = target.voice.channel;

                if (!originalChannel) {
                    return;
                }


                await loading.edit({
                    content: "",
                    embeds: [
                        FunEmbedService.roulette(
                            "> 🎲 Roulette",
                            `> 🚌 **${target.displayName}** 4xBeat Tour'a gönderildi!`
                        )
                    ]
                });


                const route =
                    VoiceFunService.createRoute(
                        target,
                        5
                    );


                if (!route.length) {

                    await loading.edit({
                        content: "",
                        embeds: [
                            FunEmbedService.roulette(
                                "> 🎲 Roulette",
                                `> ❌ **${target.displayName}** için uygun rota bulunamadı.`
                            )
                        ]
                    });

                    return;
                }


                await VoiceFunService.tour(
                    target,
                    route
                );


                await loading.edit({
                    content: "",
                    embeds: [
                        FunEmbedService.roulette(
                            "> 🎲 Roulette",
                            `> 🚌 **${target.displayName}** turunu tamamladı ve geri döndü!`
                        )
                    ]
                });


                return;
            }
            // MUTE
            if (chance < 40) {

                await target.voice.setMute(true);

                await loading.edit({
                    content: "",
                    embeds: [
                        FunEmbedService.roulette(
                            "> 🎲 Roulette",
                            `> 🔇 **${target.displayName}** 10 saniyeliğine susturuldu.`
                        )
                    ]
                });

                setTimeout(async () => {
                    try {
                        await target.voice.setMute(false);
                    } catch {}
                }, 10000);

                return;
            }

            // DEAF
            if (chance < 65) {

                await target.voice.setDeaf(true);

                await loading.edit({
                    content: "",
                    embeds: [
                        FunEmbedService.roulette(
                            "> 🎲 Roulette",
                            `> 🎧 **${target.displayName}** 10 saniyeliğine sağırlaştırıldı.`
                        )
                    ]
                });

                setTimeout(async () => {
                    try {
                        await target.voice.setDeaf(false);
                    } catch {}
                }, 10000);

                return;
            }

            // KICK
            if (chance < 80) {

                await target.voice.disconnect();

                await loading.edit({
                    content: "",
                    embeds: [
                        FunEmbedService.roulette(
                            "> 🎲 Roulette",
                            `> 🚪 **${target.displayName}** ses kanalından atıldı.`
                        )
                    ]
                });

                return;
            }

            // SAFE
            if (chance < 95) {

                await loading.edit({
                    content: "",
                    embeds: [
                        FunEmbedService.roulette(
                            "> 🎲 Roulette",
                            `> 😇 **${target.displayName}** bu tur kurtuldu!`
                        )
                    ]
                });

                return;
            }

            // BB
            for (const member of voiceChannel.members.values()) {
                if (!member.user.bot) {
                    await member.voice.disconnect();
                }
            }

            await loading.edit({
                content: "",
                embeds: [
                    FunEmbedService.roulette(
                        "> 🎲 Roulette",
                        "> 💥 **BB!** Herkes ses kanalından atıldı."
                    )
                ]
            });

        } catch (error) {

            console.error(error);

            await loading.edit({
                content: "> ❌ Roulette çalıştırılırken bir hata oluştu."
            });

        }

    }

};

export default command;