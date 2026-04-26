import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import { EmailVerificationRequest, InUseResponse } from "@shared/route-types";
import { MainEntitiesRepoManagerService } from "../../../../datasources/main-entities-ds/repos-manger";
import Joi from "joi";
import { Equal } from "typeorm";
import { AuthCtrlCacheService } from "../services/auth-ctrl-cache.service";
import { AuthCtrlEventsManagerService } from "../events/auth-ctrl-events-manager.service";

const {UserEntityRepo} = MainEntitiesRepoManagerService

export async function AuthCTRL_RF_verifyEmail (req: Request, res: Response) {
    try {
        let inUse!: boolean

        const {error, value} = Joi.object<EmailVerificationRequest>({email: Joi.string().required()}).validate(req.body)

        if(error) throw error

        const {email} = value,

        {SIGN_UP_IDENTIFIERS_GROUP_CACHE} = AuthCtrlCacheService

        if(await SIGN_UP_IDENTIFIERS_GROUP_CACHE.exists()){
            inUse = await SIGN_UP_IDENTIFIERS_GROUP_CACHE.find(identity => identity.email == email) != null
        }else {
            AuthCtrlEventsManagerService.triggerSignupIdentifiersReCachingEvent()

            const userWithMail = await UserEntityRepo.findOne(
                {
                    where: {
                        email: Equal(email)
                    },
                    loadEagerRelations: false,
                    select: {
                        id: true
                    }
                }
            )
            
            inUse = userWithMail != null
        }

        res.json(APIResponse<InUseResponse>({inUse}))

    }catch (error: any) {
        res.json(APIFailResponse(error.message))
    }
}