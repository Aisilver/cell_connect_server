import { CacheManager, RedisCacheManager } from "../../../../services/cache-manger/cache-manager.services";
import { BaseCacheManager } from "../../../../classes/base-cache-manager/base-cache-service.class";
import { TIME_IN_SECONDS_CONSTANT } from "../../../../constants/time-in-seconds.constant";
import { ClientAcvtivityEntryData } from "../types";

const { MONTH } = TIME_IN_SECONDS_CONSTANT

class ServerSideEventsControllerCacheService extends BaseCacheManager {
    protected CacheClient: RedisCacheManager = CacheManager;

    protected namespace: string = "sse-cache";

    readonly CLIENT_ACTIVITY_TIME_TRACKER_COLLECTION = this.Collection<ClientAcvtivityEntryData>("client-activity-time-tracker-collection", MONTH)
}

export const ServerSideEventsCTRLCacheManager = new ServerSideEventsControllerCacheService()