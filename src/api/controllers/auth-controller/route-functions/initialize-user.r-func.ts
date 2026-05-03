import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import { MainEntitiesRepoManagerService } from "../../../../datasources/main-entities-ds/repos-manger";
import { UserSignInResponse } from "@shared/route-types";
import { AccountBase } from "@shared/entities";
import { AccountBaseEntity } from "../../../../datasources/main-entities-ds/schemas/account-base-schema/account-base.schema";
import { AuthCtrlService } from "../services/auth-ctrl.service";
import { ServerMainService } from "../../../../services/server.service";

const {UserAccountEntityRepo} = MainEntitiesRepoManagerService

export async function AuthCTRL_RF_initializeUser (req: Request, res: Response) {
  try {
    const payload = await AuthCtrlService.requestCookieRefreshTokenAuthenticationAndJwtPayloadExtraction(req),

    {userId} = payload,

    {CAHCED_SIGNED_IN_ACCOUNTS} = ServerMainService

    let account: AccountBaseEntity | AccountBase | null | undefined = await CAHCED_SIGNED_IN_ACCOUNTS.find(acct => acct.type == 'user' && acct.user?.id == userId )

    if(!account) {
      account = await UserAccountEntityRepo.findOne(
        {
          where: {
            user: {id: userId}
          },
          relations: {
            user: {
              location: true
            }
          }
        }
      )

      if(account) await CAHCED_SIGNED_IN_ACCOUNTS.add(account)
    }

    if(!account) throw Error("account cannot be found")
    
    const newAccessToken = await AuthCtrlService.setResponseRefeshTokenAndGetAccessToken(res, payload)

    res.json(APIResponse<UserSignInResponse>({account: account, accessToken: newAccessToken}))

  } catch (error: any) {
    res.json(APIFailResponse(error.message))
  }  
}