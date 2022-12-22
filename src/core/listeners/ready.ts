import { Client } from "discord.js"
import { slashCommands } from "../../commands/slash/triggers";

export default (client: Client): void => {
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }

        await client.application.commands.set(slashCommands);

        console.log(`${client.user.username} is online and ready!`);
    });
}

