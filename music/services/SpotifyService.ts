import axios from "axios";
import spotifyUrlInfoDefault from "spotify-url-info";

const spotifyUrlInfo =
    spotifyUrlInfoDefault as unknown as (
        fetch: typeof globalThis.fetch
    ) => {
        getTracks: (url: string) => Promise<any[]>;
        getData: (url: string) => Promise<any>;
    };

const { getTracks } = spotifyUrlInfo(fetch);
export class SpotifyService {


    private static async getToken(): Promise<string> {

        console.log("YENİ TOKEN ALINIYOR");


        const response =
            await axios.post(
                "https://accounts.spotify.com/api/token",
                new URLSearchParams({
                    grant_type: "refresh_token",
                    refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!
                }),
                {
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded"
                    },
                    auth: {
                        username:
                            process.env.SPOTIFY_CLIENT_ID!,
                        password:
                            process.env.SPOTIFY_CLIENT_SECRET!
                    }
                }
            );


        console.log("TOKEN GELDİ");


        return response.data.access_token;

    }




        public static async getPlaylistTracks(
            playlistUrl: string
        ) {

            try {

                const rawTracks =
                    await getTracks(playlistUrl);

                const tracks: {
                    name: string;
                    artist: string;
                }[] = [];

                for (const item of rawTracks) {

                    if (!item?.name)
                        continue;

                    if (!item.artist) {
                        console.log(
                            "SANATÇI BİLGİSİ YOK, ATLANDI:",
                            item.name
                        );
                        continue;
                    }

                    tracks.push({
                        name: item.name,
                        artist: item.artist
                    });

                    if (tracks.length >= 100)
                        break;
                }

                console.log("BULUNAN ŞARKI:", tracks.length);

                return tracks;

            } catch (error: any) {

                console.log("SCRAPE ERROR:", error?.message ?? error);
                throw error;
            }
        }
        public static async getTrack(trackUrl: string) {

        const trackId =
            trackUrl
                .split("/track/")[1]
                .split("?")[0];

        const token =
            await this.getToken();

        const response =
            await axios.get(
                `https://api.spotify.com/v1/tracks/${trackId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

        return {
            name: response.data.name,
            artist: response.data.artists[0].name
        };
    }

}