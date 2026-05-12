import { MemberStatusTypes } from "@shared/entities"
import { MainEntitiesRepoManagerService } from "../../../../datasources/main-entities-ds/repos-manger"
import { Equal, In } from "typeorm"

const {MemberEntityRepo, MeetingEntityRepo} = MainEntitiesRepoManagerService

class MeetingControllerService {

    async getActiveMembersFromByMeetingId (meetingId: number) {
        try {
            const {cell} = await MeetingEntityRepo.findOneOrFail(
                {
                    where: {
                        id: Equal(meetingId)
                    },
        
                    select: {
                        id: true
                    },
        
                    relations: {
                        cell: true
                    }
                }
            )
        
            return await MemberEntityRepo.find(
                {
                    where: {
                        cell: {id: cell.id},
                        status: In<MemberStatusTypes>(["active"])
                    },
        
                    relations: {
                        account: {
                            user: true
                        }
                    }
                }
            )            
        } catch {
            return []
        }
    }

}

export const MeetingCtrlService = new MeetingControllerService()