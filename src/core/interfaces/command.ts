import { 
    BaseCommandInteraction, 
    ChatInputApplicationCommandData, 
    Client,
    Message
} from "discord.js"
import { Database } from "better-sqlite3"


export interface PrefixCommand extends ChatInputApplicationCommandData {
    run: (
        message: Message,
        parsedMsg: Array<string>,
        db: Database,
        auth_type: string
    ) => void
}

export interface SlashCommand extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: BaseCommandInteraction) => void
}