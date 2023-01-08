import { PrefixCommand } from "core/interfaces/command"
import { Message } from "discord.js"
import { Database } from "better-sqlite3"

export const test: PrefixCommand = {
    name: 'test',
    description: 'test command',
    run: async (message: Message, parsedMsg: Array<string>, db: Database) => {
        console.log(parsedMsg, db)
        message.channel.send('test message complete..')
    }
}