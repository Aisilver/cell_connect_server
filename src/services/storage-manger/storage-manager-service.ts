import path from "path";
import fs from "fs"
import { config } from "dotenv"
import { StorageManager } from "./interfaces/storage-manager.interface";
import { SystemFSStorageManager } from "./classes/system-fs-storage-manager/system-fs-storage-manager.class"
import { SupaBaseStorageManager } from "./classes/supabase-storage-manager/supabase-storage-manger.class"
import { writeFileAsync } from "../../functions/write-file-async.func";

config()

const {NODE_ENV} = process.env

class SystemFIleStorageService {
    private localTempStorageFolderPath = "temp"

    manager!: StorageManager

    async InitializeManager(){
        this.manager = NODE_ENV == "development" ? new SystemFSStorageManager() : new SupaBaseStorageManager()

        await this.manager.InitializeStorage()
    }
    
    async uploadFileIntoTempFolder(buffer: Buffer, filename: string){
        if(!fs.existsSync(this.localTempStorageFolderPath)) fs.mkdirSync(this.localTempStorageFolderPath)
    
        await writeFileAsync(path.join(this.localTempStorageFolderPath, filename), buffer)
    }

    async getFileFromTempFolder(filename: string){
        return new Promise<Buffer>((res, rej) => {
            fs.readFile(path.join(this.localTempStorageFolderPath, filename), (err, data) => err ? rej(err) : res(data))
        })
    }

    async uploadIntoFileInTempFolder(filename: string, chunk: Buffer){
        const filePath = path.join(this.localTempStorageFolderPath, filename)

        if(!fs.existsSync(filePath)) await this.uploadFileIntoTempFolder(chunk, filePath)
        
        else await new Promise<void>((res, rej) => fs.appendFile(filePath, chunk, err => err ? rej(err) : res()))         
    }    
}

export const FIleStorageService = new SystemFIleStorageService()