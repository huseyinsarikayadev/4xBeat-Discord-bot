import dotenv from "dotenv";

dotenv.config();

const token = process.env.TOKEN;
const prefix = process.env.PREFIX;
const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const spotifyRefreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

if (!token) {
    throw new Error("TOKEN .env dosyasında bulunamadı!");
}

if (!prefix) {
    throw new Error("PREFIX .env dosyasında bulunamadı!");
}
if (!spotifyClientId) {
    throw new Error("SPOTIFY_CLIENT_ID .env dosyasında bulunamadı!");
}

if (!spotifyClientSecret) {
    throw new Error("SPOTIFY_CLIENT_SECRET .env dosyasında bulunamadı!");
}
if (!spotifyRefreshToken) {
    throw new Error("SPOTIFY_REFRESH_TOKEN .env dosyasında bulunamadı!");
}


export const config = {
    token,
    prefix,
    spotifyClientId,
    spotifyClientSecret,
    spotifyRefreshToken
};