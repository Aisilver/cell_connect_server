import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import Joi from "joi";
import { MainEntitiesRepoManagerService } from "../../../../datasources/main-entities-ds/repos-manger";
import { In, Not } from "typeorm";
import { MeetingStatusTypes } from "@shared/entities";
import { ToBoolean } from "../../../../functions/to-boolean.func";
import { GetUpcomingMeetingRouteQuery } from "@shared/route-types/meetings-route/queries.types";

const {MeetingEntityRepo} = MainEntitiesRepoManagerService

export async function MeetCTRL_RF_getUpcomingMeetingByCellId (req: Request, res: Response) {
    try {
        const {error, value: Cell_Id} = Joi.number().not(0).required().validate(req.params['cellId']),

        {
            inc_agendas,
            inc_cell,
            inc_editlogs,
            inc_venue
        } = req.query as GetUpcomingMeetingRouteQuery

        if(error) throw error

        const meeting = await MeetingEntityRepo.findOne(
            {
                where: {
                    cell: {id: Cell_Id},
                    status: Not(In<MeetingStatusTypes>(['canceled', 'concluded', 'not-hosted']))
                },
                relations: {

                }
            }
        )

        res.json(APIResponse(meeting))

    } catch (error: any) {
        res.json(APIFailResponse(error.message))
    }
} 