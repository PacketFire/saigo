import { Client, Message, User } from "discord.js"
import getPrefixCommands from "../../commands/prefix/triggers"

const acceptedPrefix = ['!', '.']

export default (client: Client): void => {
    client.on('messageCreate', async (message) => {
        if(!message.content) {
            return
        } else {
            console.log(
                '\x1b[33m#' + message.channel + '\x1b[0m ' + '\x1b[1;32m' +
                message.author.username + '\x1b[0m' +
                ': \x1b[0;37m' + message.content + '\x1b[0m'
            )

            if(await handlePermissions(message.author)) {
                await handlePrefixCommand(message)
            }
        }
    })
}

const handlePermissions = async (author: User): Promise<boolean> => {
    // temporarily hardcode until database support is added
    return author.id === '391394861669941249' || author.id === '105768800191811584'
}

const handlePrefixCommand = async (message: Message): Promise<void> => {
    const prefixCommands = await getPrefixCommands()

    acceptedPrefix.forEach((prefix: string) => {
        if(message.content[0] == prefix) {
            const parsedMsg = message.content.split(' ')
            const cmd = parsedMsg[0].replace(prefix, '')

            const commandTrigger = prefixCommands.find(c => c.name === cmd)

            if(!commandTrigger) {
                return
            }

            commandTrigger.run(message, parsedMsg)
        }
    })
}