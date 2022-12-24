import { SlashCommand } from "core/interfaces/command";
import { Client } from "discord.js"

export default (client: Client, slashCommands: SlashCommand[]): void => {
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }

        await client.application.commands.set(slashCommands);

        console.log(`${client.user.username} is online and ready!`);
    });
}

