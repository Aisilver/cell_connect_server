import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../functions/api-response.func";
import { ServerMainService } from "../../services/server.service";
import { AppSettings } from "@shared/entities";
import { MiscellaneousEntitiesRepoManagerService } from "../../datasources/miscellaneous-entites-ds/repos-manager";

const { CACHED_APP_SETTINGS } = ServerMainService,

{ AppSettingsRepo } = MiscellaneousEntitiesRepoManagerService

export async function MainRoute_getAppSettings (req: Request, res: Response) {
    try {
        let app_settings: AppSettings | any = {}

        if(await CACHED_APP_SETTINGS.exists()) {
            //@ts-ignore
            app_settings = await CACHED_APP_SETTINGS.get()
        } else {
            const allSettings = await AppSettingsRepo.find()

            for (const setting of allSettings) {
                const {key, body} = setting

                app_settings[key] = body
            }

            await CACHED_APP_SETTINGS.set(app_settings)
        }

        res.json(APIResponse<AppSettings>(app_settings))
    } catch (error: any) {
        res.json(APIFailResponse(error.message))
    }
}