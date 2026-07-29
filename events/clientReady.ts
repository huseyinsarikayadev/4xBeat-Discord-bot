import { Event } from "../types/Event.js";
import { Logger } from "../utils/logger.js";

const clientReady: Event = {
    name: "clientReady",
    once: true,

    execute(client) {
        Logger.success(`${client.user?.tag} aktif!`);
    }
};

export default clientReady;