import { 
    BaseCommandInteraction, 
    ChatInputApplicationCommandData, 
    Client,
    Message
} from "discord.js";


export interface PrefixCommand {
    trigger: (client: Client, message: Message) => void
}

export interface SlashCommand extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: BaseCommandInteraction) => void;
}