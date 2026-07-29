import { Message } from "discord.js";
import play, { SpotifyTrack, SpotifyPlaylist   } from "play-dl";
import { Command } from "../../types/Command.js";
import { ExtendedClient } from "../../structures/ExtendedClient.js";
import { Song } from "../../music/Song.js";
import { YouTubeService } from "../../music/services/YouTubeService.js";
import { NotificationService} from "../../music/services/NotificationService.js";
import { AddSongResult } from "../../music/enums/AddSongResult.js";
import { SpotifyService } from "../../music/services/SpotifyService.js";

const command: Command = {

    name: "play",
    description: "Şarkı çalar.",
    aliases: ["p"],

    async execute(
        client: ExtendedClient,
        message: Message,
        args: string[]
    ) {
        const channel = message.member?.voice.channel;

        if (!channel) {
            await message.reply("> Önce bir ses kanalına katılmalısın.");
            return;
        }

        const queue = client.music.getQueue(message.guild!.id);
        console.log("Current Song:", queue.getCurrentSong());

        await queue.player.connect(channel);

        if (!args.length) {

            if (queue.getCurrentSong()) {

                if (!queue.player.voiceConnection) {
                    await queue.player.connect(channel);
                }

                await message.reply({
                    embeds: [
                        NotificationService.musicResumed()
                    ]
                });

                return;
            }

            await message.reply("> Bir şarkı adı veya URL girmelisin.");
            return;
        }

        const query = args.join(" ");

        const youtube = new YouTubeService();
        
        let song;

        try {

            let searchQuery = query;
            // SPOTIFY PLAYLIST
            if (query.includes("spotify.com/playlist")) {


            const loading =
                await message.reply(
                    "> 📀 Spotify playlist alındı, 🎵 şarkılar kuyruğa ekleniyor..."
                );


            const tracks =
                await SpotifyService.getPlaylistTracks(query);


            let added = 0;


            for (const track of tracks) {

                try {

                    const youtubeQuery =
                        `${track.name} ${track.artist}`;


                    console.log(
                        "Playlist -> YouTube:",
                        youtubeQuery
                    );


                    const playlistSong =
                        await youtube.resolve(youtubeQuery);


                    playlistSong.requestedBy =
                        message.author.id;


                    await queue.addSong(
                        playlistSong
                    );


                    added++;


                } catch(error) {

                    console.log(
                        "Playlist şarkısı atlandı:",
                        error
                    );

                }

            }


            await loading.edit(
                `> ✅ Playlist tamamlandı. 🎵 ${added} şarkı kuyruğa eklendi.`
            );


            return;

        }

           if (query.includes("spotify.com")) {

            const track =
            await SpotifyService.getTrack(query);

            searchQuery =
                `${track.name} ${track.artist}`;

            console.log(
                "Spotify -> YouTube:",
                searchQuery
            );

        }


            song = await youtube.resolve(searchQuery);


        } catch (error) {

            console.error(error);

            await message.reply("> ❌ Şarkı bulunamadı.");
            return;

        }

        song.requestedBy = message.author.id;


        const result = await queue.addSong(song);

        if (result === AddSongResult.STARTED) {

            message.reply({
                embeds: [
                    NotificationService.songStarted(song)
                ]
            });

        } else {

            message.reply({
                embeds: [
                    NotificationService.songQueued(
                        song,
                        queue.getSize()
                    )
                ]
            });

        }
    }
};

export default command;