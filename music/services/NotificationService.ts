import { EmbedBuilder } from "discord.js";
import { Song } from "../Song.js";

export class NotificationService {

    private static createEmbed(
        title: string,
        color: number
    ): EmbedBuilder {

        return new EmbedBuilder()
            .setTitle(title)
            .setColor(color)
            .setFooter({
                text: "🎧 4xBeat Music"
            })
            .setTimestamp();

    }

    private static formatDuration(
        duration: number
    ): string {

        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;

        return `${minutes}:${seconds.toString().padStart(2, "0")}`;

    }


public static songStarted(
    song: Song
): EmbedBuilder {

    return this.createEmbed(
        "━━━━━━━━━━ 🎶 ŞİMDİ ÇALIYOR ━━━━━━━━━━",
        0x5865F2
    )
        .setThumbnail(song.thumbnail || null)
        .setDescription(
`> 🎵 **${song.title}**

> ⏱️ **Süre**
> ${this.formatDuration(song.duration)}

> 👤 **İsteyen**
> <@${song.requestedBy}>`
        );

}


public static songQueued(
    song: Song,
    position: number
): EmbedBuilder {

    return this.createEmbed(
        "━━━━━━━━━━ ➕ KUYRUĞA EKLENDİ ━━━━━━━━━━",
        0x57F287
    )
        .setThumbnail(song.thumbnail || null)
        .setDescription(
`> 🎵 **${song.title}**

> 📍 **Kuyruktaki Sırası**
> #${position}

> ⏱️ **Süre**
> ${this.formatDuration(song.duration)}

> 👤 **İsteyen**
> <@${song.requestedBy}>`
        );

}


public static skipped(
    song: Song
): EmbedBuilder {

    return this.createEmbed(
        "━━━━━━━━━━ ⏭️ ŞARKI GEÇİLDİ ━━━━━━━━━━",
        0xFEE75C
    )
        .setThumbnail(song.thumbnail || null)
        .setDescription(
`> 🎵 **${song.title}**

> ⏱️ **Süre**
> ${this.formatDuration(song.duration)}

> 👤 **İsteyen**
> <@${song.requestedBy}>`
        );

}


public static stopped(): EmbedBuilder {

    return this.createEmbed(
        "━━━━━━━━━━ ⏹️ OYNATMA DURDURULDU ━━━━━━━━━━",
        0xED4245
    )
        .setDescription(
`> 🔇 **Durum**
> Oynatma durduruldu ve bot ses kanalından ayrıldı.`
        );

}


public static error(
    message: string
): EmbedBuilder {

    return this.createEmbed(
        "━━━━━━━━━━ ❌ BİR HATA OLUŞTU ━━━━━━━━━━",
        0xED4245
    )
        .setDescription(
`> ❌ **Hata**
> ${message}`
        );

}


public static loop(
    enabled: boolean
): EmbedBuilder {

    if (enabled) {

        return this.createEmbed(
            "━━━━━━━━━━ 🔁 LOOP AKTİF ━━━━━━━━━━",
            0x57F287
        )
            .setDescription(
`> 🔁 **Durum**
> Mevcut şarkı tekrar oynatılacak.`
            );

    }

    return this.createEmbed(
        "━━━━━━━━━━ ➡️ LOOP DEVRE DIŞI ━━━━━━━━━━",
        0xED4245
    )
        .setDescription(
`> ➡️ **Durum**
> Kuyruk normal sırayla devam edecek.`
        );

}


public static clear(): EmbedBuilder {

    return this.createEmbed(
        "━━━━━━━━━━ 🧹 KUYRUK TEMİZLENDİ ━━━━━━━━━━",
        0xED4245
    )
        .setDescription(
`> 🧹 **Durum**
> Bekleyen tüm şarkılar kuyruktan kaldırıldı.`
        );

}


public static queue(
    songs: Song[]
): EmbedBuilder {

    const visibleSongs = songs.slice(0, 10);

    const description = visibleSongs
        .map((song, index) => {

            const icon = index === 0 ? " 🎧 " : " ➡️ ";

            return `> **${index + 1}.** ${icon} **${song.title}**`;

        })
        .join("\n\n");


    const remaining =
        songs.length - visibleSongs.length;


    return this.createEmbed(
        "━━━━━━━━━━ 📃 MÜZİK KUYRUĞU ━━━━━━━━━━",
        0x57F287
    )
    .setDescription(
        `${description}${
            remaining > 0
                ? `\n\n> 📀 **+${remaining} şarkı daha kuyrukta...**`
                : ""
        }`
    );

}

public static removed(
    song: Song
): EmbedBuilder {

    return this.createEmbed(
        "━━━━━━━━━━ 🗑️ ŞARKI KALDIRILDI ━━━━━━━━━━",
        0xED4245
    )
        .setThumbnail(song.thumbnail || null)
        .setDescription(
`> 🎵 **${song.title}**

> 🗑️ **Durum**
> Şarkı kuyruktan kaldırıldı.`
        );

}
    public static musicResumed(): EmbedBuilder {

        return this.createEmbed(
            "🎵 Müzik Devam Ediyor",
            0x57F287
        )
        .setDescription(
            "Kuyruk korunmuştu. Müzik kaldığı yerden devam ediyor."
        );

    }

public static shuffle(): EmbedBuilder {

    return this.createEmbed(
        "━━━━━━━━━━ 🔀 KUYRUK KARIŞTIRILDI ━━━━━━━━━━",
        0x5865F2
    )
        .setDescription(
`> 🔀 **Durum**
> Bekleyen şarkılar rastgele sıralandı.`
        );

}

public static help(): EmbedBuilder {

    return this.createEmbed(
        "🎧 4xBeat Komutları",
        0x5865F2
    )
    .setDescription(
        "Aşağıdaki komutları kullanarak 4xBeat'i kontrol edebilirsin."
    )
    .addFields(
        {
            name: "━━━━━━━━━━ 🎵 Müzik ━━━━━━━━━━",
            value:
        `> ▶️ **play**
        > Şarkı oynatır.

        > 📃 **queue** | **q**
        > Kuyruğu gösterir.

        > ⏭️ **skip** | **s**
        > Mevcut şarkıyı geçer.

        > ⏹️ **stop** | **st**
        > Müziği durdurur ve botu çıkarır.

        > 🧹 **clear** | **cl**
        > Kuyruğu temizler.

        > 🗑️ **remove** | **rm**
        > Kuyruktan şarkı kaldırır.

        > 🔀 **shuffle** | **sh**
        > Kuyruğu karıştırır.

        > 🔁 **loop** | **lp**
        > Döngüyü açar veya kapatır.`,
            inline: false
        },
        {
            name: "━━━━━━━━━━ 🎲 Eğlence ━━━━━━━━━━",
            value:
        `> 🪙 **coin** | **flip**
        > Yazı tura atar.

        > 🎰 **slot** | **slots**
        > Slot makinesini çevirir.

        > 🚌 **tour** | **tour**
        > Sunucuda bir kişiyi tura çıkartır.

        > 🎩 **takke** | **tk**
        > Text kanalına 5 kez SABAH BEŞTE KALKTIM! yazar.

        > 🔇 **randomvoice** | **rv**
        > Bot ses kanalındaki random birine 5 saniyeliğine deaf ya da mute atar.

        > 🎲 **roulette** | **r**
        > Ses kanalında rastgele bir olayı tetikler.`,
            inline: false
        },
        {
            name: "━━━━━━━━━━ 📢 SoundPad ━━━━━━━━━━",
            value:
        `
        > 🔊 **kes** | **kes**
        > SoundPad sesidir

        > 🔊 **baba** | **baba**
        > SoundPad sesidir
        
        `,
            inline: false
        },
        {
            name: "━━━━━━━━━━ ⚙️ Genel ━━━━━━━━━━",
            value:
        `> 🏓 **ping** | **pg**
        > Bot gecikmesini gösterir.

        > ❓ **help** | **h**
        > Komut listesini gösterir.`,
            inline: false
        }
                );

            }
        public static soundPadPlayed(
            emoji: string,
            title: string
        ): EmbedBuilder {

            return this.createEmbed(
                `${emoji} ${title}`,
                0x5865F2
            )
            .setDescription(
            `> SoundPadi kullanılıyor.

            ━━━━━━━━━━━━━━━━━━

            > ⚠️ **Müzik Dinleyenler İçin**

            Eğer bu efekti müzik çalarken kullandıysan,
            efekt bittikten sonra **4!p** komutunu
            kullanarak kaldığın yerden devam edebilirsin.`
            );

        }
}