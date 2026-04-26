import { Request, Response } from "express";
import { MainEntitiesRepoManagerService } from "../../../../datasources/main-entities-ds/repos-manger";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import Joi from "joi";
import { UsernameVerificationRequest, InUseResponse } from "@shared/route-types";
import { AuthCtrlCacheService } from "../services/auth-ctrl-cache.service";
import { AuthCtrlEventsManagerService } from "../events/auth-ctrl-events-manager.service";
import { Equal } from "typeorm";

const {UserAccountEntityRepo} = MainEntitiesRepoManagerService


export async function AuthCTRL_RF_verifyUserName (req: Request, res: Response) {
    try {
        const {error, value} = Joi.object({username: Joi.string().required()}).validate(req.body)

        let inUse!: boolean

        if(error) throw error

        const {username} = value as UsernameVerificationRequest,

        {SIGN_UP_IDENTIFIERS_GROUP_CACHE} = AuthCtrlCacheService

        if(await SIGN_UP_IDENTIFIERS_GROUP_CACHE.exists()){
            inUse = await SIGN_UP_IDENTIFIERS_GROUP_CACHE.find(identity => identity.username == username) != null
            
        } else {
            AuthCtrlEventsManagerService.triggerSignupIdentifiersReCachingEvent()

            const profileWithUsername = await UserAccountEntityRepo.findOne(
                {
                    where: {
                        username: Equal(username)
                    },
                    select: {
                        id: true
                    },
                    loadEagerRelations: false,
                }
            )

            inUse = profileWithUsername != null
        }

        res.json(APIResponse<InUseResponse>({inUse}))

    } catch (error: any) {
        res.json(APIFailResponse(error.message))
    }
} 