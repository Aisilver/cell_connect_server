import { Logger } from "../../../../../classes/logger/logger.class";
import { MediaCacheManagerService } from "../../../../../services/media-cache-manager/media-cache-manager.service";
import { FIleStorageService } from "../../../../../services/storage-manger/storage-manager-service";
import { MainEntitiesRepoManagerService } from "../../../../../datasources/main-entities-ds/repos-manger";
import { AuthUserProfileUploadEventParams } from "../types";

const logger = new Logger('Auth_Ctrl_Event: user-profile-uplaud'),

{ UserAccountEntityRepo, MediaEntityRepo } = MainEntitiesRepoManagerService

export async function AuthCTRL_EV_userProfileImageUploader (param: AuthUserProfileUploadEventParams) {
    try {        
        const {imageRef, accountId} = param,

        imageBuffer = await MediaCacheManagerService.getBuffer(imageRef)

        if(!imageBuffer) return

        const profileImageMediaEntity = await FIleStorageService.manager.uploadFile(imageBuffer),

        newMedia = await MediaEntityRepo.save(MediaEntityRepo.create(profileImageMediaEntity))

        await UserAccountEntityRepo.update({id: accountId}, {profile_image: newMedia})

    } catch (error: any) {
        logger.error(error.message)
    }
}