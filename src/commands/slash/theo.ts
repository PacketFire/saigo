import * as fs from 'fs';

import { CommandInteraction, Client } from "discord.js";
import { SlashCommand } from "core/interfaces/command";

async function loadQuotes(): Promise<string[]> {
  const file = await fs.promises.readFile('./data/theo.txt', { encoding: 'utf8' });
  const lines = file.split(/\r?\n/);
  return lines;
}

function randomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default async function createCommand(): Promise<SlashCommand> {
  const quotes = await loadQuotes();
  return {
    name: "theo",
    description: "Returns a theo message.",
    run: async (_client: Client, interaction: CommandInteraction) => {
        const content = quotes[randomInt(0, quotes.length - 1)];
        await interaction.followUp({ content });
    }
  };
}
