import { PrefixCommand } from "core/interfaces/command"
import { test } from "./test"
import { music } from "./music"
import { permission } from "./permission"

export default async function (): Promise<PrefixCommand[]> {
    return [test, music, permission]
}
