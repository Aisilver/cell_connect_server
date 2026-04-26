import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import Joi from "joi";
import { InUseResponse, PhoneNumberVerficationRequest } from "@shared/route-types";
import { MainEntitiesRepoManagerService } from "../../../../datasources/main-entities-ds/repos-manger";
import { AuthCtrlCacheService } from "../services/auth-ctrl-cache.service";
import { AuthCtrlEventsManagerService } from "../events/auth-ctrl-events-manager.service";
import { Equal } from "typeorm";

const {UserEntityRepo} = MainEntitiesRepoManagerService


export async function AuthCTRL_RF_verifyPhoneNumber (req: Request, res: Response) {
    try {
        let inUse: boolean

        const {error, value: body} = Joi.object<PhoneNumberVerficationRequest>({phoneNumber: Joi.string().required()}).validate(req.body)

        if(error) throw error

        const {phoneNumber} = body,

        {SIGN_UP_IDENTIFIERS_GROUP_CACHE} = AuthCtrlCacheService

        if(await SIGN_UP_IDENTIFIERS_GROUP_CACHE.exists()){
            inUse = await SIGN_UP_IDENTIFIERS_GROUP_CACHE.find(item => item.phoneNumber == phoneNumber) != null
        }else {
            AuthCtrlEventsManagerService.triggerSignupIdentifiersReCachingEvent()

            const userWithPhonenumber = await UserEntityRepo.findOne(
                {
                    where: {
                        phoneNumber: Equal(phoneNumber)
                    },
                    loadEagerRelations: false,
                    select: {
                        phoneNumber: true
                    }
                }
            )

            inUse = userWithPhonenumber != null
        }

        res.json(APIResponse<InUseResponse>({inUse}))
    
    } catch (error: any) {
        res.json(APIFailResponse(error.message))
    }
} 