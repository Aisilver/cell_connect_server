import { MiscellaneousEntitiesRepoManagerService } from "../../.././../../datasources/miscellaneous-entites-ds/repos-manager";
import { PagesCtrlCacheManager } from "../../services/pages-ctrl-cache.service";

const { SlidesRepo } = MiscellaneousEntitiesRepoManagerService.SlidesRepoManager

export async function Pg_EV_slidesCachingEventHandler () {
    const {CACHED_SLIDES} = PagesCtrlCacheManager

    await CACHED_SLIDES.set(await SlidesRepo.find())
}