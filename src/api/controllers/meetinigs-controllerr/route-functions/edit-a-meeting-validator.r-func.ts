import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import { ExpressRequestJWTPayloadExtractor } from "../../../functions/express-request-jwt-payload-extractor.func";
import { ServerMainService } from "../../../../services/server.service";
import { MeetingStatusTypes, UserAccount } from "@shared/entities";
import { MainEntitiesRepoManagerService } from "../../../../datasources/main-entities-ds/repos-manger";
import { In } from "typeorm";
import { differenceInHours } from "date-fns";

const {MeetingEntityRepo} = MainEntitiesRepoManagerService

export async function MeetCTRL_RF_editAMeetingValidator (req: Request, res: Response) {
    try {
        const {accountId} = ExpressRequestJWTPayloadExtractor(req),

        {CAHCED_SIGNED_IN_ACCOUNTS, CACHED_APP_SETTINGS} = ServerMainService,

        appSettings = await CACHED_APP_SETTINGS.get()

        if(!appSettings) throw Error("failed to get app settings")

        let account = await CAHCED_SIGNED_IN_ACCOUNTS.find(acct => acct.id == accountId)

        if(!account) throw Error("failed to get account in cache")

        const {currentMembership, currentLeadership} = account as UserAccount,

        MyCell = currentLeadership?.cell ?? currentMembership?.cell
    
        if(!MyCell) throw Error("you need to own or be part of a cell to edit a meeting")
        
        if(MyCell.suspension) throw Error("cell is currently suspended")
        
        if(currentMembership?.suspension) throw Error("oops suspended members cannot edit meetings")
        
        const permission = currentLeadership?.cell_permission ?? currentMembership?.cell_permission
    
        if(!permission) throw Error("oops you are not authorized to edit meetings")
        
        if(!permission.meeting_permissions.update)
          if(currentMembership)
            throw Error("oops you do not have the permission to edit meetings, please consult your cell leader")
          else
            throw Error("oops you do not have the permission to edit meetings")
        
        const upcomingMeeting = await MeetingEntityRepo.findOne(
            {
                where: {
                    cell: {id: Number(MyCell.id)},
                    
                    status: In<MeetingStatusTypes>(['booked', 'pending', 'in-session'])
                },
                select: {
                    id: true, 
                    status: true,
                    startTime: true
                },
                relations: {
                    editLogs: true
                }
            }
        )
        
        if(!upcomingMeeting) throw Error("oops meeting to be edited was not found")
        
        const {status: meetingStatus, startTime, editLogs} = upcomingMeeting,
    
        {max_meeting_editable_deadline_hours, max_meeting_edit_chances} = appSettings.meeting_settings
    
        if(meetingStatus != "booked") throw Error("on-going meetings cannot be edited")
    
        const hourDiff = differenceInHours(startTime, new Date()),
    
        editlogsCount = editLogs?.length ?? 0
    
        if(max_meeting_editable_deadline_hours >= hourDiff) throw Error("meeting edit deadline has passed")
        
        if(editlogsCount >= max_meeting_edit_chances) throw Error("meeting edit chances has been exceeded")

        res.json(APIResponse())
    } catch (error: any) {
        res.json(APIFailResponse(error.message))
    }
}