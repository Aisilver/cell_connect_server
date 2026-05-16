import { ServerMainService } from "../../../../services/server.service";
import { APP_DEFAULT_SETTINGS_CONSTANT } from "../../../../constants/app-default-settings.constant";
import { MiscellaneousEntitiesRepoManagerService } from "../../../../datasources/miscellaneous-entites-ds/repos-manager";
import { AppSettings } from "@shared/entities";
import { Equal } from "typeorm";
import { ValueComparer } from "../../../../classes/value-compare/value-compare.class";

const { AppSettingsRepo } = MiscellaneousEntitiesRepoManagerService.JSONsRepoManager,

{ CACHED_APP_SETTINGS } = ServerMainService,

valueComparer = new ValueComparer()

export async function APP_R_Init_prepareAndCacheAppSettings () {
    let settingsInUse: AppSettings | any = {},

    failedSettingKeys: (keyof AppSettings)[] = [],

    settingsKeyWithdifferentObjectKeys: (keyof AppSettings)[] = []

    for (const key in APP_DEFAULT_SETTINGS_CONSTANT) {
        try {
            const {body} = await AppSettingsRepo.findOneOrFail({where: {key: Equal(key as keyof AppSettings)}})
            
            settingsInUse[key] = body 
            
            //@ts-ignore
            if(valueComparer.hasDifferentKeys(APP_DEFAULT_SETTINGS_CONSTANT[key], body))
                //@ts-ignore
                settingsKeyWithdifferentObjectKeys.push(key)
            
        } catch {
            //@ts-ignore
            settingsInUse[key] = APP_DEFAULT_SETTINGS_CONSTANT[key]
            
            //@ts-ignore
            failedSettingKeys.push(key)
        }
    }

    for (const key of settingsKeyWithdifferentObjectKeys) {
        const target = settingsInUse[key],

        nonExistantKeyAndValue = valueComparer.getNonExistingKeyAndValueOfSource(target, APP_DEFAULT_SETTINGS_CONSTANT[key])

        if(!nonExistantKeyAndValue) continue 

        const {key: nonExistantKey, value} = nonExistantKeyAndValue

        target[nonExistantKey] = value
 
        settingsInUse[key] = target

        await AppSettingsRepo.update({key: Equal(key)}, {body: target})
    }

    await CACHED_APP_SETTINGS.set(settingsInUse)

    for (const key of failedSettingKeys) {
        await AppSettingsRepo.save(AppSettingsRepo.create({
            key,
            body: APP_DEFAULT_SETTINGS_CONSTANT[key]
        }))
    }
}