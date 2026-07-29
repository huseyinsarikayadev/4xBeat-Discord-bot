import { Message } from "discord.js";
import { Command } from "../../types/Command.js";
import { ExtendedClient } from "../../structures/ExtendedClient.js";
import { NotificationService} from "../../music/services/NotificationService.js";
import { VoiceConnection, VoiceConnectionStatus } from "@discordjs/voice";

const command: Command = {

    name: "stop",
    description: "Şarkıyı keser ve disconnect atar.",
    aliases: ["st"],

    async execute(
        client: ExtendedClient,
        message: Message
    ) {

        const queue = client.music.getQueue(message.guild!.id);

        if (queue.player.voiceConnection){
            queue.stop();
            await message.reply({
            embeds: [
                        NotificationService.stopped()
                ]
            });
        }else {
            await message.reply("> 🔇 Bot şu anda bir ses kanalında değil.")
        }


    }

};

export default command;