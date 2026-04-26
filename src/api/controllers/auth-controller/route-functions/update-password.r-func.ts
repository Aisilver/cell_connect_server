import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import { MainEntitiesRepoManagerService } from "../../../../datasources/main-entities-ds/repos-manger";
import { MiscellaneousEntitiesRepoManagerService } from "../../../../datasources/miscellaneous-entites-ds/repos-manager";
import Joi from "joi";
import { SignInCredentials } from "@shared/route-types";
import { Equal } from "typeorm";
import { Hasher } from "../../../../classes/hasher/hasher.class";
import { AuthCtrlEventsManagerService } from "../events/auth-ctrl-events-manager.service";

const {PasswordHistoryRepo} = MiscellaneousEntitiesRepoManagerService,

{UserEntityRepo} = MainEntitiesRepoManagerService,

hasher = new Hasher(),

signInCredentialsValidator = Joi.object<SignInCredentials>({
    email: Joi.string().required(),
    password: Joi.string().required()
})


export async function AuthCTRL_RF_updatePassword (req: Request, res: Response) {
    try {
        const {error, value} = signInCredentialsValidator.validate(req.body)

        if(error) throw error

        const {email, password: newPassword} = value,

        userFromDb = await UserEntityRepo.findOne(
            {
                where: {
                    email: Equal(email)
                },
                select: {
                    id: true
                }
            }
        )

        if(!userFromDb) throw Error(`a user linked with "${email}" cannot be found`)

        const passwordHistory = await PasswordHistoryRepo.find(
            {
                where: {
                    userId: Equal(userFromDb.id)
                },
                select: {
                    passwordHash: true
                }
            }
        )

        for (const hash of passwordHistory.map(value => value.passwordHash)) {
            if(await hasher.compare(newPassword, hash)) throw Error("password has been used before, try a different one.")
        }

        const newPasswordHash = await hasher.hash(newPassword)

        await UserEntityRepo.update(
            {
                id: Equal(userFromDb.id)
            }, 
            {
                password: newPasswordHash
            }
        )

        AuthCtrlEventsManagerService.triggerPasswordHistoryUpdateEvent({
            userId: userFromDb.id,
            passwordHash: newPasswordHash
        })

        res.json(APIResponse())
    } catch (error: any) {
        res.json(APIFailResponse(error.message))
    }
}