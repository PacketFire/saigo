import { Client, Message } from "discord.js"
//import { runCommand } from "../handler"

export default (client: Client): void => {
    client.on("message", async (message: Message) => {
        try {
            console.log(message.content)
        } catch (error) {
            console.log(error)
        }
    })
}