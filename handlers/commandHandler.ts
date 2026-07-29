import { ExtendedClient } from "../structures/ExtendedClient.js";

import ping from "../commands/general/ping.js";
import play from "../commands/music/play.js";
import skip from "../commands/music/skip.js";
import stop from "../commands/music/stop.js";
import queue from "../commands/music/queue.js";
import loop from "../commands/music/loop.js";
import clear from "../commands/music/clear.js";
import remove from "../commands/music/remove.js";
import shuffle from "../commands/music/shuffle.js";
import help from "../commands/general/help.js";
import bb from "../commands/fun/bb.js";
import randomvoice from "../commands/fun/rdvoice.js";
import flip from "../commands/fun/coin.js";
import slot from "../commands/fun/slot.js";
import roulette from "../commands/fun/roulette.js";
import tour from "../commands/fun/tour.js";
import takke from "../commands/fun/takke.js";
import kes from "../commands/soundpad/kes.js"
import baba from "../commands/soundpad/baba.js"
import polis from "../commands/soundpad/polis.js"
export function loadCommands(client: ExtendedClient): void {

    const commands = [
        ping,
        play,
        skip,
        stop,
        queue,
        loop,
        clear,
        remove,
        shuffle,
        help,
        bb,
        randomvoice,
        flip,
        slot,
        roulette,
        tour,
        takke,
        kes,
        baba,
        polis

    ];

    for (const command of commands) {

        client.commands.set(command.name, command);

        if (command.aliases) {
            for (const alias of command.aliases) {
                client.commands.set(alias, command);
            }
        }

    }

}