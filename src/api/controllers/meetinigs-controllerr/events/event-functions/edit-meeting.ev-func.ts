import { MainEntitiesRepoManagerService } from "../../../../../datasources/main-entities-ds/repos-manger";
import { MeetingEditEventParam } from "../types";
import { MeetCtrlMailService } from "../../services/meeting-ctrl-mail.service";
import { MeetingCtrlService } from "../../services/meeting-ctrl.service";
import { Equal } from "typeorm";

const {MeetingAgendaEntityRepo, CellVenueEntityRepo, MeetingEntityRepo} = MainEntitiesRepoManagerService

export async function MeetCTRL_EV_editedMeeting(param: MeetingEditEventParam) {
    const {editLog, meetingId, newMeeting, oldMeeting} = param,

    {agendas} = newMeeting,

    {agenda_changed, venue_changed} = editLog

    if(agenda_changed) {
        await MeetingAgendaEntityRepo.delete({meeting: {id: meetingId}})

        if(agendas && agendas.length > 0) {
            const newAgendas = agendas.map(agen => MeetingAgendaEntityRepo.create({...agen, meeting: {id: meetingId}}))

            await MeetingAgendaEntityRepo.save(newAgendas)
        }
    }

    if(venue_changed) {

        if(!oldMeeting.venue?.default) {
            await CellVenueEntityRepo.delete({id: Equal(oldMeeting.venue?.id ?? 0)})
        }

        const {venue} = newMeeting

        if(venue) {
            const newSavedVenue = await CellVenueEntityRepo.save(CellVenueEntityRepo.create(venue))

            await MeetingEntityRepo.update(
                {
                    id: Equal(meetingId),
                },
                {
                    venue: {id: newSavedVenue.id}
                }
            )
        }
        
    }
    
    const cellMembers = await MeetingCtrlService.getActiveMembersByMeetingId(meetingId)

    if(cellMembers.length < 1) return

    const {cell} = await MeetingEntityRepo.findOneOrFail(
        {
            where: {
                id: Equal(meetingId)
            },

            select: {id: true},

            relations: {
                cell: true
            }
        }
    )

    for (const member of cellMembers) {
        await MeetCtrlMailService.sendMeetingEditMail(member.account.user, meetingId, cell.name)
    }
}