import { TIME_IN_SECONDS_CONSTANT } from "../../constants/time-in-seconds.constant";
import { BaseCacheManager } from "../../classes/base-cache-manager/base-cache-service.class";
import { CacheManager, RedisCacheManager } from "../cache-manger/cache-manager.services";
import { randomUUID } from "crypto";

const { DAY } = TIME_IN_SECONDS_CONSTANT

class MediaCacheManager extends BaseCacheManager {
    protected CacheClient: RedisCacheManager = CacheManager;

    protected namespace: string = 'media';

    async storeBuffer (buffer: Buffer) {
        const ref = randomUUID(),

        key = this.CacheClient.makeGroupedKey(this.namespace, ref),

        stringedBuffer = buffer.toString('base64')

        await this.CacheClient.set(key, stringedBuffer, DAY)

        return ref
    }   

    async getBuffer (ref: string) {
        const encodedBuffer = await this.CacheClient.get<string>(this.CacheClient.makeGroupedKey(this.namespace, ref))

        if(!encodedBuffer) return null

        return Buffer.from(encodedBuffer, 'base64')
    }
}

export const MediaCacheManagerService = new MediaCacheManager()