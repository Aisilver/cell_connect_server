import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import Joi from "joi";
import { MainEntitiesRepoManagerService } from "../../../../datasources/main-entities-ds/repos-manger";
import { In, Not } from "typeorm";
import { MeetingStatusTypes } from "@shared/entities";
import { ToBoolean } from "../../../../functions/to-boolean.func";

const {MeetingEntityRepo} = MainEntitiesRepoManagerService

export async function MeetCTRL_RF_getUpcomingMeetingByCellId (req: Request, res: Response) {
    try {
        const {error, value: Cell_Id} = Joi.number().not(0).required().validate(req.params['cellId']),

        {flat} = req.query as {flat?: boolean}

        if(error) throw error

        const meeting = await MeetingEntityRepo.findOne(
            {
                where: {
                    cell: {id: Cell_Id},
                    status: Not(In<MeetingStatusTypes>(['canceled', 'concluded', 'not-hosted']))
                },
                ...(!ToBoolean(flat) && {
                    relations: {
                        host: {
                            profile_image: true
                        },
                        editLogs: true,
                        venue: true,
                        cell: true,
                        agendas: true
                    }
                })
            }
        )

        res.json(APIResponse(meeting))

    } catch (error: any) {
        res.json(APIFailResponse(error.message))
    }
} 