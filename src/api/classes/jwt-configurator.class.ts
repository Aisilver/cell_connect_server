import { config } from 'dotenv';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { TIME_IN_SECONDS_CONSTANT } from '../../constants/time-in-seconds.constant';

config()

export type AppJWTPayload = {userId: number, accountId: number}

const {ACCESS_SECRET_KEY, REFRESH_SECRET_KEY, REFRESH_TOKEN_COOKIE_NAME, NODE_ENV} = process.env,

{WEEK_MS} = TIME_IN_SECONDS_CONSTANT

export class JWTConfigurator {
    
    setRefreshTokenIntoResponseCookie (res: Response, refreshToken: string) {
        res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, 
            {
                httpOnly: true, 
                secure: NODE_ENV != 'development',
                sameSite: NODE_ENV != 'development' ? 'none' : 'lax',
                maxAge: WEEK_MS
            }
        )
    }

    verifyToken (token: string, type: "refresh" | "access" = "access") {
        return new Promise<AppJWTPayload>((res, rej) => {
            const secret = type == 'access' ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY

            jwt.verify(token, secret, (err, payload) => {
                if(err) rej(err)

                else res(payload as AppJWTPayload)
            })
        })
    }

    generateAccessToken (payload: AppJWTPayload) {
        const {accountId, userId} = payload

        return jwt.sign({accountId, userId}, ACCESS_SECRET_KEY, {expiresIn: `15m`})
    }

    generateRefreshToken (payload: AppJWTPayload) {
        const {accountId, userId} = payload

        return jwt.sign({accountId, userId}, REFRESH_SECRET_KEY, {expiresIn: `7d`})
    }
}