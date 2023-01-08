import { PrefixCommand } from "core/interfaces/command"
import { Message } from "discord.js"
import { Database } from "better-sqlite3"

export const permission: PrefixCommand = {
    name: 'permission',
    description: 'Permission command for handling authorization. Usage:\
    !permission <add|del|list> <username> <owner|admin>',
    run: async (
        message: Message,
        parsedMsg: Array<string>,
        db: Database,
        auth_type: string
    ) => {
        if(auth_type === 'owner') {
            const subCmd = parsedMsg[1]

            switch(subCmd) {
                case 'add':
                    const username = parsedMsg[2]
                    
                    if(username) {
                        const authType = parsedMsg[3]

                        if(authType) {
                            const stmt = db.prepare(`
                                insert into permissions(username, auth_type) values(? ?)
                            `)
                            stmt.run(username, authType)
                            
                            message.channel.send(`
                                ${username} has been added to permissions list as ${authType}.
                            `)
                        } else {
                            message.channel.send(`
                                Provide an auth type for user.
                            `)
                        }
                    } else {
                        message.channel.send(`
                            Provide a username to add to permissions list.
                        `)
                    }
                    break
                case 'del':
                    break
                case 'list':
                    break
                default:
                    message.channel.send(permission.description)
                    break
            }
        }
    }
}