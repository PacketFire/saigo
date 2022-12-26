//import { SlashCommand } from "core/interfaces/command";
import { Client } from "discord.js"
import message from "./message"
import interaction from "./interaction"
import getSlashCommands from "../../commands/slash/triggers"


export default (client: Client): void => {
    client.on('ready', async () => {
        if(!client.user || !client.application) {
            console.log("No client user or application.")
            return
        }
        console.log(`${client.user.username} is logged in and ready!\n`)
    
        // handle messages
        message(client)

        // handle interactions
        const slashCommands = await getSlashCommands()
        interaction(client, slashCommands)
    })
}
