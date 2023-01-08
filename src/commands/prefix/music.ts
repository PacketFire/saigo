import { spawn } from "child_process"
import { PrefixCommand } from "core/interfaces/command"
import { Message } from "discord.js"
import { Database } from "better-sqlite3"
import {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    StreamType,
    VoiceConnection,
} from "@discordjs/voice"
import path from "path"
import { createReadStream } from "fs"

// temporarily setting a hard path for music directory until it is added to configuration
//let musicDir = 'C:/Users/Brock/Documents/brock/code/saigo/data/music/' // Windows local
const MUSIC_PATH = process.env.MUSIC_PATH || "/home/brock/saigo/data/music"
const FFMPEG_PATH = process.env.FFMPEG_PATH || "ffmpeg"
const YOUTUBE_DL_PATH = process.env.YOUTUBE_DL_PATH || "youtube-dl"

let connection: VoiceConnection | null = null

export const music: PrefixCommand = {
    name: "music",
    description:
        "Music command: usage !music <help|fetch|play|stop|skip> <link>",
    run: async (message: Message, parsedMsg: Array<string>, db: Database) => {
        const subCmd = parsedMsg[1]

        switch (subCmd) {
            case "fetch":
                const link = parsedMsg[2]

                if (link) {
                    if (link.includes("https://www.youtube.com/watch?")) {
                        // Output message indicating download initialization (output related song data)
                        message.channel.send("Starting download...")
                        const ytdl = spawn(
                            // requires ffmpeg/ffprobe
                            // for the following in windows to utilize ffmpeg when using git bash must specify a --ffmpeg-location option
                            //'youtube-dl.exe --rm-cache-dir -o ' + musicDir + '%(title)s.%(ext)s ' + link,
                            YOUTUBE_DL_PATH,
                            [
                                "--ffmpeg-location",
                                FFMPEG_PATH,
                                "--rm-cache-dir",
                                "-x",
                                "--audio-format",
                                "opus",
                                "-o",
                                `${MUSIC_PATH}/%(title)s.%(ext)s`,
                                link,
                            ]
                        )

                        // exec(
                        //     'youtube-dl --ffmpeg-location /usr/bin/ffmpeg --rm-cache-dir -x --audio-format mp3 -o ' + musicDir + '"%(title)s.%(ext)s" ' + link,
                        //     function(error, stdout, stderr) {
                        //         if(error) {
                        //             // output to console until error message is parsed for cleaner channel output
                        //             console.log(error)
                        //             message.channel.send('Could not download that song.')
                        //         }

                        //         if(stdout) {
                        //             let lines = stdout.split(/[\r\n]+/)
                        //             console.log(lines)
                        //             let rate = lines.at(-4)?.replace('[download] ', '')

                        //             let songNameExt = lines.at(-3)?.replace('[ffmpeg] Destination: ' + musicDir, '')
                        //             let songName = songNameExt?.replace('.mp3', '')

                        //             try {
                        //                 const stmt = db.prepare('insert into music (name,fetched_by) values(?, ?)')
                        //                 stmt.run(songName, message.author.username)
                        //             } catch (err) {
                        //                 console.log(err)
                        //                 message.channel.send('Error inserting songName into database.')
                        //             }

                        //             message.channel.send('Download of **' + songName + '** complete! ' + rate)
                        //         }

                        // if (stdout) {
                        //     const lines = stdout.split(/[\r\n]+/)
                        //     const rate = lines.at(-6)?.replace('[download]', '')
                        //     message.channel.send('Download complete ' + rate)
                        // }

                        //     stdout.

                        //     if (stderr) {
                        //         console.log(stderr)
                        //     }
                        // }

                        ytdl.stdout.on("data", (data) => {
                            console.log(data.toString())
                        })

                        ytdl.stderr.on("data", (data) => {
                            console.log(data.toString())
                        })

                        ytdl.on("close", (code) => {
                            if (code === 0) {
                                message.channel.send("Download complete.")
                            } else {
                                message.channel.send(
                                    "Could not download that song."
                                )
                            }
                        })
                    }
                } else {
                    message.channel.send("Provide a URL to fetch a song from.")
                }
                break
            case "join":
                const member = message.guild?.members.cache.get(
                    message.author.id
                )
                const channel = member?.voice.channel
                if (channel) {
                    connection = joinVoiceChannel({
                        channelId: channel.id,
                        guildId: channel.guild.id,
                        adapterCreator: channel.guild.voiceAdapterCreator,
                    })
                }
                break
            case "play":
                const name = parsedMsg[2]
                if (connection) {
                    const audioPlayer = createAudioPlayer()

                    const songPath = path.join(MUSIC_PATH, `${name}.opus`)
                    console.log(`Playing ${songPath}`)
                    const resource = createAudioResource(
                        createReadStream(songPath),
                        {
                            inputType: StreamType.OggOpus,
                        }
                    )
                    audioPlayer.play(resource)

                    connection.subscribe(audioPlayer)
                }

                break
            case "leave":
                if (connection) {
                    connection.disconnect()
                }
                break
            case "search":
                let searchRequest = parsedMsg.splice(0, 1)

                if (parsedMsg[2]) {
                    console.log(searchRequest)
                } else {
                    message.channel.send("Listing first 5 songs...")
                    try {
                        const stmt = db
                            .prepare("select * from music limit 5")
                            .all()

                        stmt.forEach((row) => {
                            message.channel.send(
                                "``" + row.id + ". " + row.name + "``\n"
                            )
                        })
                    } catch (err) {
                        console.log(err)
                        message.channel.send(
                            "Error searching database for songs."
                        )
                    }
                    message.channel.send(
                        "Please provide a search request parameter. Example: !music search Morgan Wallen"
                    )
                }

                break
            default:
                message.channel.send(music.description)
                break
        }
    },
}
