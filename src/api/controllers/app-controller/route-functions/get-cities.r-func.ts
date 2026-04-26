import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import { MiscellaneousEntitiesRepoManagerService } from "../../../../datasources/miscellaneous-entites-ds/repos-manager";
import { AppCTRLEventsService } from "../events/app-ctrl-route-events.service";
import { AppCTRLCacheManager } from "../services/app-ctrl-route-cache.service";
import { Equal } from "typeorm";
import { List } from "@shared/entities";

const { CityRepo } = MiscellaneousEntitiesRepoManagerService

export async function APP_R_getCities(req: Request, res: Response) {
    try {
        let cities: List[]

        const {CITIES_CACHE_COLLECTION} = AppCTRLCacheManager
        
        if(await CITIES_CACHE_COLLECTION.exists()){ 
            cities = await CITIES_CACHE_COLLECTION.get() ?? []
        }else {
            AppCTRLEventsService.triggerCitiesCachingEvent()

            cities = await CityRepo.find(
                {
                    where: {
                        disabled: Equal(false)
                    },
                    order: {slug: 'ASC'}
                }
            )
        }

        res.json(APIResponse(cities))

    } catch (error: any) {
        res.json(APIFailResponse(error.message))
    }
}