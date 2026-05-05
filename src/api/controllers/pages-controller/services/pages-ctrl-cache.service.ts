import { BaseCacheManager } from "../../../../classes/base-cache-manager/base-cache-service.class";
import { CacheManager, RedisCacheManager } from "../../../../services/cache-manger/cache-manager.services";
import { Slide } from "@shared/entities";
import { TIME_IN_SECONDS_CONSTANT } from "../../../../constants/time-in-seconds.constant";

const { MONTH } = TIME_IN_SECONDS_CONSTANT

class PagesControllerCacheManager extends BaseCacheManager {
    protected namespace = 'pages'

    protected CacheClient: RedisCacheManager = CacheManager;

    readonly CACHED_SLIDES = this.SingleItem<Slide[]>("app-slides", MONTH)
}

export const PagesCtrlCacheManager = new PagesControllerCacheManager()