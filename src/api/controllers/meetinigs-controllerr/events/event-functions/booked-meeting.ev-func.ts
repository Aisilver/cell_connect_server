import { MeetingCtrlService } from "../../services/meeting-ctrl.service";
import { MeetCtrlMailService } from "../../services/meeting-ctrl-mail.service";
import { MainEntitiesRepoManagerService } from "../../../../../datasources/main-entities-ds/repos-manger";
import { Equal } from "typeorm";

const {MeetingEntityRepo} = MainEntitiesRepoManagerService

export async function MeetCTRL_EV_bookedMeeting(meetingId: number) {
    const meetingFromDB = await MeetingEntityRepo.findOneOrFail(
        {
            where: {
                id: Equal(meetingId)
            },
            relations: {
                host: {
                    user: true,
                },
                venue: true,
                cell: true
            }
        }
    ),

    cellMembers = await MeetingCtrlService.getActiveMembersByMeetingId(meetingId)

    if(cellMembers.length < 1) return

    for (const member of cellMembers) {
        const {firstName, email} = member.account.user

        await MeetCtrlMailService.sendMeetingBookedMail(firstName, email, meetingFromDB)
    }
}