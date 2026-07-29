import { Message } from "discord.js";
import { Command } from "../../types/Command.js";
import { ExtendedClient } from "../../structures/ExtendedClient.js";
import { NotificationService } from "../../music/services/NotificationService.js";
import { MusicValidator } from "../../music/utils/MusicValidator.js";

const command: Command = {

    name: "remove",
    description: "Kuyruktan şarkı kaldırır.",
    aliases: ["rm"],

    async execute(
        client: ExtendedClient,
        message: Message,
        args: string[]
    ) {    
        const queue = client.music.getQueue(message.guild!.id);
        if (!(await MusicValidator.validate(message, queue))) {
            return;
        }
        if (!args.length) {
            await message.reply("> ❌ Kaldırmak istediğin şarkının sıra numarasını gir.");
            return;
        }
        const position = Number(args[0]);
        if (isNaN(position) || position <= 0) {
            await message.reply("> ❌ Geçerli bir sıra numarası gir.");
            return;
        }
        const removedSong = queue.removeSong(position);
        if (!removedSong) {
            await message.reply("> ❌ Bu sırada bir şarkı bulunamadı.");
            return;
        }
        await message.reply({
            embeds: [
                NotificationService.removed(removedSong)
            ]
        });
    }

};

export default command;