import { Message, PermissionsBitField } from "discord.js";
import { Command } from "../../types/Command.js";
import { ExtendedClient } from "../../structures/ExtendedClient.js";

const command: Command = {

    name: "bb",
    description: "Ses kanalındaki diğer botları ve kullanıcıları atar.",
    aliases: [],

    async execute(
        client: ExtendedClient,
        message: Message
    ) {
        
        const voiceChannel = message.member?.voice.channel;

        if (!voiceChannel) {
            await message.reply("> ❌ Önce bir ses kanalında olmalısın.");
            return;
        }

        const queue = client.music.getQueue(message.guild!.id);

        queue.stop();

        const members = [...voiceChannel.members.values()];

        for (const member of members) {

            await member.voice.disconnect(
                `Bam by ${message.author.tag}`
            );

        }

        await message.reply(
            `> 💥 ${members.length} kişi ses kanalından çıkarıldı.`
        );

        const permissions = voiceChannel.permissionsFor(message.guild!.members.me!);

        if (!permissions?.has(PermissionsBitField.Flags.MoveMembers)) {
            await message.reply("> ❌ Bunu yapmak için Move Members yetkisine ihtiyacım var.");
            return;
        }
    }

};

export default command;