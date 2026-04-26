import { Request, Response } from "express";
import Joi from "joi";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import { UserCreationRequest } from "@shared/route-types";
import { MainEntitiesRepoManagerService } from "../../../../datasources/main-entities-ds/repos-manger";
import { UserAccountEntitySchemaValidator } from "../../../../datasources/main-entities-ds/schemas/user-account-schema/user-account-schema.validator";
import { UserEntitySchemaValidator } from "../../../../datasources/main-entities-ds/schemas/user-schema/user-schema.validator";
import { User } from "@shared/entities";
import { AuthCtrlCacheService } from "../services/auth-ctrl-cache.service";
import { AuthCtrlEventsManagerService } from "../events/auth-ctrl-events-manager.service";
import { Hasher } from "../../../../classes/hasher/hasher.class";

const {UserAccountEntityRepo} = MainEntitiesRepoManagerService,

hasher = new Hasher()

export async function AuthCTRL_RF_createUserAccount (req: Request, res: Response) {
    try {
        const userCreationRequestData = req.body as UserCreationRequest,
        
        {error: userAccountDataValidationError, value: account} = new UserAccountEntitySchemaValidator().validate(userCreationRequestData.account),

        {error: userDataValidationError, value: user} = new UserEntitySchemaValidator().validate(account.user as User),

        {error: imageRefValidatorError, value: accountImageRef} = Joi.string().optional().validate(userCreationRequestData.accountImageRef)

        if(userAccountDataValidationError) throw userAccountDataValidationError

        if(imageRefValidatorError) throw imageRefValidatorError

        else if(userDataValidationError) throw userDataValidationError

        const passwordHash = await hasher.hash(user.password)
        
        //@ts-ignore
        account.user.password = passwordHash

        account.name = account.username

        const savedAccount = await UserAccountEntityRepo.save(UserAccountEntityRepo.create(account)),

        {id: accountId} = savedAccount,

        {id: userId} = savedAccount.user,

        {SIGN_UP_IDENTIFIERS_GROUP_CACHE} = AuthCtrlCacheService

        if(await SIGN_UP_IDENTIFIERS_GROUP_CACHE.exists())
            await SIGN_UP_IDENTIFIERS_GROUP_CACHE.add({email: user.email, phoneNumber: user.phoneNumber, username: account.username})
        else
            AuthCtrlEventsManagerService.triggerSignupIdentifiersReCachingEvent()

        if(accountImageRef) AuthCtrlEventsManagerService.triggerUserAccountImageUploadEvent({
            imageRef: accountImageRef,
            accountId
        })

        AuthCtrlEventsManagerService.triggerUserSignUpSuccessMailingEvent(user)

        AuthCtrlEventsManagerService.triggerPasswordHistoryUpdateEvent({
            userId: Number(userId), 
            passwordHash
        })

        res.json(APIResponse())
                
    } catch (error: any) {
        res.json(APIFailResponse(error.message))
    }
}