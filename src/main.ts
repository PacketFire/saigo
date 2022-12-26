import { Client, IntentsBitField, GatewayIntentBits } from "discord.js"
import config from "../data/config.json"
import ready from "./core/listeners/ready"

const client = new Client({ 
    intents: [
        IntentsBitField.Flags.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
})

async function main() {
    ready(client)
    await client.login(config.token)
}

main()