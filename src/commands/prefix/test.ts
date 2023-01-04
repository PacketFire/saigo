import { PrefixCommand } from "core/interfaces/command"
import { Message } from "discord.js"

export const test: PrefixCommand = {
    name: 'test',
    description: 'test command',
    run: async (message: Message, parsedMsg: Array<string>) => {
        console.log(parsedMsg)
        message.channel.send('test message complete..')
    }
}