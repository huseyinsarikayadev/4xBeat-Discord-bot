import { Command } from "../../types/Command.js";
let isRunning = false;
const takke: Command = {

    name: "takke",

    description: "Takkenin İnfosu",

    aliases: ["tk"],

    async execute(client, message) {

        if (isRunning) {
            await message.reply("> ⏳ Bu komut şu anda zaten çalışıyor.");
            return;
        }

        isRunning = true;

        try {

            for (let i = 0; i < 5; i++) {

                await message.reply("> SABAH BEŞTE KALKTIM!");
                await new Promise(resolve => setTimeout(resolve, 250))

            }

        } finally {

            isRunning = false;

        }

    }
    

};
export default takke;