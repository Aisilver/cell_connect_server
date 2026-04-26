import { config } from "dotenv";
import ffmpeg from 'fluent-ffmpeg'
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import ffprobeInstaller from '@ffprobe-installer/ffprobe'
import { Logger } from "../../classes/logger/logger.class";
import { execFile } from "child_process";

config()

const {FFMPEG_LOCAL_PATH, FFMPEG_LOCAL_PROBE_PATH, NODE_ENV} = process.env

class FFMPEGManager {
    private logger = new Logger("ffmpeg-logs")

    private ffmpegPath = NODE_ENV == "development" ? FFMPEG_LOCAL_PATH : ffmpegInstaller.path

    private probePath = NODE_ENV == "development" ? FFMPEG_LOCAL_PROBE_PATH : ffprobeInstaller.path

    get FFMPEG () {
        return ffmpeg
    }

    constructor() {
        this.FFMPEG.setFfmpegPath(this.ffmpegPath)

        this.FFMPEG.setFfprobePath(this.probePath)
    }

    testAvailability () {
        return new Promise<void>((res, rej) => {
            execFile(this.ffmpegPath, ["-version"], (error, stdout) => {
                if(error) rej(error)
                
                this.logger.info(`ffmpeg available: ${stdout.split("\n")[0]?.trim()}`)
                res()
            })
        })
    }
}

export const FFMPEGMangerService = new FFMPEGManager()