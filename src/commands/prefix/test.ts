import { PrefixCommand } from "core/interfaces/command"
import { Message } from "discord.js"
import { Database } from "better-sqlite3"

export const test: PrefixCommand = {
    name: 'test',
    description: 'test command',
    run: async (
        message: Message,
        parsedMsg: Array<string>,
        db: Database,
        auth_type: string
    ) => {
        console.log(parsedMsg, db, auth_type)
        message.channel.send('test message complete..')
    }
}