import { Client, IntentsBitField } from "discord.js"
import config from "../data/config.json"
import ready from "./core/listeners/ready"
import interaction from "./core/listeners/interaction"

import getSlashCommands from "./commands/slash/triggers";

const client = new Client({ intents: [IntentsBitField.Flags.Guilds] });

async function main() {
    const slashCommands = await getSlashCommands();

    ready(client, slashCommands)
    interaction(client, slashCommands)
    
    await client.login(config.token);
}

main()