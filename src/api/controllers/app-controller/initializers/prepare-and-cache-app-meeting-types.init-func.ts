import { JSONsManagerService } from "../../../../services/JSONs-manager/JSONs-manger.service";
import { MiscellaneousEntitiesRepoManagerService } from "../../../../datasources/miscellaneous-entites-ds/repos-manager";
import { AppCTRLCacheManager } from "../services/app-ctrl-route-cache.service";

const { MeetingTypesRepo } = MiscellaneousEntitiesRepoManagerService

export async function APP_R_Init_prepareAndCacheAppMeetingTypes () {
    const [meetingTypes, count] = await MeetingTypesRepo.findAndCount()
    
    if(count > 0) {
        await AppCTRLCacheManager.CACHED_MEETING_TYPES.set(meetingTypes)
    }

    const defaultMeetingTypes = await JSONsManagerService.getDefaultMeetingTypes()

    await MeetingTypesRepo.save(defaultMeetingTypes)

    await AppCTRLCacheManager.CACHED_MEETING_TYPES.set(defaultMeetingTypes)
}