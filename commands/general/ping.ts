import { Command } from "../../types/Command.js";

const ping: Command = {

    name: "ping",

    description: "Botun pingini gösterir.",

    aliases: ["pg"],

    async execute(client, message) {

        await message.reply("> 🏓 Pong!");

    }

};

export default ping;