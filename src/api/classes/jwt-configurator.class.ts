import { config } from 'dotenv';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { TIME_IN_SECONDS_CONSTANT } from '../../constants/time-in-seconds.constant';
import { ApiJWTPayload } from '../types';
import { API_COOKIE_KEY_NAMES_CONSTANT } from '../../constants/api-cookie-key-names.contant';

config()

const {REFRESH_TOKEN_KEY} = API_COOKIE_KEY_NAMES_CONSTANT,

{ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY, NODE_ENV} = process.env,

{WEEK_MS} = TIME_IN_SECONDS_CONSTANT

export class JWTConfigurator {
    
    setRefreshTokenIntoResponseCookie (res: Response, refreshToken: string) {
        res.cookie(REFRESH_TOKEN_KEY, refreshToken, 
            {
                httpOnly: true, 
                secure: NODE_ENV != 'development',
                sameSite: NODE_ENV != 'development' ? 'none' : 'lax',
                maxAge: WEEK_MS
            }
        )
    }

    verifyToken (token: string, type: "refresh" | "access" = "access") {
        return new Promise<ApiJWTPayload>((res, rej) => {
            const secret = type == 'access' ? ACCESS_TOKEN_SECRET_KEY : REFRESH_TOKEN_SECRET_KEY

            jwt.verify(token, secret, (err, payload) => {
                if(err) rej(err)

                else res(payload as ApiJWTPayload)
            })
        })
    }

    generateAccessToken (payload: ApiJWTPayload) {
        return jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {expiresIn: `15m`})
    }

    generateRefreshToken (payload: ApiJWTPayload) {
        return jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, {expiresIn: `7d`})
    }
}