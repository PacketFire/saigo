import { PrefixCommand } from "../../core/interfaces/command"

class Triggers {
    public handleTrigger(command: PrefixCommand) {
        console.log(command)
    }
}

export default Triggers