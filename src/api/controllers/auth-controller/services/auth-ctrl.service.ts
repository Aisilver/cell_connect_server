import { JWTConfigurator } from "../../../classes/jwt-configurator.class"
import { AuthCtrlCacheService } from "./auth-ctrl-cache.service"
import { Request, Response } from "express"
import { FindOneOptions } from "typeorm"
import { UserAccountEntity } from "../../../../datasources/main-entities-ds/schemas/user-account-schema/user-account.schema"
import { API_COOKIE_KEY_NAMES_CONSTANT } from "../../../../constants/api-cookie-key-names.contant"
import { ApiJWTPayload } from "src/api/types"

const {REFRESH_TOKEN_KEY} = API_COOKIE_KEY_NAMES_CONSTANT

class AuthCtrlServiceMain {
    private jwtConfig = new JWTConfigurator()
    
    async requestCookieRefreshTokenAuthenticationAndJwtPayloadExtraction (req: Request) {
        const cookieRefreshToken = req.cookies[REFRESH_TOKEN_KEY]
        
        if (!cookieRefreshToken) throw Error("no refresh token found in cookie")    
            
        const payload = await this.jwtConfig.verifyToken(cookieRefreshToken, 'refresh'),
        
        {userId} = payload,
        
        storedRefreshToken = await AuthCtrlCacheService.getUserRefreshToken(userId)
    
        if(!storedRefreshToken) throw Error("no refresh token found in cache")
        
        if(storedRefreshToken !== cookieRefreshToken) {
            await AuthCtrlCacheService.deleteUserRefreshToken(userId)
    
            throw Error("invalid token")
        }

        return payload
    }

    async setResponseRefeshTokenAndGetAccessToken (res: Response, payload: ApiJWTPayload) {
        const {userId, accountId} = payload,
        
        newAccessToken = this.jwtConfig.generateAccessToken({userId, accountId}),
    
        newRefreshToken = this.jwtConfig.generateRefreshToken({userId, accountId})
    
        await AuthCtrlCacheService.deleteUserRefreshToken(userId)

        await AuthCtrlCacheService.setUserRefreshToken(userId, newRefreshToken)

        this.jwtConfig.setRefreshTokenIntoResponseCookie(res, newRefreshToken)

        return newAccessToken
    }

    getUserAccountByUserIdFindOneOptions (userId: number): FindOneOptions<UserAccountEntity> {
        return {
          where: {
            user: {id: userId}
          },
          relations: {
            user: {
              location: true
            },
            currentLeadership: {
              cell: {
                suspension: true
              },
              
              // cell_permission: true
            },
            currentMembership: {
              cell: {
                suspension: true
              },
              
              suspension: true,

              // cell_permission: true
            },
            suspension: true
          }
        }
    }
}

export const AuthCtrlService = new AuthCtrlServiceMain()