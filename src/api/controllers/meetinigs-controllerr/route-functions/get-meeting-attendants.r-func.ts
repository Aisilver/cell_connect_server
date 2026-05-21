import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import { MainEntitiesRepoManagerService } from "../../../../datasources/main-entities-ds/repos-manger";
import { Equal, In, Not } from "typeorm";
import { ExpressRequestJWTPayloadExtractor } from "../../../functions/express-request-jwt-payload-extractor.func";
import { ToBoolean } from "../../../../functions/to-boolean.func";
import { PaginateFindAndCountData } from "../../../../functions/paginateFindAndCount.func";
import { IdValidator } from "../../../validators/id-validator.vldtr";
import { GetMeetingAttendantsRouteQuery } from "@shared/route-types";

const {AttendanceEntityRepo} = MainEntitiesRepoManagerService

export async function MeetCTRL_RF_getMeetingAttendants (req: Request, res: Response) {
    try {

        const jwtPayload = ExpressRequestJWTPayloadExtractor(req)

        if(!jwtPayload) return res.status(403).json(APIFailResponse("", 'IMPOSTER-ALERT'))
        
        const {accountId} = jwtPayload,
        
        {exclude_user, limit, exclude_leader} = req.query as GetMeetingAttendantsRouteQuery,
        
        {error, value: meetingId} = IdValidator(req.params['meetingId'])

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