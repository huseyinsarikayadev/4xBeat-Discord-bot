# 4xBeat Discord Bot

TypeScript ve [discord.js](https://discord.js.org/) ile geliştirilmiş, Spotify entegrasyonlu bir Discord müzik botu.

## Özellikler

- YouTube ve Spotify üzerinden müzik çalma (`play-dl`, `spotify-url-info`, `youtube-dl-exec`)
- Sesli kanal desteği (`@discordjs/voice`, `ffmpeg-static`)
- Spotify OAuth entegrasyonu (client id/secret + refresh token)
- Prefix tabanlı komut sistemi
- Modüler yapı: komutlar (`commands`), event handler'lar (`events`), yardımcı fonksiyonlar (`utils`) ayrı klasörlerde

## Klasör Yapısı

```
4xBeat-Discord-bot/
├── commands/      # Bot komutları
├── events/        # Discord event handler'ları
├── handlers/      # Komut ve event yükleyiciler
├── music/         # Müzik çalma mantığı (queue, player vs.)
├── structures/     # ExtendedClient gibi temel yapılar
├── types/         # TypeScript tip tanımları
├── utils/         # Yardımcı fonksiyonlar
├── config.ts      # Ortam değişkeni yönetimi
├── index.ts       # Giriş noktası
└── package.json
```

## Gereksinimler

- [Node.js](https://nodejs.org/) (v18 veya üzeri önerilir)
- Bir [Discord Bot Token](https://discord.com/developers/applications)
- Spotify Developer hesabı (Client ID, Client Secret, Refresh Token)

## Kurulum

1. Repoyu klonlayın:
   ```bash
   git clone https://github.com/huseyinsarikayadev/4xBeat-Discord-bot.git
   cd 4xBeat-Discord-bot
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Proje kök dizininde bir `.env` dosyası oluşturun ve aşağıdaki değişkenleri doldurun:
   ```env
   TOKEN=discord_bot_tokeniniz
   PREFIX=!
   SPOTIFY_CLIENT_ID=spotify_client_id
   SPOTIFY_CLIENT_SECRET=spotify_client_secret
   SPOTIFY_REFRESH_TOKEN=spotify_refresh_token
   ```

4. Botu geliştirme modunda çalıştırın:
   ```bash
   npm run dev
   ```

   Ya da derleyip normal başlatmak için:
   ```bash
   npm run build
   npm start
   ```

## Kullanılabilir Scriptler

| Komut          | Açıklama                                   |
| -------------- | ------------------------------------------- |
| `npm run dev`  | `tsx watch` ile geliştirme modunda çalıştırır |
| `npm start`    | Botu `tsx` ile doğrudan çalıştırır          |
| `npm run build`| TypeScript kodunu derler (`tsc`)            |

## Kullanılan Teknolojiler

- discord.js v14
- @discordjs/voice
- play-dl
- spotify-url-info
- youtube-dl-exec
- ffmpeg-static
- express
- dotenv
- TypeScript

## Katkıda Bulunma

Katkılarınızı bekliyoruz! Bir issue açabilir veya pull request gönderebilirsiniz.

## Lisans

ISC
