import { ExtendedClient } from "../structures/ExtendedClient.js";

export interface Event {
    name: string;
    once?: boolean;

    execute(
        client: ExtendedClient,
        ...args: any[]
    ): Promise<void> | void;
}