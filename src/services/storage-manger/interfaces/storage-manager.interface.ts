import { Media } from '@shared/entities';

export interface StorageManager {
    InitializeStorage(): Promise<void>

    getFile(path: string[] | Media): Promise<Buffer>

    uploadFile(buffer: Buffer): Promise<Media>
}