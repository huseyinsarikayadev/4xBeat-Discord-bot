import { Message } from "discord.js";
import { Event } from "../types/Event.js";
import { config } from "../config.js";

const messageCreate: Event = {
    
    name: "messageCreate",

    async execute(client, message: Message) {

        // Bot mesajlarını yok say
        if (message.author.bot) return;

        // Prefix kontrolü
        if (!message.content.startsWith(config.prefix)) return;

        // Prefix'i kaldır
        const args = message.content
            .slice(config.prefix.length)
            .trim()
            .split(/\s+/);

        // Komut adını al
        const commandName = args.shift()?.toLowerCase();

        if (!commandName) return;

        // Komutu bul
        const command = client.commands.get(commandName);

        if (!command) return;

        // Çalıştır
        await command.execute(client, message, args);
    }
};

export default messageCreate;