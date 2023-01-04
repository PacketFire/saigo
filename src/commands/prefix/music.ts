import { exec } from "child_process"
import { PrefixCommand } from "core/interfaces/command"
import { Message } from "discord.js"


let musicDir = '~/Documents/brock/code/saigo/data/music/'

export const music: PrefixCommand = {
    name: 'music',
    description: 'Music command: usage !music <help|fetch|play|stop|skip> <link>',
    run: async (message: Message, parsedMsg: Array<string>) => {
        let subCmd = parsedMsg[1]
        let link = parsedMsg[2]

        switch(subCmd) {
            case 'fetch':
                if(link) {
                    if(link.includes('https://www.youtube.com/watch?')) {
                        exec(
                            'youtube-dl.exe --rm-cache-dir -v -o ' + musicDir + '%(title)s.%(ext)s ' + link, 
                            function(error, stdout, stderr) {
                                // Need to parse output properly
                                if(error) {
                                    message.channel.send('Could not download that song. ' + error)
                                }
                                if(stdout) {
                                    console.log(stdout)
                                }

                                if(stderr) {
                                    console.log(stderr)
                                }
                            }
                        )                 
                    } 
                } else {
                    message.channel.send('Provide a URL to fetch a song from.')
                }
                break
            default:
                message.channel.send(music.description)
                break
        }
    }
}