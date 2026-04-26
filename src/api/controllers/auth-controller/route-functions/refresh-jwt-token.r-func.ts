import { Request, Response } from "express";
import { APIFailResponse, APIResponse } from "../../../functions/api-response.func";
import { config } from "dotenv";
import { JWTConfigurator } from "../../../classes/jwt-configurator.class";

config()

const {REFRESH_TOKEN_COOKIE_NAME} = process.env,

jwtConfig = new JWTConfigurator()

export async function AuthCTRL_RF_refreshJWTToken(req: Request, res: Response) {
    try {
        
        const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME]

        if (!refreshToken) throw Error("no refresh token found")

        const payload = await jwtConfig.verifyToken(refreshToken, 'refresh')

        res.json(APIResponse(jwtConfig.generateAccessToken(payload)))

    } catch (error: any) {
        res.json(APIFailResponse(error.message))
    }
}