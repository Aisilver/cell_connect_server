import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import Joi from "joi";
import { MainEntitiesRepoManagerService } from "../../../../datasources/main-entities-ds/repos-manger";
import { Equal, In, Not } from "typeorm";
import { RequestJWTPayloadExtractor } from "../../../functions/request-user-payload-extractor.func";
import { ToBoolean } from "../../../../functions/to-boolean.func";
import { MeetingAttendantsRequestQuery } from "@shared/route-types";
import { PaginateFindAndCountData } from "../../../../functions/paginateFindAndCount.func";

const {AttendanceEntityRepo} = MainEntitiesRepoManagerService

export async function MeetCTRL_RF_getMeetingAttendants (req: Request, res: Response) {
    try {

        const jwtPayload = RequestJWTPayloadExtractor(req)

        if(!jwtPayload) return res.status(403).json(APIFailResponse("", 'IMPOSTER-ALERT'))
        
        const {accountId} = jwtPayload,
        
        {exclude_user, limit, exclude_absent, exclude_leader} = req.query as MeetingAttendantsRequestQuery,
        
        {error, value: meetingId} = Joi.number().not(0).required().validate(req.params['meetingId'])

        if(error) throw error

        const [attendants, total] = await AttendanceEntityRepo.findAndCount(
            {
                where: {
                    meeting: {id: meetingId},
                    
                    ...(ToBoolean(exclude_leader) && {
                        isLeader: Equal(false),
                    }),
                    
                    ...(ToBoolean(exclude_user) && {
                        account: {
                            id: Not(accountId)
                        }
                    }),
                    
                    ...(ToBoolean(exclude_absent) && {
                        status: Not("absent")
                    })
                },

                ...(!isNaN(Number(limit)) && {
                    take: Number(limit)
                }),
                
                relations: {
                    account: {
                        user: true
                    }
                }
            }
        )

        res.json(APIResponse(PaginateFindAndCountData(attendants, total, {page: 1, limit: isNaN(Number(limit)) ? 0 : Number(limit)})))

    } catch (error: any) {
        res.json(APIFailResponse(error.message))
    }
}