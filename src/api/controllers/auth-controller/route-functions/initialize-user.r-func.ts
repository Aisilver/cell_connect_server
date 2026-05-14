import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import { MainEntitiesRepoManagerService } from "../../../../datasources/main-entities-ds/repos-manger";
import { UserSignInResponse } from "@shared/route-types";
import { AuthCtrlService } from "../services/auth-ctrl.service";
import { ServerMainService } from "../../../../services/server.service";

const {UserAccountEntityRepo} = MainEntitiesRepoManagerService

export async function AuthCTRL_RF_initializeUser (req: Request, res: Response) {
  try {
    const payload = await AuthCtrlService.requestCookieRefreshTokenAuthenticationAndJwtPayloadExtraction(req),

    {userId, accountId} = payload,

    {CAHCED_SIGNED_IN_ACCOUNTS} = ServerMainService

    let account = await CAHCED_SIGNED_IN_ACCOUNTS.find(acct => acct.id == accountId)

    if(!account) {
      account = await UserAccountEntityRepo.findOne(AuthCtrlService.getUserAccountByUserIdFindOneOptions(userId))

      if(account) await CAHCED_SIGNED_IN_ACCOUNTS.add(account)
    }

    if(!account) throw Error("account cannot be found")
    
    const newAccessToken = await AuthCtrlService.setResponseRefeshTokenAndGetAccessToken(res, payload)

    res.json(APIResponse<UserSignInResponse>({account: account, accessToken: newAccessToken}))

  } catch (error: any) {
    res.json(APIFailResponse(error.message))
  }  
}