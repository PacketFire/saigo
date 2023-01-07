import { exec } from "child_process"
import { PrefixCommand } from "core/interfaces/command"
import { Message } from "discord.js"
import { Database } from "better-sqlite3"

// temporarily setting absolute path for music directory until it is added to configuration
const musicDir = '/home/brock/saigo/data/music/'


export const music: PrefixCommand = {
    name: 'music',
    description: 'Music command: usage !music <help|fetch|play|stop|skip> <link>',
    run: async (message: Message, parsedMsg: Array<string>, db: Database) => {
        let subCmd = parsedMsg[1]

        switch(subCmd) {
            case 'fetch':
                let link = parsedMsg[2]

                if(link) {
                    if(link.includes('https://www.youtube.com/watch?')) {
                        message.channel.send('Fetching song for ' + message.author.username + '...')

                        exec(
                            'youtube-dl --ffmpeg-location /usr/bin/ffmpeg --rm-cache-dir -x --audio-format mp3 -o ' + musicDir + '"%(title)s.%(ext)s" ' + link,
                            function(error, stdout, stderr) {
                                if(error) {
                                    // output to console until error message is parsed for cleaner channel output
                                    console.log(error)
                                    message.channel.send('Could not download that song.')
                                }

                                if(stdout) {
                                    let lines = stdout.split(/[\r\n]+/)
                                    console.log(lines)
                                    let rate = lines.at(-4)?.replace('[download] ', '')
                                    
                                    let songNameExt = lines.at(-3)?.replace('[ffmpeg] Destination: ' + musicDir, '')
                                    let songName = songNameExt?.replace('.mp3', '')

                                    try {
                                        const stmt = db.prepare('insert into music (name,fetched_by) values(?, ?)')
                                        stmt.run(songName, message.author.username)
                                    } catch (err) {
                                        console.log(err)
                                        message.channel.send('Error inserting songName into database.')
                                    }

                                    message.channel.send('Download of **' + songName + '** complete! ' + rate)
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
            case 'search':
                let searchRequest = parsedMsg.splice(0, 1)

                if(parsedMsg[2]) {
                    console.log(searchRequest)

                } else {
                    message.channel.send('Listing first 5 songs...')
                    try {
                        const stmt = db.prepare('select * from music limit 5').all()

                        stmt.forEach(row => {
                            message.channel.send('``' + row.id + '. ' + row.name +'``\n')
                        })

                    } catch (err) {
                        console.log(err)
                        message.channel.send('Error searching database for songs.')
                    }
                    message.channel.send('Please provide a search request parameter. Example: !music search Morgan Wallen')
                }

                break
            default:
                message.channel.send(music.description)
                break
        }
    }
}