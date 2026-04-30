import { JSONsManagerService } from "../../../../services/JSONs-manager/JSONs-manger.service";
import { MiscellaneousEntitiesRepoManagerService } from "../../../../datasources/miscellaneous-entites-ds/repos-manager";
import { Equal } from "typeorm";
import { AppCTRLCacheManager } from "../services/app-ctrl-route-cache.service";
import { List } from "@shared/entities";

const { CityRepo } = MiscellaneousEntitiesRepoManagerService

export async function APP_R_Init_prepareAndCacheDefaultCities () {
    let citiesToCache: List[]
    
    const defaultCities = await JSONsManagerService.getDefaultCites(),

    {CITIES_CACHE_COLLECTION} = AppCTRLCacheManager,

    [citiesInDb, numberOfDefaultCitiesInDB] = await CityRepo.findAndCount(
        {
            where: {
                default: Equal(true)
            },
            order: {
                slug: "ASC"
            }
        }
    )

    if(numberOfDefaultCitiesInDB != defaultCities.length){
        await CityRepo.delete({type: "cities"})

        citiesToCache = await CityRepo.save(defaultCities.sort((a, b) => a.slug.localeCompare(b.slug)))

    }else {
        citiesToCache = citiesInDb
    }

    await CITIES_CACHE_COLLECTION.set(citiesToCache)
}