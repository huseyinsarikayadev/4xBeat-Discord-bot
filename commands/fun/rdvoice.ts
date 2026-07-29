import { Message } from "discord.js";
import { Command } from "../../types/Command.js";
import { ExtendedClient } from "../../structures/ExtendedClient.js";


const command: Command = {

    name: "randomvoice",
    description: "Sesteki rastgele kişiye mute veya deaf uygular.",
    aliases: ["rv"],

    async execute(
        client: ExtendedClient,
        message: Message
    ) {

        const voiceChannel = message.member?.voice.channel;


        if (!voiceChannel) {
            await message.reply(
                "> ❌ Önce bir ses kanalına katılmalısın."
            );
            return;
        }


        const members = voiceChannel.members.filter(
            member =>
                !member.user.bot &&
                member.id !== message.author.id
        );


        if (members.size === 0) {
            await message.reply(
                "> ❌ Ses kanalında hedef bulunamadı."
            );
            return;
        }


        const target =
            [...members.values()][
                Math.floor(Math.random() * members.size)
            ];


        const action =
            Math.random() > 0.5
                ? "mute"
                : "deaf";


        try {

            if (action === "mute") {

                await target.voice.setMute(
                    true,
                    "Random voice command"
                );


                await message.reply(
                    `> 🔇 **${target.user.username}** 5 saniyeliğine susturuldu.`
                );


                setTimeout(async () => {

                    await target.voice.setMute(
                        false,
                        "Random voice expired"
                    );

                }, 5 * 1000);


            } else {

                await target.voice.setDeaf(
                    true,
                    "Random voice command"
                );


                await message.reply(
                    `> 🎧 **${target.user.username}** 5 saniyeliğine sağırlaştırıldı.`
                );


                setTimeout(async () => {

                    await target.voice.setDeaf(
                        false,
                        "Random voice expired"
                    );

                }, 5 * 1000);

            }


        } catch (error) {

            console.error(error);

            await message.reply(
                "> ❌ Bu kişiye işlem uygulanamadı."
            );

        }

    }

};


export default command;