import { MiscellaneousEntitiesRepoManagerService } from "../../../../datasources/miscellaneous-entites-ds/repos-manager";
import { PagesCtrlCacheManager } from "../services/pages-ctrl-cache.service";

const {SlidesRepo} = MiscellaneousEntitiesRepoManagerService

export async function PR_InitF_cacheSlides () {
    if(await PagesCtrlCacheManager.hasStoredSlides()) return

    const storedSlidesFromDB = await SlidesRepo.find()

    await PagesCtrlCacheManager.storeSlides(storedSlidesFromDB)
}