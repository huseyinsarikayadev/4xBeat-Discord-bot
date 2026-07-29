import {
    GuildMember,
    VoiceChannel,
    ChannelType,
    PermissionsBitField
} from "discord.js";

export class VoiceFunService {

    private static wait(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    public static createRoute(
    target: GuildMember,
    count: number
    ): VoiceChannel[] {

        const originalChannel = target.voice.channel;

        if (!originalChannel) {
            return [];
        }

        const channels = target.guild.channels.cache
            .filter(channel => {

                if (channel.type !== ChannelType.GuildVoice)
                    return false;

                if (channel.id === originalChannel.id)
                    return false;

                if (channel.id === target.guild.afkChannelId)
                    return false;

                if (!channel.permissionsFor(target)?.has(PermissionsBitField.Flags.ViewChannel))
                    return false;

                if (!channel.permissionsFor(target)?.has(PermissionsBitField.Flags.Connect))
                    return false;

                return true;

            })
            .map(channel => channel as VoiceChannel);

        if (!channels.length)
            return [];

        const route: VoiceChannel[] = [];

        let lastChannelId: string | null = null;

        for (let i = 0; i < count; i++) {

            let channel =
                channels[Math.floor(Math.random() * channels.length)];

            while (
                channels.length > 1 &&
                channel.id === lastChannelId
            ) {

                channel =
                    channels[Math.floor(Math.random() * channels.length)];

            }

            lastChannelId = channel.id;

            route.push(channel);

        }

        return route;

    }

   public static async tour(
    target: GuildMember,
    route: VoiceChannel[],
    onVisit?: (index: number) => Promise<void>
        ) {
            const originalChannel = target.voice.channel;

    if (!originalChannel)
        return;

    for (let i = 0; i < route.length; i++) {

        await target.voice.setChannel(route[i]);

        await onVisit?.(i);

        await this.wait(1000);

    }

    await target.voice.setChannel(originalChannel);


    }

}