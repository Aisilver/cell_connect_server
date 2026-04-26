import { MiscellaneousEntitiesRepoManagerService } from "../../.././../../datasources/miscellaneous-entites-ds/repos-manager";
import { PagesCtrlCacheManager } from "../../services/pages-ctrl-cache.service";

const {SlidesRepo} = MiscellaneousEntitiesRepoManagerService

export async function Pg_EV_slidesCachingEventHandler () {
    PagesCtrlCacheManager.storeSlides(await SlidesRepo.find())        
}