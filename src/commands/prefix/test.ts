import { PrefixCommand } from "core/interfaces/command"
import { Message } from "discord.js"

export const test: PrefixCommand = {
    name: 'test',
    description: 'test command',
    run: async (message: Message) => {
        message.channel.send('test message complete..')
    }
}