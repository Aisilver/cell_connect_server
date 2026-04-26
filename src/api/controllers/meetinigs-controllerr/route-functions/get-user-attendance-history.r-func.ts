import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import { MainEntitiesRepoManagerService } from "../../../../datasources/main-entities-ds/repos-manger";
import { RequestJWTPayloadExtractor } from "../../../functions/request-user-payload-extractor.func";
import { PaginatedData, Pagination } from "@shared/common";
import { Attendance } from "@shared/entities";
import { PaginateFindAndCountData } from "../../../../functions/paginateFindAndCount.func";

const {AttendanceEntityRepo} = MainEntitiesRepoManagerService

export async function MeetCTRL_RF_getUserAttendanceHistory (req: Request, res: Response) {
    try {
        const payload = RequestJWTPayloadExtractor(req)

        if(!payload) return res.status(403).json(APIFailResponse("", 'IMPOSTER-ALERT')) 
        
        const {accountId} = payload,

        //@ts-ignore
        pagination = req.query as Pagination,

        page = Number(pagination.page),

        limit = Number(pagination.limit),

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
                        host: {
                            user: true,
                            profile_image: true
                        },
                        cell: true,
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