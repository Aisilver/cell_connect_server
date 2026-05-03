import { Equal } from "typeorm";
import { MainEntitiesRepoManagerService } from "../../../../../datasources/main-entities-ds/repos-manger";

const { MeetingEntityRepo } = MainEntitiesRepoManagerService

export async function MeetCTRL_CR_Job_cancelMeeting (meetingId: number) {
    await MeetingEntityRepo.update(
        {
            id: Equal(meetingId)
        },
        {
            status: "canceled"
        }
    )
}