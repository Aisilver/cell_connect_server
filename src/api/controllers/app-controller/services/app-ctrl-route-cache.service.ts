import { TIME_IN_SECONDS_CONSTANT } from "../../../../constants/time-in-seconds.constant";
import { BaseCacheManager } from "../../../../classes/base-cache-manager/base-cache-service.class";
import { CacheManager, RedisCacheManager } from "../../../../services/cache-manger/cache-manager.services";
import { List } from "@shared/entities";

const { MONTH } = TIME_IN_SECONDS_CONSTANT

class AppControllerCacheManager extends BaseCacheManager {
    protected CacheClient: RedisCacheManager = CacheManager;
    
    protected namespace: string = "app";

    readonly CITIES_CACHE_COLLECTION = this.SingleItem<List[]>('cities-cache-key', MONTH)

    readonly CACHED_MEETING_TYPES = this.SingleItem<List[]>('meeting-types-cache-key', MONTH)
}

export const AppCTRLCacheManager = new AppControllerCacheManager()