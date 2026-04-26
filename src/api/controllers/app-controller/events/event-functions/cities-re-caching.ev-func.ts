import { Equal } from "typeorm";
import { MiscellaneousEntitiesRepoManagerService } from "../../../../../datasources/miscellaneous-entites-ds/repos-manager";
import { AppCTRLCacheManager } from "../../services/app-ctrl-route-cache.service";

const { CityRepo } = MiscellaneousEntitiesRepoManagerService


export async function AppCTRL_EV_citiesReCaching () {
    const cities = await CityRepo.find(
        {
            where: {
                disabled: Equal(false)
            },
            order: {slug: "ASC"}
        }
    )

    await AppCTRLCacheManager.CITIES_CACHE_COLLECTION.set(cities)
}