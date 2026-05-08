import { Equal } from "typeorm";
import { MainEntitiesRepoManagerService } from "../../../../../datasources/main-entities-ds/repos-manger";
import { Meeting } from "@shared/entities";

const { MeetingEntityRepo } = MainEntitiesRepoManagerService

export async function MeetCTRL_CR_Job_setMeetingNotHosted (meeting: Meeting) {
    await MeetingEntityRepo.update(
        {
            id: Equal(meeting.id ?? 0)
        },
        {
            status: "not-hosted"
        }
    )
}