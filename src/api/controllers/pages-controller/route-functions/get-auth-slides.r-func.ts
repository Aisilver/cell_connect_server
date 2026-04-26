import { Request, Response } from "express";
import { PagesCtrlCacheManager } from "../services/pages-ctrl-cache.service";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import { MiscellaneousEntitiesRepoManagerService } from "../../../../datasources/miscellaneous-entites-ds/repos-manager";
import { AuthPageSlide } from "@shared/entities";
import { PagesCtrlEventMangerService } from "../events/pages-route-events-manger.service";

const {AuthSlideRepo} = MiscellaneousEntitiesRepoManagerService

export async function PR_getAuthSlides (req: Request, res: Response) {
    try {
        let AuthSlides: AuthPageSlide[] = []

        if(await PagesCtrlCacheManager.hasStoredSlides()) {
            const cahchedSlides = await PagesCtrlCacheManager.getStoredSlides() ?? []

            AuthSlides = cahchedSlides.filter(slide => slide.type == 'auth-page-slide') as AuthPageSlide[]
        } else {
            PagesCtrlEventMangerService.triggerSlidesCachingEvent()

            AuthSlides = await AuthSlideRepo.find()
        } 

        res.json(APIResponse(AuthSlides))
    } catch (error: any) {
        res.json(APIFailResponse(error.message))
    }
}