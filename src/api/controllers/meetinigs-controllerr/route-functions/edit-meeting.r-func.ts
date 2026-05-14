import { MeetingEditRequestData } from "@shared/route-types";
import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import { MeetingEntitySchemaValidator } from "../../../../datasources/main-entities-ds/schemas/meeting-schema/meeting-schema.validator";
import Joi from "joi";
import { MainEntitiesRepoManagerService } from "../../../../datasources/main-entities-ds/repos-manger";
import { Equal } from "typeorm";
import { MeetingEntityNotificationManager } from "../../../../notification-handlers/meeting-notifications/meeting-entity.notification-handler";
import { MeetingCtrlEventsManagerService } from "../events/meeting-ctrl-events-manager.service";
import { ExpressRequestJWTPayloadExtractor } from "../../../functions/express-request-jwt-payload-extractor.func";

const {MeetingEntityRepo, MeetingEditLogEntityRepo} = MainEntitiesRepoManagerService

export async function MeetCTRL_RF_editMeeting(req: Request, res: Response) {
    try {
        const {accountId} = ExpressRequestJWTPayloadExtractor(req),

        body: MeetingEditRequestData = req.body,

        {error: meetingIdError, value: meetingId} = Joi.number().not(0).required().validate(req.params['meetingId']),

        {error: newMeetingError, value: newMeeting} = new MeetingEntitySchemaValidator().validate(body.newMeeting),

        {error: oldMeetingError, value: oldMeeting} = new MeetingEntitySchemaValidator().validate(body.oldMeeting)

        if(meetingIdError) throw meetingIdError

        if(newMeetingError) throw Error(`new meeting error: ${newMeetingError.message}`)

        if(oldMeetingError) throw Error(`old meeting error: ${oldMeetingError.message}`)
    
        const {
            date_time_changed,
            description_changed,
            title_changed,
            type_changed,
        } = body.editLog

        const {affected} = await MeetingEntityRepo.update({id: Equal(meetingId)}, {
            ...(title_changed && {
                title: newMeeting.title
            }),

            ...(description_changed && {
                description: newMeeting.description
            }),

            ...(type_changed && {
                type: newMeeting.type
            }),

            ...(date_time_changed && {
                startTime: newMeeting.startTime,
                endTime: newMeeting.endTime
            })
        }) 

        const savedEditLog = await MeetingEditLogEntityRepo.save(MeetingEditLogEntityRepo.create({
            ...body.editLog,

            editor: {id: accountId},

            meeting: {id: meetingId} 
        }))
 
        if(affected) {
            
            MeetingEntityNotificationManager.notifyOfMeetingEdit(savedEditLog, newMeeting)

            MeetingCtrlEventsManagerService.triggerEditedMeetingEvent({
                editLog: savedEditLog,
                meetingId,
                newMeeting,
                oldMeeting
            })
        }
    
        res.json(APIResponse())
         
    } catch (error: any) {
        res.json(APIFailResponse(error.message))
    }
}