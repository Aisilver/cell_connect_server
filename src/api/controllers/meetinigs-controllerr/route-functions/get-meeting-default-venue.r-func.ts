import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import Joi from "joi";
import { MainEntitiesRepoManagerService } from "../../../../datasources/main-entities-ds/repos-manger";
import { Equal } from "typeorm";
import { AppLocation } from "@shared/entities";


const { CellEntityRepo } = MainEntitiesRepoManagerService

export async function MeetCTRL_RF_getMeetingDefaultVenue (req: Request, res: Response) {
    try {
        // const {value: cellId, error} = Joi.number().not(0).required().validate(req.params['cellId'])

        // if(error) throw error

        // const cell = await CellEntityRepo.findOneOrFail(
        //     {
        //         where: {
        //             id: Equal(cellId)
        //         }
        //     }
        // )

        // res.json(APIResponse<AppLocation>(cell.address))

        setTimeout(() => {
           res.json(APIResponse<AppLocation>({
                country: 'nigeria',
                city: 'sangotedo',
                state: 'lagos',
                addressInFull: '39, miracle avenue, sangotedo, ajah, lagos.'
            })) 
        });
    } catch (error: any) {
        res.json(APIFailResponse(error.message))
    }
}