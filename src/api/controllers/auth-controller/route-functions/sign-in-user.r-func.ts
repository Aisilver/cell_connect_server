import Joi from "joi";
import { SignInCredentials, UserSignInResponse } from "@shared/route-types";
import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import { MainEntitiesRepoManagerService } from "../../../../datasources/main-entities-ds/repos-manger";
import { Equal, In } from "typeorm";
import { Hasher } from "../../../../classes/hasher/hasher.class";
import { config } from "dotenv";
import { AuthCtrlService } from "../services/auth-ctrl.service";
import { MemberStatusTypes } from "@shared/entities";
import { ServerMainService } from "../../../../services/server.service";

config()

const {
    UserEntityRepo, 
    UserAccountEntityRepo,
    LeaderEntityRepo,
    MemberEntityRepo
} = MainEntitiesRepoManagerService,

credentialsValidator = Joi.object<SignInCredentials>({
    email: Joi.string().required(),
    password: Joi.string().required()
}),

hasher = new Hasher()

export async function AuthCTRL_RF_signInUser (req: Request, res: Response) {
    try {
        const {error, value: cred} = credentialsValidator.validate(req.body)

        if (error) throw error

        const userFoundInDB = await UserEntityRepo.findOne(
            {
                where: {
                    email: Equal(cred.email)
                }, 
                
                loadEagerRelations: false,

                select: {
                    id: true, 
                    password: true
                }
            }
        )

        if(!userFoundInDB) throw Error("invalid username or passowrd")

        if(!await hasher.compare(cred.password, userFoundInDB.password)) throw Error("invalid username or passowrd")
        
        const {id: userId} = userFoundInDB,
        
        accountFromDB = await UserAccountEntityRepo.findOne({
            where: {
                user: userFoundInDB
            }
        })

        if(!accountFromDB) throw Error("account cannot be found")

        accountFromDB.leadership = await LeaderEntityRepo.findOne(
            {
                where: {
                    account: {id: accountFromDB.id},
                    status: In<MemberStatusTypes>(['active', 'suspended'])
                }
            }
        )

        accountFromDB.membership = await MemberEntityRepo.find(
            {
                where: {
                    account: {id: accountFromDB.id},
                    status: In<MemberStatusTypes>(['active', 'suspended'])
                }
            }
        )
        
        const accessToken = await AuthCtrlService.setResponseRefeshTokenAndGetAccessToken(res, {userId, accountId: accountFromDB.id})

        await ServerMainService.CAHCED_SIGNED_IN_ACCOUNTS.add(accountFromDB)

        res.json(APIResponse<UserSignInResponse>({account: accountFromDB, accessToken}))

    } catch (error: any) {
        res.json(APIFailResponse(error.message))
    }
}