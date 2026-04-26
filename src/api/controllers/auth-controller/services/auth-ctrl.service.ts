import { config } from "dotenv"
import { AppJWTPayload, JWTConfigurator } from "../../../classes/jwt-configurator.class"
import { AuthCtrlCacheService } from "./auth-ctrl-cache.service"
import { Request, Response } from "express"

config()

const {REFRESH_TOKEN_COOKIE_NAME} = process.env

class AuthCtrlServiceMain {
    private jwtConfig = new JWTConfigurator()
    
    async requestCookieRefreshTokenAuthenticationAndJwtPayloadExtraction (req: Request) {
        const cookieRefreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME]
        
        if (!cookieRefreshToken) throw Error("no refresh token found in cookie")    
            
        const payload = await  this.jwtConfig.verifyToken(cookieRefreshToken, 'refresh'),
        
        {userId} = payload,
        
        storedRefreshToken = await AuthCtrlCacheService.getUserRefreshToken(userId)
    
        if(!storedRefreshToken) throw Error("no refresh token found in cache")
        
        if(storedRefreshToken !== cookieRefreshToken) {
            await AuthCtrlCacheService.deleteUserRefreshToken(userId)
    
            throw Error("invalid token")
        }

        return payload
    }

    async setResponseRefeshTokenAndGetAccessToken (res: Response, payload: AppJWTPayload) {

        const { userId } = payload,
        
        newAccessToken = this.jwtConfig.generateAccessToken(payload),
    
        newRefreshToken = this.jwtConfig.generateRefreshToken(payload)
    
        this.jwtConfig.setRefreshTokenIntoResponseCookie(res, newRefreshToken)
    
        await AuthCtrlCacheService.setUserRefreshToken(userId, newRefreshToken)

        return newAccessToken
    }
}

export const AuthCtrlService = new AuthCtrlServiceMain()