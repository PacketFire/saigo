import { CommandInteraction, Client } from "discord.js";
import { SlashCommand } from "core/interfaces/command";

export const test: SlashCommand = {
    name: "test",
    description: "Returns a test message.",
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = "Testing message complete...";
        console.log(client)

        await interaction.followUp({
            ephemeral: true,
            content,
        });
    }
};