import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import { PaginationParamValidator } from "../../../validators/pagination-param-validator.vldtr";
import { Attendance } from "@shared/entities";
import { MainEntitiesRepoManagerService } from "../../../../datasources/main-entities-ds/repos-manger";
import { PaginatedData } from "@shared/common";
import { PaginateFindAndCountData } from "../../../../functions/paginateFindAndCount.func";
import { IdValidator } from "../../../validators/id-validator.vldtr";

const {AttendanceEntityRepo} = MainEntitiesRepoManagerService

export async function MeetCTRL_RF_getUserCellAttendance (req: Request, res: Response) {
    try {
        const {error: paginationValidatorError, value: pagination} = PaginationParamValidator(req.query),

        {error: idValidatorError, value: MemberId} = IdValidator(req.params['memberId'])

        if(paginationValidatorError) throw paginationValidatorError

        if(idValidatorError) throw idValidatorError
        
        const {limit, page} = pagination,

        skip = (page - 1) * limit, 

        [attendances, total] = await AttendanceEntityRepo.findAndCount(
            {
                where: {
                    membership: {id: Number(MemberId)}
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
                        }
                    }
                }
            }
        )

        res.json(APIResponse<PaginatedData<Attendance>>(PaginateFindAndCountData(attendances, total, pagination)))
    } catch (error: any) {
        res.json(APIFailResponse(error.message))
    }
}