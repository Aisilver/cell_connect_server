import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import { AppCTRLCacheManager } from "../services/app-ctrl-route-cache.service";
import { List } from "@shared/entities";
import { MiscellaneousEntitiesRepoManagerService } from "../../../../datasources/miscellaneous-entites-ds/repos-manager";

const { MeetingTypesRepo } = MiscellaneousEntitiesRepoManagerService

export async function APP_R_getMeetingTypes (req: Request, res: Response) {
    try {
        let meetTypes: List[] | null

        const {CACHED_MEETING_TYPES} = AppCTRLCacheManager

        if(await CACHED_MEETING_TYPES.exists())
            meetTypes = await CACHED_MEETING_TYPES.get()
        else {
            meetTypes = await MeetingTypesRepo.find()

            await CACHED_MEETING_TYPES.set(meetTypes)
        }

        res.json(APIResponse(meetTypes))

    } catch (error: any) {
        res.json(APIFailResponse(error.message))
    }
}