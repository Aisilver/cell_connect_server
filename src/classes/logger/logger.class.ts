import { green, gray, red, yellow } from "colorette"
import { config } from "dotenv"

config()

type LoggerInfoLevelTypes = "success" | "info" | "error" | "warning"

export class Logger {
    private group!: string

    constructor(groupName: string){this.group = groupName}

    private formart (level: LoggerInfoLevelTypes, message: string){
        const timestamp = gray(new Date().toISOString()),

        color = (text: string) => {
            switch(level){
                case "success": return green(text)
                    break;
                case "info": return gray(text)
                    break
                case "warning": return yellow(text)
                    break 
                default: return red(text)
            }
        }

        if(process.env.NODE_ENV == 'development')
            return `[${timestamp}] [${color(level.toUpperCase())}] [${this.group}] [${message}]`
        else   
            return `[${timestamp}] [${level.toUpperCase()}] [${this.group}] [${message}]`
    }

    success(message: string){
        this.log(this.formart('success', message))
    }

    info(message: string){
        this.log(this.formart('info', message))
    }

    warn(message: string){
        this.log(this.formart('warning', message))
    }

    error(message: string){
        this.log(this.formart('error', message))
    }

    private log (logMessage: string){
        console.log()
        console.log(logMessage)
        console.log()
    }
}