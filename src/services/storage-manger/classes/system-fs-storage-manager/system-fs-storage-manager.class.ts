import fs from 'fs'
import path from 'path'
import { StorageManager } from "../../interfaces/storage-manager.interface";
import { Media } from '@shared/entities';
import { UUIDGenerator } from '../../../../functions/UUID-generator.func';
import { detectMIMEType } from '../../../../functions/detect-mime-type.func';
import { mediaToPath } from '../../../../functions/media-obj-to-path.func';
import { config } from 'dotenv';
import { CheckAllowedFolderName } from '../../functions/allowed-folder-check.func';
import { writeFileAsync } from '../../../../functions/write-file-async.func';

config()

export class SystemFSStorageManager implements StorageManager {

    private localStorageFolderPath = "uploads"

    private  getEncoding (media: Media) {
        const {mime} = media,

        [fileType] = mime.split("/")

        if(fileType == 'text') return "utf-8"

        return null
    }

    async InitializeStorage(): Promise<void> {
        return new Promise<void>((res) => {
            const {STORAGE_FOLDERS} = process.env

            if(!fs.existsSync(this.localStorageFolderPath)){
                // Make main folder
                fs.mkdirSync(this.localStorageFolderPath, {recursive: true})

                for (const folderName of STORAGE_FOLDERS.split(",")) {
                    fs.mkdirSync(path.join(this.localStorageFolderPath, folderName), {recursive: true})
                }
            }
            res()
        })
    }

    getFile(srcMedia: string[] | Media): Promise<Buffer> {
        let stringPath = ""

        if(new Object(srcMedia).hasOwnProperty('type')){
            stringPath = path.join(this.localStorageFolderPath, mediaToPath(srcMedia as Media))
    
            //@ts-ignore
            return new Promise((res, rej) => fs.readFile(stringPath, {encoding: this.getEncoding(srcMedia as Media)}, (err, data) => err ? rej(err) : res(data)))
        }else {
            stringPath = path.join(this.localStorageFolderPath, ...(srcMedia as Array<string>))

            return new Promise((res, rej) => fs.readFile(stringPath, (err, data) => err ? rej(err) : res(data)))
        }
    }

    async uploadFile(buffer: Buffer): Promise<Media> {
        const {ext, mime} = await detectMIMEType(buffer),

        type = mime.split("/")[0],

        name = `${type}-${UUIDGenerator(6, 'only-numbers')}`,

        size = buffer.length

        if(!type) throw Error("Type could not be determind")

        CheckAllowedFolderName(type)

        const destinationdir = path.join(this.localStorageFolderPath, type, `${name}.${ext}`)

        await writeFileAsync(destinationdir, buffer);

        return {ext, mime, name, type, byteSize: size}
    }
}