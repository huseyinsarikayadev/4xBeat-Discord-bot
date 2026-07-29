import { GatewayIntentBits } from "discord.js";
import * as ffmpegStatic from "ffmpeg-static";
import play from "play-dl";
import { ExtendedClient } from "./structures/ExtendedClient.js";
import { config } from "./config.js";
import { loadEvents } from "./handlers/eventHandler.js";
import { loadCommands } from "./handlers/commandHandler.js";

const ffmpegPath = (ffmpegStatic as any).default ?? ffmpegStatic;
process.env.FFMPEG_PATH = ffmpegPath as string;


async function main() {

    await play.setToken({

        spotify: {
            client_id: config.spotifyClientId,
            client_secret: config.spotifyClientSecret,
            refresh_token: config.spotifyRefreshToken,
            market: "TR"

        }

    });


    const client = new ExtendedClient({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildVoiceStates
        ]
    });


    loadEvents(client);
    loadCommands(client);

    client.start(config.token);

}


main();