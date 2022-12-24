import { SlashCommand } from "core/interfaces/command"
import { test } from "../slash/test"
import theo from './theo';

export default async function(): Promise<SlashCommand[]> {
  return [
    test,
    await theo()
  ];
}