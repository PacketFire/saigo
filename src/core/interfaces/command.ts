import { 
    BaseCommandInteraction, 
    ChatInputApplicationCommandData, 
    Client,
    Message
} from "discord.js";


export interface PrefixCommand extends ChatInputApplicationCommandData {
    run: (message: Message, parsedMsg: Array<string>) => void
}

export interface SlashCommand extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: BaseCommandInteraction) => void
}