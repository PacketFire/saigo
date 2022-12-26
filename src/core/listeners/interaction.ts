import { CommandInteraction, Client, Interaction } from "discord.js"
import { SlashCommand } from "core/interfaces/command"


export default (client: Client, slashCommands: SlashCommand[]): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            await handleSlashCommand(client, slashCommands, interaction)
        }
    })
}

const handleSlashCommand = async (client: Client, slashCommands: SlashCommand[], interaction: CommandInteraction): Promise<void> => {
    const commandTrigger = slashCommands.find(c => c.name === interaction.commandName)
    if (!commandTrigger) {
        interaction.followUp({ content: "An error has occurred" })
        return
    }

    await interaction.deferReply()

    commandTrigger.run(client, interaction)
}