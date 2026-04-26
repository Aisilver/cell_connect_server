import { Request, Response } from "express";
import { PagesCtrlCacheManager } from "../services/pages-ctrl-cache.service";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import { MiscellaneousEntitiesRepoManagerService } from "../../../../datasources/miscellaneous-entites-ds/repos-manager";
import { HomePageSlide } from "@shared/entities";
import { PagesCtrlEventMangerService } from "../events/pages-route-events-manger.service";

const {HomeSlideRepo} = MiscellaneousEntitiesRepoManagerService

export async function PR_getHomeSlides (req: Request, res: Response) {
    try {
        let HomeSlides: HomePageSlide[] = []

        if(await PagesCtrlCacheManager.hasStoredSlides()) {
            const cahchedSlides = await PagesCtrlCacheManager.getStoredSlides() ?? []
            
            HomeSlides = cahchedSlides.filter(slide => slide.type == 'home-page-slide') as HomePageSlide[]
        } else {
            PagesCtrlEventMangerService.triggerSlidesCachingEvent()

            HomeSlides = await HomeSlideRepo.find()
        }

        res.json(APIResponse(HomeSlides))

    } catch (error: any) {
        res.json(APIFailResponse(error.message))
    }
}