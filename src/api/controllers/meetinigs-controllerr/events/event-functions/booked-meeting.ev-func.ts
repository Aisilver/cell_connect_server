import { Meeting } from "@shared/entities";
import { MeetingCtrlService } from "../../services/meeting-ctrl.service";
import { MeetCtrlMailService } from "../../services/meeting-ctrl-mail.service";
import { MainEntitiesRepoManagerService } from "../../../../../datasources/main-entities-ds/repos-manger";
import { Equal } from "typeorm";

const {MeetingEntityRepo} = MainEntitiesRepoManagerService

export async function MeetCTRL_EV_bookedMeeting(meeting: Meeting) {
    const {id} = meeting,

    {venue} = await MeetingEntityRepo.findOneOrFail(
        {
            where: {
                id: Equal(id ?? 0)
            },
            
            select: {id: true},

            relations: {
                venue: true
            }
        }
    ),

    cellMembers = await MeetingCtrlService.getActiveMembersFromByMeetingId(id ?? 0)

    if(cellMembers.length < 1) return

    meeting.venue = venue

    for (const member of cellMembers) {
        const {firstName, email} = member.account.user

        await MeetCtrlMailService.sendMeetingBookedMail(firstName, email, meeting)
    }
}