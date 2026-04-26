import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../../functions/api-response.func";
import { MeetingCreationRequestData } from "@shared/route-types/meetings-route/meeting-creation-request.type";
import { RequestJWTPayloadExtractor } from "../../functions/request-user-payload-extractor.func";
import { MeetingEntitySchemaValidator } from "../../../datasources/main-entities-ds/schemas/meeting-schema/meeting-schema.validator";
import { MainEntitiesRepoManagerService } from "../../../datasources/main-entities-ds/repos-manger";

const {MeetingEntityRepo} = MainEntitiesRepoManagerService

export async function MeetCTRL_RF_createMeeting (req: Request, res: Response) {
    try {
        
        const creationRequestData = req.body as MeetingCreationRequestData,
        
        {accountId} = RequestJWTPayloadExtractor(req),

        {cellId} = creationRequestData,

        {error: meetingValidationError, value: NewMeeting} = new MeetingEntitySchemaValidator().validate(creationRequestData.meeting)

        if(meetingValidationError) throw meetingValidationError

        await MeetingEntityRepo.save(
            MeetingEntityRepo.create(
                {
                    ...NewMeeting, 

                    cell: {id: cellId},

                    host: {id: accountId}
                }
            )
        )

        res.json(APIResponse())

    } catch (error: any) {
        res.json(APIFailResponse(error.message))
    }
}