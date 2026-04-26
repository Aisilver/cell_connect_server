import { ServerMainService } from "../../../../services/server.service";
import { APP_DEFAULT_SETTINGS_CONSTANT } from "../../../../constants/app-default-settings.constant";
import { MiscellaneousEntitiesRepoManagerService } from "../../../../datasources/miscellaneous-entites-ds/repos-manager";
import { AppSettings } from "@shared/entities";
import { Equal } from "typeorm";

const { AppSettingsRepo } = MiscellaneousEntitiesRepoManagerService,

{ CACHED_APP_SETTINGS } = ServerMainService

export async function APP_R_Init_prepareAndCacheAppSettings () {
    let settingsInUse: AppSettings | any = {},

    failedSettingKeys: (keyof AppSettings)[] = []

    for (const key in APP_DEFAULT_SETTINGS_CONSTANT) {
        try {
            const {body} = await AppSettingsRepo.findOneOrFail({where: {key: Equal(key as keyof AppSettings)}})
            
            settingsInUse[key] = body            
            
        } catch {
            //@ts-ignore
            settingsInUse[key] = APP_DEFAULT_SETTINGS_CONSTANT[key]

            //@ts-ignore
            failedSettingKeys.push(key)
        }
    }

    await CACHED_APP_SETTINGS.set(settingsInUse)

    for (const key of failedSettingKeys) {
        await AppSettingsRepo.save(AppSettingsRepo.create({
            key,
            body: APP_DEFAULT_SETTINGS_CONSTANT[key]
        }))
    }
}