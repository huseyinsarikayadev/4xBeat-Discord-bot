import { Message, GuildMember, TextChannel } from "discord.js";
import { Command } from "../../types/Command.js";
import { ExtendedClient } from "../../structures/ExtendedClient.js";
import { VoiceFunService } from "../../music/services/VoiceFunService.js";
import { FunEmbedService } from "../../music/services/FunEmbedService.js";



const command: Command = {

    name: "tour",
    description: "Kullanıcıyı ses kanallarında tura çıkarır.",
    aliases: [],


    async execute(
        client: ExtendedClient,
        message: Message
    ) {
        const channel = message.channel as TextChannel;

        const member = message.mentions.members?.first();

        let count = Number(message.content.split(" ")[2]) || 5;
        console.log("COUNT:", count);
        if (count < 1 || count > 11) {
            await message.reply(
                "> ❌ Tur sayısı 1-10 arasında olmalı."
            );
            return;
        }

        if (!member) {
            await message.reply(
                "> ❌ Tur için bir yolcu seçmelisin. Örnek: **`4!tour @Kullanıcı 5`**"
            );
            return;
        }
        if (!member.voice.channel) {

            await message.reply(
                "> ❌ Bu yolcu şu anda bir ses kanalında değil."
            );

            return;

        }


        const route =
            VoiceFunService.createRoute(
                member,
                count
            );


        if (!route.length) {

            await message.reply(
                "> ❌ Gezilecek uygun ses kanalı bulunamadı."
            );

            return;

        }


        let completed = -1;

        if (!message.channel.isTextBased()) {
            return;
        }
        const tourMessage =
            await channel.send({

                embeds: [

                    FunEmbedService.tour(
                        member.user.username,
                        route,
                        completed,
                        false
                    )

                ]

            });



        await VoiceFunService.tour(

            member,

            route,

            async(index)=>{


                completed = index;


                await tourMessage.edit({

                    embeds:[

                        FunEmbedService.tour(
                            member.user.username,
                            route,
                            completed,
                            false
                        )

                    ]

                });


            }

        );



        await tourMessage.edit({

            embeds:[

                FunEmbedService.tour(
                    member.user.username,
                    route,
                    route.length,
                    true
                )

            ]

        });


    }

};


export default command;