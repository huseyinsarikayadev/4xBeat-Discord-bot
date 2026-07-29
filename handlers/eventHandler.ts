import { ExtendedClient } from "../structures/ExtendedClient.js";

import clientReady from "../events/clientReady.js";
import messageCreate from "../events/messageCreate.js";

export function loadEvents(client: ExtendedClient): void {

    const events = [
        clientReady,
        messageCreate
    ];

    for (const event of events) {

        if (event.once) {
            client.once(event.name as any, (...args) => event.execute(client, ...args));
        } else {
            client.on(event.name as any, (...args) => event.execute(client, ...args));
        }

    }
}