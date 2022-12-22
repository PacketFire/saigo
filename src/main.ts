import { Client, IntentsBitField } from "discord.js"
import config from "../data/config.json"
import ready from "./core/listeners/ready"
import interaction from "./core/listeners/interaction"

const client = new Client({ intents: [IntentsBitField.Flags.Guilds] });

async function main() {
    ready(client)
    interaction(client)
    
    await client.login(config.token);
}

main()