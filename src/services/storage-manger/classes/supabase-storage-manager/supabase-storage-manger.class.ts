import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Media } from "@shared/entities";
import { StorageManager } from "../../interfaces/storage-manager.interface";
import { config } from "dotenv";
import Joi from "joi";
import { UUIDGenerator } from "../../../../functions/UUID-generator.func";
import { detectMIMEType } from "../../../../functions/detect-mime-type.func";
import { CheckAllowedFolderName } from "../../functions/allowed-folder-check.func";
import path from "path";
import { mediaToPath } from "../../../../functions/media-obj-to-path.func";

config()

export class SupaBaseStorageManager implements StorageManager {
    private supabase!: SupabaseClient

    private bucketName!: string

    async InitializeStorage(): Promise<void> {
        const {SUPABASE_URL, SUPABASE_BUCKET, SUPABASE_KEY, STORAGE_FOLDERS} = process.env

        this.bucketName = SUPABASE_BUCKET

        this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

        const {error: listError, data: buckets} = await this.supabase.storage.listBuckets()

        if(listError) throw Error(listError.message)

        const bucketExists = buckets.some(b => b.name === this.bucketName)

        if(!bucketExists) throw Error(`Buckect by name "${this.bucketName}" does not exists`)

        for (const folderName of STORAGE_FOLDERS.split(",")) {
            const {data, error: listError} = await this.supabase.storage.from(this.bucketName).list(folderName, {limit: 1})
        
            if(listError) throw listError

            if(data.length > 0) continue

            const {error: folderError} = await this.supabase.storage.from(this.bucketName)
            .upload(`${this.bucketName}/${folderName}/.keep`, new Blob([]), {upsert: true})

            if(folderError) throw folderError
        }
    }
    
    async getFile(srcMedia: string[] | Media): Promise<Buffer> {
        const srcPath = new Object(srcMedia).hasOwnProperty('type') ? mediaToPath(srcMedia as Media) : path.join(...(srcMedia as Array<string>)),

        {data, error} = await this.supabase.storage.from(this.bucketName).download(srcPath)

        if(error) throw error
        
        if(!data) throw Error("file not found")
        
        return Buffer.from(await data.arrayBuffer())
    }
    
    async uploadFile(buffer: Buffer): Promise<Media> {
        const {ext, mime} = await detectMIMEType(buffer),

        type = mime.split("/")[0],

        name = `${type}-${UUIDGenerator(6, 'only-numbers')}`,

        byteSize = buffer.length

        if(!type) throw Error("Type could not be determind")

        CheckAllowedFolderName(type)

        const destinationdir = path.join(this.bucketName, type, `${name}.${ext}`),
        
        {error} = await this.supabase.storage.from(this.bucketName)
    
        .upload(destinationdir, buffer, {upsert: true})
    
        if(error) throw error

        return {
            ext, 
            mime, 
            name, 
            byteSize, 
            type
        }
    }
}