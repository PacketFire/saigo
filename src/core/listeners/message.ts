import { Client, Message } from "discord.js"
import getPrefixCommands from "../../commands/prefix/triggers"
import { Database } from "better-sqlite3"

const acceptedPrefix = ['!', '.']

export default (client: Client, db: Database): void => {
    client.on('messageCreate', async (message) => {
        if(!message.content) {
            return
        } else {
            console.log(
                '\x1b[33m#' + message.channel + '\x1b[0m ' + '\x1b[1;32m' +
                message.author.username + '\x1b[0m' +
                ': \x1b[0;37m' + message.content + '\x1b[0m'
            )

            await handlePrefixCommand(message, db)
        }
    })
}

const handlePrefixCommand = async (message: Message, db: Database): Promise<void> => {
    const prefixCommands = await getPrefixCommands()

    acceptedPrefix.forEach((prefix: string) => {
        if(message.content[0] == prefix) {
            const parsedMsg = message.content.split(' ')
            const cmd = parsedMsg[0].replace(prefix, '')
            const commandTrigger = prefixCommands.find(c => c.name === cmd)

            if(!commandTrigger) {
                return
            }

            const stmt = db.prepare(`
                select auth_type from permissions where username = ?
            `).get(message.author.username)
 
            if(!stmt.auth_type) {
                return
            }

            commandTrigger.run(message, parsedMsg, db, stmt.auth_type)

        }
    })
}