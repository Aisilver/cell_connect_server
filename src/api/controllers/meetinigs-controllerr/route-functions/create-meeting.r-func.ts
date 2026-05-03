import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import { MeetingCreationRequestData } from "@shared/route-types/meetings-route/meeting-creation-request.type";
import { RequestJWTPayloadExtractor } from "../../../functions/request-user-payload-extractor.func";
import { MeetingEntitySchemaValidator } from "../../../../datasources/main-entities-ds/schemas/meeting-schema/meeting-schema.validator";
import { MainEntitiesRepoManagerService } from "../../../../datasources/main-entities-ds/repos-manger";
import Joi from "joi";
import { MeetingCtrlEventsManagerService } from "../events/meeting-ctrl-events-manager.service";
import { MeetingCTRLTaskManager } from "../jobs/meeting-ctrl-cron-manager.service";

const {MeetingEntityRepo} = MainEntitiesRepoManagerService

export async function MeetCTRL_RF_createMeeting (req: Request, res: Response) {
    try {
        const creationRequestData = req.body as MeetingCreationRequestData,
        
        {accountId} = RequestJWTPayloadExtractor(req),

        {cellId, usingNewVenue, meeting} = creationRequestData,

        {error: meetingValidationError, value: NewMeeting} = new MeetingEntitySchemaValidator().validate(meeting),

        {error: cellIdError} = Joi.number().not(0).validate(cellId)

        if(meetingValidationError) throw meetingValidationError

        if(cellIdError) throw cellIdError

        const meetingToSave = MeetingEntityRepo.create({
            ...NewMeeting, 

            cell: {id: cellId},

            ...(usingNewVenue && {
                venue: {id: Number(NewMeeting.venue?.id)}
            }),

            host: {id: accountId}
        })

        const {id: MeetingId} = await MeetingEntityRepo.save(meetingToSave)

        MeetingCtrlEventsManagerService.triggerBookedMeetingEvent(MeetingId)

        MeetingCTRLTaskManager.MEETING_CANCELATION_TASK_MANAGER.addTaskWithSameKeyAndJobParam(MeetingId, NewMeeting.endTime)

        res.json(APIResponse())

    } catch (error: any) {
        res.json(APIFailResponse(error.message))
    }
}