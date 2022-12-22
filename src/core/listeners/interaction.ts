import { CommandInteraction, Client, Interaction } from "discord.js"
import { slashCommands } from "../../commands/slash/triggers"


export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            await handleSlashCommand(client, interaction)
        }
    })
}

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    const commandTrigger = slashCommands.find(c => c.name === interaction.commandName);
    if (!commandTrigger) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }

    await interaction.deferReply();

    commandTrigger.run(client, interaction);
}