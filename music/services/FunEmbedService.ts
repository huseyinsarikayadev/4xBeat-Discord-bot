import { EmbedBuilder, VoiceChannel  } from "discord.js";

export class FunEmbedService {

    private static createEmbed(
        title: string,
        description: string
    ): EmbedBuilder {

        return new EmbedBuilder()
            .setColor("#f1c40f")
            .setTitle(title)
            .setDescription(description)
            .setTimestamp();

    }

    public static coin(result: string): EmbedBuilder {

        return this.createEmbed(
            "> 🪙 Coin Flip",
            `## ${result}`
        );

    }
    public static slot(
        symbols: string[],
        result: string
    ): EmbedBuilder {

        return this.createEmbed(
            "> 🎰 4xBeat Slot Machine",
    `╔═════════╗
    ║ ${symbols[0]} │ ${symbols[1]} │ ${symbols[2]} ║
    ╚═════════╝

    ${result}`
        );

    }
    public static roulette(
    title: string,
    description: string
    ): EmbedBuilder {

        return this.createEmbed(
            title,
            description
        );

    }
    public static tour(
        user: string,
        route: VoiceChannel[],
        completed: number,
        finished: boolean
    ): EmbedBuilder {

    const stops = route
        .map((channel, index) => {

            const icon =
                index <= completed
                    ? "> 🔴"
                    : "> 🟢";

            const arrow =
                index < route.length - 1
                    ? "\n   ↓"
                    : "";

            return `${icon} ${channel.name}${arrow}`;

        })
        .join("\n");

        return this.createEmbed(

            finished
                ? "> 🏁 4xBeat Tour Tamamlandı"
                : "> 🚌 4xBeat Tour",

    `
    👤 **Hedef**
    ${user}

    🚏 **Duraklar**

    ${stops}

    ${
    finished
    ? "> 🏠 Tur bitti eve geri dönüldü."
    : "> 🚏 Tur devam ediyor..."
    }
    `
        );

    }
}