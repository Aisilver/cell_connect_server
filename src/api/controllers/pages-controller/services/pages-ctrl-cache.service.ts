import { SlideEntity } from "../../../../datasources/miscellaneous-entites-ds/schemas/base-slide-schema/base-slide.schema";
import { BaseCacheManager } from "../../../../classes/base-cache-manager/base-cache-service.class";
import { CacheManager, RedisCacheManager } from "../../../../services/cache-manger/cache-manager.services";
import { Slide } from "@shared/entities";
import { TIME_IN_SECONDS_CONSTANT } from "../../../../constants/time-in-seconds.constant";

const { MONTH } = TIME_IN_SECONDS_CONSTANT

class PagesControllerCacheManager extends BaseCacheManager {
    protected namespace = 'pages'

    protected CacheClient: RedisCacheManager = CacheManager;

    private readonly SLIDES_KEY =  this.CacheClient.makeGroupedKey(this.namespace, 'slides')

    async hasStoredSlides () {
        return this.CacheClient.hasKey(this.SLIDES_KEY)
    }

    async storeSlides (slides: SlideEntity[]) {
        await this.CacheClient.set(this.SLIDES_KEY, slides, MONTH)
    }

    async getStoredSlides () {
        return await this.CacheClient.get<Slide[]>(this.SLIDES_KEY)
    }
}

export const PagesCtrlCacheManager = new PagesControllerCacheManager()