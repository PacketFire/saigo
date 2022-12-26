import { Client, Message } from "discord.js"
import getPrefixCommands from "../../commands/prefix/triggers"

const acceptedPrefix = ['!', '.']

export default (client: Client): void => {
    client.on('messageCreate', async (message) => {
        if(!message.content) {
            return;
        } else {
            await handlePrefixCommand(message)
        }
    })
}

const handlePrefixCommand = async (message: Message): Promise<void> => {
    const prefixCommands = await getPrefixCommands()

    acceptedPrefix.forEach((prefix: string) => {
        if(message.content[0] == prefix) {
            const messages = message.content.split(' ')
            const cmd = messages[0].replace('!', '')

            const commandTrigger = prefixCommands.find(c => c.name === cmd)

            if(!commandTrigger) {
                return
            }

            commandTrigger.run(message)
            
        }
    })
}