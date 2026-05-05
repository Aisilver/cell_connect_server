import { Request, Response } from "express";
import { PagesCtrlCacheManager } from "../services/pages-ctrl-cache.service";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import { MiscellaneousEntitiesRepoManagerService } from "../../../../datasources/miscellaneous-entites-ds/repos-manager";
import { Slide, SlideTypes } from "@shared/entities";
import { PagesCtrlEventMangerService } from "../events/pages-route-events-manger.service";
import Joi from "joi";
import { Repository } from "typeorm";

const {AuthPageSlideRepo, HomePageSlideRepo, MeetingPageSlideRepo} = MiscellaneousEntitiesRepoManagerService.SlidesRepoManager

export async function PR_getPageslides (req: Request, res: Response) {
    try {
        let slides: Slide[] = [],

        repo!: Repository<any>

        const {value: slideType, error} = Joi.string<SlideTypes>()
        
        .allow("auth-page-slide", "home-page-slide", "meeting-page-slide")
        
        .required().validate(req.params['slideType'])

        if(error) throw error

        const { CACHED_SLIDES } = PagesCtrlCacheManager

        switch(slideType) {
            case "auth-page-slide": repo = AuthPageSlideRepo
                break
            case "home-page-slide": repo = HomePageSlideRepo
                break
            case "meeting-page-slide": repo = MeetingPageSlideRepo
                break
        }

        if(await CACHED_SLIDES.exists()) {
            const cahchedSlides = await CACHED_SLIDES.get() ?? []

            slides = cahchedSlides.filter(slide => slide.type == slideType)
        } else {
            PagesCtrlEventMangerService.triggerSlidesCachingEvent()

            slides = await repo.find()
        } 

        res.json(APIResponse<Slide[]>(slides))
    } catch (error: any) {
        res.json(APIFailResponse(error.message))
    }
}