import { readFile } from 'fs'
import path from 'path'
import { config } from "dotenv"

config()

class SystemResourcesManger {
    private readonly DEFAULTS_FOLDER = "defaults"

    private readonly DEFAULT_JSONs_FOLDER_PATH = path.join(this.DEFAULTS_FOLDER, "json" )

    private readonly DEFAULT_MEDIAs_FOLDER_PATH = path.join(this.DEFAULTS_FOLDER, "media")

    getSystemJSONResources<T>(filename: string) {
        return new Promise<T>((res, rej) => {
            const pathToJson = path.join(this.DEFAULT_JSONs_FOLDER_PATH, filename)

            readFile(pathToJson, "utf-8", (err, data) => err ? rej(err) : res(JSON.parse(data) as T))
        })
    }

    getSystemMediaResources(type: string, filename: string) {
        return new Promise<Buffer>((res, rej) => {
            const pathToMedia = path.join(this.DEFAULT_MEDIAs_FOLDER_PATH, type, filename)

            readFile(pathToMedia, (err, data) => err ? rej(err) : res(data))
        })
    }

    generateURLPathToResourceMedia (type: string, filename: string) {
        const {SERVER_DOMAIN_URL} = process.env

        return `${SERVER_DOMAIN_URL}/media/defaults/${type}/${filename}`
    }
}

export const SystemsResourcesManagerService = new SystemResourcesManger()