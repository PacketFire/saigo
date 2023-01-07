import { exec } from "child_process"
import { PrefixCommand } from "core/interfaces/command"
import { Message } from "discord.js"

// temporarily setting a hard path for music directory until it is added to configuration
//let musicDir = 'C:/Users/Brock/Documents/brock/code/saigo/data/music/' // Windows local
let musicDir = '/home/brock/saigo/data/music/'

export const music: PrefixCommand = {
    name: 'music',
    description: 'Music command: usage !music <help|fetch|play|stop|skip> <link>',
    run: async (message: Message, parsedMsg: Array<string>) => {
        let subCmd = parsedMsg[1]

        switch(subCmd) {
            case 'fetch':
                let link = parsedMsg[2]

                if(link) {
                    if(link.includes('https://www.youtube.com/watch?')) {
                        // Output message indicating download initialization (output related song data)
                        message.channel.send('Starting download...')
                        exec(
                            // requires ffmpeg/ffprobe 
                            'youtube-dl --ffmpeg-location /usr/bin/ffmpeg --rm-cache-dir -x --audio-format mp3 -o ' + musicDir + '"%(title)s.%(ext)s" ' + link,
                            // for the following in windows to utilize ffmpeg when using git bash must specify a --ffmpeg-location option
                            //'youtube-dl.exe --rm-cache-dir -o ' + musicDir + '%(title)s.%(ext)s ' + link,
                            function(error, stdout, stderr) {
                                if(error) {
                                    // output to console until error message is parsed for cleaner channel output
                                    console.log(error)
                                    message.channel.send('Could not download that song.')
                                }

                                if(stdout) {
                                    let lines = stdout.split(/[\r\n]+/)
                                    let rate = lines.at(-6)?.replace('[download]', '')
                                    message.channel.send('Download complete ' + rate)
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