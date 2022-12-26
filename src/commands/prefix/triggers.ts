import { PrefixCommand } from "core/interfaces/command"
import { test } from "./test"

export default async function(): Promise<PrefixCommand[]> {
  return [
    test
  ]
}