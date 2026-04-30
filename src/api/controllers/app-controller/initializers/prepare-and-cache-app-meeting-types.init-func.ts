import { JSONsManagerService } from "../../../../services/JSONs-manager/JSONs-manger.service";
import { MiscellaneousEntitiesRepoManagerService } from "../../../../datasources/miscellaneous-entites-ds/repos-manager";
import { AppCTRLCacheManager } from "../services/app-ctrl-route-cache.service";
import { Equal } from "typeorm";

const { MeetingTypesRepo } = MiscellaneousEntitiesRepoManagerService

export async function APP_R_Init_prepareAndCacheDefaultAppMeetingTypes () {
    const defaultMeetingTypes = await JSONsManagerService.getDefaultMeetingTypes(),
    
    [meetingTypesInDB, numberOfrows] = await MeetingTypesRepo.findAndCount(
        {
            where: {
                default: Equal(true)
            }
        }
    )
    
    if(defaultMeetingTypes.length != numberOfrows) {
        await MeetingTypesRepo.delete({type: Equal('meeting-types')})

        await MeetingTypesRepo.save(defaultMeetingTypes)

        await AppCTRLCacheManager.CACHED_MEETING_TYPES.set(defaultMeetingTypes)
        
    }else {
        await AppCTRLCacheManager.CACHED_MEETING_TYPES.set(meetingTypesInDB)
    }
}