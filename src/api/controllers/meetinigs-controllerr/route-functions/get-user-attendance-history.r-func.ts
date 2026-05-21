import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import { MainEntitiesRepoManagerService } from "../../../../datasources/main-entities-ds/repos-manger";
import { ExpressRequestJWTPayloadExtractor } from "../../../functions/express-request-jwt-payload-extractor.func";
import { PaginatedData, Pagination } from "@shared/common";
import { Attendance } from "@shared/entities";
import { PaginateFindAndCountData } from "../../../../functions/paginateFindAndCount.func";
import { PaginationParamValidator } from "../../../validators/pagination-param-validator.vldtr";

const {AttendanceEntityRepo} = MainEntitiesRepoManagerService

export async function MeetCTRL_RF_getUserAttendanceHistory (req: Request, res: Response) {
    try {
        const payload = ExpressRequestJWTPayloadExtractor(req)

        if(!payload) return res.status(403).json(APIFailResponse("", 'IMPOSTER-ALERT')) 
        
        const {accountId} = payload,

        {error, value: pagination} = PaginationParamValidator(req.query)

        if(error) throw error

        const {limit, page} = pagination,

        skip = (Number(page) - 1) * Number(limit),
        
        [attendances, total] = await AttendanceEntityRepo.findAndCount(
            {
                where: {
                    account: {id: accountId}
                },
                order: {createdAt: "DESC"},
                skip,
                take: limit,
                relations: {
                    meeting: {
                        cell: {
                            leader: {
                                account: {
                                    profile_image: true
                                }
                            }
                        },
                        venue: true
                    }
                }
            }
        )

        res.json(APIResponse<PaginatedData<Attendance>>(PaginateFindAndCountData(attendances, total, {page, limit})))
    } catch (error: any) {
        res.json(APIFailResponse(error.message))
    }
}